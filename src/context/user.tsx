import { createContext, Dispatch, SetStateAction } from "react";
import { Pet } from './pets';

export type User = {
    loggedIn: boolean;
    name?: string;
    savedPets?: Pet[];
}

type UserCtx = [User, Dispatch<SetStateAction<User>>];

const UserContext = createContext<UserCtx>([{
    loggedIn: false,
    name: ''
}, () => {}]);

export default UserContext;
