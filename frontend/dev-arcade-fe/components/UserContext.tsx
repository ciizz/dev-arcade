import React from "react";
import { useContext,useState } from "react";

interface userUpdate {
    (address: string) : void
}

const UserAddressContext = React.createContext(""); // context to hold the address of the user's wallet
const UserUpdateAddressContext = React.createContext<userUpdate>((address:string) => {}); // context to update the value of the user address


export const useUserAddress = () => { // custom hook that retuns the value of the context
    return useContext(UserAddressContext); 
}

export const useUserUpdateAddress = () => { // custom hook that returns the value of the context 
    return useContext(UserUpdateAddressContext); 
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const [userAddress, setUserAddress] = useState<string>(""); 

    const updateAddress = (address: string) : (void) => {
        setUserAddress(address)
    }; 

    return (
        <UserAddressContext.Provider value={userAddress}>
            <UserUpdateAddressContext.Provider value={updateAddress}>
            {children}
            </UserUpdateAddressContext.Provider>
        </UserAddressContext.Provider>
 
    ); 
}

