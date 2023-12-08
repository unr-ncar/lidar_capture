export type Metadata_t = {
    lidar_id: number;
    site_id: number;
    deployment_id: number;
    state: string;
    city: string;
    street: string;
    cross_street: string;
    mqtt_topic: string;
    data_port: number;
    nmea_port: number;
    interface: string;
    front_direction: number;
    lidar_ip: string;
    ip: string;
    model: string;
    latitude: number;
    longitude: number;
    intersection_center: {
        latitude: number;
        longitude: number;
    }
}

export type SensorItem_t = {
    lidarId: number;
    siteId: number;
    deploymentId: number;
    state: string;
    street: string;
    crossStreet: string;
    lidarIp: string;
    ip: string;
    latitude: number;
    longitude: number;
    intersectionCenter: {
        latitude: number;
        longitude: number;
    }
}

export type StorageInfoType_t = {
    totalSpace: string;
    usedSpace: string;
    freeSpace: string;
    host: string;
    siteId: number;
}
export type FileInformation_t = {
    fileName: string;
    fileSize: string;
    creationTime: number;
    lastModified: number;
}
export type PcapInfoType_t = {
    isRecording: boolean;
    start: number;
    elapsed: number;
    fileInformation: Array<FileInformation_t>
    lidarId: number;
    corner: string;
}
export type RosInfoType_t = {
    isRecording: boolean;
    start: number;
    elapsed: number;
    fileInformation: Array<FileInformation_t>
    lidarId: number;
    corner: string;
}
export type StatusInfoType_t = {
    pcapService?: PcapInfoType_t;
    rosService?: RosInfoType_t;
    ip?: string;
    siteId: number;
    state?: string;
    city?: string;
    street?: string;
    crossStreet?: string;
}

export type Sensor_t = {
    lidarId: number;
    siteId: number;
    deploymentId: number;
    state: string;
    street: string;
    crossStreet: string;
    mqttTopic: string;
    dataPort: number;
    nmeaPort: number;
    interface: string;
    frontDirection: number;
    lidarIp: string;
    siteIp: string;
    model: string;
    latitude: number;
    longitude: number;
    intersectionCenter: {
        latitude: number;
        longitude: number;
    }
    services: {
        pcap: {
            isRecording: boolean;
            start: number;
            elapsed: number;
            fileInformation: Array<FileInformation_t>
            lidarId: number;
            corner: string;
        }
        ros: {
            isRecording: boolean;
            start: number;
            elapsed: number;
            fileInformation: Array<FileInformation_t>
            lidarId: number;
            corner: string;
        }
    }
    siteStatus: {
        totalSpace: string;
        usedSpace: string;
        freeSpace: string;
    }
};

/*
export type SensorItem_t = {
    crossStreet: string;
    street: string;
    lidarId: number;
    siteId: number;
    corner: string;
    latitude: number;
    longitude: number;
    isAvailable: boolean;
    services: {
        pcap: {
            isRecording: boolean;
            start: number;
            elapsed: number;
            fileInformation: Array<FileInformation_t>
            lidarId: number;
            corner: string;
        }
        ros: {
            isRecording: boolean;
            start: number;
            elapsed: number;
            fileInformation: Array<FileInformation_t>
            lidarId: number;
            corner: string;
        }
    }
    intersectionCenter: {
        latitude: number;
        longitude: number;
    }
    siteStorage: {
        status: "stable" | "critical" | "full";
        totalSpace: string;
        usedSpace: string;
        freeSpace: string;
    }
};

export type SensorSelection_t = {
    isSelected: true;
} & SensorItem_t;

*/