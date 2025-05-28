import React, { useState, useEffect } from 'react';
import './MarketList.css';

const MarketList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    // Load market list from localStorage
    const savedItems = localStorage.getItem('marketList');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    // Save market list to localStorage
    localStorage.setItem('marketList', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, { id: Date.now(), text: newItem, checked: false }]);
      setNewItem('');
    }
  };

  const toggleItem = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="market-list">
      <h2>Market Listesi</h2>
      <div className="add-item">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Yeni ürün ekle..."
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <button onClick={addItem}>Ekle</button>
      </div>
      <ul className="items-list">
        {items.map(item => (
          <li key={item.id} className={item.checked ? 'checked' : ''}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
            />
            <span>{item.text}</span>
            <button onClick={() => removeItem(item.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketList; 