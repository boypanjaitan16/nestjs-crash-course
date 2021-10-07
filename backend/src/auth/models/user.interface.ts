import { FeedPost } from "src/feed/models/post.interface";
import { Role } from "./role.enum";

export interface User {
    id?  : number,
    first_name?  : string,
    last_name?   : string,
    email?       : string,
    password?   : string,
    role?        : Role,
    posts?  : FeedPost
}