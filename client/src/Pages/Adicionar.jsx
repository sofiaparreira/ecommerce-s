import React, { useState } from "react";
import { Link } from 'react-router-dom'

const Adicionar = () => {

  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('')
  const [preco, setPreco] = useState(0.0)
  const [quantidade, setQuantidade] = useState(0)

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
        alert("Produto cadastrado com sucesso!");
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
        <div class="relative z-0 w-full mb-5 group">
          <input
            onChange={(e) => setNome(e.target.value)}
            type="text"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
            placeholder=" "
            required
          />
          <label
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nome
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
           onChange={(e) => setTipo(e.target.value)}
            type="text"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
            placeholder=" "
            required
          />
          <label
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tipo
          </label>
        </div>
        
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
             onChange={(e) => setPreco(e.target.value)}
              type="text"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
              placeholder=" "
              required
            />
            <label
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Preço
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
             onChange={(e) => setQuantidade(e.target.value)}
              type="text"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
              placeholder=" "
              required
            />
            <label
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Quantidade
            </label>
          </div>
        </div>
       
        <div className="flex gap-8">
          <button
            type="submit"
            class="text-white mt-8 bg-sky-400 hover:bg-sky-300 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-16 py-2.5 text-center "
          >
            Cadastrar
          </button>
          <Link className="mt-8 text-gray-600 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none rounded-lg text-sm w-full sm:w-auto px-16 py-2.5 text-center" to='/admin'>Cancelar</Link>
        </div>
      </form>
    </div>
    </>
  );
};

export default Adicionar;
