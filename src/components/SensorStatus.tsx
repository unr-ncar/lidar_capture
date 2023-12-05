import {ReactElement} from "react";

export type SensorStatusProps_t = {
    flagElement: ReactElement;
    children: ReactElement;
}

export default function SensorStatus({ flagElement, children}: SensorStatusProps_t) {
    return (
        <div className='flex flex-col gap-2 p-2 rounded-lg'>
            <span className=''>
                { flagElement }
            </span>
            <div className=''> { children } </div>
        </div>
    )
}