"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Team_1 = require("../models/Team");
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    try {
        const teams = await Team_1.Team.find();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch teams' });
    }
});
router.post('/', async (req, res) => {
    try {
        const team = await Team_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create team' });
    }
});
exports.default = router;
