import HeaderMenu from "../../components/headerMenu/HeaderMenu";
import "./ListaTV.css"

import img from "../../assets/img/senai.png"

import { Link } from "react-router-dom";

const ListaTV = () => {
    return (
        <>
            <HeaderMenu />

            <main className="main_lista">
                <h1>Lista de TVs</h1>

                <div className="campos">
                    <div className="linha">
                        <div className="card_local">
                            <Link to="/visualizarTV"><img src={img} alt="" /></Link>
                            <p>Refeitório</p>
                        </div>
                        <div className="card_local">
                            <Link to="/visualizarTV"><img src={img} alt="" /></Link>
                            <p>Auditório</p>
                        </div>
                        <div className="card_local">
                            <Link to="/visualizarTV"><img src={img} alt="" /></Link>
                            <p>Recepção</p>
                        </div>
                        <div className="card_local">
                            <Link to="/visualizarTV"><img src={img} alt="" /></Link>
                            <p>Coworking</p>
                        </div>
                    </div>
                    <div className="linha">
                        <div className="card_local">
                            <Link to="/visualizarTV"><img src={img} alt="" /></Link>
                            <p>Biblioteca</p>
                        </div>
                        <div className="card_local">
                            <Link to="/visualizarTV"><img src={img} alt="" /></Link>
                            <p>Secretaria</p>
                        </div>
                        <div className="card_local">
                            <Link to="/visualizarTV"><img src={img} alt="" /></Link>
                            <p>Coordenação</p>
                        </div>
                        <div className="card_local">
                            <Link to="/visualizarTV"><img src={img} alt="" /></Link>
                            <p>Sala da AQV</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ListaTV;