    import {Accommodation} from './Accommodation';
    import {RoomReservations} from './RoomReservations';
    
    export class Room {
        id: number;
        roomNumber: number;
        bedCount: number;
        description: string;
        pricePerNight: number;
        accommodation: Accommodation;
        roomReservationss: RoomReservations[];
    }