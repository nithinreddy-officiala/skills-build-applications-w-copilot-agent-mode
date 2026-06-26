"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Workout_1 = require("../models/Workout");
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    try {
        const workouts = await Workout_1.Workout.find();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch workouts' });
    }
});
router.post('/', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create workout' });
    }
});
exports.default = router;
