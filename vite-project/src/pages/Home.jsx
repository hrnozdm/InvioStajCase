import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../redux/ProductSlice";
import Header from "../components/header/Header";
import ProductProcess from "../components/productProcess/ProductProcess";
import ProductItem from "../components/productItem/productItem";

const Home = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  
  

  const productsData = useSelector((state) => state.product.productsData);

  const filteredProducts = productsData ? productsData.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase())
) : [];

 
useEffect(() => {
  dispatch(getAllProduct());
}, [productsData,filteredProducts]);


  return (
    <div>
      <Header />
      <ProductProcess search={search} setSearch={setSearch}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts?.length > 0 ? (
          filteredProducts?.map((product, index) => (
          
               <ProductItem product={product} index={index}/>
            
          ))
        ) : (
          productsData?.map((product, index) => (
            <ProductItem product={product} index={index}/>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
