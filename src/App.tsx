import {NavLink, NavLinkProps, Outlet} from "react-router-dom";
import {ReactElement} from "react";
import {FolderIcon, RectangleGroupIcon, VideoCameraIcon} from "@heroicons/react/24/solid";

interface AppNavigationButtonProps_t extends NavLinkProps {
    label: string;
    iconElement: ReactElement;
}
function AppNavigationButton(props: AppNavigationButtonProps_t) {

    const {label, iconElement, ...rest} = props;

    return (
        <NavLink {...rest} className='flex flex-col text-neutral-300 [&.active]:text-black p-3 md:gap-1 md:place-items-center md:p-0 md:hover:text-black md:transition-colors'>
            <span className='[&>*]:size-5 [&>*]:md:size-7'>
                {iconElement}
            </span>
            <p className='hidden md:block md:font-semibold'>
                {label}
            </p>
        </NavLink>
    )
}

function AppNavigation() {
    return (
        <nav className='w-full flex flex-row justify-around md:flex-col md:w-min md:justify-start md:gap-6 md:px-3 md:pt-6'>
            <AppNavigationButton label='Dashboard' iconElement={<RectangleGroupIcon/>} to='/'/>
            <AppNavigationButton label='Capture' iconElement={<VideoCameraIcon/>} to='/capture'/>
            <AppNavigationButton label='Explorer' iconElement={<FolderIcon/>} to='/explorer'/>
        </nav>
    )
}

function App() {
    return (
        <div className='flex flex-col-reverse h-svh max-h-svh overflow-y-auto md:flex-row'>
            <AppNavigation/>
            <div className='grow max-h-full overflow-y-auto'>
                <Outlet/>
            </div>
        </div>
    )
}

export default App
