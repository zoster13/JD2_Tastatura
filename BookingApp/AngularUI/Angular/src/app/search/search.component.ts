import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name : 'AccommodationFilterPipe',
})

export class AccommodationFilterPipe implements PipeTransform {
    transform(accommodations, args:any[]): any {

        let nameTerm = args[0];
        let addressTerm = args[1];
        let placeTerm = args[2];
        let aTypeTerm = args[3];

        let filtredAccommodations = accommodations;

        if(nameTerm !== undefined)
        {
            nameTerm = nameTerm.toLowerCase();

            //return updated accommodations array
            filtredAccommodations =  filtredAccommodations.filter(function(accomm:any) {
                return ((accomm.Name.toLowerCase().indexOf(nameTerm) > -1));
            })
        }

        if(addressTerm !== undefined)
        {
            addressTerm = addressTerm.toLowerCase();

            //return updated accommodations array
            filtredAccommodations =  filtredAccommodations.filter(function(accomm:any) {
                return ((accomm.Address.toLowerCase().indexOf(addressTerm) > -1));
            })
        }

        if(placeTerm !== undefined)
        {
            placeTerm = placeTerm.toLowerCase();

            //return updated accommodations array
            filtredAccommodations =  filtredAccommodations.filter(function(accomm:any) {
                return ((accomm.Place.Name.toLowerCase().indexOf(placeTerm) > -1));
            })
        }
        
        if(aTypeTerm !== undefined)
        {
            aTypeTerm = aTypeTerm.toLowerCase();

            //return updated accommodations array
            filtredAccommodations =  filtredAccommodations.filter(function(accomm:any) {
                return ((accomm.AccommodationType.Name.toLowerCase().indexOf(aTypeTerm) > -1));
            })
        }

        return filtredAccommodations;
    }
}
