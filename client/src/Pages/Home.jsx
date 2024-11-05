import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "../Components/Card";
import banner from "../assets/banner.jpg";
import Header from "../Components/Header/Header";

function Home() {

  const navigate = useNavigate(); 
  const role = localStorage.getItem("role");
  
  useEffect(() => {
    if (role === "admin") {
      navigate("/admin");
    }

    else (role !== "admin" || role !== "user"); {
     navigate("/")
    }
  }, [role, navigate]); 


  const [produtos, setProdutos] = useState([]);

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

  <h1 className="text-center text-xl mt-16">Produtos</h1>
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

export default Home;
