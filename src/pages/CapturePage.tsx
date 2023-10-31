import axios from "axios";

type FileItem = {
    uuid: string;
    path: string;
    site: string;
    type: string;
    sensor: Sensor;
}

type FileStatus = {
    start_time: string;
    lapsed_time: string;
    size: string;
}

type Status = {
    is_recording: boolean;
    files: Array<FileStatus>
}

// This is for a single LiDAR at a intersection - currently just the ip_address and cardinal direction is stored for a single lidar.
type Sensor = {
    uuid: string;

    cross_street: string;
    primary_street: string;
    cardinal_direction: 'NW' | 'NE' | 'SW' | 'SE';

    city: string;
    state: string;
    zipcode: number;
    latitude: number;
    longitude: number;

    created: string;
    last_updated: string;
}

type LidarSelectionProps = {
    cross_street: string;
    lidars: Array<Lidar>;
}

const sensors: Array<Sensor> = [
    {
        uuid: "1a2b3c4d",
        cross_street: "Main St",
        primary_street: "Elm St",
        cardinal_direction: "NW",
        city: "Exampleville",
        state: "CA",
        zipcode: 12345,
        latitude: 37.7749,
        longitude: -122.4194,
        created: "2023-01-15",
        last_updated: "2023-10-30"
    },
    {
        uuid: "5e6f7g8h",
        cross_street: "Oak St",
        primary_street: "Pine St",
        cardinal_direction: "NE",
        city: "Sampletown",
        state: "NY",
        zipcode: 54321,
        latitude: 40.7128,
        longitude: -74.0060,
        created: "2023-02-20",
        last_updated: "2023-10-30"
    },
    {
        uuid: "9i0j1k2l",
        cross_street: "Cedar St",
        primary_street: "Maple St",
        cardinal_direction: "SW",
        city: "Model City",
        state: "TX",
        zipcode: 67890,
        latitude: 32.7767,
        longitude: -96.7970,
        created: "2023-03-25",
        last_updated: "2023-10-30"
    },
    {
        uuid: "3m4n5o6p",
        cross_street: "Birch St",
        primary_street: "Willow St",
        cardinal_direction: "SE",
        city: "Testville",
        state: "FL",
        zipcode: 13579,
        latitude: 25.7617,
        longitude: -80.1918,
        created: "2023-04-10",
        last_updated: "2023-10-30"
    }
];

export default function CapturePage() {

    axios.get('http://134.197.75.31:32141/intersections')

    return (
        <div className='flex flex-col gap-4 xl:flex-row xl:h-full'>
            <div className='bg-stone-600 h-[650px] w-full rounded-xl md:bg-rose-400 xl:bg-emerald-400 xl:h-full xl:w-2/5'>
                map
            </div>
            <div className=''>
                <div className=''>
                    <p className='text-xl font-semibold text-neutral-400 mb-2'>
                        Selected Intersections
                    </p>
                    <div className='flex flex-col gap-4'>
                        {
                            intersections.map((intersection: LidarSelectionProps) => {
                                return (
                                    <div className='rounded'>
                                        <p className='font-semibold text-neutral-400 border-b-2 border-neutral-200'>
                                            { intersection.cross_street }
                                        </p>
                                        <div className=''>
                                            {
                                                intersection.lidars.map((lidar: Lidar) => {
                                                    return (
                                                        <div className='flex flex-row gap-2'>
                                                            <input className='appearance-none' type='checkbox' value={lidar.id} name={lidar.id} checked={true} />
                                                            <div>
                                                                <p>
                                                                    { lidar.id }
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    { lidar.ip_address }
                                                                </p>
                                                            </div>
                                                            <div className='flex flex-row gap-2 '>
                                                                <div className=''>
                                                                    <p>
                                                                        Latitude
                                                                    </p>
                                                                    <p>
                                                                        {lidar.latitude}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p>
                                                                        Longitude
                                                                    </p>
                                                                    <p>
                                                                        {lidar.longitude}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p>
                                                                        { lidar.cardinal_direction }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}