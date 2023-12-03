import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from 'react';
import CapturePage from "./pages/CapturePage.tsx";
import ExplorerPage from "./pages/ExplorerPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: import.meta.env.VITE_SERVER,
    cache: new InMemoryCache(),
});

console.log(import.meta.env.VITE_SERVER)

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                element: <CapturePage />,
                path: "/capture",
                children: [
                    {
                        index: true,
                        element: <p>Sensors</p>
                    },
                    {
                        path: "sites",
                        element: <p>Sites</p>
                    },
                    {
                        path: "start",
                        element: <p>Start</p>
                    },
                    {
                        path: "stop",
                        element: <p>Stop</p>
                    }

                ]
            },
            {
                path: "/explorer",
                element: <ExplorerPage />
            },
            {
                path: "/settings",
                element: <SettingsPage />
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
  </React.StrictMode>,
)
