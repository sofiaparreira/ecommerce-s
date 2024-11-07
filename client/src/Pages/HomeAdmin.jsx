import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "../Components/Card";
import banner from "../assets/banner.jpg";
import Header from "../Components/Header/Header";

function HomeAdmin() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [produtos, setProdutos] = useState([]);
  const [search, setSearch] = useState('');  // Estado para pesquisa
  const [category, setCategory] = useState('');  // Novo estado para tipo selecionado (categoria)

  // Verifica o papel do usuário
  useEffect(() => {
    if (role !== "admin") {
      navigate("/home");
    }
  }, [role, navigate]);

  // Função para buscar produtos com base no filtro de tipo (categoria)
  const fetchProdutos = async (category = '') => {
    try {
      // Faz a requisição com o parâmetro 'tipo' para filtrar
      const response = await fetch(`http://localhost:3000/product?tipo=${category}`);
      const data = await response.json();

      if (response.ok) {
        setProdutos(data); 
        console.log("Produtos recebidos:", data); // Verificação no console
      } else {
        console.error("Erro ao buscar produtos:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  // Chama a função para buscar produtos quando o componente é montado ou a categoria mudar
  useEffect(() => {
    fetchProdutos(category); // Passa a categoria selecionada para o filtro
  }, [category]);  // A função será chamada toda vez que a categoria mudar

  // Manipulador para atualizar a categoria selecionada
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log("Categoria selecionada:", selectedCategory); // Verificação no console
    setCategory(selectedCategory); // Atualiza o estado da categoria
  };

  // Função para filtrar os produtos pela pesquisa (se houver)
  const filteredProdutos = produtos.filter((produto) => {
    // Filtro de pesquisa por nome
    const matchesSearch = produto.nome.toLowerCase().includes(search.toLowerCase());
    
    // Filtro de tipo (categoria), somente aplica se category não for vazio
    const matchesCategory = category ? produto.tipo.toLowerCase() === category.toLowerCase() : true;

    // Retorna os produtos que correspondem tanto à pesquisa quanto à categoria (se houver)
    return matchesSearch && matchesCategory;
  });

  // Atualiza os produtos após adicionar/editar
  const handleUpdate = () => {
    fetchProdutos(category);
  };

  return (
    <>
      <div>
        <Header />
        <img
          className="w-screen object-cover"
          style={{ height: "40rem" }}
          src={banner}
          alt="Banner"
        />

        <div className="flex items-center justify-between mt-8 mx-60">
          {/* Filtro de categoria (tipo) */}
          <select
            className="border border-sky-400 px-10 py-1 rounded"
            value={category}
            onChange={handleCategoryChange} // Atualiza a categoria
          >
            <option value="" selected disabled>Filtrar Tipo</option>
            <option value="colar">Colar</option>
            <option value="anel">Anel</option>
            <option value="pulseira">Pulseira</option>
            <option value="brinco">Brinco</option>
          </select>

          {/* Link para adicionar um novo produto */}
          <Link className="px-8 py-2 text-gray-700 bg-sky-200 rounded-lg" to="/admin/adicionar">
            Adicionar Produto
          </Link>
        </div>

        {/* Campo de pesquisa */}
        <div className="mx-60 mt-16">
          <input
            onChange={(e) => setSearch(e.target.value)} // Atualiza o estado de pesquisa
            type="search"
            className="border w-full rounded-md p-2"
            placeholder="Pesquisar Produto..."
          />
        </div>

        {/* Exibição dos produtos */}
        <div className="container grid grid-cols-4 mx-auto mt-16">
          {filteredProdutos.length > 0 ? (
            filteredProdutos.map((produto) => (
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
