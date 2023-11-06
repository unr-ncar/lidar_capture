import {DeploymentItem, SiteItem} from "../pages/CapturePage.tsx";
import {DeploymentItem as Item} from "../components/DeploymentItem.tsx";

type SiteItemComponentProps = {
    onClickHandler: (params: any) => void;
} & SiteItem;

export default function SiteItemComponent({siteId, city, state, crossStreet, primaryStreet, deployments, onClickHandler}: SiteItemComponentProps) {
    return (
        <div className='flex flex-row bg-white rounded-md shadow-md p-4'>

            <div>
                {deployments?.map((deploymentItem: DeploymentItem) => {
                    return (
                        <Item deploymentValue={deploymentItem} isSelected={deploymentItem.isSelected} on={() => onClickHandler(deploymentItem)} />
                    )
                }}
            </div>
        </div>
    )
}