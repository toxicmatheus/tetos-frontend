import { useMutation } from "@tanstack/react-query";
import { AXIOS } from "../services";

export const useLogin = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const res = await AXIOS.post("/login", dados);
            return res.data;
        }
    });
};