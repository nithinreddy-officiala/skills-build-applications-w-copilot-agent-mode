"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Workout_1 = require("../models/Workout");
// Seed the octofit_db database with test data
async function seed() {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
    console.log('Connecting to MongoDB...');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        User_1.User.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Activity_1.Activity.deleteMany({}),
        LeaderboardEntry_1.LeaderboardEntry.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    const users = await User_1.User.insertMany([
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
    await Team_1.Team.insertMany([
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
    await Activity_1.Activity.insertMany([
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
    await LeaderboardEntry_1.LeaderboardEntry.insertMany([
        { username: 'atlas', points: 1250, streak: 7, rank: 1 },
        { username: 'maya', points: 1180, streak: 4, rank: 2 },
        { username: 'niko', points: 1040, streak: 3, rank: 3 },
    ]);
    await Workout_1.Workout.insertMany([
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
    await mongoose_1.default.disconnect();
}
seed().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
