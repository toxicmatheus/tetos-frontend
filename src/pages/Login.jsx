import { App, Button, Form, Input } from "antd";
import { useLogin } from "../hooks/usuarioHooks";
import { useNavigate } from "react-router";

const Login = () => {

    const navigate = useNavigate();
    const { notification } = App.useApp();
    const { mutate: login, isPending: loginPending } = useLogin();

    function logar(dados) {
        login(dados, {
            onSuccess: ({ type, description, usuario, token }) => {
                notification[type]({
                    description
                });
                if (type == "success") {
                    sessionStorage.setItem("token", token);
                    sessionStorage.setItem("usuario", JSON.stringify(usuario));
                    navigate("/painel");
                }
            },
            onError: ({ response: { data: { type, description } } }) => {
                notification[type]({
                    description
                });
            }
        })
    }

    return (
        <div className="h-screen flex justify-center items-center bg-blue-500">
            <div className="w-75 p-4 bg-white rounded-2xl">
                <Form
                    layout="vertical"
                    onFinish={logar}
                >
                    <Form.Item
                        label="Email"
                        name={"email"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="email@email.com" />
                    </Form.Item>
                    <Form.Item
                        label="Senha"
                        name={"senha"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input.Password placeholder="*********" />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full mt-4"
                        loading={loginPending}
                    >Enviar</Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;