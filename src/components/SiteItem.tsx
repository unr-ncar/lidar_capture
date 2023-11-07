import { SiteItem_t} from "../types.tsx";
import {ReactNode} from "react";
import MetadataBubble from "./MetadataBubble.tsx";

type SiteItemProps_t = {
    children: Array<ReactNode>
} & SiteItem_t;

const server_icon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
        <path fillRule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clipRule="evenodd" />
    </svg>
)

const map_pin_icon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
    </svg>
)

export default function SiteItem({siteId, ipAddress, city, state, crossStreet, primaryStreet, children}: SiteItemProps_t) {

    return (
        <div className='flex flex-col bg-white rounded-md p-4 gap-2 '>
            <p className='font-semibold text-center'>
                {primaryStreet} &bull; {crossStreet}
            </p>
            <div className='grid grid-cols-2 gap-2'>
                <MetadataBubble icon={server_icon}>{ipAddress}</MetadataBubble>
                <MetadataBubble icon={<span className='font-semibold leading-tight'> Site ID </span>}> {String(siteId)} </MetadataBubble>
                <MetadataBubble icon={map_pin_icon}>{city}, {state}</MetadataBubble>
            </div>
            <div className='flex flex-col gap-2'>
                { children }
            </div>
        </div>
    )
}