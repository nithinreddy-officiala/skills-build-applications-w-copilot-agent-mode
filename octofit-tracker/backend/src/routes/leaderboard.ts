import express from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard' });
  }
});

export default router;
