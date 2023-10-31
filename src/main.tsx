import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from 'react';
import CapturePage from "./pages/CapturePage.tsx";
import ExplorerPage from "./pages/ExplorerPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <CapturePage />
            },
            {
                path: 'explorer',
                element: <ExplorerPage />
            },
            {
                path: 'settings',
                element: <SettingsPage />
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
