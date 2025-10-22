import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:7000";

console.log("API Base URL:", BASE_URL);

export class contactService {
  static getAllContacts() {
    return axios.get(`${BASE_URL}/contacts`);
  }

  static createContact(contactInfo) {
    return axios.post(`${BASE_URL}/contacts`, contactInfo);
  }

  static getContact(contactId) {
    return axios.get(`${BASE_URL}/contacts/${contactId}`);
  }

  static updateContact(contactInfo, contactId) {
    return axios.put(`${BASE_URL}/contacts/${contactId}`, contactInfo);
  }

  static deleteContact(contactId) {
    return axios.delete(`${BASE_URL}/contacts/${contactId}`);
  }
}
