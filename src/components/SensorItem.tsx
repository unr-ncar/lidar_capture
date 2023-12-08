import Tag from "./Tag.tsx";
import { InformationCircleIcon, MapPinIcon} from "@heroicons/react/24/solid";
import ItemButton from "./ItemButton.tsx";
import {SensorItem_t} from "../types.tsx";
import {gql, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import {
    CriticalDataUsageStatus, ErrorLoadingStatus,
    FullDataUsageStatus,
    RecordingStatus,
} from "./Status.tsx";
import {useNavigate} from "react-router-dom";

export type SensorItemProps_t = {
    className?: string;
} & SensorItem_t

export type Status_t = {
    storage: {
        totalSpace: number,
        usedSpace: number,
        freeSpace: number
    },
    pcapService: {
        isRecording: boolean;
        start: number;
        elapsed: number;
        lidarId: number;
        corner: string;
    },
    rosService: {
        isRecording: boolean;
        start: number;
        elapsed: number;
        lidarId: number;
        corner: string;
    }
}

export default function SensorItem({lidarId, deploymentId, siteId, crossStreet, street, className}: SensorItemProps_t) {

    const [status, setStatus] = useState<Status_t | null>(null)

    const navigate = useNavigate();

    const GET_STATUS = gql`
        {
          getSystemInfo (siteIds:[${siteId}]) {
            siteId
            totalSpace
            usedSpace
            freeSpace
          }
          getStatus (siteIds:[${siteId}]) {
            pcapService {
              isRecording
              start
              elapsed
              lidarId
              corner
            }
            rosService {
              isRecording
              start
              elapsed
              lidarId
              corner
            }
          }
        }`
    const { loading, error, data } = useQuery(GET_STATUS);

    useEffect(() => {
        if (loading || error) {
            return;
        }

        const storage = data['getSystemInfo'][0]
        const pcapService = data['getStatus'][0]['pcapService'][deploymentId];
        const rosService = data['getStatus'][0]['pcapService'][deploymentId];

        setStatus({
            storage: storage,
            pcapService: pcapService,
            rosService: rosService
        })

    }, [deploymentId, data, error, loading]);

    function renderCorner() {
        if (loading) {
            return <Tag label='--' />
        }

        if (error) {
            return <Tag label='ERR' />
        }

        return <Tag label={status?.pcapService.corner || status?.rosService.corner} />
    }

    function renderDateUsageStatus() {

        if (!status) {
            return
        }

        const usage: number = status?.storage.usedSpace/status?.storage.totalSpace * 100;

        if (usage >= 80) {
            return <FullDataUsageStatus siteId={siteId} />
        }

        if (usage >= 60) {
            return <CriticalDataUsageStatus siteId={siteId} />
        }

        return
    }

    return (
        <div className={`${className} flex flex-col gap-4 bg-neutral-100 p-4 rounded-lg`}>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-grow gap-2 place-items-center'>
                        <Tag className='bg-neutral-400' label={`ID: ${lidarId}`} />
                        <p className='flex font-semibold leading-tight'>
                            {street} &bull; {crossStreet}
                        </p>
                    </div>
                    { renderCorner() }
                </div>
            { loading && <div className='w-full h-[65px] bg-neutral-300 animate-pulse rounded-md' /> }
            { error && <ErrorLoadingStatus errorTitle={error.name} errorDescription={error.extraInfo} /> }
            { status && status.pcapService.isRecording && <RecordingStatus startTime={status.pcapService.start} elapsedTime={status.pcapService.elapsed} serviceType='pcap' lidarId={lidarId} /> }
            { status && status.rosService.isRecording && <RecordingStatus startTime={status.rosService.start} elapsedTime={status.rosService.elapsed} serviceType='ros' lidarId={lidarId} /> }
            { renderDateUsageStatus() }
            <div className='flex flex-row gap-2 justify-between'>
                <div className='flex flex-row gap-2'>
                    <ItemButton onClick={() => navigate(`/capture/sensor/${lidarId}`)} label='Sensor' iconElement={<InformationCircleIcon />} />
                    <ItemButton onClick={() => navigate(`/capture/site/${siteId}`)} label='Site' iconElement={<InformationCircleIcon />} />
                </div>
                <ItemButton className='hidden md:flex' label='Locate' iconElement={<MapPinIcon />} />
            </div>
        </div>
    )
}