import React, { useState } from 'react';
import Header from '../components/header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart, updateItemCount } from '../redux/CartSlice';
import { productSales } from '../redux/SalesSlice';
import { message } from 'antd';

const Basket = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [saleDate, setSaleDate] = useState('');

  const handleUpdateCount = (item, newCount) => {
    dispatch(updateItemCount({ id: item.id, count: newCount }));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.count;
    });
    return totalPrice;
  };

  const handlePurchaseAll = () => {
    if (cartItems.length === 0) {
        return message.error("Lütfen Ürün Seçiniz");
    }
    
    const selectedDate = new Date(saleDate);

    if (isNaN(selectedDate.getTime()) || selectedDate < new Date('2024-03-01') || selectedDate > new Date('2024-04-30')) {
        return message.error('Geçersiz tarih girişi! Lütfen kontrol ediniz.');
    }

    dispatch(productSales(cartItems.map(item => ({ id: item.id, count: item.count, selectedDate: selectedDate }))));
    message.success("Ürünler Satışa Konuldu");
    dispatch(resetCart());
    
};

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Sepetiniz</h2>
        <p>3 Mart İle 30 Mayıs Arasında Satış Yapabilirsiniz</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {cartItems?.map((item,index) => (
            <div key={index} className="border p-4 flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>Miktar: {item.count}</p>
                <p>Fiyat: {item.price} TL</p>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleUpdateCount(item, item.count - 1)}
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded ml-2"
                  onClick={() => handleUpdateCount(item, item.count + 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <input type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} />
          <button className="bg-blue-500 text-white px-3 py-1 rounded mt-4 ml-6" onClick={handlePurchaseAll}>
            Tümünü Satışa Koy
          </button>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Toplam Fiyat: {calculateTotalPrice()} TL</h3>
        </div>
      </div>
    </div>
  );
};

export default Basket;
