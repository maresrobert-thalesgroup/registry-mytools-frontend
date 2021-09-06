import { AppUserRole } from "./app_user_role.model";
import { Team } from "./team.model";

export class AppUser{
    id:number;
    email:string;
    firstName:String;
    lastName:String;
    password:String;
    hasOfficeIncomeTraining:boolean;
    role:AppUserRole;
    team:Team;
}