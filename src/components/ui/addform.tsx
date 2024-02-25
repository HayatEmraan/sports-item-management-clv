/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, message } from "antd";

import { useAddSportMutation } from "../../redux/features/sports/sports.api";
import { useNavigate } from "react-router-dom";
import { uploadImg } from "../../utils/imgbb";
import { useAppSelector } from "../../redux/hooks";

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
  const [inputFile, setInputFile] = useState<any>({});
  const navigate = useNavigate();

  const userBranch = useAppSelector((state) => state.auth.user?.branch);

  const handleSubmit = async (values: Record<string, unknown>) => {
    delete values.image;
    const upload = await uploadImg(inputFile);

    sport({ ...values, image: upload })
      .unwrap()
      .then((res) => {
        if (res.success) {
          message.success("Sport added successfully");
          navigate("/manage-sports");
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
        <Input
          onChange={(e) => setInputFile(e.target.files?.[0])}
          type="file"
        />
      </Form.Item>

      <Form.Item
        label="Size of Sport"
        name="size"
        initialValue="Medium"
        rules={[{ required: true, message: "Please input!" }]}>
        <Select
          defaultValue="Medium"
          style={{ width: "100%" }}
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

      <Form.Item
        name="branch"
        label="Branch of Sport"
        initialValue={userBranch || "rangpur"}
        rules={[{ required: true, message: "Please input!" }]}>
        <Select
          defaultValue={userBranch || "rangpur"}
          disabled={userBranch ? true : false}
          style={{ width: "100%" }}
          options={[
            { value: "rangpur", label: "Rangpur Branch" },
            { value: "dhaka", label: "Dhaka Branch" },
            { value: "rajshahi", label: "Rajshahi Branch" },
            { value: "cumilla", label: "Cumilla Branch" },
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
