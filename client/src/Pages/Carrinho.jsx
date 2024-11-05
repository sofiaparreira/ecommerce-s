import React from "react";
import CardCarrinho from "../Components/CardCarrinho";
import { Link } from "react-router-dom";

export default function Carrinho() {
  return (
    <div>
      <div class="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
        <div class="grid md:grid-cols-3 gap-4 mt-16">
          <div class="md:col-span-2 border boder-gray-200 p-4 rounded-md">
            <h2 class="text-2xl font-bold text-gray-800">Cart</h2>
            <hr class="border-gray-300 mt-4 mb-8" />

            <div class="space-y-10">
              <CardCarrinho />
              <CardCarrinho />
            </div>
          </div>

          <div class="border boder-gray-200 rounded-md p-4 md:sticky top-0">
            <p class="flex flex-wrap gap-4 text-base font-bold mt-4">
              Total <span class="ml-auto">$52.00</span>
            </p>

            <div class="mt-8 space-y-2">
              <button
                type="button"
                class="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-sky-600 hover:bg-sky-700 text-white rounded-md"
              >
                Finalizar
              </button>
              <button
                type="button"
                class="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
              >
                <Link  to='/home'>Continuar Comprando</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
