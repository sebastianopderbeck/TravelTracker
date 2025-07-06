import express from 'express';
import { getTravels, createTravel, deleteTravel, deleteAllTravels, getTravelStats, getFlightInfo, uploadTravelImage, deleteTravelImage } from '../controllers/travelController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/travels/stats', getTravelStats);
router.get('/travels', getTravels);
router.post('/travels', createTravel);
router.delete('/travels/:id', deleteTravel);
router.delete('/travels', deleteAllTravels);
router.get('/flight-info', getFlightInfo);
router.post('/:id/image', upload.single('image'), uploadTravelImage);
router.delete('/:id/image', deleteTravelImage);

export default router; 