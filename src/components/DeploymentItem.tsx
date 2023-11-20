import {DeploymentItem_t} from "../types.tsx";
import Flag from "./Flag.tsx";
import {VideoCameraIcon} from "@heroicons/react/20/solid";
import Tag from "./Tag.tsx";
import ItemWidget from "./ItemWidget.tsx";
import {InformationCircleIcon, MapPinIcon} from "@heroicons/react/24/solid";

export type DeploymentItemProps_t = {
    className?: string;
    onChangeHandler?: () => void;
} & DeploymentItem_t;

export default function DeploymentItem({ isSelected, deploymentId, corner, latitude, longitude, onChangeHandler}: DeploymentItemProps_t) {

    return (
        <label className='odd:bg-neutral-100 py-4 px-8 flex gap-3 place-items-center flex-row justify-between' >
            <div className='flex flex-col gap-1'>
                <div className='flex flex-row gap-3 place-items-center'>
                    <div>
                        <Flag colorClass={'bg-red-400'} iconElement={<VideoCameraIcon />} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='font-semibold text-base leading-tight'>
                            Virginia Street &bull; 5th St.
                        </p>
                        <Tag>SW</Tag>
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-2 place-items-center'>
                <ItemWidget colorClass='bg-purple-500' iconElement={<MapPinIcon />} />
                <button className='p-2 h-min rounded-full bg-green-500'>
                    <InformationCircleIcon className='w-5 h-5 text-white/80' />
                </button>
            </div>
        </label>
    )
}