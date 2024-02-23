import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { Form, Select, Tabs, message, theme } from "antd";
import { useRegisterMutation } from "../../../redux/features/auth/auth.api";

const CreateUser = () => {
  const { token } = theme.useToken();
  const [register] = useRegisterMutation();

  const handleRegister = (values: Record<string, unknown>) => {
    register(values)
      .unwrap()
      .then((res) => {
        if (res.success) {
          message.success("User created success, have fun!");
        }
      })
      .catch((err) => {
        message.error(err.data.message);
      });
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
        style={{
          backgroundColor: token.colorBgContainer,
          borderRadius: "20px",
          border: "1px solid #d9d9d9",
          boxShadow: "0 2px 0 rgb(0 0 0 / 2%)",
          maxWidth: "395px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "8vh",
        }}>
        <LoginForm
          onFinish={async (values) => {
            handleRegister(values);
          }}
          title="SMS"
          submitter={{
            searchConfig: {
              submitText: "Create User",
            },
          }}
          subTitle="Sports Management System">
          <Tabs centered>
            <Tabs.TabPane key={"register"} tab={"Create User"} />
          </Tabs>

          <>
            <ProFormText
              name="name"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"name: Alex Johnson"}
              rules={[
                {
                  required: true,
                  message: "Please enter your name!",
                },
              ]}
            />
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
                prefix: <MailOutlined className={"prefixIcon"} />,
              }}
              placeholder={"email: admin@gmail.com"}
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
            />
            <Form.Item
              name="role"
              initialValue="seller"
              rules={[{ required: true, message: "Please input!" }]}>
              <Select
                defaultValue="seller"
                style={{ width: "100%" }}
                options={[
                  { value: "manager", label: "Manager" },
                  { value: "seller", label: "Seller" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="branch"
              initialValue="rangpur"
              rules={[{ required: true, message: "Please input!" }]}>
              <Select
                defaultValue="rangpur"
                style={{ width: "100%" }}
                options={[
                  { value: "rangpur", label: "Rangpur Branch" },
                  { value: "dhaka", label: "Dhaka Branch" },
                  { value: "rajshahi", label: "Rajshahi Branch" },
                  { value: "cumilla", label: "Cumilla Branch" },
                ]}
              />
            </Form.Item>

            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
                strengthText:
                  "Password should contain numbers, letters and special characters, at least 8 characters long.",

                statusRender: (value) => {
                  const getStatus = () => {
                    if (value && value.length > 12) {
                      return "ok";
                    }
                    if (value && value.length > 6) {
                      return "pass";
                    }
                    return "poor";
                  };
                  const status = getStatus();
                  if (status === "pass") {
                    return (
                      <div style={{ color: token.colorWarning }}>强度：中</div>
                    );
                  }
                  if (status === "ok") {
                    return (
                      <div style={{ color: token.colorSuccess }}>强度：强</div>
                    );
                  }
                  return (
                    <div style={{ color: token.colorError }}>强度：弱</div>
                  );
                },
              }}
              placeholder={"password: sports.sms"}
              rules={[
                {
                  required: true,
                  message: "Please enter password！",
                },
              ]}
            />
          </>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

export default CreateUser;
