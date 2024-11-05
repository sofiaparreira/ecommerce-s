import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input/Input";

const Adicionar = () => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [preco, setPreco] = useState(0.0);
  const [quantidade, setQuantidade] = useState(0);
  const navigate = useNavigate()

  const createProduct = async (e) => {
    e.preventDefault();
    const productData = {
      nome,
      tipo,
      preco,
      quantidade,
    };

    try {
      const response = await fetch("http://localhost:3000/product/adicionar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Produto adicionado com sucesso:", data);
        navigate("/home")
      } else {
        console.error("Erro ao cadastrar produto:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao realizar a requisição:", error);
    }
  };

  return (
    <>
      <h1 className="mt-16 text-center text-xl">Cadastrar Produto</h1>
      <div className="flex items-center justify-center w-full h-screen">
        <form onSubmit={createProduct} class="w-1/2 mx-auto">
          <Input onChange={(e) => setNome(e.target.value)} text={"Nome"} />
          <Input onChange={(e) => setTipo(e.target.value)} text={"Tipo"} />

          <div class="grid md:grid-cols-2 md:gap-6">
            <Input onChange={(e) => setPreco(e.target.value)} text={"Preço"} />
            <Input
              onChange={(e) => setQuantidade(e.target.value)}
              text={"Quantidade"}
            />
          </div>

          <div className="flex gap-8">
            <button
              type="submit"
              class="text-white mt-8 bg-sky-400 hover:bg-sky-300 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-16 py-2.5 text-center "
            >
              Cadastrar
            </button>
            <Link
              className="mt-8 text-gray-600 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none rounded-lg text-sm w-full sm:w-auto px-16 py-2.5 text-center"
              to="/admin"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Adicionar;
