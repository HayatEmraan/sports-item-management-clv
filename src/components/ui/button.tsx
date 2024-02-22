import React, { useState } from "react";
import {
  Button,
  Drawer,
  Input,
  Radio,
  RadioChangeEvent,
  Slider,
  Space,
} from "antd";
import { FilterOutlined, RedoOutlined } from "@ant-design/icons";
import { TFilter } from "../../types/filter";

const ButtonUI = ({
  deleteSportID,
  fn,
}: {
  deleteSportID: string[];
  fn: (e: string[]) => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #d9d9d9",
        padding: "5px",
        borderRadius: "10px",
      }}>
      <Button href="/add-sports" type="primary">
        Add Sport
      </Button>
      <div>
        <Button
          onClick={() => fn(deleteSportID)}
          disabled={deleteSportID.length <= 0}
          style={{ marginRight: "10px" }}
          danger>
          Bulk Delete
        </Button>
        <Button href="/sale-sports" type="primary">
          Sell Sport
        </Button>
      </div>
    </div>
  );
};

type TPriceRange = {
  min: number;
  max: number;
};

type TQuery = {
  type?: string;
  brand?: string;
  size?: string;
  condition?: string;
  color?: string;
  material?: string;
};

export const SellButtonUI = ({
  setFiltering,
}: {
  setFiltering: React.Dispatch<React.SetStateAction<TFilter | undefined>>;
}) => {
  const [open, setOpen] = useState(false);

  const [priceRange, setPriceRange] = useState<TPriceRange>({
    min: 10,
    max: 50,
  });

  const [query, setQuery] = useState<TQuery>({});

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (value: number[]) => {
    const [min, max] = value;
    setPriceRange({ min, max });
  };

  const typeChange = (e: RadioChangeEvent) => {
    setQuery({
      ...query,
      type: e.target.value,
    });
  };
  const brandChange = (e: RadioChangeEvent) => {
    setQuery({
      ...query,
      brand: e.target.value,
    });
  };
  const sizeChange = (e: RadioChangeEvent) => {
    setQuery({
      ...query,
      size: e.target.value,
    });
  };
  const materialChange = (e: RadioChangeEvent) => {
    setQuery({
      ...query,
      material: e.target.value,
    });
  };
  const colorChange = (e: RadioChangeEvent) => {
    setQuery({
      ...query,
      color: e.target.value,
    });
  };
  const conditionChange = (e: RadioChangeEvent) => {
    setQuery({
      ...query,
      condition: e.target.value,
    });
  };

  const handleSubmit = () => {
    setFiltering({ ...query, ...priceRange });
    setOpen(false);
  };

  const handleReset = () => {
    setFiltering(undefined);
    setQuery({});
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #d9d9d9",
        padding: "5px",
        borderRadius: "10px",
      }}>
      <Button href="/add-sports" type="primary">
        Add Sport
      </Button>
      <Button type="primary" onClick={showDrawer}>
        <FilterOutlined /> Filter
      </Button>
      <Drawer title="Filtering Options" onClose={onClose} open={open}>
        <div>
          <h4>Price Range</h4>
          <Slider
            onChange={onChange}
            range={{ draggableTrack: true }}
            defaultValue={[10, 50]}
            max={100}
          />
          <Space.Compact size="large">
            <Input
              value={priceRange?.min}
              style={{ height: 25 }}
              placeholder="MIN"
            />
            <Input
              value={priceRange?.max}
              style={{ height: 25 }}
              placeholder="MAX"
            />
          </Space.Compact>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h4 style={{ marginBottom: "5px" }}>Type</h4>
          <Radio.Group onChange={typeChange} value={query?.type}>
            <Radio value={"Soccer"}>Soccer</Radio>
            <Radio value={"Basketball"}>Basketball</Radio>
            <Radio value={"Cricket"}>Cricket</Radio>
            <Radio value={"Tennis"}>Tennis</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h4 style={{ marginBottom: "5px" }}>Brand</h4>
          <Radio.Group onChange={brandChange} value={query?.brand}>
            <Radio value={"Nike"}>Nike</Radio>
            <Radio value={"Puma"}>Puma</Radio>
            <Radio value={"Adidas"}>Adidas</Radio>
            <Radio value={"Kookaburra"}>Kookaburra</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h4 style={{ marginBottom: "5px" }}>Size</h4>
          <Radio.Group onChange={sizeChange} value={query?.size}>
            <Radio value={"Normal"}>Normal</Radio>
            <Radio value={"Medium"}>Medium</Radio>
            <Radio value={"Large"}>Large</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h4 style={{ marginBottom: "5px" }}>Material</h4>
          <Radio.Group onChange={materialChange} value={query?.material}>
            <Radio value={"Leather"}>Leather</Radio>
            <Radio value={"Synthetic"}>Synthetic</Radio>
            <Radio value={"Fabric"}>Fabric</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h4 style={{ marginBottom: "5px" }}>Color</h4>
          <Radio.Group onChange={colorChange} value={query?.color}>
            <Radio value={"Red"}>Red</Radio>
            <Radio value={"Blue"}>Blue</Radio>
            <Radio value={"Green"}>Green</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h4 style={{ marginBottom: "5px" }}>Condition</h4>
          <Radio.Group onChange={conditionChange} value={query?.condition}>
            <Radio value={"New"}>New</Radio>
            <Radio value={"Used"}>Used</Radio>
          </Radio.Group>
        </div>

        <Button
          style={{ marginTop: "20px" }}
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}>
          <FilterOutlined /> Filter
        </Button>

        <Button
          style={{ marginTop: "20px", marginLeft: "10px" }}
          type="primary"
          onClick={handleReset}
          htmlType="reset">
          <RedoOutlined /> Reset
        </Button>
      </Drawer>
    </div>
  );
};

export default ButtonUI;
