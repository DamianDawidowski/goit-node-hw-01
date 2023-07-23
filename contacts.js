
const fs = require("fs").promises;
const path = require("path");
const nanoid = require("nanoid");
require("colors");

const contactsPath = path.join(__dirname, './db/contacts.json');
const newContactsPath = path.join(__dirname, './db/newContacts.json');

const fetchContacts = async() => {
const contacts = await fs.readFile(contactsPath);
 return JSON.parse(contacts)
} 
 
  const listContacts = async() => { 
  const contacts = await fetchContacts();
  console.table(contacts);
  return contacts; 
  }
  
  const getContactById = async(contactId) => {
  const contacts = await fetchContacts();
  const foundContact = contacts.find((contact)=>contact.id === contactId);
  console.log(foundContact); 
  return
  }
  
  const removeContact = async(contactId) => {
 try{  
 const contacts = await fetchContacts();
 const updatedContacts = contacts.filter(contact=>contact.id !== contactId);
 fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
 console.log(`Contact with id"${contactId}" removed succesfully. New list of contacts is`);
 console.table(updatedContacts);
 return;
 }
 catch (error) {
 console.error(error);
 }
 }
   
 const addContact = async(name, email, phone) => {
 try{
 const contacts = await fetchContacts();
 const newContact = { id: nanoid.urlAlphabet, name, email, phone };
 const updatedContacts =  [...contacts, newContact];
 await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
 console.log(`Contact "${name}" added succesfully. New list of contacts is`);
 console.table(updatedContacts);
 return;
  }
  catch(error) {
 console.error(error)
  }
}

  module.exports = {
    getContactById,
    listContacts,
    removeContact,
    addContact
  };