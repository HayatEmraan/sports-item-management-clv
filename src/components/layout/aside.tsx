import { NavLink, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { ROLE } from "../../constants/role";
const { Sider } = Layout;

type TItems = {
  key: string;
  label: JSX.Element;
  children?: TItems[];
};
const adminItems = [
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
      },
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
        key: "Sell Invoices",
        label: <NavLink to={`/sell-invoices`}>Sell Invoices</NavLink>,
      },
      {
        key: "Sales History",
        label: <NavLink to={`/sales-history`}>Sales History of Sports</NavLink>,
      },
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
      },
    ],
  },
] as unknown as TItems[];

const sellerItems = [
  {
    key: "Sales",
    label: "Sales Management",
    children: [
      {
        key: "Sell Sports",
        label: <NavLink to={`/sale-sports`}>Sell Sports</NavLink>,
      },
      {
        key: "Sell Invoices",
        label: <NavLink to={`/sell-invoices`}>Sell Invoices</NavLink>,
      },
      {
        key: "Sales History",
        label: <NavLink to={`/sales-history`}>Sales History of Sports</NavLink>,
      },
    ],
  },
] as unknown as TItems[];

const managerItems = [
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
      },
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
        key: "Sell Invoices",
        label: <NavLink to={`/sell-invoices`}>Sell Invoices</NavLink>,
      },
      {
        key: "Sales History",
        label: <NavLink to={`/sales-history`}>Sales History of Sports</NavLink>,
      },
    ],
  },
] as unknown as TItems[];

const Aside = () => {
  let items = [
    {
      key: "Dashboard",
      label: <NavLink to={`/dashboard`}>Dashboard</NavLink>,
    },
  ];
  const user = useAppSelector((state) => state.auth.user);

  const navigate = useNavigate();

  if (user?.role === ROLE.manager) {
    items = [...items, ...managerItems];
  } else if (user?.role === ROLE.seller) {
    items = [...items, ...sellerItems];
  } else if (user?.role === ROLE.super) {
    items = [...items, ...adminItems];
  } else {
    navigate("/auth");
  }

  return (
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
  );
};

export default Aside;
