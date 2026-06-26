import mongoose, { Schema } from 'mongoose';

const leaderboardEntrySchema = new Schema({
  username: { type: String, required: true, unique: true },
  points: { type: Number, required: true },
  streak: { type: Number, default: 0 },
  rank: { type: Number, required: true },
});

export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
