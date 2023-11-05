type Site = {
    siteId: number; // PK

    city: string;
    state: string;

    crossStreet: string;
    primaryStreet: string;
}

type Deployment = {
    deploymentId: number; // PK

    corner: 'NW' | 'NE' | 'SW' | 'SE';
    latitude: number;
    longitude: number;

    siteId: number; // FK

}

export type { Site, Deployment }