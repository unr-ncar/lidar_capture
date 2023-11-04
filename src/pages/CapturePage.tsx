import axios from "axios";
import {CircleMarker, MapContainer, ScaleControl, TileLayer, useMapEvent, ZoomControl} from 'react-leaflet'
import RecordingStatus from "../components/RecordingStatus.tsx";
import DeploymentItem from "../components/DeploymentItem.tsx";
import React, {ReactNode, useEffect, useState} from "react";
import {SiteItem} from "../components/SiteItem.tsx";

/*
type FileItem = {
    uuid: string;
    path: string;
    site: string;
    type: string;
}

type FileStatus = {
    start_time: string;
    lapsed_time: string;
    size: string;
}*/
/*
type Status = {
    is_recording: boolean;
    files?: Array<FileStatus>
}*/

// This is for a single LiDAR at a intersection - currently just the ip_address and cardinal direction is stored for a single lidar.

type Site = {
    siteId: number; // PK

    city: string;
    state: string;

    crossStreet: string;
    primaryStreet: string;
}

const inital_sites: Array<Site> = [
    {
        siteId: 1,
        city: "Reno",
        state: "NV",
        crossStreet: "15th Street",
        primaryStreet: "Virginia Street"
    },
    {
        siteId: 2,
        city: "Reno",
        state: "NV",
        crossStreet: "College Drive",
        primaryStreet: "Virginia Street"
    },
    {
        siteId: 3,
        city: "Reno",
        state: "NV",
        crossStreet: "Artemesia Way",
        primaryStreet: "Virginia Street"
    },
    {
        siteId: 4,
        city: "Reno",
        state: "NV",
        crossStreet: "9th Street",
        primaryStreet: "Virginia Street"
    },
    {
        siteId: 5,
        city: "Reno",
        state: "NV",
        crossStreet: "8th Street",
        primaryStreet: "Virginia Street"
    },
    {
        siteId: 6,
        city: "Reno",
        state: "NV",
        crossStreet: "Maple Street",
        primaryStreet: "Virginia Street"
    },
    {
        siteId: 7,
        city: "Reno",
        state: "NV",
        crossStreet: "6th Street",
        primaryStreet: "Virginia Street"
    },
    {
        siteId: 8,
        city: "Reno",
        state: "NV",
        crossStreet: "5th Street",
        primaryStreet: "Virginia Street"
    }

]

export type Deployment = {
    deploymentId: number; // PK

    corner: 'NW' | 'NE' | 'SW' | 'SE';
    latitude: number;
    longitude: number;

    siteId: number; // FK

}

const inital_deployments: Array<Deployment> = [
    {
        deploymentId: 0,

        corner: 'SE',
        longitude: 39.543936,
        latitude: -119.818294,

        siteId: 1
    },
    {
        deploymentId: 1,

        corner: 'NW',
        longitude: 39.543840,
        latitude: -119.818724,

        siteId: 1
    },
    {
        deploymentId: 2,

        corner: 'NE',
        longitude: 39.540712,
        latitude: -119.817038,

        siteId: 2
    },
    {
        deploymentId: 3,

        corner: 'SW',
        longitude: 39.540520,
        latitude: -119.817271,

        siteId: 2
    },
    {
        deploymentId: 4,

        corner: 'NE',
        longitude: 39.538757,
        latitude: -119.816924,

        siteId: 3
    },
    {
        deploymentId: 5,

        corner: 'SW',
        longitude: 39.538571,
        latitude: -119.817126,

        siteId: 3
    },
    {
        deploymentId: 6,

        corner: 'NE',
        longitude: 39.536329,
        latitude: -119.816082,

        siteId: 4
    },
    {
        deploymentId: 7,

        corner: 'SW',
        longitude: 39.536071,
        latitude: -119.816312,

        siteId: 4
    },
    {
        deploymentId: 8,

        corner: 'NW',
        longitude: 39.53507,
        latitude: -119.81604,

        siteId: 5
    },
    {
        deploymentId: 9,

        corner: 'SE',
        longitude: 39.534977,
        latitude: -119.815683,

        siteId: 5
    },
]

type DeploymentItem = {
    isSelected: boolean;
} & Deployment;

type IntersectionItem = {
    site: Site;
    deployments: Array<DeploymentItem>
}

// Make a query for intersections (side_id)
// Make a query for sensors (deployment_id)
// OR
// Assume each intersection has deployment array (containing two deployments)

export default function CapturePage() {

    const handleClick = event => {

        console.log(event)
    }

    const [markers, setMarkers] = useState<Array<ReactNode>>([])

    const [sites, setSites] = useState<Array<Site>>(inital_sites);
    const [deployments, setDeployments] = useState<Array<Deployment>>(inital_deployments);
    const [deploymentItems, setDeploymentItems] = useState<Array<DeploymentItem>>(createDeployments)
    const [intersectionItems, setIntersectionItems] = useState<Array<IntersectionItem>>(createIntersection)
    function createDeployments() {
        const deploymentItems: Array<DeploymentItem> = deployments.map(deployment => {
            return {
                isSelected: false,
                ...deployment
            }
        })

        return deploymentItems;
    }

    function createIntersection() {

        return sites.map(site => {

            const filteredDeployments: Array<DeploymentItem> = deploymentItems.filter(deployment => {
                if (deployment.siteId === site.siteId) {
                    return deployment;
                }
                return;
            })

            return {
                site: site,
                deployments: filteredDeployments
            }

        })

    }


    useEffect(() => {


        console.log(deploymentItems)
        console.log(intersectionItems)

        setMarkers(() => {

            const newMarkers: Array<ReactNode> = [];

            intersectionItems.map(intersectionItem => {



                intersectionItem.deployments.map(deployment => {
                    if (deployment.isSelected) {

                        newMarkers.push(<CircleMarker eventHandlers={{click: () => console.log(deployment)}} key={deployment.deploymentId} center={[deployment.longitude, deployment.latitude  ]} radius={7} fill={true} fillOpacity={0.75} fillColor={'#60a5fa'} stroke={true} color={'#2563eb'} />)
                    }
                })
            })

            return newMarkers;
        })

    }, [deploymentItems, intersectionItems])

    return (
        <div className='flex flex-col gap-4 xl:flex-row '>
            <div className='bg-stone-600 h-[400px] w-full rounded-xl md:bg-rose-400 xl:bg-emerald-400 xl:h-full xl:w-2/5'>
                <MapContainer center={[39.538639, -119.817014]} zoom={18} scrollWheelZoom={false} className='w-full h-full rounded-xl shadow-xl'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <>
                        {
                            deploymentItems.map((deployment) => {
                                return <CircleMarker eventHandlers={{click: () => console.log(deployment)}} key={deployment.deploymentId} center={[deployment.longitude, deployment.latitude  ]} radius={7} fill={true} fillOpacity={0.75} fillColor={'#60a5fa'} stroke={true} color={'#2563eb'} />
                            })
                        }
                    </>
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

/*
    return (
        <div className='flex flex-col gap-4 xl:flex-row xl:h-full'>
            <div className='bg-stone-600 h-[650px] w-full rounded-xl md:bg-rose-400 xl:bg-emerald-400 xl:h-full xl:w-2/5'>
                map
            </div>
            <div className=''>
                <div className=''>
                    <p className='text-xl font-semibold text-neutral-400 mb-2'>
                        Selected Intersections
                    </p>
                    <div className='flex flex-col gap-4'>
                        {
                            sensors.map((intersection: LidarSelectionProps) => {
                                return (
                                    <div className='rounded'>
                                        <p className='font-semibold text-neutral-400 border-b-2 border-neutral-200'>
                                            { intersection.cross_street }
                                        </p>
                                        <div className=''>
                                            {
                                                intersection.lidars.map((lidar: Lidar) => {
                                                    return (
                                                        <div className='flex flex-row gap-2'>
                                                            <input className='appearance-none' type='checkbox' value={lidar.id} name={lidar.id} checked={true} />
                                                            <div>
                                                                <p>
                                                                    { lidar.id }
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    { lidar.ip_address }
                                                                </p>
                                                            </div>
                                                            <div className='flex flex-row gap-2 '>
                                                                <div className=''>
                                                                    <p>
                                                                        Latitude
                                                                    </p>
                                                                    <p>
                                                                        {lidar.latitude}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p>
                                                                        Longitude
                                                                    </p>
                                                                    <p>
                                                                        {lidar.longitude}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p>
                                                                        { lidar.cardinal_direction }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>*/
    )
}