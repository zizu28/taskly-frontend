import { createContext, useContext, useState } from "react";

const UserContext = createContext()

export const UserProvider = props => {
    const [user, setUser] = useState(null)
    const updateUser = user => setUser(user)
    const value = {user, updateUser}

    return (
        <UserContext.Provider value={value}>
            {props.Children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if(context === undefined){
        throw new Error("useUser hook must be used with a UserProvider")
    }
    return context
}