    import {Room} from './Room';
    import {AppUser} from './AppUser';
    
    export class RoomReservations {
        Id: number;
        StartDate: Date;
        EndDate: Date;
        Timestamp: Date;
        Room: Room;
        User: AppUser;
    }