const Coupan = require('../models/couponModel');
const asyncHandler = require('express-async-handler');  
const validateMongoDbId = require("../utils/validateMongodbid");


const createCoupan = asyncHandler(async (req, res) => {
    try {
        const newCoupan = await Coupan.create(req.body);
        res.json(newCoupan);
    } catch (error) {
        throw new Error(error);
    }
});
const updateCoupan = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedCoupan = await Coupan.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedCoupan);
    } catch (error) {
        throw new Error(error);
    }
});
const getAllCoupans = asyncHandler(async (req, res) => {
    try {
        const allCoupans = await Coupan.find();
        res.json(allCoupans);
    } catch (error) {
        throw new Error(error);
    }
});

const getCoupan = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findCoupan = await Coupan.findById(id);
        res.json(findCoupan);
    } catch (error) {
        throw new Error(error);
    }
}
);
const deleteCoupan = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedCoupan = await Coupan.findByIdAndDelete(id);
        res.json(deletedCoupan);
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = {
    createCoupan,
    updateCoupan,
    getAllCoupans,
    getCoupan,
    deleteCoupan
};