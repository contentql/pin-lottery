import { CollectionConfig } from 'payload/types';
const Contact: CollectionConfig = {
  slug: 'contact',
  
  fields: [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'subject', type: 'text', label: 'Subject' },
    { name: 'message', type: 'textarea', label: 'Message' },
  ],
};

export default Contact;
