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

type RecordingStatusProps_t = {
    startTime: number;
    elapsedTime: number;
    serviceType: "pcap" | "ros";
    lidarId: number;
}
export function RecordingStatus({startTime, elapsedTime, serviceType, lidarId}: RecordingStatusProps_t) {

    const humanStartTime = new Date(startTime * 1000).toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
    });

    return (
        <Status label={`Recording (${serviceType})`} backgroundColorClass='bg-red-400' iconElement={<VideoCameraIcon />}>
            <>
                Sensor is unavailable. Began recording {elapsedTime} minutes ago at { humanStartTime }. <Link to={`/capture/sensor/${lidarId}`} className='decoration-2 underline'>Learn more.</Link>
            </>
        </Status>
    )
}

type DataUsageProps_t = {
    siteId: number;
}
export function CriticalDataUsageStatus({siteId}: DataUsageProps_t) {

    return (
        <Status label='Critical Data Usage' backgroundColorClass='bg-orange-400' iconElement={<FolderIcon />}>
            <>
                Sensor is available. Site computer is above 60% capacity and will need time to move files after a new recording. <Link to={`/capture/site/${siteId}`} className='decoration-2 underline'>Learn more.</Link>
            </>
        </Status>
    )
}

export function FullDataUsageStatus({siteId}: DataUsageProps_t) {
    return (
        <Status label='Full Data Usage' backgroundColorClass='bg-red-400' iconElement={<FolderIcon />}>
            <>
                Sensor is unavailable. Site computer is above 80% capacity and will not be able to store more recordings temporarily. <Link to={`/capture/site/${siteId}`} className='decoration-2 underline'>Learn more.</Link>
            </>
        </Status>
    )
}

export type ErrorLoadingStatusProps_t = {
    errorTitle: string;
    errorDescription: string;
}
export function ErrorLoadingStatus({errorTitle, errorDescription}: ErrorLoadingStatusProps_t) {
    return (
        <Status backgroundColorClass='bg-red-400' iconElement={<ExclamationTriangleIcon />} label={`Loading Error (${errorTitle})`}>
            <>
                { errorDescription }
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