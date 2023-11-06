import {DeploymentItem_t} from "../types.tsx";

const information_circle = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
)

export type DeploymentItemProps_t = {
    onChangeHandler: () => void;
} & DeploymentItem_t;

export default function DeploymentItem({isSelected, deploymentId, corner, latitude, longitude, onChangeHandler}: DeploymentItemProps_t) {

    return (
        <label>
            <input onChange={() => onChangeHandler()} type='checkbox' className='peer hidden' checked={isSelected} />
            <div className='peer-checked:bg-blue-400/70 peer-checked:text-blue-600 flex flex-row gap-1 place-items-center bg-neutral-200 px-2 py-1 rounded'>
                <p className='font-semibold text-sm'>
                    { corner }
                </p>
            </div>
        </label>
    )
}