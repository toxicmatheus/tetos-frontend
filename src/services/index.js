import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const APIURL = "http://localhost:3000"
// export const APIURL = "http://"

export const AXIOS = axios.create({
    baseURL: APIURL
});

export const QUERYCLIENT = new QueryClient();