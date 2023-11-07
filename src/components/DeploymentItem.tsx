import {DeploymentItem_t} from "../types.tsx";
import MetadataBubble from "./MetadataBubble.tsx";

export type DeploymentItemProps_t = {
    onChangeHandler: () => void;
} & DeploymentItem_t;

export default function DeploymentItem({isSelected, deploymentId, corner, latitude, longitude, onChangeHandler}: DeploymentItemProps_t) {

    return (
        <div className='flex flex-row border-2 border-neutral-200 rounded p-2'>
            <label className='w-14'>
                <input onChange={() => onChangeHandler()} type='checkbox' className='peer hidden' checked={isSelected} />
                <div className='peer-checked:bg-blue-400/70 peer-checked:text-blue-600 bg-neutral-200 text-neutral-400 py-1 rounded'>
                    <p className='font-semibold text-lg text-center'>
                        { corner }
                    </p>
                </div>
            </label>
            <div className='grid grid-cols-2 gap-2'>
            </div>
        </div>
    )
}