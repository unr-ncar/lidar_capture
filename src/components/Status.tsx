import {cloneElement, ReactElement} from "react";
import {ExclamationTriangleIcon, FolderIcon, VideoCameraIcon} from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";

export type StatusProps_t = {
    label: string;
    iconElement?: ReactElement;
    children: ReactElement;
    backgroundColorClass?: string;
}

export default function Status({iconElement, label, children, backgroundColorClass}: StatusProps_t) {

    let icon = null;
    if (iconElement) {
        icon = cloneElement(iconElement, {
            className: "w-6 h-6"
        });
    }

    return (
        <div className={`flex place-items-center py-3 px-5 gap-3 rounded-md ${backgroundColorClass ? backgroundColorClass : 'bg-neutral-400'}`}>
            { icon &&
                <span className='text-white'>
                    { icon }
                </span>
            }
            <div className='leading-tight text-sm text-white'>
                <p> <span className='font-semibold'>{label}: </span>{ children } </p>
            </div>
        </div>
    )
}

export function RecordingStatus() {
    return (
        <Status label='Recording' backgroundColorClass='bg-red-400' iconElement={<VideoCameraIcon />}>
            <>
                Sensor is unavailable. Began recording 23 minutes ago at 2:00 p.m. on December 10th with 20 minutes remaining. <Link to="/" className='decoration-2 underline'>Learn more.</Link>
            </>
        </Status>
    )
}

export function FullDataUsageStatus() {
    return (
        <Status label='Critical Data Usage' backgroundColorClass='bg-orange-400' iconElement={<FolderIcon />}>
            <>
                Sensor is unavailable. Site computer is above 80% capacity and will not be able to store more recordings temporarily. <Link to="/" className='decoration-2 underline'>Learn more.</Link>
            </>
        </Status>
    )
}

export function SensorDisabledStatus() {
    return (
        <Status label='Sensor Disabled' backgroundColorClass='bg-red-400' iconElement={<ExclamationTriangleIcon />}>
            <>
                Sensor is unavailable. Sensor has been disabled by the system administrator.
            </>
        </Status>
    )
}