import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/menu.css";

const allItems = [
  { id: 1, name: "Jalapeno Popper", category: "Hot", price: 169.99, rating: 4.4, image: "/images/jalapeno-burger.png", desc: "Spicy Mexican Chicken Burger with jalapeno-infused cream cheese." },
  { id: 2, name: "Mamma Mia", category: "Hot", price: 189.99, rating: 4.8, image: "/images/mamma-mia.png", desc: "Melted Cheddar, smoked Chicken & BBQ sauce." },
  { id: 3, name: "Isabella", category: "Pastry", price: 159.99, rating: 4.2, image: "/images/isabella.png", desc: "Black Truffle Cheese & mushrooms." },
  { id: 4, name: "Brooklyn", category: "Cold", price: 179.99, rating: 4.3, image: "/images/brooklyn.png", desc: "Swiss Cheese & Onion." },
  { id: 5, name: "Coca Cola", category: "Cold", price: 79.49, rating: 4.5, image: "/images/coca-cola.png", desc: "Refreshing cold drink." },
  { id: 6, name: "Choco Lava Cake", category: "Pastry", price: 119.99, rating: 4.7, image: "/images/choco-lava.png", desc: "Rich gooey chocolate dessert." }
];

const categories = [
  { name: "All", icon: "../media/icons/all.png" },
  { name: "Hot", icon: "../media/icons/hot.png" },
  { name: "Cold", icon: "../media/icons/cold.png" },
  { name: "Pastry", icon: "../media/icons/pastry.png" }
];

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  desc: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderType = location.state?.orderType || "For Here";
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = selectedCategory === "All" 
    ? allItems 
    : allItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart((prev: CartItem[]) => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev: CartItem[]) => prev
      .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
      .filter(item => item.quantity > 0)
    );
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const tax = (parseFloat(getTotal()) * 0.1).toFixed(2);
  const grandTotal = (parseFloat(getTotal()) + parseFloat(tax)).toFixed(2);

  const handleNavigation = (path: string) => {
    switch(path) {
      case 'home':
        navigate('/');
        break;
      case 'ordertype':
        navigate('/ordertype');
        break;
      default:
        break;
    }
  };

  return (
    <div className="menu-container">
      <div className="menu-content">
        <div className="breadcrumbs">
          <span className="breadcrumb-link" onClick={() => handleNavigation('home')}>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-link" onClick={() => handleNavigation('ordertype')}>Order Type</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{orderType}</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Menu</span>
          {selectedCategory !== 'All' && (
            <>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`category-btn ${selectedCategory === cat.name ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <img src={cat.icon} alt={cat.name} className="category-icon" />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <h2 className="category-title">{selectedCategory} Items</h2>

        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-card">
              <img src={item.image} alt={item.name} className="menu-image" />
              <h3 className="menu-name">{item.name}</h3>
              <p className="menu-desc">{item.desc}</p>
              <div className="menu-info">
                <div className="menu-rating">
                  <img src="/images/icons/star.png" alt="rating" className="rating-icon" />
                  <span>{item.rating}</span>
                </div>
                <span className="menu-price">₹{item.price}</span>
                <button className="add-to-cart" onClick={() => addToCart(item)}>
                  <img src="/images/icons/plus.png" alt="add" className="add-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="floating-cart">
        <h3 className="cart-title">
          <img src="../media/icons/bag.png" alt="cart" className="cart-icon" />
          Your Cart
        </h3>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <img src="../media/icons/bag.png" alt="empty cart" className="empty-cart-icon" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <span className="cart-name">{item.name}</span>
                  <span className="cart-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div className="cart-actions">
                  <button className="cart-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="cart-btn" onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <div>Subtotal: <span>₹{getTotal()}</span></div>
          <div>Tax: <span>₹{tax}</span></div>
          <div className="total">Total: <span>₹{grandTotal}</span></div>
        </div>
        
        <button className="cart-pay">
          <img src="/images/icons/payment.png" alt="payment" className="payment-icon" />
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Menu;