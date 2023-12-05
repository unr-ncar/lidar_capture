import {NavLink, NavLinkProps} from "react-router-dom";
import {cloneElement, ReactElement} from "react";
import {FolderArrowDownIcon, VideoCameraIcon} from "@heroicons/react/24/solid";

type NavigationProps_t = {
    className?: string;
}
export default function Navigation({className}: NavigationProps_t) {
    return (
        <nav className={`${className} flex flex-row place-items-center bg-black p-3 gap-3 xl:flex-col`}>
            <PrimaryNavigationLink label="Capture" iconElement={<VideoCameraIcon />} to={"/capture"} />
            <PrimaryNavigationLink label="Explorer" iconElement={<FolderArrowDownIcon />} to={"/explorer"} />
        </nav>
    )
}

type PrimaryNavigationLinkProps_t = {
    label: string;
    iconElement: ReactElement;
} & NavLinkProps;
function PrimaryNavigationLink(props: PrimaryNavigationLinkProps_t) {

    const {label, iconElement, ...rest} = props;

    const icon  = cloneElement(iconElement, {
        className: 'w-4 h-4 xl:w-6 xl:h-6'
    })

    return (
        <NavLink {...rest} className='flex flex-row text-white/60 place-items-center gap-1 text-xs font-semibold [&.active]:text-white xl:flex-col xl:w-16 xl:h-16 xl:justify-center'>
            { icon }
            <p className='text-sm font-semibold leading-tight'>
                { label }
            </p>
        </NavLink>
    )
}