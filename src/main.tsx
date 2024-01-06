import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from 'react';
import Capture from "./pages/Capture/Capture.tsx";
import StatusCaptureView from "./pages/Capture/StatusCaptureView.tsx";

const router = createBrowserRouter([
    {
        element: <App />,
        path: '/',
        children: [
            {
                element: <p>Dashboard</p>,
                index: true
            },
            {
                element: <Capture />,
                path: 'capture',
                children: [
                    {
                        element: <StatusCaptureView />,
                        index: true,
                    },
                    {
                        element: <p>Start</p>,
                        path: 'start'
                    },
                    {
                        element: <p>Stop</p>,
                        path: 'stop'
                    }
                ]
            },
            {
                element: <p>Explorer</p>,
                path: 'explorer'
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
