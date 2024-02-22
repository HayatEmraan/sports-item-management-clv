import { Button, Form, Input, InputNumber, Select, message } from "antd";
import { useUpdateSportMutation } from "../../redux/features/sports/sports.api";

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

const HandleForm = ({
  sport,
  setOpen,
}: {
  sport: Record<string, unknown>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [sportUpdate] = useUpdateSportMutation();
  const handleSubmit = (values: Record<string, unknown>) => {
    sportUpdate({ ...values, id: sport?._id })
      .unwrap()
      .then(() => message.success("Update success"))
      .catch(() => message.error("Update failed"));
    setOpen(false);
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
        label="Sport Name"
        initialValue={sport?.name}
        name="name"
        rules={[{ required: true, message: "Please input!" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Price of Sport"
        name="price"
        initialValue={sport?.price}
        rules={[{ required: true, message: "Please input!" }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Size of Sport" name="size" initialValue={sport?.size}>
        <Select
          defaultValue={sport?.size}
          style={{ width: "100%" }}
          // onChange={handleChange}
          options={[
            { value: "Small", label: "Small" },
            { value: "Medium", label: "Medium" },
            { value: "Large", label: "Large" },
          ]}
        />
      </Form.Item>

      <Form.Item label="Type of Sport" name="type" initialValue={sport?.type}>
        <Select
          defaultValue={sport?.type}
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
        initialValue={sport?.color}>
        <Select
          defaultValue={sport?.color}
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
        initialValue={sport?.brand}>
        <Select
          defaultValue={sport?.brand}
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
        initialValue={sport?.material}>
        <Select
          defaultValue={sport?.material}
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
        initialValue={sport?.quantity}
        rules={[{ required: true, message: "Please input!" }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Condition of Sport"
        name="condition"
        initialValue={sport?.condition}>
        <Select
          defaultValue={sport?.condition}
          style={{ width: "100%" }}
          options={[
            { value: "New", label: "New" },
            { value: "Used", label: "Used" },
          ]}
        />
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

export default HandleForm;
