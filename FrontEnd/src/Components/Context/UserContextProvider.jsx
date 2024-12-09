import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";


const UserContextProvider = ({ children }) => {

    const [newCom, setNewCom] = useState(true)
    
    const [userName, setUserName] = useState(() => {
        const storedUserName = localStorage.getItem("userName");
        return storedUserName || "null"; 
    });

    const [status, setStatus] = useState(() => {
        const storedStatus = localStorage.getItem("status");
        return storedStatus || "null"; 
    });

    const [avatar, setAvatar] = useState(() => {
        const storedAvatar = localStorage.getItem("avatar");
        return storedAvatar || "null"; 
    });
    useEffect(() => {
        localStorage.setItem("userName", userName);
    }, [userName]);

    useEffect(() => {
        localStorage.setItem("status", status);
    }, [status]);

    useEffect(() => {
        localStorage.setItem("avatar", avatar);
    }, [avatar]);

    return (
        <UserContext.Provider value={{ userName, setUserName, status, setStatus, avatar, setAvatar ,newCom , setNewCom}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;