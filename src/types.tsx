type Site_t = {
    siteId: number; // PK
    ip_address: string;

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

}

type DeploymentItem_t = {
    isSelected: boolean;
} & Deployment_t;

export type { Site_t, SiteItem_t, Deployment_t, DeploymentItem_t }