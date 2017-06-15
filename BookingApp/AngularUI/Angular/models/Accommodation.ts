    import {Place} from './Place';
    import {AccommodationType} from './AccommodationType';
    import {Room} from './Room';
    import {AppUser} from './AppUser';
    import {Comment} from './Comment';
    
    export class Accommodation {
        id: number;
        name: string;
        description: string;
        address: string;
        averageGrade: number;
        longitude: number;
        latitude: number;
        imageURL: string;
        approved: boolean;
        place: Place;
        accommodationType: AccommodationType;
        rooms: Room[];
        comments: Comment[];
        owner: AppUser;
    }