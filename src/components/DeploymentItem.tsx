import {Deployment} from "../pages/CapturePage.tsx";

type DeploymentItemProps = {

    selected: boolean;
    value: Deployment;

}
export default function DeploymentItem({selected, value}: DeploymentItemProps) {

    const { deploymentId, corner, latitude,  longitude } = value;

    return (
        <div className='flex flex-row bg-stone-100 rounded shadow'>
            <input type='checkbox' checked={selected} />
            <div>
                <p>
                    { deploymentId }
                </p>
            </div>
        </div>
    )
}