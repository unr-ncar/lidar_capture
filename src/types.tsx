type Site = {
    siteId: number; // PK

    city: string;
    state: string;

    crossStreet: string;
    primaryStreet: string;
}

/*type SiteItem = {
    deployments: Array<DeploymentItem>;
} & Site;*/

type Deployment = {
    deploymentId: number; // PK

    corner: 'NW' | 'NE' | 'SW' | 'SE';
    latitude: number;
    longitude: number;

    siteId: number; // FK

}

/*type DeploymentItem = {
    isSelected: boolean;
} & Deployment;*/

export type { Site, Deployment }