import React from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useGetUsersQuery } from "../../../redux/features/user/userapi";
import moment from "moment";

interface DataType {
  key: string;
  name: string;
  role: number;
  branch: number;
  createdAt: string;
}

const UserOfHistory: React.FC = () => {
  const { data: tableData, isFetching } = useGetUsersQuery(undefined);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <>
          <Tag color={"geekblue"} key={role}>
            {role.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      render: (branch) => (
        <>
          <Tag color={"purple"} key={branch}>
            {branch?.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Member Since",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <>
          <Tag color={"purple"} key={createdAt}>
            {moment(createdAt).format("DD-MM-YYYY")}
          </Tag>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        loading={isFetching}
        scroll={{ x: "max-content" }}
        dataSource={tableData?.data}
      />
    </>
  );
};

export default UserOfHistory;
