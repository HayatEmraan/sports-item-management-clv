import React from "react";
import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import type { TableProps } from "antd";
import ButtonUI from "../../components/ui/button";
import {
  useDeleteSportMutation,
  useGetSportsQuery,
} from "../../redux/features/sports/sports.api";
import ModalForm from "../../components/ui/modalform";

interface DataType {
  _id: string;
  key: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
}

const ManageSports: React.FC = () => {
  const { data, isFetching } = useGetSportsQuery(undefined);
  const [deleteSport] = useDeleteSportMutation();

  const [deleteSportID, setDeleteSportID] = React.useState<string[]>([]);

  const confirm = (e: string[]) => {
    deleteSport({ deleteIds: e })
      .unwrap()
      .then((res) => {
        if (res.success) {
          message.success("Sport deleted successfully");
          setDeleteSportID([]);
        }
      })
      .catch(() => {
        message.error("Something went wrong, please try again");
      });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (type) => (
        <>
          <Tag color={"geekblue"} key={type}>
            {type.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => (
        <>
          <Tag color={"purple"} key={brand}>
            {brand.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) => (
        <>
          <Tag color={"red"} key={size}>
            {size.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
      render: (text) => (
        <>
          <Tag color={"green"} key={text}>
            {text.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (text) => (
        <>
          <Tag color={"gold"} key={text}>
            {text.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      render: (text) => (
        <>
          <Tag color={"lime"} key={text}>
            {text.toUpperCase()}
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
      title: "Action",
      key: "action",
      render: (sport) => {
        return (
          <Space size="middle">
            <ModalForm sport={sport} />
            <Popconfirm
              title="Delete the sport"
              description={`Are you sure to delete ${sport.name}?`}
              onConfirm={() => confirm([sport._id])}
              okText="Yes"
              cancelText="No">
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <ButtonUI deleteSportID={deleteSportID} fn={confirm} />
      <Table
        columns={columns}
        rowKey={(data) => data._id}
        loading={isFetching}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setDeleteSportID(selectedRowKeys as string[]);
          },
        }}
        scroll={{ x: "max-content" }}
        dataSource={data?.data}
      />
    </>
  );
};

export default ManageSports;
