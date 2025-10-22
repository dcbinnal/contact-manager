// src/routes/router.jsx
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ContactList from "../components/contact-list/ContactList";
import CreateContact from "../components/create-contact/CreateContact";
import UpdateContact from "../components/update-contact/UpdateContact";
import ViewContact from "../components/view-contact/ViewContact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <ContactList /> },
      { path: "/create", element: <CreateContact /> },
      { path: "/update/:contactId", element: <UpdateContact /> },
      { path: "/view/:contactId", element: <ViewContact /> },
      { path: "*", element: <h2>404 — Page Not Found</h2> },
    ],
  },
]);
