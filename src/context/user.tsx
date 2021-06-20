import { createContext, Dispatch, SetStateAction } from "react";

interface User {
    loggedIn: boolean;
}

type UserCtx = [User, Dispatch<SetStateAction<User>>];

const UserContext = createContext<UserCtx>([{
    loggedIn: false
}, () => {}]);

export default UserContext;
