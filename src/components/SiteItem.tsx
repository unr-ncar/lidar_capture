import { SiteItem_t} from "../types.tsx";
import {ReactNode} from "react";

type SiteItemProps_t = {
    children: Array<ReactNode>
} & SiteItem_t;

export default function SiteItem({siteId, city, state, crossStreet, primaryStreet, children}: SiteItemProps_t) {

    return (
        <div className='flex flex-row place-content-between place-items-center bg-white rounded-md shadow-md p-4'>
            <div className='flex flex-col leading-snug'>
                <p className='font-semibold'>
                    {primaryStreet} &bull; {crossStreet}
                </p>
                <p className='text-sm'>
                    {city}, {state}
                </p>
            </div>
            <div className='flex flex-row gap-2'>
                { children }
            </div>
        </div>
    )
}