import { useState, useRef } from "react";
import axios from "axios";
import "../../Pages/cadastroCurso/CadastroCurso.css";

export default function CadastroCurso() {
  const [imagemPreview, setImagemPreview] = useState(null);
  const [imagemCapa, setImagemCapa] = useState("");
  const inputRef = useRef(null);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [mensagem, setMensagem] = useState("");


  const handleClick = () => {
    inputRef.current.click();
  };

  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPreview(reader.result);
        setImagemCapa(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleImageLink = (e) => {
    const link = e.target.value;
    setImagemCapa(link);
    setImagemPreview(link);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoCurso = {
      titulo: nome,
      descricao: descricao,
      url: urlVideo,
      imagemCapa: imagemCapa, 
      progresso: 0,
      idExterno: "",
    };

    try {
      await axios.post("https://localhost:7079/api/Cursos", novoCurso, {
        headers: { "Content-Type": "application/json" },
      });

      setMensagem("✅ Curso cadastrado com sucesso!");
      setNome("");
      setDescricao("");
      setUrlVideo("");
      setImagemCapa("");
      setImagemPreview(null);
    } catch (error) {
      console.error("Erro ao cadastrar curso:", error);
      setMensagem("❌ Erro ao cadastrar curso!");
    }
  };

  return (
    <main className="boa">
      <div className="Janela_CadastroCurso">
        <form onSubmit={handleSubmit}>
          <div className="IMAGEMM">
            <div className="ArrumarNomeEscolher">
              <p className="Cour">Imagem do Curso:</p>
            </div>

            <button type="button" className="ImagemCurso" onClick={handleClick}>
              {imagemPreview ? (
                <img
                  src={imagemPreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <p className="TextoEscolher">Clique para escolher imagem</p>
              )}
            </button>

            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            
            <div className="Campo" style={{ marginTop: "10px" }}>
              <label className="LabelCurso">Ou cole o link da imagem:</label>
              <input
                className="InputCurso"
                type="text"
                placeholder="https://exemplo.com/imagem.jpg"
                value={imagemCapa}
                onChange={handleImageLink}
              />
            </div>
          </div>

          <div className="BlocoInputs">
            <div className="Campo">
              <label className="LabelCurso">Nome do Curso</label>
              <input
                className="InputCurso"
                type="text"
                placeholder="Digite o nome..."
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="Campo">
              <label className="LabelCurso">Descrição</label>
              <textarea
                className="InputDescricao"
                placeholder="Descreva o curso..."
                rows={4}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className="Campo">
              <label className="LabelCurso">Link do vídeo (YouTube)</label>
              <input
                className="InputCurso"
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={urlVideo}
                onChange={(e) => setUrlVideo(e.target.value)}
              />
            </div>
          </div>

          <div className="Criar">
            <button className="tamanhoBotaocriar" type="submit">
              Criar
            </button>
          </div>

          {mensagem && (
            <p style={{ color: "white", marginTop: "10px" }}>{mensagem}</p>
          )}
        </form>
      </div>
    </main>
  );
}
