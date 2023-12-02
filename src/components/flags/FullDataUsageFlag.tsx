import Flag from "../Flag.tsx";
import {FolderMinusIcon} from "@heroicons/react/20/solid";

export default function FullDataUsageFlag() {
    return <Flag colorClass={'bg-red-400'} iconElement={<FolderMinusIcon />} />
}