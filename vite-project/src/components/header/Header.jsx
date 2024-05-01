import { Avatar, Badge, Space, message } from "antd";
import React from "react";
import { useSelector } from 'react-redux'
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Header = () => {
  const navigate = useNavigate();
  const cartItems=useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      localStorage.removeItem("user");
      if (error) {
        return message.error("Başarısız İşlem");
      }
      message.success("Çıkış İşlemi Başarılı");
      navigate("/login");
    } catch (error) {
      message.error("Başarısız İşlem");
    }
  };
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex-grow">
          <nav>
            <ul className="flex justify-center">
              <Link to="/">
                <li className="mx-4">Dashboard</li>
              </Link>
              <li className="mx-4">
                <a href="#" className="hover:text-gray-300">
                  Product Analysis
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Link to="/basket">
            <Space size="middle">
              <Badge count={cartItems.length}>
                <ShoppingCartOutlined style={{ fontSize: "27px",color:'white' }} />
              </Badge>
            </Space>
          </Link>

          <Link to="/profile">
            <a className="hover:text-gray-300 ml-4">Profile</a>
          </Link>

          <a href="#" className="hover:text-gray-300 ml-4" onClick={logOut}>
            LogOut
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
