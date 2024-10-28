import bcrypt from 'bcryptjs';
import prisma from '../../../utils/db';
import { generateToken } from '../../../utils/jwt';

export default async (req, res) => {
  const { email, token, newPassword } = req.body;

  if (req.method === 'POST') {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'User not found.' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword, resetToken: null },
    });

    res.status(200).json({ message: 'Password reset successful.' });
  }
};
