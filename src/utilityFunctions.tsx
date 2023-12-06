import {Metadata_t, Sensor_t, SensorItem_t, StatusInfoType_t, StorageInfoType_t} from "./types.tsx";

export function createSensorObject(metadata: Metadata_t, storageInfo: StorageInfoType_t, statusInfo: StatusInfoType_t): Sensor_t {

    return {
        crossStreet: metadata.cross_street,
        dataPort: metadata.data_port,
        deploymentId: metadata.deployment_id,
        frontDirection: metadata.front_direction,
        interface: metadata.interface,
        intersectionCenter: {
                latitude: metadata.latitude,
                longitude: metadata.longitude
            },
        latitude: metadata.latitude,
        lidarId: metadata.lidar_id,
        lidarIp: metadata.lidar_ip,
        longitude: metadata.longitude,
        model: metadata.model,
        mqttTopic: metadata.mqtt_topic,
        nmeaPort: metadata.nmea_port,
        services: {
                pcap: {
                        corner: statusInfo.pcapService.corner,
                        elapsed: statusInfo.pcapService.elapsed,
                        fileInformation: statusInfo.pcapService.fileInformation,
                        isRecording: statusInfo.pcapService.isRecording,
                        lidarId: statusInfo.pcapService.lidarId,
                        start: statusInfo.pcapService.start
                    },
                ros: {
                    corner: statusInfo.rosService.corner,
                    elapsed: statusInfo.rosService.elapsed,
                    fileInformation: statusInfo.rosService.fileInformation,
                    isRecording: statusInfo.rosService.isRecording,
                    lidarId: statusInfo.rosService.lidarId,
                    start: statusInfo.rosService.start
                }
        },
        siteId: metadata.site_id,
        siteIp: metadata.ip,
        state: metadata.state,
        street: metadata.street,
        siteStatus: {
            totalSpace: storageInfo.totalSpace,
            usedSpace: storageInfo.usedSpace,
            freeSpace: storageInfo.freeSpace
        }
    }
}

export function createSensorItem(criticalThreshold: number = 60, fullThreshold: number = 80, sensorObject: Sensor_t): SensorItem_t {

    const currentCapacity: number = Number(sensorObject.siteStatus.freeSpace) / Number(sensorObject.siteStatus.usedSpace) * 100;

    let storageStatus: "stable" | "critical" | "full" = "stable";
    let sensorIsAvailable: boolean = true;

        if (currentCapacity >= fullThreshold) {
            storageStatus = "full"
            sensorIsAvailable = false;
        } else if (currentCapacity >= criticalThreshold) {
            storageStatus = "critical"
            sensorIsAvailable = false;
        } else {
            storageStatus = "stable"
        }

        if (sensorObject.services.pcap.isRecording || sensorObject.services.ros.isRecording) {
            sensorIsAvailable = false;
        }

    return {
        crossStreet: sensorObject.crossStreet,
        street: sensorObject.street,
        lidarId: sensorObject.lidarId,
        siteId: sensorObject.siteId,
        corner: sensorObject.services.pcap.corner || sensorObject.services.ros.corner,
        latitude: sensorObject.latitude,
        longitude: sensorObject.longitude,
        isAvailable:  sensorIsAvailable,
        services: sensorObject.services,
        intersectionCenter: {
            latitude: sensorObject.intersectionCenter.latitude,
            longitude: sensorObject.intersectionCenter.longitude
        },
        siteStorage: {
            status: storageStatus,
            totalSpace: sensorObject.siteStatus.totalSpace,
            usedSpace: sensorObject.siteStatus.usedSpace,
            freeSpace: sensorObject.siteStatus.freeSpace
        }
    }
}