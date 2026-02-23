import './App.css'
import { Route, Routes } from 'react-router-dom'
import Cadastro from './pages/cadastro/Cadastro'
import Login from './pages/login/Login'
import Menu from './pages/menu/Menu'
import Anuncio from './pages/anuncio/Anuncio'
import CadastroTV from "./pages/cadastroTV/CadastroTV"
import VisualizarTV from "./pages/visualizarTv/VisualizarTV"
import ListaTV from "./pages/listaTV/ListaTV"

function App() {
  return (
  //  <Cadastro/>
  //  <Login/>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/anuncio" element={<Anuncio />} />
        <Route path="/cadastroTV" element={<CadastroTV />} />
        <Route path="/visualizarTV" element={<VisualizarTV />} />
        <Route path="/listagemTV" element={<ListaTV />} />
    </Routes>
  )
}

export default App
