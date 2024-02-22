import { useState } from "react";
import { Button, Modal } from "antd";
import HandleForm from "./handleform";

const ModalForm = ({ sport }: { sport: Record<string, unknown> }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Button danger onClick={showModal}>Edit</Button>
      <Modal
        title={`Edit ${sport?.name}`}
        open={open}
        closeIcon={false}
        footer={null}
        centered>
        <HandleForm sport={sport} setOpen={setOpen} />
      </Modal>
    </>
  );
};

export default ModalForm;
