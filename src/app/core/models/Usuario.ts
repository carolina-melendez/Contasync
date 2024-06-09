import { Rol } from '../models/Rol'; 

export class User{
    id?: number;
    name?: string;
    password?: string;
    email?: string;
    roles?: Rol[];
}