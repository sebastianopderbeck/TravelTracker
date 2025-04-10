import express from 'express';
import { getTravels, createTravel, deleteTravel, deleteAllTravels, getTravelStats, getFlightInfo } from '../controllers/travelController.js';

const router = express.Router();

router.get('/travels/stats', getTravelStats);
router.get('/travels', getTravels);
router.post('/travels', createTravel);
router.delete('/travels/:id', deleteTravel);
router.delete('/travels', deleteAllTravels);
router.get('/flight-info', getFlightInfo);

export default router; 