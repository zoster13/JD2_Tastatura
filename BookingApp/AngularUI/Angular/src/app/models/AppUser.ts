    import {Accommodation} from './Accommodation';
    import {RoomReservations} from './RoomReservations';
    
    export class AppUser {
        Id: number;
        FullName: string;
        Username: string;
        Email: string;
        Password: string;
        //RoomReservationss: RoomReservations[];
        //Comments: Comment[];
        //Accommodations: Accommodation[];
        IsBanned: boolean;
    }