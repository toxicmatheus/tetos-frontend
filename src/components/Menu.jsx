import { ConfigProvider } from "antd";
import { NavLink } from "react-router";

const Menu = () => {
    return ( 
        <header className="w-55 bg-blue-500 p-4">
            <h1 className="text-4xl font-semibold text-white">Tetos</h1>
            <nav className="flex flex-col *:leading-10 *:font-semibold *:text-white! *:hover:bg-white/25! *:rounded *:duration-200! pt-4 gap-y-2">
                <NavLink end to="/painel">Home</NavLink>
                <NavLink end to="/painel/niveis">Níveis</NavLink>
            </nav>
        </header>
     );
}
 
export default Menu;