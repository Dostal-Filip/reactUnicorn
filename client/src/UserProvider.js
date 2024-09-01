import { createContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {


    return (
        <UserContext.Provider
            value={true}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;