import {useEffect, useState} from "react";
import {Deployment_t, DeploymentItem_t, Site_t, SiteItem_t} from "../types.tsx";
import axios from "axios";
import DeploymentMarker from "../components/DeploymentMarker.tsx";
import SiteItem from "../components/SiteItem.tsx";
import DeploymentItem from "../components/DeploymentItem.tsx";
import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
    InformationCircleIcon,
    MapPinIcon
} from "@heroicons/react/24/solid";
import {ExclamationTriangleIcon, VideoCameraIcon } from "@heroicons/react/20/solid";
import Flag from "../components/Flag.tsx";
import Tag from "../components/Tag.tsx";
import ItemWidget from "../components/ItemWidget.tsx";

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

    function renderDeploymentItems() {
        return siteItems ? siteItems.map((siteItem: SiteItem_t) => {
            if (deployments)
                siteItem.deployments.map((deploymentItem: DeploymentItem_t) => {
                return <DeploymentItem {...deploymentItem} key={deploymentItem.deploymentId} onChangeHandler={() => handleSelection(deploymentItem)} />
            })
        }) : <> </>;
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
        <div className='flex flex-col gap-4'>
            <div className=''>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-center items-center gap-3 place-items-center my-5'>
                        <p className='font-semibold bg-neutral-200 text-neutral-400 px-1.5 py-1 text-sm rounded'>
                            Intersections
                        </p>
                        <p className='font-semibold bg-neutral-200 text-neutral-400 px-1.5 py-1 text-sm rounded'>
                            Sensors
                        </p>
                        <p className='font-semibold bg-neutral-200 text-neutral-400 px-1.5 py-1 text-sm rounded'>
                            Notifications
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        { renderDeploymentItems() }
                    </div>
                </div>
            </div>
        </div>
    )
}