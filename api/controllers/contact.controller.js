import Contact from '../models/contact.model.js';

// Create a new contact message
export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all contact messages (admin only)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update contact message status (admin only)
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    contact.status = status;
    await contact.save();

    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete contact message (admin only)
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    await contact.deleteOne();
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 