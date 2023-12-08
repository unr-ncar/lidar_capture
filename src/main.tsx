import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from 'react';
import CapturePage from "./pages/Capture/CapturePage.tsx";
import ExplorerPage from "./pages/ExplorerPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SensorsView from "./pages/Capture/SensorsView.tsx";
import StartCaptureView from "./pages/Capture/StartCaptureView.tsx";
import StopCaptureView from "./pages/Capture/StopCaptureView.tsx";

const apolloClient = new ApolloClient({
    uri: `${import.meta.env.VITE_GATEWAY_ADDRESS}/graphql`,
    cache: new InMemoryCache(),
});

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
                        element: <SensorsView />
                    },
                    {
                        path: "start",
                        element: <StartCaptureView />
                    },
                    {
                        path: "stop",
                        element: <StopCaptureView />
                    },
                    {
                        path: "sensor/:lidarId",
                        element: <p>Sensor</p>
                    },
                    {
                        path: "site/:siteId",
                        element: <p>Site</p>
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
      <ApolloProvider client={apolloClient}>
          <RouterProvider router={router} />
      </ApolloProvider>
  </React.StrictMode>,
)
