    import {Region} from './Region';
    import {Accommodation} from './Accommodation';
    
    export class Place {
        id: number;
        name: string;
        region: Region;
        accommodations: Accommodation[];
    }