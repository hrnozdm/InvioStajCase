import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteProduct, getAllProduct } from "../redux/ProductSlice";
import Header from "../components/header/Header";
import ProductProcess from "../components/productProcess/ProductProcess";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from "antd";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);
  
  const productsData = useSelector((state) => state.product.productsData);


  const handleProductDelete=(id)=>{
      dispatch(deleteProduct(id));
  }
 
  console.log(productsData);
  return (
    <div>
      <Header />
      <ProductProcess />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsData &&
          productsData.map((product, index) => (
            <div key={index} className="relative bg-white p-4 rounded-lg shadow-md">
              <div className="absolute top-0 right-0 flex gap-2 p-2">
                <EditOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
                <DeleteOutlined style={{ fontSize: "20px", cursor: "pointer" }}  onClick={()=>handleProductDelete(product.id)}/>
              </div>
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-gray-600">Price: {product.price}</p>
              <Button type="primary">Satın Al</Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
