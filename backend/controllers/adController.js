import asyncHandler from "express-async-handler";
import Ad from "../models/adModel.js";

export const getAds = asyncHandler(async (req, res) => {
    const ads = await Ad.find({showAd: true})
    res.json(ads);
})
export const createAd = asyncHandler(async (req, res) => {
    const ad = new Ad({
        name: 'מודעה חדשה',
        image: '/images/sample.jpg',
    })
    const createdProduct = await ad.save()
    res.status(201).json(createdProduct)
})
export const updateAd = asyncHandler(async (req, res) => {
    const {
        name,
        image,
        showAd
    } = req.body

    const ad = await Ad.findById(req.params.id)

    if (ad) {
        ad.name = name
        ad.image = image
        ad.showAd = showAd

        const updateAd = await ad.save()

        res.json(updateAd)
    } else {
        res.status(404)
        throw new Error('המודעה לא נמצא')
    }
})
export const deleteAd = asyncHandler(async (req, res) => {
    const ad = await Ad.findById(req.params.id)

    if (ad) {
        await ad.remove()
        res.json('המודעה הוסר')
    } else {
        res.status(404)
        throw new Error('המודעה לא נמצא')
    }
})
export const getAdById = asyncHandler(async (req, res) => {
    const ad = await Ad.findById(req.params.id)

    if (ad) {
        res.json(ad)
    } else {
        res.status(404)
        throw new Error('המודעה לא נמצא')
    }
})
