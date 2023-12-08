import Tag from "./Tag.tsx";
import { InformationCircleIcon, MapPinIcon} from "@heroicons/react/24/solid";
import ItemButton from "./ItemButton.tsx";
import {FullDataUsageStatus, RecordingStatus, SensorDisabledStatus} from "./Status.tsx";
import {SensorItem_t} from "../types.tsx";
import {gql, useQuery} from "@apollo/client";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import LoadingWheel from "./LoadingWheel.tsx";
import {useEffect} from "react";

export type SensorItemProps_t = {
    className?: string;
} & SensorItem_t

export default function SensorItem({lidarId, siteId, crossStreet, street, className}: SensorItemProps_t) {

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



    return (
        <div className={`${className} flex flex-col gap-4 bg-neutral-100 p-4 rounded-lg`}>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-grow gap-2 place-items-center'>
                        <Tag className='bg-neutral-400 w-fit' label={`ID: ${lidarId}`} />
                        <p className='flex font-semibold leading-tight'>
                            {street} &bull; {crossStreet}
                        </p>
                    </div>
                    <Tag className='w-fit' label={loading ? '--' : 'SW'} />
                </div>
            <div className='flex flex-row gap-2 justify-between'>
                <div className='flex flex-row gap-2'>
                    <ItemButton label='Sensor' iconElement={<InformationCircleIcon />} />
                    <ItemButton label='Site' iconElement={<InformationCircleIcon />} />
                </div>
                <ItemButton className='hidden md:flex' label='Locate' iconElement={<MapPinIcon />} />
            </div>
        </div>
    )
}