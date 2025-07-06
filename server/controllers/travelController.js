import axios from 'axios';
import Travel from '../models/Travel.js';

// Cache para almacenar las respuestas de la API
const flightCache = new Map();
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos

// Función para limpiar el caché periódicamente
setInterval(() => {
  const now = Date.now();
  for (const [key, { timestamp }] of flightCache.entries()) {
    if (now - timestamp > CACHE_DURATION) {
      flightCache.delete(key);
    }
  }
}, 24 * 60 * 60 * 1000); // Limpiar cada 24 horas

// Función para invalidar el caché de una ruta específica
const invalidateCache = (origin, destination) => {
  const cacheKey = `${origin}-${destination}`;
  const reverseCacheKey = `${destination}-${origin}`;
  flightCache.delete(cacheKey);
  flightCache.delete(reverseCacheKey);
};

// Get travel statistics
export const getTravelStats = async (req, res) => {
  try {
    const stats = await Travel.aggregate([
      {
        $group: {
          _id: null,
          totalDistance: { $sum: '$distance' },
          totalFlights: { $sum: 1 },
          totalFlightHours: { $sum: '$estimatedFlightTime' },
          averageDistance: { $avg: '$distance' },
          originCities: { $addToSet: '$origin.iata' },
          destinationCities: { $addToSet: '$destination.iata' }
        }
      },
      {
        $project: {
          totalDistance: 1,
          totalFlights: 1,
          totalFlightHours: { $round: ['$totalFlightHours', 1] },
          averageDistance: { $round: ['$averageDistance', 2] },
          uniqueCitiesCount: {
            $size: {
              $setUnion: ['$originCities', '$destinationCities']
            }
          },
          allCities: {
            $concatArrays: ['$originCities', '$destinationCities']
          }
        }
      },
      {
        $project: {
          totalDistance: 1,
          totalFlights: 1,
          totalFlightHours: 1,
          averageDistance: 1,
          uniqueCitiesCount: 1,
          citiesVisits: {
            $map: {
              input: { $setUnion: ['$allCities'] },
              as: 'city',
              in: {
                city: '$$city',
                quantity: {
                  $size: {
                    $filter: {
                      input: '$allCities',
                      as: 'visit',
                      cond: { $eq: ['$$visit', '$$city'] }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]);

    res.json(stats[0] || { 
      totalDistance: 0, 
      totalFlights: 0,
      totalFlightHours: 0,
      averageDistance: 0,
      uniqueCitiesCount: 0,
      citiesVisits: []
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all travels
export const getTravels = async (req, res) => {
  try {
    const travels = await Travel.find().sort({ createdAt: -1 });
    res.json(travels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a travel
export const createTravel = async (req, res) => {
  try {
    const { isRoundTrip, ...travelData } = req.body;
    
    // Crear el viaje de ida
    const outboundTravel = new Travel({
      ...travelData,
      isRoundTrip: false
    });
    await outboundTravel.save();

    // Si es ida y vuelta, crear el viaje de vuelta
    if (isRoundTrip) {
      const returnTravel = new Travel({
        ...travelData,
        origin: travelData.destination,
        destination: travelData.origin,
        departureDate: travelData.returnDate,
        isRoundTrip: false
      });
      await returnTravel.save();
      res.status(201).json([outboundTravel, returnTravel]);
    } else {
      res.status(201).json(outboundTravel);
    }

    // Invalidar el caché para esta ruta
    invalidateCache(travelData.origin.iata, travelData.destination.iata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a travel
export const deleteTravel = async (req, res) => {
  try {
    await Travel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Travel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all travels
export const deleteAllTravels = async (req, res) => {
  try {
    await Travel.deleteMany({});
    res.json({ message: 'All travels deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get flight information
export const getFlightInfo = async (req, res) => {
  try {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
      return res.status(400).json({ error: 'Se requieren los códigos IATA de origen y destino' });
    }

    // Crear una clave única para el caché
    const cacheKey = `${origin}-${destination}`;
    const cachedData = flightCache.get(cacheKey);

    // Si hay datos en caché y no han expirado, devolverlos
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return res.json(cachedData.data);
    }

    // Obtener información del vuelo desde Aviationstack
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: "284836080d1151a92dc5d96e722783b9",
        dep_iata: origin.toUpperCase(),
        arr_iata: destination.toUpperCase(),
        limit: 1
      }
    }).catch(error => {
      console.error('Error de la API:', error.response?.data || error.message);
      throw new Error(`Error al consultar la API de Aviationstack: ${error.response?.data?.error?.message || error.message}`);
    });

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      throw new Error('No se encontraron vuelos para la ruta especificada');
    }

    const flight = response.data.data[0];

    // Calcular la duración del vuelo basada en los horarios programados
    const departureTime = new Date(flight.departure.scheduled);
    const arrivalTime = new Date(flight.arrival.scheduled);
    const durationMs = arrivalTime - departureTime;
    const durationHours = durationMs / (1000 * 60 * 60);

    // Estimar la distancia basada en la duración (asumiendo una velocidad promedio de 800 km/h)
    const distance = Math.round(durationHours * 800);

    const flightData = {
      origin: {
        iata: flight.departure.iata,
        name: flight.departure.airport,
        city: flight.departure.timezone.split('/')[1].replace('_', ' '),
        country: flight.departure.timezone.split('/')[0]
      },
      destination: {
        iata: flight.arrival.iata,
        name: flight.arrival.airport,
        city: flight.arrival.timezone.split('/')[1].replace('_', ' '),
        country: flight.arrival.timezone.split('/')[0]
      },
      flight: {
        airline: flight.airline.name,
        flightNumber: flight.flight.iata,
        status: flight.flight_status,
        scheduledDeparture: flight.departure.scheduled,
        scheduledArrival: flight.arrival.scheduled,
        duration: durationHours.toFixed(2)
      },
      distance,
      estimatedFlightTime: durationHours.toFixed(1)
    };

    // Almacenar en caché
    flightCache.set(cacheKey, {
      data: flightData,
      timestamp: Date.now()
    });

    res.json(flightData);
  } catch (error) {
    console.error('Error al obtener información del vuelo:', error);
    res.status(500).json({ error: 'Error al obtener información del vuelo' });
  }
};

// Controlador para subir imagen de un viaje
export const uploadTravelImage = async (req, res) => {
  try {
    const travelId = req.params.id;
    const imagePath = req.file ? req.file.path : null;

    if (!imagePath) {
      return res.status(400).json({ message: 'No se subió ninguna imagen' });
    }

    // Hacer push de la nueva imagen al array images
    const travel = await Travel.findByIdAndUpdate(
      travelId,
      { $push: { images: imagePath } },
      { new: true }
    );

    if (!travel) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    res.json(travel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar una imagen específica del array images de un viaje
export const deleteTravelImage = async (req, res) => {
  try {
    const travelId = req.params.id;
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ message: 'No se especificó la imagen a eliminar' });
    }
    const travel = await Travel.findByIdAndUpdate(
      travelId,
      { $pull: { images: image } },
      { new: true }
    );
    if (!travel) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }
    res.json(travel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};