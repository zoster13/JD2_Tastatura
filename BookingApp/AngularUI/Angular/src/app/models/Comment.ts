    import {Accommodation} from './Accommodation';
    import {AppUser} from './AppUser';
    
    
    export class Comment {
        id: number;
        grade: number;
        text: string;
        accommodation: Accommodation;
        user: AppUser;
    }