import {cloneElement, HTMLAttributes, ReactElement} from "react";

export type WidgetProps_t = {
    colorClass: string;
    iconElement: ReactElement;
} & HTMLAttributes<HTMLButtonElement>;

export default function ItemWidget(props: WidgetProps_t) {

    const { colorClass, iconElement, ...rest } = props;
    const iconElementClasses: string = `w-5 h-5 text-white`;

    const formattedIconElement = cloneElement(iconElement, {
        className: iconElementClasses
    })

    return (
        <button className={`${colorClass ? colorClass : 'bg-black'} p-2 h-min rounded-full`} {...rest}>
            { formattedIconElement }
        </button>
    )
}