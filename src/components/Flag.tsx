import {cloneElement, ReactElement} from "react";

export type FlagProps_t = {
    colorClass: string;
    iconElement: ReactElement;
};

export default function Flag({colorClass, iconElement}: FlagProps_t) {

    const flagClasses: string = `${colorClass} w-6 h-6 p-1 rounded-md text-white`;

    return cloneElement(iconElement, {
        className: flagClasses
    });
}