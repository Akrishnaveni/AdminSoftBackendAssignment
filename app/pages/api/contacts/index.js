import prisma from '../../../utils/db';
import { contactSchema } from '../../../utils/validate';

export default async (req, res) => {

    await auth(req, res); // Apply the middleware


  const userId = req.user.id; // Assuming middleware sets req.user from token
  
  switch (req.method) {
    case 'GET':
      const contacts = await prisma.contact.findMany({ where: { userId, deletedAt: null } });
      res.status(200).json(contacts);
      break;

    case 'POST':
      try {
        const contactData = await contactSchema.validate(req.body);
        const newContact = await prisma.contact.create({
          data: { ...contactData, userId },
        });
        res.status(201).json(newContact);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
      break;

    case 'PUT':
      const { id, ...updateData } = req.body;
      const updatedContact = await prisma.contact.update({
        where: { id: parseInt(id) },
        data: { ...updateData },
      });
      res.status(200).json(updatedContact);
      break;

    case 'DELETE':
      const { contactId } = req.query;
      await prisma.contact.update({
        where: { id: parseInt(contactId) },
        data: { deletedAt: new Date() },
      });
      res.status(204).end();
      break;

    default:
      res.status(405).send('Method Not Allowed');
  }
};
