import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const value =   {isAuthorized: true };

    return (
        <UserContext.Provider
            value={true}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;