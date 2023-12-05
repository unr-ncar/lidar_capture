import {CircleMarker} from "react-leaflet";
import {DeploymentItem_t} from "../types.tsx";

/*const recordingPath = {
    stroke: true,
    fill: true,
    color: '#dc2626',
    fillColor: '#f87171',
    fillOpacity: 0.75
}*/

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

export type DeploymentMarkerProps_t = {
    onClickHandler: () => void;
} & DeploymentItem_t

export default function SensorMarker({isSelected, latitude, longitude, onClickHandler}: DeploymentMarkerProps_t ) {

    return <CircleMarker eventHandlers={{click: () => onClickHandler()}} center={[longitude, latitude  ]} radius={7}  pathOptions={isSelected ? selectedPath : unselectedPath} />

}