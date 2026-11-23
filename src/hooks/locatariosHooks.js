import { useMutation, useQuery } from "@tanstack/react-query"
import { AXIOS, QUERYCLIENT } from "../services";

export const useBuscarLocatario = () => {
    return useQuery({
        queryKey: ["locatarios"],
        queryFn: async () => {
            const res = await AXIOS.get("/locatarios");
            return res.data;
        }
    });
}

export const useCriarLocatario = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const res = await AXIOS.post("/locatarios", dados);
            return res.data;
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["locatarios"]
            })
        }
    })
}

export const useEditarLocatario = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const res = await AXIOS.put(`/locatarios/${dados.id}`, dados);
            return res.data;
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["locatarios"]
            })
        }
    })
}

export const useDeletarLocatario = () => {
    return useMutation({
        mutationFn: async (id) => {
            const res = await AXIOS.delete(`/locatarios/${id}`);
            return res.data;
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["locatarios"]
            })
        }
    })
}