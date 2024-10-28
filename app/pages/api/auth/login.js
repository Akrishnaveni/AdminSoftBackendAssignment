import bcrypt from 'bcryptjs';
import prisma from '../../../utils/db';
import { generateToken } from '../../../utils/jwt';

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.verified) return res.status(401).json({ error: 'User not verified or not found.' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials.' });

  const token = generateToken(user.id);
  res.status(200).json({ token });
};
