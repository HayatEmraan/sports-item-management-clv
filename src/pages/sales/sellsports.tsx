import React from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { SellButtonUI } from "../../components/ui/button";
import { useGetSportsQuery } from "../../redux/features/sports/sports.api";
import SaleForm from "../../components/ui/saleform";
import { TFilter } from "../../types/filter";

interface DataType {
  key: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
}

const SellSports: React.FC = () => {
  const [filter, setFilter] = React.useState<TFilter | undefined>(undefined);
  const { data: tableData, isFetching } = useGetSportsQuery(filter);

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
        return <SaleForm sport={sport} />;
      },
    },
  ];

  return (
    <>
      <SellButtonUI setFiltering={setFilter} />
      <Table
        columns={columns}
        loading={isFetching}
        scroll={{ x: "max-content" }}
        dataSource={tableData?.data}
      />
    </>
  );
};

export default SellSports;
