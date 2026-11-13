import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"

export const useBuscarNiveis = () => {
    return useQuery({ 
        queryKey:["niveis"], 
        queryFn: async() => { 
            const res = await AXIOS.get("/niveis");
            return res.data;
        } 
});
      
}
export const useCriarNiveis = () => {
    return useMutation({ 
        mutationFn: async(dados) => { 
            const res = await AXIOS.post("/niveis".dados);
            return res.data;
        },
        onSuccess: () => {
            QueryClient.invalidateQueries({
                queryKey:["niveis"]
            });
        }
});
      
}