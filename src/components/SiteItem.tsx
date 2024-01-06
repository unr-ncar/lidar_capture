import {Tag} from "./Tag.tsx";
import {ReactElement} from "react";

interface SiteItemHeaderProps_t {
    siteId: number;
    primaryStreet: string;
    crossStreet: string;
}
function SiteItemHeader({siteId, primaryStreet, crossStreet}: SiteItemHeaderProps_t) {
    return (
        <div>
            <Tag label="LIDAR ID" description={String(siteId)} />
            <p>
                {primaryStreet} &bull; {crossStreet}
            </p>
        </div>
    )
}

interface SiteItemProps_t {
    siteId: number;
    primaryStreet: string;
    crossStreet: string;
    children: Array<ReactElement>;
}
export default function SiteItem({siteId, primaryStreet, crossStreet, children}: SiteItemProps_t) {
    return (
        <div>
            <SiteItemHeader siteId={siteId} primaryStreet={primaryStreet} crossStreet={crossStreet} />
            <div className="">
                { children }
            </div>
        </div>
    )
}