import { jwtDecode } from "jwt-decode";


// Função que decodifica o token JWT
export function userDecodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}
