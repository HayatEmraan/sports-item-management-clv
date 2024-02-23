import { Button, Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/auth.slice";
const { Sider } = Layout;
const { Content, Footer } = Layout;


const items = [
  {
    key: "Dashboard",
    label: <NavLink to={`/dashboard`}>Dashboard</NavLink>,
  },
  {
    key: "Sports",
    label: "Sports Management",
    children: [
      {
        key: "Add Sports",
        label: <NavLink to={`/add-sports`}>Add Sports</NavLink>,
      },
      {
        key: "Manage Sports",
        label: <NavLink to={`/manage-sports`}>Manage Sports</NavLink>,
      }
    ],
  },
  {
    key: "Sales",
    label: "Sales Management",
    children: [
      {
        key: "Sell Sports",
        label: <NavLink to={`/sale-sports`}>Sell Sports</NavLink>,
      },
      {
        key: "Sales History",
        label: <NavLink to={`/sales-history`}>Sales History of Sports</NavLink>,
      }
    ],
  },
  {
    key: "Users",
    label: "Users Management",
    children: [
      {
        key: "Create User",
        label: <NavLink to={`/create-user`}>Create User</NavLink>,
      },
      {
        key: "User of History",
        label: <NavLink to={`/user-of-history`}>User of History</NavLink>,
      }
    ],
  },
];

const MainLayOut = () => {
  const dispatch = useAppDispatch();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "32px",
            margin: 16,
          }}>
          <h1 style={{ textAlign: "center", color: "white" }}>SMS</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <Button
            onClick={() => dispatch(logout())}
            style={{ float: "right", marginRight: "20px", marginTop: "17px" }}>
            Logout
          </Button>
        </Header>
        {/* <Header style={{ padding: 0 }} /> */}
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          SMS ©{new Date().getFullYear()} Created by Hayat
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayOut;
