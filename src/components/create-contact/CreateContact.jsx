import React from "react";
import { contactService } from "../../services/contactServices";
import { useState } from "react";
import PageHeader from "../contact/PageHeader";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
  const navigate = useNavigate();
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    birthday: "",
    avatar: "",
    group: "",
    type: "",
    favorite: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postContactFormData = await contactService.createContact(
      contactFormData
    );
    console.log(postContactFormData);
    navigate("/");
  };

  return (
    <>
      <PageHeader
        title="Create New Contact"
        description="Fill in the details below to add a new contact. Provide the necessary information in the form below to create a new contact entry. Enter details such as name, email, phone number, and other relevant fields to ensure your contact list stays accurate and up to date"
        buttonLabel="< Back"
        onButtonClick={() => navigate("/")}
      />

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="flex items-center gap-4">
            <label htmlFor="name" className="w-32 text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="email" className="w-32 text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="phone" className="w-32 text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="company" className="w-32 text-gray-700">
              Company
            </label>
            <input
              id="company"
              type="text"
              name="company"
              placeholder="Company"
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="jobTitle" className="w-32 text-gray-700">
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="birthday" className="w-32 text-gray-700">
              Birthday
            </label>
            <input
              id="birthday"
              type="date"
              name="birthday"
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="avatar" className="w-32 text-gray-700">
              Avatar URL
            </label>
            <input
              id="avatar"
              type="url"
              name="avatar"
              placeholder="Avatar URL"
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="group" className="w-32 text-gray-700">
              Group
            </label>
            <select
              id="group"
              name="group"
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Group</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Work">Professional</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="type" className="w-32 text-gray-700">
              Type
            </label>
            <select
              id="type"
              name="type"
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Type</option>
              <option value="Personal">Personal</option>
              <option value="Professional">Work</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="favorite" className="w-32 text-gray-700">
              Favorite
            </label>
            <input
              id="favorite"
              type="checkbox"
              name="favorite"
              onChange={handleChange}
              className="w-4 h-4 accent-blue-600 border-gray-200 rounded focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                navigate("/");
              }}
              className="w-1/2 bg-slate-600 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition"
            >
              Discard
            </button>

            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateContact;
