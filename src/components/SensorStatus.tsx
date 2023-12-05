import {ReactElement} from "react";

export type SensorStatusProps_t = {
    flagElement: ReactElement;
    children: ReactElement;
}

export default function SensorStatus({ flagElement, children}: SensorStatusProps_t) {
    return (
        <div className='flex flex-row'>
            <span className=''>
                { flagElement }
            </span>
            <div className='border-l-2 border-neutral-300 pl-2'> { children } </div>
        </div>
    )
}