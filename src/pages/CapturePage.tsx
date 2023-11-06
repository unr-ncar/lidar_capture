import {MapContainer, TileLayer} from 'react-leaflet'
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
    deployments?: Array<DeploymentItem>;
} & Site;

export default function CapturePage() {

    const [sites, setSites] = useState<Array<Site>>([])
    const [deployments, setDeployments] = useState<Array<Deployment>>([])
    const [siteItems, setSiteItems] = useState<Array<SiteItem>>([])

    async function getDeployments() {
        const url: string = "http://localhost:3000/deployments";
        try {
            const response = await axios.get<Array<Deployment>>(url);
            const deployments: Array<Deployment> = response.data;
            setDeployments(deployments);
        } catch (error) {
            console.log(error);
        }
    }

    async function getSites() {
        const url: string = "http://localhost:3000/sites";
        try {
            const response = await axios.get<Array<Site>>(url);
            const sites: Array<Site> = response.data;
            setSites(sites);
        } catch (error) {
            console.log(error);
        }
    }

    function handleSelection(updatedDeploymentItem: DeploymentItem): void {
        setSiteItems((previousState: Array<SiteItem>) => {
            return previousState.map((siteItem: SiteItem) => {
                if (siteItem.deployments) {
                    const updatedDeployments: Array<DeploymentItem> = siteItem.deployments.map((deploymentItem: DeploymentItem): DeploymentItem => {
                        if (deploymentItem.deploymentValue.deploymentId === updatedDeploymentItem.deploymentValue.deploymentId) {
                            return {
                                ...deploymentItem,
                                isSelected: !deploymentItem.isSelected
                            }
                        } else {
                            return deploymentItem;
                        }
                    })
                    return {
                        ...siteItem,
                        deployments: updatedDeployments
                    }
                } else {
                    return siteItem;
                }
            })
        })
    }

    function renderMarkers() {
        return siteItems.map((site: SiteItem) => {
            if (site.deployments) {
                return site.deployments.map((deployment: DeploymentItem) => {
                    return <DeploymentMarker key={deployment.deploymentValue.deploymentId} deploymentValue={deployment.deploymentValue} isSelected={deployment.isSelected} onClickHandler={() => handleSelection(deployment)} />
                })
            } else {
                return null;
            }
        })
    }

    useEffect(() => {
        getDeployments();
        getSites();
    }, []);

    useEffect(() => {
        const deploymentItems: Array<DeploymentItem> = deployments.map((deployment: Deployment) => {
            const item: DeploymentItem = {
                isSelected: false,
                deploymentValue: deployment
            }
            return item;
        })
        const siteItems: Array<SiteItem> = sites.map((site: Site) => {
            const matchedDeployments: Array<DeploymentItem> = deploymentItems.filter((deploymentItem: DeploymentItem) => {
                if (deploymentItem.deploymentValue.siteId === site.siteId) {
                    return deploymentItem;
                }
            })
            return {
                ...site,
                deployments: matchedDeployments
            }
        })

        setSiteItems(siteItems)
    }, [deployments, sites])

    return (
        <div className='flex flex-col gap-4 xl:flex-row '>
            <div className='bg-stone-600 h-[400px] w-full rounded-xl md:bg-rose-400 xl:bg-emerald-400 xl:h-full xl:w-2/5'>
                <MapContainer center={[39.538639, -119.817014]} zoom={18} scrollWheelZoom={false} className='w-full h-full rounded-xl shadow-xl'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <>
                        { renderMarkers() }
                    </>
                </MapContainer>
            </div>
            <div className=''>
                <div className=''>
                    <p className='text-xl font-semibold text-black mb-2'>
                        Selected Intersections
                    </p>
                    <div className='flex flex-col gap-4'>
                        {
                            siteItems.map((siteItem: SiteItem) => {
                                return (
                                    <div key={siteItem.siteId}>
                                        <p> {siteItem.siteId} </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}