import { AppUser } from "./app_user.model";
import { GBU } from "./gbu.model";

export class Team{
    id:number;
    name:string;
    gbu:GBU;
    members:AppUser[];
} 