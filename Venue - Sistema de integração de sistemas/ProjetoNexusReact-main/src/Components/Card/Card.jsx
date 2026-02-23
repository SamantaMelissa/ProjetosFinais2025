import React from 'react'
import imgCard from "../../assets/img/IconDiscord.svg";
import {Botao} from "../../Components/Botao/botao"

export const Card = (props) => {
    return(
        <>
        <div className='card_ferramentas'>
        <img src = {imgCard} alt="" />
                        <p>{props.Titulo}</p>
                        <Botao
                        nomeBotao = "Acessar"
                        />
        </div>
        </>
    )
}