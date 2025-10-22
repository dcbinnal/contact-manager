# Contact Manager — Documentation

---

## Contents

1. Project overview
2. Features
3. Tech stack
4. Project structure (tree)
5. Setup & installation
6. Running the project (locally)
7. Backend: json-server and data files
8. Frontend: key components & routes
9. API reference (endpoints)
10. `contactService`
11. Demo / verification steps
12. Further improvements & roadmap

---

## 1. Project overview

Contact Manager is a lightweight CRUD web application for managing personal contacts. It provides features to create, read, update, delete, and search contacts. The frontend is built with React + Vite and Tailwind CSS. The backend uses `json-server`.

---

## 2. Features

- Create, read, update, delete contacts
- Search and filter contacts across fields (name, email, company, designation, etc.)
- Grouping capability (group field in contact model)
- Photo URL support for contact pictures
- Responsive UI with accessible controls
- Development-ready scripts for running frontend and backend concurrently

---

## 3. Tech stack

- Frontend: React (Vite), Tailwind CSS, Lucide React (icons), Axios
- Routing: React Router
- Backend: `json-server`
- Utilities: concurrently (to run both client + server in dev)

Dependencies in `package.json`:

- `vite`
- `react`, `react-dom`
- `axios`
- `tailwindcss`, `@tailwindcss/vite`
- `json-server`
- `lucide-react`
- `concurrently`

Key scripts in `package.json`:

- `dev` — start Vite dev server
- `build` — build frontend assets
- `preview` — preview built frontend
- `start:server` — start the backend JSON server (`cd backend/server && npm start`)
- `dev:all` — run backend + frontend concurrently (`concurrently -n SERVER,CLIENT -c yellow,cyan "npm run start:server" "npm run dev"`)

---

## 4. Project structure (tree)

```
├── backend
│   └── server
│       ├── contact copy.json
│       ├── contact.json
│       └── package.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── public
├── README.md
├── src
│   ├── App.jsx
│   ├── assets
│   ├── common
│   │   └── UI
│   │       ├── Loading.jsx
│   │       └── Navbar.jsx
│   ├── components
│   │   ├── contact
│   │   │   ├── ContactCard.jsx
│   │   │   └── PageHeader.jsx
│   │   ├── contact-list
│   │   │   └── ContactList.jsx
│   │   ├── create-contact
│   │   │   └── CreateContact.jsx
│   │   ├── update-contact
│   │   │   └── UpdateContact.jsx
│   │   └── view-contact
│   │       └── ViewContact.jsx
│   ├── context
│   ├── index.css
│   ├── layout
│   │   └── MainLayout.jsx
│   ├── main.jsx
│   ├── routes
│   │   └── router.jsx
│   ├── services
│   │   └── contactServices.js
│   └── utils
│       └── helper.js
└── vite.config.js
```

---

## 5. Setup & installation (step-by-step)

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd contact-manager
   ```

2. Install root (project-wide) dependencies:

   ```bash
   npm install
   ```

3. Install backend server dependencies (if backend/server has its own `package.json`):

   ```bash
   cd backend/server
   npm install
   cd ../../
   ```

4. Tailwind CSS setup: Tailwind files and config are included; ensure `index.css` imports Tailwind directives:

   ```css
   @import "tailwindcss";
   ```

5. Verify that json-server data files exist at `backend/server/contact.json` (or `contact copy.json`) and that `backend/server/package.json` provides a start script to run `json-server`.

---

## 6. Running the project (local)

- Start frontend only:

  ```bash
  npm run dev
  ```

- Start backend only:

  ```bash
  npm run start:server
  # This runs: cd backend/server && npm start
  ```

- Start both frontend and backend concurrently:

  ```bash
  npm run dev:all
  ```

When running `dev:all`, the concurrently command runs the backend first and the client side by side. Default backend URL is `http://localhost:7000` as used in the client service.

---

## 7. Backend: json-server and data files

The backend uses `json-server` to serve a simple REST API from a JSON file.

Typical backend folder layout:

```
backend/server/
├── contact.json           # primary contacts data
├── contact copy.json      # (optional) backup or sample data
├── package.json           # should contain a start script for json-server
```

Example `backend/server/package.json` start script:

```json
{
  "scripts": {
    "start": "json-server --watch contact.json --port 7000 --delay 300"
  }
}
```

Here’s the refined section with your **json-server endpoints** and the **frontend routes** clearly documented together:

---

## 8. API reference (endpoints & routes)

### Backend — json-server endpoints

Base URL:

```
http://localhost:7000
```

json-server exposes the following REST endpoints by default:

- `GET /contacts` — list all contacts
- `GET /contacts/:id` — fetch a single contact by ID
- `POST /contacts` — create a new contact
- `PUT /contacts/:id` — update an existing contact (replace)
- `PATCH /contacts/:id` — update an existing contact (partial)
- `DELETE /contacts/:id` — remove a contact

Ensure `contact.json` is valid JSON and contains a `contacts` array. Example:

```json
{
  "contacts": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com",
      "contact": "+919000000001",
      "photoUrl": "https://example.com/photo.jpg",
      "designation": "Engineer",
      "company": "Example Inc",
      "group": "Friends",
      "favorite": false
    }
  ]
}
```

---

### Frontend — React Router routes

```jsx
{ index: true, element: <ContactList /> },
{ path: "/create", element: <CreateContact /> },
{ path: "/update/:contactId", element: <UpdateContact /> },
{ path: "/view/:contactId", element: <ViewContact /> },
{ path: "*", element: <h2>404 — Page Not Found</h2> },
```

- `/` → contact list view
- `/create` → add a new contact
- `/update/:contactId` → edit an existing contact
- `/view/:contactId` → view details of a contact
- fallback (`*`) → 404 page not found

---

## 9. Frontend: key components & routes

Key files:

- `src/main.jsx` — React entry point, router provider mounting
- `src/App.jsx` — application shell and route configuration
- `src/routes/router.jsx` — React Router route definitions
- `src/layout/MainLayout.jsx` — shared layout and navbar
- `src/components/contact/PageHeader.jsx` — header + action button component
- `src/components/contact-list/ContactList.jsx` — contact listing, search UI, filtering logic
- `src/components/contact/ContactCard.jsx` — contact card display (used in lists)
- `src/components/create-contact/CreateContact.jsx` — form to create contact
- `src/components/update-contact/UpdateContact.jsx` — edit existing contact
- `src/components/view-contact/ViewContact.jsx` — detail view of a contact
- `src/common/UI/Loading.jsx` — loading indicator component
- `src/services/contactServices.js` — centralized Axios wrapper for API calls

Routes generally map to:

- `/` — contacts list
- `/create` — create contact page
- `/contacts/:id` — view contact
- `/contacts/:id/edit` — update contact

---

## 10. `contactService` (services)

Centralized Axios wrapper used by frontend components:

```js
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

  static updateContact(contactInfo, contactId) {
    const contactsURL = `${this.SERVER_URL}/contacts/${contactId}`;
    return axios.put(contactsURL, contactInfo);
  }

  static deleteContact(contactId) {
    const contactsURL = `${this.SERVER_URL}/contacts/${contactId}`;
    return axios.delete(contactsURL);
  }
}
```

Usage in React components:

- Import `contactService` and call the methods in event handlers or `useEffect`.
- Use `async/await` with `try/catch` for error handling.
- Example:

  ```js
  useEffect(() => {
    async function load() {
      try {
        const res = await contactService.getAllContacts();
        setContacts(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);
  ```

---

## 11. Demo / verification steps

1. Start both servers:

   ```bash
   npm run dev:all
   ```

2. Open the frontend URL shown by Vite (typically `http://localhost:5173` or displayed in terminal).
3. Verify contact list loads and displays entries.
4. Use the UI to add a contact. Confirm the POST request is visible in network tab and `contact.json` updated by json-server.
5. Edit an existing contact; confirm PUT request and frontend updates.
6. Delete a contact and confirm removal.
7. Test search functionality in ContactList: type partial name/email/company to validate results.

---

## 12. Further improvements & roadmap

Short-term improvements:

- Add form validation using libraries such as Formik + Yup
- Implement debounce on search input to improve performance for large datasets.
- Add pagination for large contact lists.

Long-term improvements:

- Replace json-server with a real backend (MongoDB/Postgres) for production.
- Add authentication and multi-user support.
- Implement image upload instead of photo URLs.
- Add import/export (CSV) for bulk contact management.


---




































