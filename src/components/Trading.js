import React, { useState } from 'react';
import "../App.css";

const Trading = ({ onTrade }) => {
    const [stock, setStock] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [action, setAction] = useState('buy');
    const [message, setMessage] = useState('');

    const handleTrade = event => {
        event.preventDefault();
        if (stock && quantity > 0) {
            onTrade({ stock, quantity: parseInt(quantity), action });
            setMessage(`Successfully ${action}ed ${quantity} shares of ${stock}!`);
        } else {
            setMessage('Please select a stock and enter a valid quantity!');
        }
    };

    return (
        <form className="trading-form" onSubmit={handleTrade}>
            <h2>TRADE STOCKS</h2>
            
            <div className="form-group">
                <label htmlFor="stock">Stock:</label>
                <select id="stock" value={stock} onChange={(e) => setStock(e.target.value)}>
                    <option value="">Select Stock</option>
                    <option value="AAPL">Apple (AAPL)</option>
                    <option value="GOOGL">Google (GOOGL)</option>
                    <option value="AMZN">Amazon (AMZN)</option>
                    <option value="MSFT">Microsoft (MSFT)</option>
                </select>
            </div>
            
            <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input 
                    id="quantity" 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                    placeholder="Quantity"
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="action">Action:</label>
                <select id="action" value={action} onChange={(e) => setAction(e.target.value)}>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                </select>
            </div>
            
            <button type="submit">Submit</button>
            {message && <p className="msg">{message}</p>}
        </form>
    );
};

export default Trading;