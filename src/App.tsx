import './App.css'
import { Outlet} from "react-router-dom";
import Navigation from "./components/Navigation.tsx";

function App() {
      return (
          <div className="flex flex-col w-screen md:h-screen md:max-h-screen xl:flex-row">
              <Navigation />
              <div className='grow overflow-y-auto'>
                  <Outlet />
              </div>
          </div>
      )
}

export default App
