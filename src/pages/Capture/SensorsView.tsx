import SensorItem from "../../components/SensorItem.tsx";
import LoadingWheel from "../../components/LoadingWheel.tsx";
import {Metadata_t, SensorItem_t} from "../../types.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function SensorsView() {

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown | null>(null)
    const [sensors, setSensors] = useState<Array<SensorItem_t>>([])

    useEffect(() => {
        const fetchData =  async() => axios.get(`${import.meta.env.VITE_GATEWAY_ADDRESS}/metadata?size=100`)
            .then((response) => {

                return response.data.items

            })
            .then((data: Array<Metadata_t>) => {
                const sensorItems: Array<SensorItem_t> = []
                data.forEach((metadataObject: Metadata_t) => {
                    sensorItems.push(
                        {
                            lidarId: metadataObject.lidar_id,
                            siteId: metadataObject.site_id,
                            deploymentId: metadataObject.deployment_id,
                            state: metadataObject.state,
                            street: metadataObject.street,
                            crossStreet: metadataObject.cross_street,
                            lidarIp: metadataObject.lidar_ip,
                            ip: metadataObject.ip,
                            latitude: metadataObject.latitude,
                            longitude: metadataObject.longitude,
                            intersectionCenter: {
                                latitude: metadataObject.intersection_center.latitude,
                                longitude: metadataObject.intersection_center.longitude
                            }
                        }
                    )
                })
                setSensors(sensorItems)
                setLoading(false)
            }).catch((error: Error) => {
                console.log(error)
                setError(error)
                setLoading(false)
            })

        fetchData()
    }, []);

    if (loading) return <div className='w-full h-full py-10'><LoadingWheel className='mx-auto' /></div>

    if (error) return 'An error has occurred:'

    return (
        <div className='flex flex-col gap-4'>
            {
                sensors.map((sensor: SensorItem_t) => {
                    return <SensorItem key={sensor.lidarId} {...sensor} />
                })
            }
        </div>
    )
}