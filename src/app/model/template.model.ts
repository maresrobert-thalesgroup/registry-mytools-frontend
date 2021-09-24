import { AppUser } from "./app_user.model";
import { GBU } from "./gbu.model";
import { Team } from "./team.model";

export class Template {
    id: number;
    requestBy: AppUser;
    requestFor: AppUser;
    floorAccess: number[];
    kitRequired: String;
}