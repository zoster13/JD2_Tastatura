import {Injectable} from '@angular/core';
import {Room} from '../models/Room';

import {Rooms} from '../mock-objects/rooms-mock';

@Injectable()
export class RoomsService {
    
    getRooms(id: number): Promise<Room[]> {
        return Promise.resolve(Rooms);
    }
}