import { Button } from "antd";
import { LuPlus } from "react-icons/lu";

const Niveis = () => {
    return ( 
        <div>
            <div className="flex justify-between item-center mb-4">
                <h2 className="text-3xl font-bold">Níveis</h2>
                <Button 
                    type="primary" 
                    icon={<LuPlus/>}
                >Novo nível</Button>
            </div>
            
            <div>
                <Table>
                    <Table.Column 
                    title="nome"
                    dataIndex="none" />  
                </Table>
            </div>
        </div>
        
    );
}
 
export default Niveis;