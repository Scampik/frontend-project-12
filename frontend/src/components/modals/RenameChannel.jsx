import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Button, Modal } from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';

import { isClose } from '../../slices/modalSlice.js';
import * as Yup from 'yup';
import { selectors } from '../../slices/channelsSlice.js';
import { useWSocket } from '../../hooks/index.jsx';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const wsocket = useWSocket();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const { isShow, extraData } = useSelector((state) => state.modalInfo);
  const channelsData = useSelector(selectors.selectAll);
  const channels = channelsData.map((el) => el.name);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const getValidationSchema = (channels) =>
    Yup.object().shape({
      name: Yup.string()
        .trim()
        .required(t('modal.required'))
        .min(3, t('modal.min'))
        .max(10, t('modal.max'))
        .notOneOf(channels, t('modal.notoneof')),
    });

  const handleClose = () => {
    dispatch(isClose());
  };

  const formik = useFormik({
    initialValues: {
      name: extraData?.name || '',
    },
    validationSchema: getValidationSchema(channels),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const cleanName = filter.clean(values.name);
        getValidationSchema(channels).validateSync({ name: cleanName });
        await wsocket.emitRenameChannel(extraData.id, cleanName);
        formik.values.name = '';
        toast.info(t('toast.renameChannel'));
        handleClose();
      } catch (e) {
        // setSubmitting(false);
        throw e;
      }
      // setSubmitting(true);
    },
  });

  return (
    <>
      <Modal
        show={isShow}
        onHide={handleClose}
        dialogClassName='modal-dialog-centered'
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('renameChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                className='mb-2'
                ref={inputRef}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                value={formik.values.name}
                // onBlur={formik.handleBlur}
                name='name'
                id='name'
                required
                isInvalid={formik.errors.name && formik.touched.name}
              />
              <label className='visually-hidden' htmlFor='name'>
                {t('nameChannel')}
              </label>
              <Form.Control.Feedback type='invalid'>
                {formik.errors.name}
              </Form.Control.Feedback>
              <div className='d-flex justify-content-end'>
                <Button
                  className='me-2'
                  variant='secondary'
                  type='button'
                  onClick={handleClose}
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant='primary'
                  type='submit'
                  disabled={formik.isSubmitting}
                >
                  {t('send')}
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameChannel;
