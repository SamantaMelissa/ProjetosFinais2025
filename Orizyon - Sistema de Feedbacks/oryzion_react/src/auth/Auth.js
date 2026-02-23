import { jwtDecode } from "jwt-decode";

export const userDecodeToken = (token) => {
    const decodificado = jwtDecode(token);

    return {
        idUsuario: decodificado.jti,
        token: token,
        imagem: decodificado.imagem,
        tipoUsuario: decodificado["Tipo do usuário"] || decodificado.tipoUsuario,
        nome: decodificado.nome,
        email: decodificado.email || decodificado.Email 
    }
}