import { MapContainer, TileLayer} from 'react-leaflet'
import {SiteItem} from "../components/SiteItem.tsx";
import {useEffect, useState} from "react";
import {Deployment, Site} from "../types.tsx";
import axios from "axios";
import DeploymentItem from "../components/DeploymentItem.tsx";
import DeploymentMarker from "../components/DeploymentMarker.tsx";

type DeploymentItem = {
    isSelected: boolean;
    deploymentValue: Deployment;
}

type SiteItem = {
    deployments?: Array<Deployment>;
} & Site;

export default function CapturePage() {

    const [deploymentItems, setDeploymentItems] = useState<Array<DeploymentItem>>([])

    const toggleDeploymentItem = (updatedDeployment: DeploymentItem) => {

        const newDeploymentItems: Array<DeploymentItem> = deploymentItems.map((deploymentItem: DeploymentItem) => {
            if (deploymentItem.deploymentValue.deploymentId !== updatedDeployment.deploymentValue.deploymentId) {
                return {
                    ...deploymentItem
                }
            } else {
                return {
                    ...updatedDeployment,
                    isSelected: !updatedDeployment.isSelected
                }
            }
        })

        setDeploymentItems(newDeploymentItems)
    }

    useEffect(() => {
        axios.get<Array<Deployment>>("http://localhost:3000/deployments")
            .then(response => {
                return response.data;
            })
            .then(data => {
                 const newDeploymentItems: Array<DeploymentItem> = data.map((deployment: Deployment) => {
                     return {
                        isSelected: false,
                        deploymentValue: deployment
                    }
                })
                setDeploymentItems(newDeploymentItems)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    useEffect(() => {

        axios.get<Array<Site>>("http://localhost:3000/sites")
            .then(response => {
                return response.data;
            })

    }, [])

    return (
        <div className='flex flex-col gap-4 xl:flex-row '>
            <div className='bg-stone-600 h-[400px] w-full rounded-xl md:bg-rose-400 xl:bg-emerald-400 xl:h-full xl:w-2/5'>
                <MapContainer center={[39.538639, -119.817014]} zoom={18} scrollWheelZoom={false} className='w-full h-full rounded-xl shadow-xl'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        deploymentItems.map((deployment: DeploymentItem) => {
                            return <DeploymentMarker key={deployment.deploymentValue.deploymentId} isSelected={deployment.isSelected} deploymentValue={deployment.deploymentValue} onClickHandler={() => toggleDeploymentItem(deployment)} />
                        })
                    }
                </MapContainer>
            </div>
            <div className=''>
                <div className=''>
                    <p className='text-xl font-semibold text-black mb-2'>
                        Selected Intersections
                    </p>
                    <div className='flex flex-col gap-4'>
                        <SiteItem />
                    </div>
                </div>
            </div>
        </div>
    )
}