import HeaderMenu from "../../components/headerMenu/HeaderMenu";

const CadastroTV = () => {
    return (
        <>
            <HeaderMenu />
            <main className="main_cadastro">
                <h1>Cadastrar TV</h1>

                <form action="">
                    <div className="campo_cadastro">
                        <label htmlFor="">Nome da TV:</label>
                        <input type="text" />
                    </div>
                    <div className="campo_cadastro">
                        <label htmlFor="">Localização:</label>
                        <input type="text" />
                    </div>

                    <div className="botoes">
                        <button className="botao_azul">Cadastrar</button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default CadastroTV;