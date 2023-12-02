import './App.css'
import {NavLink, Outlet} from "react-router-dom";
import {VideoCameraIcon} from "@heroicons/react/24/solid";
import {FolderArrowDownIcon} from "@heroicons/react/24/solid";

function App() {

  return (
      <div className="flex flex-col w-full">
          <nav className='flex flex-row place-items-center bg-black p-3'>
              <div className='flex flex-row gap-4 place-items-center'>
                  <NavLink to={"/capture"} className='flex flex-row text-white/60 place-items-center gap-0.5 text-xs font-semibold [&.active]:text-white'>
                      <VideoCameraIcon className='w-4 h-4' />
                      Capture
                  </NavLink>
                  <NavLink to={'/explorer'} className='flex flex-row text-white/60 place-items-center gap-1 text-xs font-semibold [&.active]:text-white'>
                      <FolderArrowDownIcon className='w-4 h-4' />
                      Explorer
                  </NavLink>
              </div>
          </nav>
          <div className='grow'>
              <Outlet />
          </div>
      </div>
  )
}

export default App
