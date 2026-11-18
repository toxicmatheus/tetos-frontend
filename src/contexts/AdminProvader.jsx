import { createContext, useState } from "react";


export const AdminContext = createContext();
const AdminProvider = ({ children }) => {
    const [token, setToken] = useState();


    function logout(){ 
        sessionStorage.clear();
        setToken(null);
        window.location.href = "/"
    }

    return ( 
        <AdminContext.Provider value={{token, setToken, logout}}>
            { children }
        </AdminContext.Provider>
    );
}
 
export default AdminProvider;