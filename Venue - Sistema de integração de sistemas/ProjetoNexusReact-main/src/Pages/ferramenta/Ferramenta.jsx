import React from 'react'
import "./Ferramenta.css"
import imgCard from "../../assets/img/IconDiscord.svg";
import  Header  from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx"
import { Card } from "../../Components/Card/Card.jsx";

 export default function Ferramentas ()  {
  return (
    <>
    <Header/>

      <div className='main_ferramentas'>

        <div className='titulo_ferramentas'>
            <h2>Ferramentas</h2>
        </div>
        
        <div className='sessao_ferramentas'>

        <Card 
        Titulo= "Discord"
        />
        <Card
        Titulo= "Discord"
        />
        <Card 
        Titulo= "Discord"
        />
        <Card
        Titulo= "Discord"
        />
        <Card 
        Titulo= "Discord"
        />
        <Card
        Titulo= "Discord"
        />

          </div>

        </div>

    <Footer/>

    </>
  )
}

