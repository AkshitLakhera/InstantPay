import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import Landing from './components/Landinpage';
import Confirmation from './components/confirmation';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element= {<Landing/>} />
      <Route path='/signup' element= {<Signup/>} />
      <Route path='/signin' element= {<Signin/>} />
      <Route path='/dashboard' element= {<Dashboard/>} />
      <Route path='/send' element= {<SendMoney/>} />
      <Route path='/confirmation' element= {<Confirmation/>} />

    </Routes>
    </BrowserRouter>

  )
}

export default App

