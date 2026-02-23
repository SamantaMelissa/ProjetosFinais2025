import React from 'react';
import './ErrorPage.css';
import { ArrowLeft } from 'lucide-react';

export default function ErrorPage() {
return ( <div className="error_container"> <div className="error_content"> <h1 className="error_code">404</h1> <h2 className="error_title">Página Não Encontrada</h2>
    <p className="error_message">
      Ops! Parece que o endereço que você tentou acessar não existe.
    </p>

    <button 
      className="error_button"
      onClick={() => window.history.back()}
    >
      <ArrowLeft size={18} />
      Voltar
    </button>
  </div>
</div>
);
}
