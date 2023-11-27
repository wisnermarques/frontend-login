import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

function Registro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const urlBase = "http://localhost:3001/api/user/save";

  const handleRegistro = async () => {
    try {
      // Requisição POST para uma API fictícia de cadastro de usuários
      const response = await axios.post(urlBase, {
        nome: nome,
        email: email,
        senha: senha,
      });

      console.log("Usuário cadastrado com sucesso:", response.data);

      // Lógica para redirecionar após o registro, por exemplo:
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      // Trate o erro da forma desejada, exibindo uma mensagem de erro, por exemplo.
    }
  };

  return (
    <>
    <Header />
   
    <div className="container mt-3 animate__animated animate__fadeIn">
      <h2 className="text-center">Registro</h2>
      
      <form className="bg-light p-4 mx-auto my-3">
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome:
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="form-label">
            Senha:
          </label>
          <input
            type="password"
            className="form-control"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRegistro}
        >
          Registrar
        </button>
        <p className="mt-3 text-center">
          Já tem uma conta? <Link to="/login">Faça login aqui</Link>.
        </p>
      </form>
    </div>
    <Footer />
    </>
  );
}

export default Registro;
