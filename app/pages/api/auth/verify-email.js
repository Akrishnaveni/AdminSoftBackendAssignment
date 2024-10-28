import prisma from '../../../utils/db';

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { token } = req.body;

  const user = await prisma.user.findUnique({ where: { verificationToken: token } });
  if (!user) return res.status(400).json({ error: 'Invalid verification token.' });

  await prisma.user.update({
    where: { id: user.id },
    data: { verified: true, verificationToken: null },
  });

  res.status(200).json({ message: 'Email verified successfully.' });
};
