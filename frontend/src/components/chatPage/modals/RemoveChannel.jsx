import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { closeModal, modalSelector } from '../../../slices/modalsSlice.js';
import { useWSocket } from '../../../context/WScontext.jsx';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const wsocket = useWSocket();
  const { t } = useTranslation();

  const { extraData } = useSelector(modalSelector);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleRemove = async () => {
    try {
      wsocket.emitRemoveChannel(extraData.id);
      dispatch(closeModal());
      toast.warn(t('toast.removeChannel'));
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
          >
            {t('cancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
          >
            {t('delete')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannel;
