import {Deployment} from "../types.tsx";
import {DeploymentItem} from "../pages/CapturePage.tsx";

export type DeploymentItemProps = {
    isSelected: boolean;
    deploymentValue: Deployment;
    onChangeHandler: () => void;
}

export default function DeploymentItem({isSelected, deploymentValue, onChangeHandler}: DeploymentItemProps) {

    return (
        <label>
            <input onChange={() => onChangeHandler(deploymentValue)} type='checkbox' className='peer hidden' checked={isSelected} />
            <div className='peer-checked:bg-slate-400 '>
                <p className='font-semibold '>
                    SW
                </p>
            </div>
        </label>
    )
}