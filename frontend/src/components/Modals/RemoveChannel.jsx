import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { isClose } from "../../slices/modalSlice.js";
import * as Yup from "yup";
import _ from "lodash";
import {
  actions as channelsActions,
  selectors,
} from "../../slices/channelsSlice.js";
import { useWSocket } from "../../hooks/index.jsx";

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const wsocket = useWSocket();

  const { isShow, type, extraData } = useSelector((state) => state.modalInfo);
  const channels = useSelector(selectors.selectAll);

  // console.log('lol', channels)

  const handleClose = () => {
    dispatch(isClose());
  };

  const handleRemove = () => {
    // console.log(extraData);
    wsocket.emitRemoveChannel(extraData.id);
    dispatch(isClose());
  };

  return (
    <>
      <Modal
        show={isShow}
        onHide={handleClose}
        dialogClassName="modal-dialog-centered"
      >
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">Уверены?</p>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="secondary"
              type="button"
              onClick={handleClose}
            >
              Отменить
            </Button>
            <button
              className="btn btn-danger"
              variant="primary"
              type="submit"
              onClick={handleRemove}
            >
              Удалить
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RemoveChannel;
