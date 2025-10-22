import React, { useEffect } from "react";
import { contactService } from "../../services/contactServices";
import { useState } from "react";
import PageHeader from "../contact/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../common/UI/Loading";

const ViewContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [contactData, setContactData] = useState({});

  const getContact = async () => {
    try {
      setLoading(true);
      const response = await contactService.getContact(contactId);
      const getData = response.data;
      // Normalize favorite to boolean to ensure consistent rendering
      setContactData({ ...getData, favorite: !!getData.favorite });
      setLoading(false);
      console.log("View data:", getData);
    } catch (error) {
      console.log("Error:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <>
      <PageHeader
        title="Contact Details"
        description="View the contact details below. Use the Edit button to modify this contact or go back to the contact list."
        buttonLabel="< Back"
        onButtonClick={() => navigate("/")}
      />

      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-32 text-gray-700 font-medium">
              Contact Picture
            </div>
            <div className="flex-1">
              {contactData.avatar ? (
                <img
                  src={contactData.avatar}
                  alt={contactData.name ?? "Image not available"}
                  className="w-20 h-20 object-cover rounded-full border"
                />
              ) : (
                <div className="text-gray-500">No image</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-32 text-gray-700 font-medium">Full Name</div>
            <div className="flex-1 text-gray-600">
              {contactData.name ?? "-"}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-32 text-gray-700 font-medium">Email Address</div>
            <div className="flex-1 text-gray-600">
              {contactData.email ?? "-"}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-32 text-gray-700 font-medium">Phone Number</div>
            <div className="flex-1 text-gray-600">
              {contactData.phone ?? "-"}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-32 text-gray-700 font-medium">Company</div>
            <div className="flex-1 text-gray-600">
              {contactData.company ?? "-"}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-32 text-gray-700 font-medium">Job Title</div>
            <div className="flex-1 text-gray-600">
              {contactData.jobTitle ?? "-"}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-32 text-gray-700 font-medium">Birthday</div>
            <div className="flex-1 text-gray-600">
              {contactData.birthday ?? "-"}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-32 text-gray-700 font-medium">Group</div>
            <div className="flex-1 text-gray-600">
              {contactData.group ?? "-"}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-32 text-gray-700 font-medium">Type</div>
            <div className="flex-1 text-gray-600">
              {contactData.type ?? "-"}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-32 text-gray-700 font-medium">Favorite</div>
            <div className="flex-1 text-gray-600">
              {contactData.favorite ? "Yes" : "No"}
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-1/2 bg-slate-600 text-white py-2 rounded-lg font-small hover:bg-slate-700 transition"
            >
              Back
            </button>

            <button
              type="button"
              onClick={() => navigate(`/update/${contactId}`)}
              className="w-1/2 bg-blue-600 text-white py-2 rounded-lg font-small hover:bg-blue-700 transition"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewContact;
