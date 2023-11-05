import {CircleMarker} from "react-leaflet";
import {Deployment} from "../types.tsx";

export type DeploymentMarkerProps = {
    deploymentValue: Deployment;
    isSelected: boolean;
    onClickHandler: () => void;
}

const selectedPath = {
    stroke: true,
    fill: true,
    color: '#2563eb',
    fillColor: '#60a5fa',
    fillOpacity: 0.75
}

const unselectedPath = {
    stroke: true,
    fill: true,
    color: '#3f3f46',
    fillColor: '#a1a1aa',
    fillOpacity: 0.75
}

export default function DeploymentMarker({isSelected, deploymentValue, onClickHandler}: DeploymentMarkerProps ) {

    const { latitude, longitude } = deploymentValue;

    return (
        <CircleMarker eventHandlers={{click: () => onClickHandler()}} center={[longitude, latitude  ]} radius={7}  pathOptions={isSelected ? selectedPath : unselectedPath} />
    )

}