import {ReactNode} from "react";

type MetadataBubble_t = {
    icon: ReactNode;
    children: Array<string> | string;
}
export default function MetadataBubble({icon, children}: MetadataBubble_t) {
    return (
        <div className='flex flex-row text-sm px-1.5 py-0.5 bg-neutral-200 justify-between place-items-center place-content-center rounded'>
            <span>
                { icon }
            </span>
            <p>
                { children }
            </p>
        </div>
    )
}