import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate=useNavigate();
    const onFinish=async (values)=>{
        console.log(values);
    
        try {
            
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
              })
        
            if (error) {
              return message.error("Şifre veya Parola Hatalı");
            }
        
            if (data) {
              const user={jwt:data.session.access_token}
               console.log(data);
                localStorage.setItem('user',JSON.stringify(user))
                navigate("/");
                return message.success("Giriş İşlemi  Başarılı");
    
              
            }
          } catch (error) {
            message.error("Başarısız İşlem");
          }
    
     }
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div className="flex justify-center">
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </div>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div className="flex justify-center items-center">
                <span style={{ marginRight: "8px" }}>Don't have an account?</span>
                <Link to="/register" style={{ fontWeight: "bold", color: "#1890ff" }}>
                  Register
                </Link>{" "}
               
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
