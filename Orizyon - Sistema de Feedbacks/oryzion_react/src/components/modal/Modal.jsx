export default function Modal({ onClose }) {
  return (
    // ...
    <div className="modal-botao" onClick={onClose}>
      <div
        className="modal-conteudo"
        onClick={(e) => e.stopPropagation()}
        >
        <div className="modal-header">
          <img src="/img/Usuario.svg" alt="Usuário" /> 
          <h2>Suporte</h2>
        </div>
      </div>
    </div>
  );
}