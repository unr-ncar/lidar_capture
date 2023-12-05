type Site_t = {
    siteId: number; // PK
    ipAddress: string;

    city: string;
    state: string;

    crossStreet: string;
    primaryStreet: string;
}

type SiteItem_t = {
    deployments: Array<DeploymentItem_t>;
} & Site_t;

type Deployment_t = {
    deploymentId: number; // PK

    corner: 'NW' | 'NE' | 'SW' | 'SE';
    latitude: number;
    longitude: number;

    siteId: number; // FK

    status?: DeploymentStatus_t;
    telemetry?: DeploymentTelemetry_t;
}

type DeploymentStatus_t = {
    isRecording: boolean;
    timeStarted?: string;
    timeElapsed?: number;
    files?: Array<DeploymentFile_t>
}

type DeploymentFile_t = {
    fileName: string;
    fileSize: string;
}

type DeploymentTelemetry_t = {
    storageSize?: number;
    storageUsage?: number;
}

type DeploymentItem_t = {
    isSelected: boolean;
} & Deployment_t;

export type { Site_t, SiteItem_t, Deployment_t, DeploymentItem_t }

type Site_nt = {
    siteId: number;
    ip: string;

    state: string;
    city: string;
    street: string;
    crossStreet: string;

    pcapService?
}

type LiDAR_nt = {
    isRecording: boolean;
}