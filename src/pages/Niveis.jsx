import { App, Button, Drawer, Form, Input, Popconfirm, Table } from "antd";
import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";
import { useBuscarNiveis, useCriarNivel, useDeletarNivel } from "../hooks/niveisHooks";
import { useState } from "react";

const Niveis = () => {

    const [ mostrarCriar, setMostrarCriar ] = useState(false);
    const { notification } = App.useApp();
    const { data: niveis, isLoading: loadingNiveis } = useBuscarNiveis();
    const { mutate: criarNivel, isLoading: loadingCriar } = useCriarNivel();
    const { mutate: deletarNivel, isLoading: loadingDeletar } = useDeletarNivel();
    const { mutate: editarNivel, isLoading: loadingEditar } = useEditarNivel();
    const[formEditar] = Form.useForm();


    function criar(dados){  
    function deletar(id){  
        deletarNivel(id, {
            onSuccess: ({ type, description}) =>{
                setMostrarCriar(false);
                notification[type]({
                    description,
                    placement: "bottomRight"
                })
            },
            onError: ({ response: { data: { type, description } } }) => {
            notification[type]({
                description
                });
            }
        })
    }
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">Níveis</h2>
                <Button
                    type="primary"
                    icon={<LuPlus />}
                    onClick={() => setMostrarCriar(true)}
                >Novo nível</Button>
            </div>

            <div>
                <Table
                    dataSource={niveis || []}
                    rowKey={"id"}
                    loading={loadingNiveis}
                >
                    <Table.Column 
                        title="Nome"
                        dataIndex="nome"
                    />
                    <Table.Column
                        className="w-25"
                        title="Ações"
                        render={(_, linha) => (
                            <div className="flex gap-2">
                                <Button
                                    icon={<LuPencil />}
                                    type="primary"
                                />
                                <Popconfirm
                                    title="Aviso:"
                                    description="Deseja realmente apagar?"
                                    okText="Sim"
                                    cancelText="Não"
                                >
                                <Button
                                    icon={<LuTrash2 />}
                                    type="primary"
                                />
                                </Popconfirm>
                            </div>
                        )}
                    />
                </Table>
            </div>
            <div>
                <Drawer
                    title="Criar"
                    open={mostrarCriar}
                    onClose={() => setMostrarCriar(false)}
                    >
                        <Form
                            layout="vertical"
                            onFinish={criar}
                        >
                            <Form.Item
                                label="Nome"
                                name="nome"
                                rules={[{ required: true, message: "Campo obrigatório"}]}
                            >
                                <Input placeholder="nome do nivel"/>
                            </Form.Item>
                            <div className="flex justify-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loadingCriar}
                                >
                                    Enviar
                                </Button>
                            </div>
                        </Form>
                </Drawer>
            </div>
        </div>
    );
}

export default Niveis;