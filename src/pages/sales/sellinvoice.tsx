/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Segmented, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useSaleStatsQuery } from "../../redux/features/sales/sales.api";
import { pdf } from "@react-pdf/renderer";
import { PDF } from "../../components/ui/pdf";
import { saveAs } from "file-saver";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const SellInvoice: React.FC = () => {
  const [filtering, setFiltering] = useState("");
  const { data: fetchData, isFetching } = useSaleStatsQuery(filtering);

  const [condition, setCondition] = useState("Weekly");

  const handleFiltering = (e: string) => {
    setCondition(e);
    switch (e) {
      case "Daily":
        setFiltering("day");
        break;
      case "Weekly":
        setFiltering("isoWeek");
        break;
      case "Monthly":
        setFiltering("month");
        break;
      case "Yearly":
        setFiltering("year");
        break;
    }
  };

  const downloadPdf = async (item: any) => {
    const fileName = `${item?.name}_${item?._id}.pdf`;
    const blob = await pdf(<PDF record={item} />).toBlob();
    saveAs(blob, fileName);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Seller Name",
      key: "seller",
      render: (text) => (
        <Tag color={"orange"} key={text?.sellerId?.name}>
          {text?.sellerId?.name?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Sport Name",
      key: "sport",
      render: (text) => (
        <Tag color={"gold"} key={text?.sportId?.name}>
          {text?.sportId?.name?.toUpperCase() || "N/A"}
        </Tag>
      ),
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (text) => (
        <Tag color={"magenta"} key={text.quantity}>
          {text?.quantity}
        </Tag>
      ),
    },
    {
      title: "Sport Condition",
      key: "condition",
      render: (text) => (
        <Tag color={"success"} key={text?.sportId?.condition}>
          {text?.sportId?.condition?.toUpperCase() || "N/A"}
        </Tag>
      ),
    },
    {
      title: "Buyer Name",
      key: "name",
      render: (text) => (
        <Tag color={"blue"} key={text.name}>
          {text?.name?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Date of Sale",
      key: "date",
      dataIndex: "date",
      render: (text) => (
        <>
          <Tag color={"geekblue"} key={text}>
            {text?.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Seller Email",
      key: "email",
      render: (text) => (
        <Tag color={"red"} key={text?.sellerId?.email}>
          {text?.sellerId?.email?.toUpperCase()}
        </Tag>
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
      title: "Invoice",
      key: "invoice",
      render: (item) => (
        <>
          <Button
            onClick={() => downloadPdf(item)}
            type="dashed"
            htmlType="submit">
            Download
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid #d9d9d9",
          alignItems: "center",
          padding: "2px 8px",
          borderRadius: "10px",
        }}>
        <h3>Sales History by {condition}</h3>
        <Segmented
          onChange={(e: any) => {
            handleFiltering(e);
          }}
          value={condition}
          options={["Daily", "Weekly", "Monthly", "Yearly"]}
        />
      </div>
      <Table
        columns={columns}
        loading={isFetching}
        scroll={{ x: "max-content" }}
        dataSource={fetchData?.data}
      />
    </div>
  );
};

export default SellInvoice;
