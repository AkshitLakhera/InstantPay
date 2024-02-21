import { useNavigate } from "react-router-dom"

export default function Confirmation(){
    const navigate=useNavigate();
    return(<div className="h-screen flex flex-col justify-center items-center">
    
    <h1 className="text-3xl font-bold  mb-2">Transfer Succesful</h1>

    <button className="p-2 rounded-md bg-black text-white" onClick={()=>{navigate('/dashboard')}}>Go back to dashboard</button>
    
    </div>)
}