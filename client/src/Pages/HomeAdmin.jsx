import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "../Components/Card";
import banner from "../assets/banner.jpg";
import Header from "../Components/Header/Header";


function HomeAdmin() {
  const navigate = useNavigate(); // Crie a instância do useNavigate
  const role = localStorage.getItem("role");
  
  useEffect(() => {
    if (role !== "admin") {
      navigate("/home");
    }
  }, [role, navigate]); 

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

        <div className="flex items-center justify-end mt-8 mx-8">
          <Link className='px-8 py-2 text-gray-700 bg-sky-200 rounded-lg' to='/admin/adicionar'>
            Adicionar Produto
          </Link>
        </div>

        <div className="grid grid-cols-4">
          <Card />
        </div>
      </div>
    </>
  );
}

export default HomeAdmin;
