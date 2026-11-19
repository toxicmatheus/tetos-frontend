import { Navigate } from "react-router";
import { AXIOS } from "../services";
import { useContext } from "react";
import { AdminContext } from "../contexts/AdminProvider";

const RotaProtegida = ({ children }) => {

    const { token, logout } = useContext(AdminContext);

    AXIOS.interceptors.request.use(
        function (config) {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    AXIOS.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            if(error.status == 401){
                logout();
            }
            return Promise.reject(error);
        }
    );

    return token ? children : <Navigate to="/" />
}

export default RotaProtegida;