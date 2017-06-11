import {Injectable} from '@angular/core';
import {Accommodation} from '../models/Accommodation';

import {Accommodations} from '../mock-objects/accommodation-mock';

@Injectable()
export class AccommodationService {
    
    getAccommodations() : Promise<Accommodation[]> {
        return Promise.resolve(Accommodations);
    }

    getAccommodation(id: number): Promise<Accommodation> {
        return this.getAccommodations()
             .then(accomms => accomms.find(accomm => accomm.id === id));
    }
             
}