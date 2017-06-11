import {Country} from './Country';
import {Place} from './Place';

export class Region {
        id: number;
        name: string;
        country: Country;
        places: Place[];
}