import Flag from "../Flag.tsx";
import {FolderMinusIcon} from "@heroicons/react/20/solid";

export default function CriticalDataUsageFlag() {
    return <Flag colorClass={'bg-orange-400'} iconElement={<FolderMinusIcon />} />
}