import Travel from '../models/Travel.js';

// Get travel statistics
const getTravelStats = async (req, res) => {
  try {
    const stats = await Travel.aggregate([
      {
        $group: {
          _id: null,
          totalDistance: { $sum: '$distance' },
          totalEmissions: { $sum: '$emissions' },
          averageDistance: { $avg: '$distance' },
          averageEmissions: { $avg: '$emissions' }
        }
      }
    ]);
    res.json(stats[0] || { totalDistance: 0, totalEmissions: 0, averageDistance: 0, averageEmissions: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTravels = async (req, res) => {
  try {
    const travels = await Travel.find().sort({ date: -1 });
    res.json(travels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTravel = async (req, res) => {
  try {
    const travel = new Travel(req.body);
    const savedTravel = await travel.save();
    res.status(201).json(savedTravel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTravel = async (req, res) => {
  try {
    const { id } = req.params;
    await Travel.findByIdAndDelete(id);
    res.json({ message: 'Travel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllTravels = async (req, res) => {
  try {
    await Travel.deleteMany({});
    res.json({ message: 'All travels deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFlightInfo = async (req, res) => {
  try {
    const { origin, destination } = req.query;
    
    // Aquí deberías implementar la lógica para obtener la información del vuelo
    // Por ahora, devolvemos datos de ejemplo
    const flightInfo = {
      distance: 10000, // en km
      estimatedFlightTime: 12, // en horas
      emissions: 2000, // en kg de CO2
      origin: {
        code: origin,
        name: 'Ezeiza International Airport',
        city: 'Buenos Aires',
        country: 'Argentina'
      },
      destination: {
        code: destination,
        name: 'Barcelona-El Prat Airport',
        city: 'Barcelona',
        country: 'Spain'
      }
    };
    
    res.json(flightInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getTravels,
  createTravel,
  deleteTravel,
  deleteAllTravels,
  getTravelStats,
  getFlightInfo
}; 