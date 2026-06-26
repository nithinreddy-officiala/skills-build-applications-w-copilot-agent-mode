import express from 'express';
import { User } from '../models/User';

const router = express.Router();

router.get('/', async (_req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
