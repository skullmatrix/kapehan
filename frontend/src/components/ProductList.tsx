import React from "react";
import { Product } from "../types";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList = ({ products, onAddToCart }: ProductListProps) => {
  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;