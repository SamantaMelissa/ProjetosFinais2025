import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Carrega usuário do localStorage ou API
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuarioSalvo);
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};
