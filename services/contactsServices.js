import path from "path";
import fs from "fs/promises";

const contactPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactPath);

    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((cont) => cont.id === contactId);

    return contact || null;
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const removeContact = contacts.find((contact) => contact.id === contactId);

    if (!removeContact) {
      return null;
    }

    const newContacts = contacts.filter((c) => c.id !== contactId);

    await fs.writeFile(contactPath, JSON.stringify(newContacts, null, 2));
    return removeContact;
  } catch (err) {
    console.log(err);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now().toString(), name, email, phone };

    contacts.push(newContact);

    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (err) {
    console.log(err);
  }
}

async function updateContact(id, data) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }

    contacts[index] = { ...contacts[index], ...data };

    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    console.log(error);
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
