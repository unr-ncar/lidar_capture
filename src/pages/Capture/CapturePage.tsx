import {useEffect, useState} from "react";
import axios from "axios";
import SensorMarker from "../../components/SensorMarker.tsx";
import SensorItem from "../../components/SensorItem.tsx";
import {NavLink, Outlet, useLocation} from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import {MapContainer, TileLayer} from "react-leaflet";
import {StopIcon, VideoCameraIcon} from "@heroicons/react/20/solid";

export default function CapturePage() {

    const location = useLocation();

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
                    return <SensorMarker {...deployment} key={deployment.deploymentId} isSelected={deployment.isSelected} onClickHandler={() => handleSelection(deployment)} />
                })
            }
        })
    }

    function renderDeploymentItems() {
        return siteItems.map((siteItem: SiteItem_t) => {
            if (siteItem.deployments) {
                return siteItem.deployments.map((deployment: DeploymentItem_t) => {
                    return <SensorItem {...deployment} key={deployment.deploymentId} isSelected={deployment.isSelected} onChangeHandler={() => handleSelection(deployment)} />
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

    function renderLoading() {

        const elements = []

        for (let i = 0; i < 10; i++) {
            elements.push(<div key={i} className='odd:bg-neutral-200 w-full h-[76px] odd:animate-pulse'/>)
        }

        return elements
    }

    return (
        <div className='p-4 flex flex-col md:flex-row md:gap-4 md:h-full md:max-h-full'>
            <div className='hidden md:block md:w-1/2 md:min-h-max'>
                <MapContainer center={[39.538639, -119.817014]} zoom={18} scrollWheelZoom={false} zoomControl={false} className='w-full h-full rounded-lg'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
            <div className='flex flex-col gap-4 md:w-1/2 md:min-h-max'>
                <div className='flex flex-row gap-2 justify-between place-items-center'>
                    <NavLink to="/capture" end={true} className='font-semibold text-neutral-400 text-sm bg-neutral-200 py-1 px-1.5 rounded [&.active]:text-black'>
                        Sensors
                    </NavLink>
                    <div className='flex flex-row gap-2'>
                        <NavLink to="/capture/stop" className='justify-self-end flex flex-row place-items-center gap-1 text-sm bg-red-400 font-semibold py-1 px-1.5 rounded [&.active]:hidden text-white'>
                            <StopIcon className='w-5 h-5' /> Stop
                        </NavLink>
                        <NavLink to="/capture/start" className='flex flex-row place-items-center gap-1 text-sm bg-green-400 font-semibold py-1 px-1.5 rounded [&.active]:hidden text-white'>
                            <VideoCameraIcon className='w-5 h-5' /> Start
                        </NavLink>
                    </div>
                </div>
                <div className='overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}