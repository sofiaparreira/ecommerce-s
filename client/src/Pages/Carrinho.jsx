import React, { useEffect, useState } from "react";
import CardCarrinho from "../Components/CardCarrinho";
import { Link, useNavigate } from 'react-router-dom';

export default function Carrinho() {

  const userId = localStorage.getItem("userId");
  const [itemsCart, setItemsCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:3000/carrinho/${userId}`);
        if (!response.ok) throw new Error("Erro ao buscar itens no carrinho");

        const data = await response.json();
        const productIds = data.map((item) => item.idProduto);
        const products = await fetchProducts(productIds);

        const items = data.map((item) => {
          const product = products.find((p) => p.id === item.idProduto);
          return product ? { ...product, quantidade: item.quantidade } : null;
        }).filter(Boolean);

        setItemsCart(items);
        calculateTotal(items);
      } catch (error) {
        console.error("Erro ao buscar dados do carrinho:", error);
      }
    };

    const fetchProducts = async (productIds) => {
      try {
        const response = await fetch("http://localhost:3000/product");
        const allProducts = await response.json();
        return allProducts.filter((product) => productIds.includes(product.id));
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
        return [];
      }
    };
    const calculateTotal = (items) => {
      const totalAmount = items.reduce((acc, item) => {
        const preco = item.preco || 0; 
        const quantidade = item.quantidade || 1; 
        return acc + (preco * quantidade);
      }, 0);
      setTotal(totalAmount);
    };
    

    if (userId) fetchItems();
  }, [userId]);

  return (
    <div>
      <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
        <div className="grid md:grid-cols-3 gap-4 mt-16">
          <div className="md:col-span-2 border border-gray-200 p-4 rounded-md">
            <h2 className="text-2xl font-bold text-gray-800">Carrinho</h2>
            <hr className="border-gray-300 mt-4 mb-8" />

            <div className="space-y-10">
              {itemsCart.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
              ) : (
                itemsCart.map((product) => (
                  <CardCarrinho key={product.id} product={product} />
                ))
              )}
            </div>
          </div>

          <div className="border border-gray-200 rounded-md p-4 md:sticky top-0">
            <p className="flex flex-wrap gap-4 text-base font-bold mt-4">
              Total <span className="ml-auto">${total.toFixed(2)}</span>
            </p>

            <div className="mt-8 space-y-2">
              <button
                type="button"
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-sky-600 hover:bg-sky-700 text-white rounded-md"
              >
                Finalizar
              </button>
              <button
                type="button"
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
              >
                <Link to="/home">Continuar Comprando</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
