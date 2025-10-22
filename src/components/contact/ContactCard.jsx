import { FiEye, FiEdit2, FiTrash2, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact, handleDelete }) => {
  const navigate = useNavigate();
  const {
    id = "",
    name = "",
    jobTitle = "",
    company = "",
    avatar = "",
    phone = "",
    email = "",
    favorite = false,
  } = contact;

  return (
    <article
      className="w-full max-w-sm bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-150"
      role="group"
    >
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={"No Image"}
          className="h-17 w-17 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {name}
            </h3>
            {favorite && (
              <span className="ml-1 mt-0.5 text-amber-500">
                <FiStar />
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 truncate">{jobTitle}</p>

          <div className="mt-2 text-xs text-gray-600 flex gap-2 items-center">
            {company}
          </div>
        </div>

        <div className="flex flex-col ml-2">
          <button
            className="p-2 rounded-md hover:bg-blue-50 active:scale-95 transition cursor-pointer "
            type="button"
            onClick={() => navigate(`view/${id}`)}
          >
            <FiEye className="text-blue-600" />
          </button>

          <button
            className="p-2 rounded-md hover:bg-slate-100 active:scale-95 transition cursor-pointer "
            type="button"
            onClick={() => navigate(`update/${id}`)}
          >
            <FiEdit2 className="text-slate-600" />
          </button>

          <button
            className="p-2 rounded-md hover:bg-red-50 active:scale-95 transition cursor-pointer "
            type="button"
            onClick={() => {
              handleDelete(id);
            }}
          >
            <FiTrash2 className="text-red-600" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-around text-xs text-gray-500">
        <div className="truncate">{phone}</div>
        <div className="truncate">{email}</div>
      </div>
    </article>
  );
};

export default ContactCard;
