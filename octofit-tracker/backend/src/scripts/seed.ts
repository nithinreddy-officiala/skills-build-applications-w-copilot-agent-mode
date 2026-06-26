import mongoose from 'mongoose';
import { connectToDatabase } from '../database';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Workout } from '../models/Workout';

// Seed the octofit_db database with test data
async function seed() {
  console.log('Connecting to MongoDB...');
  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      username: 'atlas',
      email: 'atlas@example.com',
      password: 'password123',
    },
    {
      username: 'maya',
      email: 'maya@example.com',
      password: 'password123',
    },
    {
      username: 'niko',
      email: 'niko@example.com',
      password: 'password123',
    },
  ]);

  await Team.insertMany([
    {
      name: 'Phoenix Squad',
      sport: 'Running',
      members: users.map((user) => user.username),
      city: 'Seattle',
    },
    {
      name: 'Blue Wave',
      sport: 'Cycling',
      members: ['maya', 'niko'],
      city: 'Portland',
    },
  ]);

  await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'run',
      durationMinutes: 35,
      distanceKm: 5.2,
      date: new Date('2026-06-20'),
    },
    {
      userId: users[1]._id.toString(),
      type: 'cycle',
      durationMinutes: 45,
      distanceKm: 18.4,
      date: new Date('2026-06-21'),
    },
    {
      userId: users[2]._id.toString(),
      type: 'strength',
      durationMinutes: 40,
      distanceKm: 0,
      date: new Date('2026-06-22'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    { username: 'atlas', points: 1250, streak: 7, rank: 1 },
    { username: 'maya', points: 1180, streak: 4, rank: 2 },
    { username: 'niko', points: 1040, streak: 3, rank: 3 },
  ]);

  await Workout.insertMany([
    {
      title: 'HIIT Cardio',
      category: 'Cardio',
      durationMinutes: 20,
      difficulty: 'Intermediate',
      equipment: ['mat'],
    },
    {
      title: 'Strength Builder',
      category: 'Strength',
      durationMinutes: 30,
      difficulty: 'Beginner',
      equipment: ['dumbbells'],
    },
  ]);

  console.log('Seed data inserted successfully');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
