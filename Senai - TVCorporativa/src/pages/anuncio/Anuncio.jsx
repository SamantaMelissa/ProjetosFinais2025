import HeaderMenu from "../../components/headerMenu/HeaderMenu";
import { useState } from "react"
import "./Anuncio.css"

import plus from "../../assets/img/plus.svg"


const Anuncio = () => {
    const [thumb, setThumb] = useState(null);
    const [preview, setPreview] = useState(null);


    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setThumb(event.target.result);
            setPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    };







    return (
        <>
            <HeaderMenu />

            <main className="main_anuncio">
                <h1>Cadastrar anúncio</h1>
                <form className="form_anuncio">
                    {/* LINHA 1 */}
                    <div className="linha">
                        <div>
                            <label className="label">Título:</label>
                            <input type="text" className="input" />
                        </div>

                        <div>
                            <label className="label">Imagem</label><br />

                            <label className="upload-box">
                                <input type="file" accept="image/*" hidden onChange={handleUpload} />

                                {thumb ? (
                                    <img src={thumb} className="thumb" />
                                ) : (
                                    <img
                                        src={plus}
                                        className="thumb-icon"
                                        alt="add"
                                    />
                                )}
                            </label>
                        </div>

                        <div>
                            <label className="label">Categoria</label>
                            <input type="text" className="input" />
                        </div>
                    </div>

                    {/* LINHA 2 */}
                    <div className="linha">
                        <div>
                            <label className="label">Data início</label>
                            <input type="date" className="input" />
                        </div>

                        <div>
                            <label className="label">Data fim</label>
                            <input type="date" className="input" />
                        </div>
                    </div>

                    {/* TV */}
                    <div>
                        <label className="label">TV</label>
                        {/* <input type="text" className="input tv-input" /> */}
                        <select name="" id="" className="input tv-input">
                            <option value="">TV 01</option>
                            <option value="">TV 02</option>
                            <option value="">TV 03</option>
                            <option value="">TV 04</option>
                        </select>
                    </div>

                    {/* PREVIEW */}
                    <div className="preview-box">
                        {preview ? (
                            <img src={preview} className="preview-image" />
                        ) : (
                            <span className="preview-text">Pré-Visualização</span>
                        )}
                    </div>

                    <div className="botoes">
                        <button className="botao_azul">Salvar</button>
                        <button className="botao_azul">Cadastrar</button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default Anuncio;