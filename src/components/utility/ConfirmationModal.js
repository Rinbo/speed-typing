import React, { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const ConfirmationModal = ({ action, content, title, buttonName, accent }) => {
  const [show, setShow] = useState(false);
  return (
    <Modal
      trigger={
        <Button
          inverted
          basic
          color={accent}
          style={{ width: 200, marginTop: 15 }}
          onClick={() => setShow(true)}
        >
          {buttonName}
        </Button>
      }
      open={show}
      onClose={() => setShow(false)}
      basic
      size="small"
    >
      <Header icon="remove" content={title} />
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          style={{ widht: 80 }}
          basic
          inverted
          onClick={() => setShow(false)}
        >
          No
        </Button>
        <Button
          style={{ widht: 80 }}
          inverted
          basic
          color="red"
          inverted
          onClick={action}
        >
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmationModal;
