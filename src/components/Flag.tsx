import {cloneElement, ReactElement} from "react";
import {CheckCircleIcon, ExclamationTriangleIcon, FolderMinusIcon, VideoCameraIcon} from "@heroicons/react/20/solid";

export type FlagProps_t = {
    className?: string;
    label: string;
    iconBackgroundColorClass: string;
    textColorClass: string;
    iconElement: ReactElement;
};

export default function Flag({className, textColorClass, iconBackgroundColorClass, label, iconElement}: FlagProps_t) {

    const flagClasses: string = `${iconBackgroundColorClass} w-5 h-5 min-w-5 min-h-5 p-1 rounded-md text-white`;
    const flagElement: ReactElement = cloneElement(iconElement, {
        className: flagClasses
    });

    return (
        <div className={`${className && className} flex flex-row place-items-center gap-2`}>
            <div>
                {
                    flagElement
                }
            </div>
            <p className={`${textColorClass} font-semibold text-sm leading-tight`}>
                { label }
            </p>
        </div>
    )
}

export function CriticalDataUsageFlag() {
    return <Flag label='Critical Data Usage' iconBackgroundColorClass='bg-orange-400' textColorClass='text-orange-400' iconElement={<FolderMinusIcon />} />
}

export function FullDataUsageFlag() {
    return <Flag label='Full Data Usage' iconBackgroundColorClass='bg-red-400' textColorClass='text-red-400' iconElement={<FolderMinusIcon />} />
}

export function InactiveSensorFlag() {
    return <Flag label='Inactive Sensor' iconBackgroundColorClass='bg-red-400' textColorClass='text-red-400' iconElement={<ExclamationTriangleIcon />} />
}

export function OperationalFlag() {
    return <Flag label='Operational' iconBackgroundColorClass='bg-green-500' textColorClass='text-green-500' iconElement={<CheckCircleIcon />} />
}

export function RecordingFlag() {
    return <Flag label='Recording' iconBackgroundColorClass='bg-red-400' textColorClass='text-red-400' iconElement={<VideoCameraIcon />} />
}
