import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => await bcrypt.hash(password, 10);
export const verifyPassword = async (password, hash) => await bcrypt.compare(password, hash);
export const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);