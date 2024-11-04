import React from 'react'

export default function CardCarrinho() {
  return (
    <div class="grid grid-cols-3 items-center gap-4 border-b border-gray-200 py-2">
                <div class="col-span-2 flex items-center gap-4">
                  <div>
                    <h3 class="text-base font-bold text-gray-800">
                      Velvet Sneaker
                    </h3>
                    <h6 class="text-xs text-red-500 cursor-pointer mt-0.5">
                      Remove
                    </h6>

                    
                    
                  </div>
                </div>
                <div class="ml-auto">
                  <h4 class="text-base font-bold text-gray-800">$20.00</h4>
                </div>
              </div>
  )
}
