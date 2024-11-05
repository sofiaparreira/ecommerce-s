import React, { useEffect, useState } from "react";
import Input from "./Input/Input";
import { Link } from "react-router-dom";

const Card = ({ produto, onUpdate }) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const [novoNome, setNovoNome] = useState("");
  const [novaQuantidade, setNovaQuantidade] = useState(0);
  const [novoTipo, setNovoTipo] = useState("");
  const [novoPreco, setNovoPreco] = useState(0.0)

  function handleModalDelete() {
    setModalDelete(!modalDelete);
  }

  const handleModalEdit = () => {
    setModalEdit(!modalEdit);

    if (!modalEdit) {
      setNovoNome(produto.nome);
      setNovaQuantidade(produto.quantidade);
      setNovoTipo(produto.tipo);
      setNovoPreco(produto.preco);
    }
  };

  if (!produto) {
    return null;
  }

  const deletarProduto = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/product/delete/${produto.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Produto deletado");
        setModalDelete(false);
        onUpdate(); // Notifica o componente pai
      } else {
        console.log("Erro ao deletar produto");
      }
    } catch (error) {
      console.log("Erro ao deletar produto", error);
    }
  };


  const editarProduto = async (e) => {
    e.preventDefault();
  
    // Criar o objeto updateData apenas com valores alterados
    const updateData = {};
      updateData.nome = novoNome;
      updateData.preco = parseFloat(novoPreco);
      updateData.quantidade = parseInt(novaQuantidade);
      updateData.tipo = novoTipo;
  
    if (Object.keys(updateData).length === 0) {
      console.log("Nenhuma alteração feita");
      setModalEdit(false);
      return;
    }
  
    console.log(updateData)
    try {
      const response = await fetch(
        `http://localhost:3000/product/update/${produto.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
  
      if (response.ok) {
        console.log("Produto editado");
        setModalEdit(false);
        onUpdate(); 
      } else {
        console.log("Erro ao editar produto");
      }
    } catch (error) {
      console.log("Erro ao editar produto", error);
    }
  };
  
 


  

  const { nome, preco, tipo } = produto;

  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="flex w-full justify-end px-4 pt-3 gap-4">
        <button onClick={handleModalEdit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="14"
            viewBox="0 0 512 512"
          >
            <path
              className="fill-orange-500"
              d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
            />
          </svg>
        </button>
        <button onClick={handleModalDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 512 512"
          >
            <path
              className="fill-red-600"
              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
            />
          </svg>
        </button>
      </div>

      <div className="px-5 pb-5">
        <h5 className="text-lg tracking-tight text-slate-900">{nome}</h5>
        <div className="mt-4 mb-5 flex items-center justify-between">
          <p>
            <span className="text-2xl font-bold text-gray-700">
              R$ {preco.toFixed(2)}
            </span>
          </p>
          <span className="mr-2 ml-3 rounded bg-sky-100 px-2.5 py-0.5 text-xs text-sky-700 font-semibold">
            {tipo}
          </span>
        </div>
        <button className="flex items-center justify-center rounded-md bg-sky-100 px-5 py-2.5 text-center text-sm font-medium text-sky-800 hover:bg-sky-200 duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300">
          Adicionar no Carrinho
        </button>
      </div>

      {modalDelete && (
        <div className="fixed inset-0 w-full h-full">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 w-full max-w-lg">
            <div className="bg-white rounded-md shadow-lg px-4 py-6">
              <h2 className="text-lg font-medium text-gray-800">
                Excluir Produto
              </h2>
              <div className="mt-3 text-center sm:flex gap-2">
                <button
                  onClick={deletarProduto}
                  className="w-full p-2.5 text-white bg-red-600 rounded-md"
                >
                  Excluir
                </button>
                <button
                  onClick={handleModalDelete}
                  className="w-full p-2.5 text-gray-800 rounded-md border"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalEdit && (
        <div className="fixed inset-0 w-full h-full">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 w-full max-w-4xl">
            <div className="bg-white rounded-md shadow-lg px-6 py-6">
              <h2 className="text-lg font-medium text-gray-800">
                Editar Produto
              </h2>

              <form className="my-8 mx-auto">
                <Input
                  onChange={(e) => setNovoNome(e.target.value)}
                  text={"Nome"}
                  value={novoNome} 
                />
                <Input
                  onChange={(e) => setNovoTipo(e.target.value)}
                  text={"Tipo"}
                  value={novoTipo}
                />

                <div className="grid md:grid-cols-2 md:gap-6">
                  <Input
                    onChange={(e) => setNovoPreco(e.target.value)}
                    text={"Preço"}
                    value={novoPreco}
                  />
                  <Input
                    onChange={(e) => setNovaQuantidade(e.target.value)}
                    text={"Quantidade"}
                    value={novaQuantidade} 
            />
          </div>
        </form>
              <button
                onClickCapture={editarProduto}
                type="submit"
                className="w-full p-2.5 text-white bg-orange-500 rounded-md"
              >
                Salvar Alterações
              </button>
              <button
                onClick={handleModalEdit}
                className="w-full mt-2 p-2.5 text-gray-800 rounded-md border"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
