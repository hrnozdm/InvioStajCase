import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/ProductSlice";
import { addToCart } from "../../redux/CartSlice";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ProductItem = ({ product, index }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <div key={index} className="relative bg-white p-4 rounded-lg shadow-md">
        <div className="absolute top-0 right-0 flex gap-2 p-2">
          <EditOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
          <DeleteOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        </div>
        <p className="text-lg font-semibold">{product.name}</p>
        <p className="text-gray-600">Price: {product.price}</p>
        <Button type="primary" onClick={() => handleAddToCart(product)}>
          Sepete Ekle
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
