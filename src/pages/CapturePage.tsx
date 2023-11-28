import {useEffect, useState} from "react";
import {Deployment_t, DeploymentItem_t, Site_t, SiteItem_t} from "../types.tsx";
import axios from "axios";
import DeploymentMarker from "../components/DeploymentMarker.tsx";
import DeploymentItem from "../components/DeploymentItem.tsx";
import {NavLink} from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

export default function CapturePage() {

    const [sites, setSites] = useState<Array<Site_t>>([])
    const [deployments, setDeployments] = useState<Array<Deployment_t>>([])
    const [siteItems, setSiteItems] = useState<Array<SiteItem_t>>([])

    const GET_SYSTEM_INFO = gql`
        query {
            getSystemInfo {
                totalSpace
                usedSpace
                freeSpace
                host
                siteId
            }
        }
    `;

    const GET_STATUS = gql`
    query {
        getStatus {
            siteId
            state
            city
            street
            crossStreet
        }
    }`

    const { loading, error, data } = useQuery(GET_SYSTEM_INFO);
    const { loading: loadingStatus, error: loadingError, data: loadingData } = useQuery(GET_STATUS);


    useEffect(() => {
        if (!loadingStatus) {
            console.log(loadingData)
        }
    }, [loadingStatus, loadingData]);

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
            }
        })
    }

    function renderDeploymentItems() {
        return siteItems.map((siteItem: SiteItem_t) => {
            if (siteItem.deployments) {
                return siteItem.deployments.map((deployment: DeploymentItem_t) => {
                    return <DeploymentItem {...deployment} key={deployment.deploymentId} isSelected={deployment.isSelected} onChangeHandler={() => handleSelection(deployment)} />
                })
            }
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
        <div className='flex flex-col gap-4'>
            <div className=''>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-center items-center gap-3 place-items-center my-5'>
                        <NavLink to={'/'} className='font-semibold bg-neutral-200 text-neutral-400 px-1.5 py-1 text-sm rounded &:[active]:bg-black'>
                            Intersections
                        </NavLink>
                        <NavLink to='sites' className='font-semibold bg-neutral-200 text-neutral-400 px-1.5 py-1 text-sm rounded'>
                            Sensors
                        </NavLink>
                        <NavLink to='notifications' className='font-semibold bg-neutral-200 text-neutral-400 px-1.5 py-1 text-sm rounded'>
                            Notifications
                        </NavLink>
                    </div>
                    <div className='flex flex-col'>
                        { renderDeploymentItems() }
                    </div>
                </div>
            </div>
        </div>
    )
}