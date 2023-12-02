import {VideoCameraIcon} from "@heroicons/react/20/solid";
import Flag from "../Flag.tsx";

export default function RecordingFlag() {
    return <Flag colorClass={'bg-red-400'} iconElement={<VideoCameraIcon />} />
}