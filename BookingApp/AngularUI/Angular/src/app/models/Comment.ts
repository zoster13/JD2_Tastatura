    import {Accommodation} from './Accommodation';
    import {AppUser} from './AppUser';
    
    
    export class Comment {
        Id: number;
        Grade: number;
        Text: string;
        Accommodation: Accommodation;
        User: AppUser;
    }