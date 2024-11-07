import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "../Components/Card";
import banner from "../assets/banner.jpg";
import Header from "../Components/Header/Header";


function HomeAdmin() {
  const navigate = useNavigate(); 
  const role = localStorage.getItem("role");
  const [produtos, setProdutos] = useState([]);
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    if (role !== "admin") {
      navigate("/home");
    }
  }, [role, navigate]); 

  const fetchProdutos = async () => {
    try {
      const response = await fetch("http://localhost:3000/product");
      const data = await response.json();

      if (response.ok) {
        setProdutos(data); 
      } else {
        console.error("Erro ao buscar produtos:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);


    const handleUpdate = () => {
    fetchProdutos();
  };


  return (
    <>
      <div>
        <Header />
        <img
          className="w-screen object-cover"
          style={{ height: "40rem" }}
          src={banner}
          alt=""
        />

        <div className="flex items-center justify-between mt-8 mx-60">
        <select className="border border-sky-400 px-10 py-1 rounded" name="" id="">
            <option value="" selected disabled>Filtrar Categoria</option>
            <option value="">Colar</option>
            <option value="">Anel</option>
            <option value="">Pulseiras</option>
            <option value="">Brincos</option>


          </select>


          <Link className='px-8 py-2 text-gray-700 bg-sky-200 rounded-lg' to='/admin/adicionar'>
            Adicionar Produto
          </Link>
        </div>

  
        <div className="mx-60 mt-16">
            <input onChange={(e) => setSearch(e.target.value)} type="search" className="border w-full rounded-md p-2" placeholder="Pesquisar Produto..." />
          </div>


        <div className="container grid grid-cols-4 mx-auto mt-16">
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <Card key={produto.id} produto={produto} onUpdate={handleUpdate} />
            ))
          ) : (
            <p>Nenhum produto encontrado</p>
          )}
        </div>
      </div>
    </>
  );
}

export default HomeAdmin;
