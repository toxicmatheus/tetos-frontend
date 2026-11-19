import { App, Button, Drawer, Form, Input, Popconfirm, Table } from "antd";
import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";
import { useBuscarUsuarios, useCriarUsuarios, useDeletarUsuarios, useEditarUsuarios } from "../hooks/usuarioHooks";
import { useState } from "react";
import { useBuscarNiveis } from "../hooks/niveisHooks";


const Usuarios = () => {

    const [ mostrarCriar, setMostrarCriar] = useState(false);
    const [ mostrarEditar, setMostrarEditar] = useState(false);
    const { notification } = App.useApp();
    const { data: tipos, isLoading: loadingUsuarios } = useBuscarUsuarios();
    const { data: niveis } = useBuscarNiveis();
    const { mutate: criarUsuarios, isLoading: loadingCriar } = useCriarUsuarios();
    const { mutate: editarUsuarios, isLoading: loadingEditar } = useEditarUsuarios();
    const { mutate: deletarUsuarios } = useDeletarUsuarios();
    const [ formCriar ] = Form.useForm();
    const [ formEditar ] = Form.useForm();

    function criar(dados){
        criarUsuarios(dados, {
            onSuccess: ({ type, description }) => {
                setMostrarCriar(false);
                formCriar.resetFields();
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

    function editar(dados){
        editarUsuarios(dados, {
            onSuccess: ({ type, description }) => {
                setMostrarEditar(false);
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

    function deletar(id){
        deletarUsuarios(id, {
            onSuccess: ({ type, description }) => {
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
                <h2 className="text-3xl font-bold">Usuarios</h2>
                <Button
                    type="primary"
                    icon={<LuPlus />}
                    onClick={() => setMostrarCriar(true)}
                >Novo usuario</Button>
            </div>

            <div>
                <Table
                    dataSource={tipos || []}
                    loading={loadingUsuarios}
                    rowKey={"id"}
                >
                    <Table.Column
                        title="Nome"
                        dataIndex="nome"
                    />
                    <Table.Column
                        title="Email"
                        dataIndex="email"
                    />
                    <Table.Column
                        title="Nível"
                        dataIndex={["nível", "nome"]}
                    />
                    <Table.Column
                        title="Ações"
                        className="w-25"
                        render={(_, linha) => (
                            <div className="flex gap-2">
                                <Button
                                    icon={<LuPencil />}
                                    type="primary"
                                    onClick={() => {
                                        formEditar.setFieldValue("id", linha.id);
                                        formEditar.setFieldValue("nome", linha.nome);
                                        formEditar.setFieldValue("telefone", linha.telefone);
                                        formEditar.setFieldValue("cpf_cnpj", linha.cpf_cnpj);
                                        setMostrarEditar(true);
                                    }}
                                />
                                <Popconfirm
                                    title="Aviso:"
                                    description="Deseja realmente apagar?"
                                    okText="Sim"
                                    cancelText="Não"
                                    onConfirm={() => deletar(linha.id)}
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

            <Drawer
                title="Criar"
                open={mostrarCriar}
                onClose={() => setMostrarCriar(false)}
            >
                <Form
                    layout="vertical"
                    onFinish={criar}
                    form={formCriar}
                >
                    <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="nome do nível" />
                    </Form.Item>
                    <Form.Item
                        label="Telefone"
                        name="telefone"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="(00) 00000-0000" />
                    </Form.Item>
                    <Form.Item
                        label="CPF/CNPJ"
                        name="cpf_cnpj"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="000.000.000-00" />
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

            <Drawer
                title="Editar"
                open={mostrarEditar}
                onClose={() => setMostrarEditar(false)}
            >
                <Form
                    layout="vertical"
                    onFinish={editar}
                    form={formEditar}
                >
                    <Form.Item
                        name="id"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="nome do nível" />
                    </Form.Item>
                    <Form.Item
                        label="Telefone"
                        name="telefone"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="(00) 00000-0000" />
                    </Form.Item>
                    <Form.Item
                        label="CPF/CNPJ"
                        name="cpf_cnpj"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="000.000.000-00" />
                    </Form.Item>
                    <div className="flex justify-end">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loadingEditar}
                        >
                            Enviar
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </div>
    );
}

export default Usuarios;