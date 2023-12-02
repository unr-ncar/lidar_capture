import {DeploymentItem_t} from "../types.tsx";
import Flag from "./Flag.tsx";
import {VideoCameraIcon} from "@heroicons/react/20/solid";
import Tag from "./Tag.tsx";
import ItemWidget from "./ItemWidget.tsx";
import {InformationCircleIcon, MapPinIcon} from "@heroicons/react/24/solid";
import RecordingFlag from "./flags/RecordingFlag.tsx";
import CriticalDataUsageFlag from "./flags/CriticalDataUsageFlag.tsx";

export type DeploymentItemProps_t = {
    className?: string;
    onChangeHandler: () => void;
} & DeploymentItem_t;

export default function DeploymentItem({ isSelected, deploymentId, corner, latitude, longitude, onChangeHandler, status}: DeploymentItemProps_t) {

    function renderStatus() {


        if (status && status.isRecording) {
            return  <RecordingFlag />
        }

        return <input className='w-5 h-5' onChange={onChangeHandler} type='checkbox' checked={isSelected} />
    }

    return (
        <label className='odd:bg-neutral-100' >
            <div className='flex flex-col gap-1'>
                <div className='flex flex-row gap-3 place-items-center'>
                    <div>
                        { renderStatus() }
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='font-semibold text-base leading-tight'>
                            Virginia Street &bull; Arttemesia Way
                        </p>
                        <Tag label={corner} />
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-2 place-items-center'>
                <ItemWidget colorClass='hidden bg-purple-500' iconElement={<MapPinIcon />} />
                <ItemWidget colorClass='bg-green-500' iconElement={<InformationCircleIcon />} />
            </div>
        </label>
    )
}