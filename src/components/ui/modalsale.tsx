import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import { useState } from "react";
import { useAddSaleMutation } from "../../redux/features/sales/sales.api";

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

const ModalSale = ({
  sport,
  setOpen,
}: {
  sport: Record<string, unknown>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [date, setDate] = useState("");
  const [sale] = useAddSaleMutation();
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
  };

  const handleSubmit = (values: Record<string, unknown>) => {
    delete values.sport;
    sale({ ...values, date })
      .unwrap()
      .then(() => {
        setOpen(false);
        message.success("Sale successfully");
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
        padding: "20px 20px 0 20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}>
      <Form.Item
        label="Sport ID"
        rules={[{ required: true, message: "Please input!" }]}
        initialValue={sport?._id}
        name="sportId">
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Selling Sport"
        rules={[{ required: true, message: "Please input!" }]}
        initialValue={sport?.name}
        name="sport">
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Buyer Name"
        name="name"
        rules={[{ required: true, message: "Please input!" }]}>
        <Input placeholder="John Doe" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Sell Quantity"
        name="quantity"
        initialValue={1}
        rules={[{ required: true, message: "Please input!" }]}>
        <InputNumber
          max={sport.quantity as number}
          min={1}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        name="date"
        rules={[{ required: true, message: "Please input!" }]}
        label="Date of Sale">
        <DatePicker style={{ width: "100%" }} onChange={onChange} />
      </Form.Item>

      <Form.Item>
        <Button
          style={{ marginRight: "10px" }}
          type="dashed"
          onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ModalSale;
