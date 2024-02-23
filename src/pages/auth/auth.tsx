import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { Form, Select, Tabs, message, theme } from "antd";

import { useState } from "react";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../redux/features/auth/auth.api";
import { useAppDispatch } from "../../redux/hooks";
import { setCredentials } from "../../redux/features/auth/auth.slice";
import { decode } from "../../utils/jwt.decode";

type LoginType = "login" | "register";

export const Auth = () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>("login");

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const handleLogin = (values: Record<string, unknown>) => {
    login(values)
      .unwrap()
      .then((res) => {
        if (res.success) {
          message.success("Login success");
          const user = decode(res.data.accessToken);
          dispatch(setCredentials({ user, token: res.data.accessToken }));
          window.location.href = "/";
        }
      })
      .catch((err) => {
        message.error(err.data.message);
      });
  };

  const handleRegister = (values: Record<string, unknown>) => {
    register(values)
      .unwrap()
      .then((res) => {
        if (res.success) {
          message.success("Register success, please login now");
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
          marginTop: "15vh",
        }}>
        <LoginForm
          onFinish={async (values) => {
            if (loginType === "login") {
              handleLogin(values);
            } else {
              handleRegister(values);
            }
          }}
          title="SMS"
          submitter={{
            searchConfig: {
              submitText: `${loginType === "login" ? "Login" : "Register"}`,
            },
          }}
          subTitle="Sports Management System">
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
            <Tabs.TabPane key={"login"} tab={"Login"} />
            <Tabs.TabPane key={"register"} tab={"Register"} />
          </Tabs>
          {loginType === "login" && (
            <>
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
                        <div style={{ color: token.colorWarning }}>
                          强度：中
                        </div>
                      );
                    }
                    if (status === "ok") {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          强度：强
                        </div>
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
          )}
          {loginType === "register" && (
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
                    message: "Please enter your email!",
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
                initialValue="super"
                rules={[{ required: true, message: "Please input!" }]}>
                <Select
                  disabled
                  defaultValue="super"
                  style={{ width: "100%" }}
                  options={[{ value: "super", label: "Super Admin (Default)" }]}
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
                        <div style={{ color: token.colorWarning }}>
                          强度：中
                        </div>
                      );
                    }
                    if (status === "ok") {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          强度：强
                        </div>
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
          )}
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
