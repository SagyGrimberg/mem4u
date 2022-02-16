import {createAd, deleteAd, getAdById, getAds, updateAd} from "../controllers/adController.js";
import express from "express";
import {isAdmin, protect} from "../middleware/authMiddleware.js";

const router = express.Router()
router
    .route('/:id').get(getAdById)
    .delete(protect, isAdmin, deleteAd)
    .put(protect, isAdmin, updateAd)
router.route('/').get(protect, isAdmin, getAds).post(protect, isAdmin, createAd)
export default router
