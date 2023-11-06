import {MapContainer, TileLayer} from 'react-leaflet'
import {useEffect, useState} from "react";
import {Deployment_t, DeploymentItem_t, Site_t, SiteItem_t} from "../types.tsx";
import axios from "axios";
import DeploymentMarker from "../components/DeploymentMarker.tsx";
import SiteItem from "../components/SiteItem.tsx";
import DeploymentItem from "../components/DeploymentItem.tsx";

export default function CapturePage() {

    const [sites, setSites] = useState<Array<Site_t>>([])
    const [deployments, setDeployments] = useState<Array<Deployment_t>>([])
    const [siteItems, setSiteItems] = useState<Array<SiteItem_t>>([])

    async function getDeployments() {
        const url: string = "http://localhost:3000/deployments";
        try {
            const response = await axios.get<Array<Deployment_t>>(url);
            const deployments: Array<Deployment_t> = response.data;
            setDeployments(deployments);
        } catch (error) {
            console.log(error);
        }
    }

    async function getSites() {
        const url: string = "http://localhost:3000/sites";
        try {
            const response = await axios.get<Array<Site_t>>(url);
            const sites: Array<Site_t> = response.data;
            setSites(sites);
        } catch (error) {
            console.log(error);
        }
    }

    function handleSelection(updatedDeploymentItem: DeploymentItem_t): void {
        setSiteItems((previousState: Array<SiteItem_t>) => {
            return previousState.map((siteItem: SiteItem_t) => {
                if (siteItem.deployments) {
                    const updatedDeployments: Array<DeploymentItem_t> = siteItem.deployments.map((deploymentItem: DeploymentItem_t): DeploymentItem_t => {
                        if (deploymentItem.deploymentId === updatedDeploymentItem.deploymentId) {
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

    function renderDeploymentMarkers() {
        return siteItems.map((siteItem: SiteItem_t) => {
            if (siteItem.deployments) {
                return siteItem.deployments.map((deployment: DeploymentItem_t) => {
                    return <DeploymentMarker {...deployment} key={deployment.deploymentId} isSelected={deployment.isSelected} onClickHandler={() => handleSelection(deployment)} />
                })
            } else {
                return null;
            }
        })
    }

    function renderSiteItems() {
        return siteItems.map((siteItem: SiteItem_t) => {
            return (
                <SiteItem {...siteItem} key={siteItem.siteId}>
                    {
                        siteItem.deployments.map((deploymentItem: DeploymentItem_t) => {
                            return <DeploymentItem {...deploymentItem} key={deploymentItem.deploymentId} onChangeHandler={() => handleSelection(deploymentItem)} />
                        }
                    )}
                </SiteItem>
            )
        })
    }

    useEffect(() => {
        getDeployments();
        getSites();
    }, []);

    useEffect(() => {
        const deploymentItems: Array<DeploymentItem_t> = deployments.map((deployment: Deployment_t) => {
            const deploymentItem: DeploymentItem_t = {
                ...deployment,
                isSelected: false,
            }
            return deploymentItem;
        })
        const siteItems: Array<SiteItem_t> = sites.map((site: Site_t) => {
            const matchedDeployments: Array<DeploymentItem_t> = deploymentItems.filter((deploymentItem: DeploymentItem_t) => {
                if (deploymentItem.siteId === site.siteId) {
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
        <div className='flex flex-col gap-4 '>
            <div className='bg-stone-600 h-[400px] w-full rounded-xl md:bg-rose-400'>
                <MapContainer center={[39.538639, -119.817014]} zoom={18} scrollWheelZoom={false} className='w-full h-full rounded-xl shadow-xl'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <>
                        { renderDeploymentMarkers() }
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
                            renderSiteItems()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}