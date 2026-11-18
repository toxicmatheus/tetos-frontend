import { useMutation, useQuery } from "@tanstack/react-query"
import { AXIOS, QUERYCLIENT } from "../services";

export const useBuscarImoveis-tipo = () => {
    return useQuery({ 
        queryKey:["imoveis-tipo"], 
        queryFn: async() => { 
            const res = await AXIOS.get("/imoveis-tipo");
            return res.data;
        } 
});    
}

export const useCriarNivel = () => {
    return useMutation({ 
        mutationFn: async(dados) => { 
            const res = await AXIOS.post("/imoveis-tipo".dados);
            return res.data;
        },
        onSuccess: () => {
            QueryClient.invalidateQueries({
                queryKey:["imoveis-tipo"]
            });
        }
});
      
}
export const useEditarNivel = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const res = await AXIOS.put(`/imoveis-tipo/${dados.id}`, dados);
            return res.data;
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey:["imoveis-tipo"]
            });
        }
    });
}

export const useDeletarNivel = () => {
    return useMutation({
        mutationFn: async (id) => {
            const res = await AXIOS.delete(`/imoveis-tipo/${id}`);
            return res.data;
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey:["imoveis-tipo"]
            });
        }
    });
}