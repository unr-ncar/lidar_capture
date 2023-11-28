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
    uri: 'http://134.197.75.31:31538/graphql',
    cache: new InMemoryCache(),
});

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                element: <CapturePage />,
                children: [
                    {
                        index: true,
                        element: <p>Test</p>
                    },
                    {
                        path: 'notifications',
                        element: <p>Notifications</p>
                    },
                    {
                        path: 'sites',
                        element: <p>Sites</p>
                    }
                ]
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
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
  </React.StrictMode>,
)
