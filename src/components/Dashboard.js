import React, { useEffect, useState } from 'react';

const API_KEY = 'IDVD7AQKT10CS21O';

const Dashboard = ({ holdings }) => {
    const [prices, setPrices] = useState({});
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchPrices = async () => {
            const newPrices = {};
            for (let h of holdings) {
                try {
                    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${h.stock}&outputsize=compact&apikey=${API_KEY}`);
                    const data = await response.json();

                    // Check if the time series data is available
                    if (data && data['Time Series (Daily)']) {
                        const timeSeries = data['Time Series (Daily)'];
                        const latestDate = Object.keys(timeSeries)[0];
                        const latestPrice = timeSeries[latestDate]['4. close'];
                        newPrices[h.stock] = parseFloat(latestPrice);
                    } else {
                        console.error(`No time series data available for ${h.stock}.`, data);
                        newPrices[h.stock] = 'N/A'; // Handle missing data
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    newPrices[h.stock] = 'Error'; // Indicate an error occurred
                }
            }
            setPrices(newPrices);
        };

        fetchPrices();
    }, [holdings]);

    useEffect(() => {
        const transactionsHistory = holdings.flatMap(h => h.transactions);
        setTransactions(transactionsHistory);
    }, [holdings]);

    const totalValue = holdings.reduce((acc, h) => {
        const stockPrice = prices[h.stock];
        return acc + (stockPrice && !isNaN(stockPrice) ? stockPrice * Math.max(h.quantity, 0) : 0);
    }, 0);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            {holdings.length === 0 ? (
                <p>No stocks in your holdings.</p>
            ) : (
                <>
                    <h3>Current Holdings</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Stock</th>
                                <th>Quantity</th>
                                <th>Price per Share</th>
                                <th>Total Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {holdings.map(h => (
                                <tr key={h.stock}>
                                    <td>{h.stock}</td>
                                    <td>{Math.max(h.quantity, 0)}</td>
                                    <td>
                                        {prices[h.stock] && !isNaN(prices[h.stock])
                                            ? `$${prices[h.stock].toFixed(2)}`
                                            : prices[h.stock]}
                                    </td>
                                    <td>
                                        {prices[h.stock] && !isNaN(prices[h.stock])
                                            ? `$${(prices[h.stock] * Math.max(h.quantity, 0)).toFixed(2)}`
                                            : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Total Portfolio Value: ${totalValue.toFixed(2)}</h3>
                </>
            )}

            <h3>Transaction History</h3>
            {transactions.length === 0 ? (
                <p>No transaction history available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Action</th>
                            <th>Stock</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t, index) => (
                            <tr key={index}>
                                <td>{new Date(t.timestamp).toLocaleString()}</td>
                                <td>{t.action === 'buy' ? 'Bought' : 'Sold'}</td>
                                <td>{t.stock}</td>
                                <td>{t.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Dashboard;