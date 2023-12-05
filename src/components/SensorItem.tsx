import Tag from "./Tag.tsx";
import {ExclamationTriangleIcon, InformationCircleIcon, MapPinIcon} from "@heroicons/react/24/solid";
import ItemButton from "./ItemButton.tsx";
import {Link} from "react-router-dom";

export type SensorItemProps_t = {
    className?: string;
    lidarId: number;

}

export default function SensorItem({className}: SensorItemProps_t) {

    return (
        <div className={`${className} flex flex-col gap-4 bg-neutral-100 p-4 rounded-lg`}>
                <div className='flex flex-row gap-2'>
                    <Tag className='' label='SW' />
                    <p className='flex font-semibold leading-tight'>
                        Virginia Street &bull; Artemisa Way
                    </p>
                </div>
                <div className='flex place-items-center py-3 px-5 gap-3 rounded-md bg-orange-400'>
                    <span className='text-white'>
                        <ExclamationTriangleIcon className='w-6 h-6' />
                    </span>
                    <p className='leading-tight text-sm text-white'>
                        <span className='font-semibold'>Critical Capacity: </span>Edge computer is nearing 80% capacity threshold. <Link to={'/'} className='underline decoration-1'>Learn more.</Link>
                    </p>
                </div>
            <div className='flex flex-row gap-2 justify-between'>
                <ItemButton label='Metadata' iconElement={<InformationCircleIcon />} />
                <ItemButton className='hidden md:flex' label='Locate' iconElement={<MapPinIcon />} />
            </div>
        </div>
    )
}

// <SensorStatus flagElement={<InactiveSensorFlag />} description={'Unavailable. LiDAR sensor is disabled.'} />
// <SensorStatus flagElement={<InactiveSensorFlag />} description={'Unavailable. LiDAR sensor is disabled.'} />
// <SensorStatus flagElement={<CriticalDataUsageFlag />} description={'Site machine is above 70% capacity.'} />
// <SensorStatus flagElement={<FullDataUsageFlag />} description={'Unavailable. Site machine is at full capacity.'} />
// <SensorStatus flagElement={<RecordingFlag />} description={'Unavailable. Started recording 23 minutes ago on Dec 21st, 2023 at 2:00 p.m. with 20 minutes remaining.'} />