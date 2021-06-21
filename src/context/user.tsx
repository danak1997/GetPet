import { createContext, Dispatch, SetStateAction } from "react";

interface User {
    loggedIn: boolean;
    name: string;
}

type UserCtx = [User, Dispatch<SetStateAction<User>>];

const UserContext = createContext<UserCtx>([{
    loggedIn: false,
    name: ''
}, () => {}]);

export default UserContext;
