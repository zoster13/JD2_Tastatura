import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name : 'RoomsFilterPipe',
})

export class RoomsFilterPipe implements PipeTransform {
    transform(rooms, args:any[]): any {

        let roomNumberTerm = args[0];
        let bedCountTerm = args[1];
        let priceTerm = args[2];
        
        let filtredRooms = rooms;

        if(roomNumberTerm !== undefined)
        {
            filtredRooms =  filtredRooms.filter(function(room:any) {
                return ((room.RoomNumber == roomNumberTerm));
            })
        }

        if(bedCountTerm !== undefined)
        {
            filtredRooms =  filtredRooms.filter(function(room:any) {
                return ((room.BedCount == bedCountTerm));
            })
        }
        
        if(priceTerm !== undefined)
        {
            filtredRooms =  filtredRooms.filter(function(room:any) {
                return (room.PricePerNight < bedCountTerm);
            })
        }
        
        return filtredRooms;
    }
}
