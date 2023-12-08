import {NavLink, Outlet} from "react-router-dom";
import {MapContainer, TileLayer} from "react-leaflet";
import {StopIcon, VideoCameraIcon} from "@heroicons/react/20/solid";

export default function CapturePage() {


    return (
        <div className='p-4 flex flex-col md:flex-row md:gap-4 md:h-full md:max-h-full'>
            <div className='hidden md:block md:w-1/2 md:min-h-max'>
                <MapContainer center={[39.538639, -119.817014]} zoom={18} scrollWheelZoom={false} zoomControl={false} className='w-full h-full rounded-lg'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
            <div className='flex flex-col gap-4 md:w-1/2 md:min-h-max'>
                <div className='flex flex-row gap-2 justify-between place-items-center'>
                    <NavLink to="/capture" end={true} className='font-semibold text-neutral-400 text-sm bg-neutral-200 py-1 px-1.5 rounded [&.active]:text-black'>
                        Sensors
                    </NavLink>
                    <div className='flex flex-row gap-2'>
                        <NavLink to="/capture/stop" className='justify-self-end flex flex-row place-items-center gap-1 text-sm bg-red-400 font-semibold py-1 px-1.5 rounded [&.active]:hidden text-white'>
                            <StopIcon className='w-5 h-5' /> Stop
                        </NavLink>
                        <NavLink to="/capture/start" className='flex flex-row place-items-center gap-1 text-sm bg-green-400 font-semibold py-1 px-1.5 rounded [&.active]:hidden text-white'>
                            <VideoCameraIcon className='w-5 h-5' /> Start
                        </NavLink>
                    </div>
                </div>
                <div className='overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}