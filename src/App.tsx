import './App.css'
import {Outlet} from "react-router-dom";
import Navigation from "./components/Navigation.tsx";


function App() {

  return (
      <div className="bg-stone-700 flex flex-col w-full min-h-max md:h-screen md:max-h-screen md:flex-row">
          <Navigation className='md:flex md:h-0 md:flex-col' />
          <div className='grow bg-white p-4 rounded-t-xl md:rounded-tr-none md:rounded-br-none md:rounded-l-xl md:overflow-y-auto md:rounded-xl'>
              <Outlet />
          </div>
      </div>
  )
}

export default App