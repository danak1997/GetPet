import { createContext, Dispatch, SetStateAction } from "react";

export interface User {
    loggedIn: boolean;
    name?: string;
    savedPets?: [{
        id: string,
        name: string,
        description: string,
        profilePhoto: string,
        tags: string[],
        updatedAt: string
    }]
}

type UserCtx = [User, Dispatch<SetStateAction<User>>];

const UserContext = createContext<UserCtx>([{
    loggedIn: false,
    name: ''
}, () => {}]);

export default UserContext;
