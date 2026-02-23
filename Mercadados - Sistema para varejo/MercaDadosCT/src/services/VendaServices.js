import api from "./api";

export const registrarVenda = async (produtoID, valor, quantidade) => {
  const venda = {
    produtoID,
    valor: Number(valor),
    quantidade: Number(quantidade),
    dataVenda: new Date().toISOString() // 👈 A HOME LÊ ASSIM
  };

  const resposta = await api.post("Venda/Cadastrar", venda);
  return resposta.data;
};
