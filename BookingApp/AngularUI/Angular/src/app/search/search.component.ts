import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name : 'AccommodationFilterPipe',
})

export class AccommodationFilterPipe implements PipeTransform {
    transform(accommodations: any, term: any): any {

        //check if accommodations is undefined
        if (term===undefined) {
            return accommodations;
        }

        term = term.toLowerCase();

        //return updated accommodations array
        var accomms =  accommodations.filter(function(accomm:any) {
            return accomm.Name.toLowerCase().indexOf(term) > -1;
        })

        return accomms;
    }
}
