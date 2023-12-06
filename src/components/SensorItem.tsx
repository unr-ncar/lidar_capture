import Tag from "./Tag.tsx";
import { InformationCircleIcon, MapPinIcon} from "@heroicons/react/24/solid";
import ItemButton from "./ItemButton.tsx";
import {FullDataUsageStatus, RecordingStatus, SensorDisabledStatus} from "./Status.tsx";

export type SensorItemProps_t = {
    className?: string;
    lidarId: number;
}

export default function SensorItem({className}: SensorItemProps_t) {

    return (
        <div className={`${className} flex flex-col gap-4 bg-neutral-100 p-4 rounded-lg`}>
                <div className='flex flex-row justify-between'>
                    <p className='flex font-semibold leading-tight'>
                        Virginia Street &bull; Artemisa Way
                    </p>
                    <Tag className='' label='SW' />
                </div>
                <SensorDisabledStatus />
                <RecordingStatus />
                <FullDataUsageStatus />
            <div className='flex flex-row gap-2 justify-between'>
                <div className='flex flex-row gap-2'>
                    <ItemButton label='Sensor' iconElement={<InformationCircleIcon />} />
                    <ItemButton label='Site' iconElement={<InformationCircleIcon />} />
                </div>
                <ItemButton className='hidden md:flex' label='Locate' iconElement={<MapPinIcon />} />
            </div>
        </div>
    )
}