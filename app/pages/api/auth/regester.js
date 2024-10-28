import bcrypt from 'bcryptjs';
import prisma from '../../../utils/db';
import { generateToken } from '../../../utils/jwt';
import { userSchema } from '../../../utils/validate';

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  try {
    const { email, password } = await userSchema.validate(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        verificationToken: generateToken(email),
        verified: false,
      },
    });
    
    // Send verification email here (email service setup required)
    res.status(201).json({ message: 'User created. Verify your email.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
