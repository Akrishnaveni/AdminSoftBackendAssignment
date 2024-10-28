import prisma from '../../../utils/db';

export default async (req, res) => {
  const { userId } = req; // Get userId from JWT middleware
  const { id } = req.query;

  if (req.method === 'PUT') {
    const contact = await prisma.contact.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(contact);
  } else if (req.method === 'DELETE') {
    await prisma.contact.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
    res.status(204).send();
  }
};
