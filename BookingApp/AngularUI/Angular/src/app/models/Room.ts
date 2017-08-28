    import {Accommodation} from './Accommodation';
    import {RoomReservations} from './RoomReservations';
    
    export class Room {
        Id: number;
        RoomNumber: number;
        BedCount: number;
        Description: string;
        PricePerNight: number;
        Accommodation: Accommodation;
        //RoomReservationss: RoomReservations[];
    }