import { useEffect, useState } from "react";
import { contactService } from "../../services/contactServices";
import ContactCard from "../contact/ContactCard";
import Loading from "../../common/UI/Loading";
import PageHeader from "../contact/PageHeader";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

const ContactList = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [filteredContacts, setFilteredContacts] = useState(allContacts);
  const [query, setQuery] = useState("");

  const fetchAllContacts = async () => {
    setLoading(true);
    const response = await contactService.getAllContacts();
    setAllContacts(response.data);
    setFilteredContacts(response.data);
    setLoading(false);
    return response.data;
  };

  useEffect(() => {
    fetchAllContacts();
  }, []);

  const handleDelete = async (contactId) => {
    const deleteContact = await contactService.deleteContact(contactId);
    console.log(deleteContact);
    fetchAllContacts();
  };

  const processedData = allContacts.map((contact) => {
    const searchText = Object.values(contact)
      .map((item) => String(item))
      .join(" ")
      .toLowerCase();
    return { ...contact, _searchText: searchText };
  });

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    const normalized = newQuery.trim().toLowerCase();
    if (normalized === "") {
      setFilteredContacts(allContacts);
      return;
    }

    const filterContact = processedData.filter((contact) =>
      contact._searchText.includes(normalized)
    );

    setFilteredContacts(filterContact);
  };

  const clearSearch = () => {
    setQuery("");
    setFilteredContacts(allContacts);
  };

  return (
    <>
      <PageHeader
        title="Contacts List"
        description="Easily manage, browse, and organize all your saved contacts in one place. Quickly access essential details, update information, and maintain your network efficiently with a clean and intuitive interface designed for better contact management."
        buttonLabel="+ Add Contact"
        onButtonClick={() => navigate("/create")}
      />

      <section className="px-4 pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>

            <input
              type="text"
              id="search"
              value={query}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Search contacts by name, email, company…"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {loading ? (
        <Loading message="Fetching contacts..." />
      ) : (
        <section className="min-h-screen flex items-start justify-center">
          <div className="w-full max-w-6xl mx-auto">
            {filteredContacts.length === 0 ? (
              // CHANGED: no contacts matched text
              <p className="text-center text-gray-500 text-lg mt-10">
                No contacts found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {filteredContacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    handleDelete={handleDelete}
                    className="w-full max-w-sm"
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ContactList;
