import './App.css'
import {Outlet} from "react-router-dom";
import Navigation from "./components/Navigation.tsx";


function App() {

  return (
      <div className="flex flex-col p-10 gap-6 w-full">
          <Navigation className='' />
          <div className='grow'>
              <Outlet />
          </div>
      </div>
  )
}

export default App
