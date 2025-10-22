import { NavLink } from "react-router-dom";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-200 hover:bg-slate-900"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <nav>
      <ul className="flex gap-2 items-center p-0 m-0 list-none">
        <li>
          <NavItem to="/">My Contacts</NavItem>
        </li>
        <li>
          <NavItem to="/create">New Contact</NavItem>
        </li>
      </ul>
    </nav>
  );
}
