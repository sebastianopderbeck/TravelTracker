import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/traveltracker')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Modelo de Viaje
const travelSchema = new mongoose.Schema({
  origin: {
    name: String,
    iata: String
  },
  destination: {
    name: String,
    iata: String
  },
  distance: Number,
  estimatedFlightTime: Number
});

const Travel = mongoose.model('Travel', travelSchema);

// Endpoint para obtener información de vuelos
app.get('/api/flight-info', async (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: 'Origin and destination are required' });
  }

  if (!process.env.API_NINJAS_KEY) {
    return res.status(500).json({ error: 'API key not configured. Please set API_NINJAS_KEY in .env file' });
  }

  try {
    // Obtener información del aeropuerto de origen
    const originResponse = await axios.get(`http://api.aviationstack.com/v1/airports`, {
      params: {
        access_key: process.env.API_NINJAS_KEY,
        iata_code: origin
      }
    });

    if (!originResponse.data.data || originResponse.data.data.length === 0) {
      return res.status(404).json({ error: `Origin airport ${origin} not found` });
    }

    const originInfo = originResponse.data.data[0];

    // Obtener información del aeropuerto de destino
    const destResponse = await axios.get(`http://api.aviationstack.com/v1/airports`, {
      params: {
        access_key: process.env.API_NINJAS_KEY,
        iata_code: destination
      }
    });

    if (!destResponse.data.data || destResponse.data.data.length === 0) {
      return res.status(404).json({ error: `Destination airport ${destination} not found` });
    }

    const destInfo = destResponse.data.data[0];

    // Cálculo de distancia usando la fórmula de Haversine
    const R = 6371; // Radio de la Tierra en km
    const lat1 = originInfo.latitude * Math.PI / 180;
    const lat2 = destInfo.latitude * Math.PI / 180;
    const deltaLat = (destInfo.latitude - originInfo.latitude) * Math.PI / 180;
    const deltaLon = (destInfo.longitude - originInfo.longitude) * Math.PI / 180;

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    // Estimación del tiempo de vuelo (aproximadamente 800 km/h)
    const estimatedFlightTime = Math.round((distance / 800) * 10) / 10;

    res.json({
      origin: {
        name: originInfo.airport_name,
        iata: originInfo.iata_code
      },
      destination: {
        name: destInfo.airport_name,
        iata: destInfo.iata_code
      },
      distance: Math.round(distance),
      estimatedFlightTime
    });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      return res.status(500).json({ error: 'Invalid API key. Please check your API_NINJAS_KEY in .env file' });
    }
    res.status(500).json({ error: 'Error fetching flight information', details: error.message });
  }
});

// Endpoint para obtener todos los viajes
app.get('/api/travels', async (req, res) => {
  try {
    const travels = await Travel.find().sort({ createdAt: -1 });
    res.json(travels);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching travels' });
  }
});

// Endpoint para agregar un viaje
app.post('/api/travels', async (req, res) => {
  try {
    const travel = new Travel(req.body);
    await travel.save();
    res.status(201).json(travel);
  } catch (error) {
    res.status(500).json({ error: 'Error saving travel' });
  }
});

// Endpoint para eliminar un viaje específico
app.delete('/api/travels/:id', async (req, res) => {
  try {
    const travel = await Travel.findByIdAndDelete(req.params.id);
    if (!travel) {
      return res.status(404).json({ error: 'Travel not found' });
    }
    res.json({ message: 'Travel deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting travel' });
  }
});

// Endpoint para eliminar todos los viajes
app.delete('/api/travels', async (req, res) => {
  try {
    await Travel.deleteMany({});
    res.json({ message: 'All travels deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting all travels' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 