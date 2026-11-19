import { useMutation, useQuery } from "@tanstack/react-query";
import { AXIOS, QUERYCLIENT } from "../services";

// Buscar usuários
export const useBuscarUsuarios = () => {
    return useQuery({
        queryKey: ["usuarios"],
        queryFn: async () => {
            const res = await AXIOS.get("/usuarios");
            return res.data;
        }
    });
};

// Criar usuário
export const useCriarUsuarios = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const res = await AXIOS.post("/usuarios", dados);
            return res.data;
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["usuarios"]
            });
        }
    });
};

// Editar usuário
export const useEditarUsuarios = () => {
    return useMutation({
        mutationFn: async ({ id, ...dados }) => {
            const res = await AXIOS.put(`/usuarios/${id}`, dados);
            return res.data;
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["usuarios"]
            });
        }
    });
};

// Deletar usuário
export const useDeletarUsuarios = () => {
    return useMutation({
        mutationFn: async (id) => {
            const res = await AXIOS.delete(`/usuarios/${id}`);
            return res.data;
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["usuarios"]
            });
        }
    });
};

// Login
export const useLogin = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const res = await AXIOS.post("/login", dados);
            return res.data;
        }
    });
};