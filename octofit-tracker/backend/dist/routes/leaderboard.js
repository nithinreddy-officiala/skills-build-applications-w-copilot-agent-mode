"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await LeaderboardEntry_1.LeaderboardEntry.find().sort({ rank: 1 });
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch leaderboard' });
    }
});
exports.default = router;
