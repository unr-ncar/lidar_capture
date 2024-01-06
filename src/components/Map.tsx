import {MapContainer, MapContainerProps, TileLayer} from "react-leaflet";

interface MapProps_t extends MapContainerProps {
}
export default function Map(props: MapProps_t) {

    const { ...rest} = props;

    return (
        <MapContainer {...rest}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
        </MapContainer>
    )
}