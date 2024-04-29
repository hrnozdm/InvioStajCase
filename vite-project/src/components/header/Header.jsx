import { message } from 'antd';
import React from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";



const Header = () => {
const navigate=useNavigate();
const  logOut = async () =>{
    try {
      const { error } = await supabase.auth.signOut();
      localStorage.removeItem("user");
      if (error){
       return message.error("Başarısız İşlem");
      } 
      message.success("Çıkış İşlemi Başarılı");
      navigate('/login');
    } catch (error) {
       message.error("Başarısız İşlem");
    }
}
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex-grow">
          <nav>
            <ul className="flex justify-center">
                <Link to="/">
                <li className="mx-4">Dashboard</li>
                </Link>
              <li className="mx-4"><a href="#" className="hover:text-gray-300">Product Analysis</a></li>
            </ul>
          </nav>
        </div>
        <div>
          <Link to="/profile">
             <a className="hover:text-gray-300">Profile</a>
          </Link>
          
          <a href="#" className="hover:text-gray-300 ml-4" onClick={logOut}>LogOut</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
