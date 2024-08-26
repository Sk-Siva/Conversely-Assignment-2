import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from "./components/Home";
import Trading from './components/Trading';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
    const [holdings, setHoldings] = useState([]);

    const handleTrade = ({ stock, quantity, action }) => {
        setHoldings(prevHoldings => {
            const existingHolding = prevHoldings.find(h => h.stock === stock);
            const timestamp = new Date().toISOString();
            const newTransaction = { stock, quantity, action, timestamp };

            if (existingHolding) {
                const updatedQuantity = action === 'buy' 
                    ? existingHolding.quantity + quantity 
                    : existingHolding.quantity - quantity;

                return prevHoldings.map(h => 
                    h.stock === stock 
                        ? { 
                            ...h, 
                            quantity: Math.max(updatedQuantity, 0),
                            transactions: [...h.transactions, newTransaction]
                          } 
                        : h
                );
            } else if (action === 'buy') {
                return [...prevHoldings, { stock, quantity, transactions: [newTransaction] }];
            }
            return prevHoldings;
        });
    };

    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/trade" element={<Trading onTrade={handleTrade} />} />
                        <Route path="/dashboard" element={<Dashboard holdings={holdings} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;