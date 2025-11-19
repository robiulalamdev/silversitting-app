import Login from "@/components/auth/login/Login";
import React from "react";
import { StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";

type LoginModalProps = {
  visible: boolean;
  setVisible: (val: boolean) => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ visible, setVisible }) => {
  const hideModal = () => setVisible(false);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
      >
        {visible && <Login isPopup={true} onHide={() => setVisible(false)} />}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    elevation: 5,
    flex: 1,
    maxHeight: 500,
  },
});

export default LoginModal;
