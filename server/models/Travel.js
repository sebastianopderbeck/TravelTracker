import mongoose from 'mongoose';

const travelSchema = new mongoose.Schema({
  origin: {
    name: String,
    iata: String,
    country: String
  },
  destination: {
    name: String,
    iata: String,
    country: String
  },
  distance: Number,
  estimatedFlightTime: Number,
  departureDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: false
  },
  isRoundTrip: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Travel', travelSchema); 