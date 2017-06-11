import {Injectable} from '@angular/core';
import {Country} from '../models/Country';

import {Countries} from '../mock-objects/countries-mock';

@Injectable()
export class CountriesService {
    
    getCountries() : Promise<Country[]> {
        return Promise.resolve(Countries);
    }
}