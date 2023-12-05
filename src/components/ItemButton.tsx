import {cloneElement, HTMLAttributes, ReactElement} from "react";

export type ItemButtonProps_t = {
    className?: string;
    iconElement?: ReactElement;
    label: string;
} &  HTMLAttributes<HTMLButtonElement>;

export default function ItemButton({className, iconElement, label}: ItemButtonProps_t) {

    let icon: ReactElement | null = null;
    const iconClasses: string ='w-4 h-4';
    if (iconElement) {
        icon = cloneElement(iconElement, {
            className: iconClasses
        });
    }

    return (
        <button className={`${className} flex flex-row gap-1.5 place-items-center font-semibold text-black text-sm bg-neutral-200 py-1 px-1.5 rounded [&.active]:text-black`}>
            { icon && icon }
            <p className='text-sm'>
                { label }
            </p>
        </button>
    )
}