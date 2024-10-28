import prisma from '../../../utils/db';
import { parseCSV } from '../../../utils/fileParser';
import { contactSchema } from '../../../utils/validate';

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  try {
    const file = req.files.contacts;
    const contacts = await parseCSV(file);
    
    for (const contact of contacts) {
      await contactSchema.validate(contact);  // Validate each contact
      await prisma.contact.create({
        data: { ...contact, userId: req.user.id },
      });
    }

    res.status(200).json({ message: 'Batch processed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
