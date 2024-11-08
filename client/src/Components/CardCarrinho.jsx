import React from 'react';

export default function CardCarrinho({ product }) {
  if (!product) return null; // Verifica se o product está definido

  return (
    <div className="grid grid-cols-3 items-center gap-4 border-b border-gray-200 py-2">
      <div className="col-span-2 flex items-center gap-4">
        <div>
          <h3 className="text-base font-bold text-gray-800">
            {product.tipo || "Tipo não especificado"}
          </h3>
          <h6 className="text-xs text-red-500 cursor-pointer mt-0.5">
            Remover
          </h6>
        </div>
      </div>
      <div className="ml-auto">
        <h4 className="text-base font-bold text-gray-800">
          ${product.preco ? product.preco.toFixed(2) : "0.00"}
        </h4>
      </div>
    </div>
  );
}
  