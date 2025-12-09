import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Products from './components/Products'
import FinanceDept from './components/FinanceDept'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/finance" element={<FinanceDept/>}/>
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
