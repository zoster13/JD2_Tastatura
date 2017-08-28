    import {Place} from './Place';
    import {AccommodationType} from './AccommodationType';
    import {Room} from './Room';
    import {AppUser} from './AppUser';
    import {Comment} from './Comment';
    
    export class Accommodation {
        Id: number;
        Name: string;
        Description: string;
        Address: string;
        AverageGrade: number;
        Longitude: number;
        Latitude: number;
        ImageURL: string;
        Approved: boolean;
        Place: Place;
        AccommodationType: AccommodationType;
        //Rooms: Room[];
        //Comments: Comment[];
        Owner: AppUser;
    }