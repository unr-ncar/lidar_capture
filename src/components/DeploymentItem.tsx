import {Deployment} from "../pages/CapturePage.tsx";

type DeploymentItemProps = {

    selected: boolean;
    value: Deployment;

}
export default function DeploymentItem({selected, value}: DeploymentItemProps) {

    const { deploymentId, corner, latitude,  longitude } = value;

    return (
        <div>
            <input type='checkbox' checked={selected} />
            <div>

            </div>
        </div>
    )
}