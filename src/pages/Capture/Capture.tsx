import {NavLink, NavLinkProps, Outlet} from "react-router-dom";
import {ReactElement} from "react";
import {ServerIcon, VideoCameraIcon, VideoCameraSlashIcon} from "@heroicons/react/24/solid";

interface CaptureNavigationButtonProps_t extends NavLinkProps {
    label: string;
    description: string;
    iconElement: ReactElement;
}

function CaptureNavigationButton(props: CaptureNavigationButtonProps_t) {

    const {label, iconElement, description, ...rest} = props;

    return (
        <NavLink {...rest} end={true}
                 className='bg-neutral-100 text-neutral-300 px-3 py-1 rounded-lg [&.active]:bg-black [&.active]:text-white hover:text-white hover:bg-black transition-colors lg:flex lg:flex-row lg:gap-1 lg:p-3'>
            <div className='flex flex-row place-items-center gap-1.5 lg:flex lg:flex-col'>
                <span className='[&>*]:size-5'>
                    {iconElement}
                </span>
                <p className='font-semibold'>
                    {label}
                </p>
            </div>
            <p className='hidden'>
                {description}
            </p>
        </NavLink>
    )
}

function CaptureNavigation() {
    return (
        <nav className='flex gap-4 justify-evenly p-4 md:justify-start'>
            <CaptureNavigationButton label='Status'
                                     description='View the status and metadata of Site and Sensor deployments.'
                                     iconElement={<ServerIcon/>} to='/capture'/>
            <CaptureNavigationButton label='Start'
                                     description='Select one or many Sensor deployments and capture a new pointcloud.'
                                     iconElement={<VideoCameraIcon/>} to='/capture/start'/>
            <CaptureNavigationButton label='Stop'
                                     description='Select one or many Sensor deployments actively capturing a pointcloud.'
                                     iconElement={<VideoCameraSlashIcon/>} to='/capture/stop'/>
        </nav>
    )
}

export default function Capture() {
    return (
        <div className="flex flex-col h-full max-h-full">
            <CaptureNavigation/>
            <div className="grow overflow-y-auto">
                <Outlet/>
            </div>
        </div>
    )
}