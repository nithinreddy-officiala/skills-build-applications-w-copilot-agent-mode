import express from 'express';
import { Team } from '../models/Team';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch teams' });
  }
});

router.post('/', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create team' });
  }
});

export default router;
