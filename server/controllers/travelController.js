import axios from 'axios';
import Travel from '../models/Travel.js';

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
    const travel = new Travel(req.body);
    await travel.save();
    res.status(201).json(travel);
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

    // Obtener información del vuelo desde Aviationstack
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
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

    res.json({
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
    });
  } catch (error) {
    console.error('Error al obtener información del vuelo:', error);
    res.status(500).json({ error: 'Error al obtener información del vuelo' });
  }
};