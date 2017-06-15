    import {Room} from './Room';
    import {AppUser} from './AppUser';
    
    export class RoomReservations {
        id: number;
        startDate: Date;
        endDate: Date;
        timestamp: Date;
        room: Room;
        user: AppUser;
    }