import React from 'react'
import "./Modulos.css"
import { Header } from '../../Components/Header/header'
import {Footer} from '../../Components/Footer/footer'
import {Texto} from '../../Components/Modulos/Texto/Texto'
import {Video} from '../../Components/Modulos/Video/Video'


export const Modulos = () => {
    return (
        <>
            <Header/>
            <div className='main_modulos'>


                <div className='divisor_modulos'>

                    <div className='numerador_modulos'>

                        <h3>Módulos de Aprendizado</h3>

                        <div className='indicador_modulos'>
                            <p>Módulo</p>
                            <h2>1</h2>
                        </div>

                        <div className='indicador_modulos'>
                            <p>Módulo</p>
                            <h2>2</h2>
                        </div>

                        <div className='indicador_modulos'>
                            <p>Módulo</p>
                            <h2>3</h2>
                        </div>

                        <div className='indicador_modulos'>
                            <p>Módulo</p>
                            <h2>4</h2>
                        </div>

                        <div className='indicador_modulos'>
                            <p>Módulo</p>
                            <h2>5</h2>
                        </div>

                    </div>

                    <div className='divisor_modulo2'>
                        <Video/>
                         <Texto/>
                    </div>

                </div>
                <div className="img_modulos"></div>

            </div>
            <Footer/>

        </>
    )
}