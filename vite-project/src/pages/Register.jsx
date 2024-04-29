import { Button, Form, Input, message } from "antd";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";


const Register = () => {
  const navigate=useNavigate();

 const onFinish = async (values) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options:{
        data:{
          username:values.username,
          country:values.country,
          phone:values.phone,
        }
      }
    });

    if (error) {
      return message.error("Başarısız İşlem");
    }

    if (data) {
      navigate("/login");
      return message.success("Kayıt Başarılı");
    }
  } catch (error) {
     message.error("Başarısız İşlem");
  }
};
  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full">
         
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Kullanıcı Adı"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

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
              label="Ülke"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please input your country!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            

            <Form.Item
              name="phone"
              label="Telefon Numarası"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input maxLength={11} />
            </Form.Item>

            <Form.Item
              label="Şifre"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password minLength={6}/>
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div className="flex justify-center">
                <Button type="primary" htmlType="submit">
                  Kayıt Ol
                </Button>
              </div>
            </Form.Item>
          </Form>
         
        </div>
      </div>
    </>
  );
};

export default Register;
