import React, { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const ConfirmationModal = ({ action, content, title, buttonName, accent }) => {
  const [show, setShow] = useState(false);
  return (
    <Modal
      trigger={
        <Button inverted basic color={accent} onClick={() => setShow(true)}>
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
        <Button basic inverted onClick={() => setShow(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button inverted basic color="red" inverted onClick={action}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmationModal;
