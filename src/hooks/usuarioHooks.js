import { useMutation } from "@tanstack/react-query"
import { AXIOS } from "../services"

export const useLogin = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const res = await AXIOS.post("/login", dados);
            return res.data;
        }
    })
}

export const useCriarUsuario = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const res = await AXIOS.post("/usuarios", dados);
            return res.data;
        }
    })
}