import React, { useState } from "react";
import { Button, Form, Input,Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/ProductSlice";
const ProductProcess = ({search,setSearch}) => {
const [isModalOpen, setIsModalOpen] = useState(false);
const dispatch = useDispatch();
  
  const onFinishAddProduct=async (values)=>{
     dispatch(addProduct(values));
     setIsModalOpen(false);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 mb-2 sm:mb-0 sm:w-1/2"
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={showModal}
        >
          Ürün Ekle
        </button> 
      </div>

      <Modal title="Ürün İşlemleri" open={isModalOpen} onCancel={handleCancel} footer={false}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onFinishAddProduct}
        >
          <Form.Item
            label="Ürün Adı"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ürün Fiyatı"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item >
           <Button type="primary" htmlType="submit">
             Ürün Ekle
           </Button>
          </Form.Item>
         
          
        </Form>
      </Modal>
    </div>
  );
};

export default ProductProcess;
