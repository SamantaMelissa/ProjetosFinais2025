import React from 'react'
import "./Video.css"
import videozin from "../../../assets/img/VideoTeste.mp4"
export const Video = () => {
    return (
        <>
            <div className='main_videos'>
                <div className='sessao_videos'>

                    <video width="640" height="360" controls>
                        <source src= {videozin} type="video/mp4" />
                        {/* <source src="./videos/landscape.webm" type="video/webm" /> /}
                        {/ O seu navegador não suporta a tag de vídeo */}
                    </video>

                </div>

                <div className='titulo_descricao'>
                        <h2>Como macacos mecanicos salvam o mundo</h2>
                        <p>Aprenda hoje como macacos mecanicos tem o poder de salvar o mundo</p>

                </div>


            </div>

        </>
    )
}

export default Video;
