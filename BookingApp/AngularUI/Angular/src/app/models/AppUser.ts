    import {Accommodation} from './Accommodation';
    import {RoomReservations} from './RoomReservations';
    
    export class AppUser {
        id: number;
        fullName: string;
        username: string;
        email: string;
        password: string;
        roomReservationss: RoomReservations[];
        comments: Comment[];
        accommodations: Accommodation[];
    }