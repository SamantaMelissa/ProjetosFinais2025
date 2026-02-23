import HeaderMenu from "../../components/headerMenu/HeaderMenu";
import "./VisualizarTV.css"

import img from "../../assets/img/exemploTV.png"
import lixeira from "../../assets/img/Trash.svg"
import caneta from "../../assets/img/Pencil.svg"

const VisualizarTV = () => {
    return(
        <>
            <HeaderMenu/>
            <main className="main_visualziador">
                <div className="campo_visualizador">
                    <h1>Visualizar TV do Refeitório</h1>
                    <div>
                        <a href=""><img src={lixeira} alt="" /></a>
                        <a href=""><img src={caneta} alt="" /></a>
                    </div>
                </div>

                <img className="img_visualizador" src={img} alt="" />
            </main>
        </>
    )
}

export default VisualizarTV;