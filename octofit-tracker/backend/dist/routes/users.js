"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    try {
        const users = await User_1.User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch users' });
    }
});
router.post('/', async (req, res) => {
    try {
        const user = await User_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create user' });
    }
});
exports.default = router;
