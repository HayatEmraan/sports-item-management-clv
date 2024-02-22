import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useAddSportMutation } from "../../redux/features/sports/sports.api";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const AddForm: React.FC = () => {
  const [sport] = useAddSportMutation();

  const [imageInput, setImageInput] = useState("");

  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/73365fa2-441d-4c32-866b-b0103cceb07d",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setImageInput("image " + info.file.name);
      } else if (info.file.status === "error") {
        message.error(
          `${info.file.name} file upload failed. Please upload JPG/JPEG file only`
        );
      }
    },
  };

  const handleSubmit = (values: Record<string, unknown>) => {
    delete values.image;
    sport({ ...values, image: imageInput })
      .unwrap()
      .then((res) => {
        if (res.success) {
          message.success("Sport added successfully");
        }
      })
      .catch(() => {
        message.error("Something went wrong, please try again");
      });
  };
  return (
    <Form
      onFinish={(values) => {
        handleSubmit(values);
      }}
      {...formItemLayout}
      variant="filled"
      style={{
        maxWidth: 600,
        margin: "0 auto",
        border: "1px solid #d9d9d9",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}>
      <Form.Item
        label="Sport Name"
        name="name"
        rules={[{ required: true, message: "Please input!" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Price of Sport"
        name="price"
        rules={[{ required: true, message: "Please input!" }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Image (JPG/JPEG)"
        name="image"
        rules={[{ required: true, message: "Please input!" }]}>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload (JPG/JPEG)</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Size of Sport"
        name="size"
        initialValue="Medium"
        rules={[{ required: true, message: "Please input!" }]}>
        <Select
          defaultValue="Medium"
          style={{ width: "100%" }}
          // onChange={handleChange}
          options={[
            { value: "Small", label: "Small" },
            { value: "Medium", label: "Medium" },
            { value: "Large", label: "Large" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Type of Sport"
        name="type"
        initialValue="Soccer"
        rules={[{ required: true, message: "Please input!" }]}>
        <Select
          defaultValue="Soccer"
          style={{ width: "100%" }}
          // onChange={handleChange}
          options={[
            { value: "Soccer", label: "Soccer" },
            { value: "Basketball", label: "Basketball" },
            { value: "Tennis", label: "Tennis" },
            { value: "Cricket", label: "Cricket" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Color of Sport"
        name="color"
        initialValue="Red"
        rules={[{ required: true, message: "Please input!" }]}>
        <Select
          defaultValue="Red"
          style={{ width: "100%" }}
          // onChange={handleChange}
          options={[
            { value: "Red", label: "Red" },
            { value: "Green", label: "Green" },
            { value: "Blue", label: "Blue" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Brand of Sport"
        name="brand"
        initialValue="Puma"
        rules={[{ required: true, message: "Please input!" }]}>
        <Select
          defaultValue="Puma"
          style={{ width: "100%" }}
          // onChange={handleChange}
          options={[
            { value: "Puma", label: "Puma" },
            { value: "Nike", label: "Nike" },
            { value: "Adidas", label: "Adidas" },
            { value: "Kookaburra", label: "Kookaburra" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Material of Sport"
        name="material"
        initialValue="Leather"
        rules={[{ required: true, message: "Please input!" }]}>
        <Select
          defaultValue="Leather"
          style={{ width: "100%" }}
          // onChange={handleChange}
          options={[
            { value: "Leather", label: "Leather" },
            { value: "Synthetic", label: "Synthetic" },
            { value: "Fabric", label: "Fabric" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Quantity of Sport"
        name="quantity"
        rules={[{ required: true, message: "Please input!" }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Condition of Sport"
        name="condition"
        initialValue="New"
        rules={[{ required: true, message: "Please input!" }]}>
        <Select
          defaultValue="New"
          style={{ width: "100%" }}
          // onChange={handleChange}
          options={[
            { value: "New", label: "New" },
            { value: "Used", label: "Used" },
          ]}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddForm;
