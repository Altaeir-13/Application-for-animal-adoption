import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Este código JavaScript garante que o ano no copyright esteja sempre atualizado */}
        <p>&copy; {new Date().getFullYear()} Adote Já. Todos os direitos reservados.</p>
        <p>Promovendo o amor e a adoção de animais em Caxias, MA.</p>
      </div>
    </footer>
  );
}