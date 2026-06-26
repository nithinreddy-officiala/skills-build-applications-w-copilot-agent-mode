"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Activity_1 = require("../models/Activity");
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    try {
        const activities = await Activity_1.Activity.find();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch activities' });
    }
});
router.post('/', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create activity' });
    }
});
exports.default = router;
