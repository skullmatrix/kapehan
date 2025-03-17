import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchProducts } from '../api';
import '../css/menu.css';

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderTypeId = location.state?.orderTypeId || 1;
    const [products, setProducts] = useState<{ id: number; name: string; category: string; price: number; image: string; desc: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="menu-container">
            <h1>Menu</h1>
            <div className="menu-items">
                {products.map((product) => (
                    <div key={product.id} className="menu-item">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.desc}</p>
                        <p>${product.price.toFixed(2)}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;