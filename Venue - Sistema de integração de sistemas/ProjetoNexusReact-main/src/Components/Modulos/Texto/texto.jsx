import React from 'react'
import "./Texto.css"

 export const Texto = () => {
    return (
        <>
    {/* // Esses componentes são para a parte de modulos/cursos, cada um é para uma funcionalidade de modulo */}
            <div className='curso_texto'>
                <div className='curso_texto_divisoria'>

                    <h2> Lorém </h2>

                    <p>What is Lorem Ipsum?

                    </p>

                </div>
                <div className='curso_texto_divisoria2'>
                    <button className='botao_texto'>Proximo Modulo</button>
                </div>

            </div>
        </>
    )
}

export default Texto;

 