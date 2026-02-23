import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5128/api",
  headers: {
    "Content-Type": "application/json"
  }
});

const listarPorFeedback = (idFeedback) => {
  return api.get(`/Resposta/chamado/${idFeedback}`);
};

const enviarMensagem = (mensagem) => {
  const payload = {
    IdFeedback: mensagem.IdFeedback,
    IdUsuario: mensagem.IdUsuario,
    Texto: mensagem.Texto,
    Data: mensagem.Data || new Date().toISOString()
  };

  return api.post("/Resposta", payload);
};

export default { listarPorFeedback, enviarMensagem };
