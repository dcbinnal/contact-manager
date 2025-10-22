import axios from "axios";

export class contactService {
  static SERVER_URL = "http://localhost:7000";

  static getAllContacts() {
    const contactsURL = `${this.SERVER_URL}/contacts`;
    return axios.get(contactsURL);
  }

  static createContact(contactInfo) {
    const contactsURL = `${this.SERVER_URL}/contacts`;
    return axios.post(contactsURL, contactInfo);
  }

  static getContact(contactId) {
    const contactsURL = `${this.SERVER_URL}/contacts/${contactId}`;
    return axios.get(contactsURL);
  }

  static updateContact(contactInfo, contactId){
    const contactsURL = `${this.SERVER_URL}/contacts/${contactId}`
    return axios.put(contactsURL,contactInfo)
  }

  static deleteContact(contactId){
    const contactsURL = `${this.SERVER_URL}/contacts/${contactId}`
    return axios.delete(contactsURL)
  }
}
