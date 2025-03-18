import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OrderType from './pages/OrderType';
import Menu from './pages/Menu';
import Payment from './pages/Payment';
import Checkout from './pages/OrderConfirmation';
import OrderConfirmation from './pages/OrderConfirmation';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ordertype" element={<OrderType />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Routes>
        </Router>
    );
};

export default App;