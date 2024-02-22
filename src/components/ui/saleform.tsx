import { useState } from "react";
import { Button, Modal } from "antd";
import ModalSale from "./modalsale";

const SaleForm = ({ sport }: { sport: Record<string, unknown> }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Button danger onClick={showModal}>
        Sell
      </Button>
      <Modal
        title={`Sell ${sport?.name}`}
        open={open}
        closeIcon={false}
        footer={null}
        centered>
        <ModalSale sport={sport} setOpen={setOpen} />
      </Modal>
    </>
  );
};

export default SaleForm;
