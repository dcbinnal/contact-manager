import React, { useEffect } from "react";
import { contactService } from "../../services/contactServices";
import { useState } from "react";
import PageHeader from "../contact/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../common/UI/Loading";

const UpdateContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  console.log("Contact Id : ", contactId);

  const [updatedFormData, setUpdatedFormData] = useState({});

  const getContact = async () => {
    try {
      setLoading(true);
      const response = await contactService.getContact(contactId);
      const getData = response.data;
      // Normalize favorite to boolean to ensure checkbox works
      setUpdatedFormData({
        ...getData,
        favorite: !!getData.favorite,
        group: getData.group ?? "",
        type: getData.type ?? "",
      });
      setLoading(false);
      console.log("Update data:", getData);
    } catch (error) {
      console.log("Error:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedFormData({
      ...updatedFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const putContactFormData = await contactService.updateContact(
        updatedFormData,
        contactId
      );
      console.log(putContactFormData);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log("Error:", error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Update Contact"
        description="Update the details below to modify an existing contact. Make the necessary changes in the form to keep your contact information current. Edit fields such as name, email, phone number, and other relevant details to ensure your contact list remains accurate and up to date."
        buttonLabel="< Back"
        onButtonClick={() => navigate("/")}
      />
      {loading ? (
        <Loading />
      ) : (
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
                value={updatedFormData.name ?? ""}
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
                value={updatedFormData.email ?? ""}
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
                value={updatedFormData.phone ?? ""}
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
                value={updatedFormData.company ?? ""}
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
                value={updatedFormData.jobTitle ?? ""}
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
                value={updatedFormData.birthday ?? ""}
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
                value={updatedFormData.avatar ?? ""}
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
                value={updatedFormData.group ?? ""}
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
                value={updatedFormData.type ?? ""}
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
                checked={!!updatedFormData.favorite}
                onChange={handleChange}
                className="w-4 h-4 accent-emerald-600 border-gray-200 rounded focus:ring-emerald-400"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                }}
                className="w-1/2 bg-slate-600 text-white py-2 rounded-lg font-small hover:bg-slate-700 transition"
              >
                Discard
              </button>

              <button
                type="submit"
                className="w-1/2 bg-blue-600 text-white py-2 rounded-lg font-small hover:bg-blue-700 transition"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateContact;
