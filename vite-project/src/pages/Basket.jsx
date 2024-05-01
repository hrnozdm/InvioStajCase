import React from 'react';
import Header from '../components/header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { updateItemCount } from '../redux/CartSlice';


const Basket = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  
  const handleUpdateCount = (item, newCount) => {
    dispatch(updateItemCount({ id: item.id, count: newCount }));
  };

  
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.map((item) => {
      totalPrice += item.price * item.count;
    });
    return totalPrice;
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Sepetiniz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {cartItems?.map((item) => (
            <div key={item.id} className="border p-4 flex flex-col sm:flex-row justify-between items-center">
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
        {/* Toplam fiyat */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Toplam Fiyat: {calculateTotalPrice()} TL</h3>
          <button className="bg-blue-500 text-white px-3 py-1 rounded mt-4" >
            Tümünü Satın Al
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;
