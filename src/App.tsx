import './App.css'
import {Outlet} from "react-router-dom";

function App() {

  return (
      <div className="flex flex-col w-full">
          <div className='grow'>
              <Outlet />
          </div>
      </div>
  )
}

export default App
