import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { isOpen, isClose } from '../slices/modalSlice.js'
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  channelName: Yup.string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'Минимум 3 буквы')
    .max(10, 'Максимум 10 букв'),
});

const ModalChannel = (show, set, handle) => {
  const dispatch = useDispatch();

  const {modalStatus} = useSelector((state) => state.modal);

  console.log('lol',modalStatus)

  const handleClose = () => {
    dispatch(isClose());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
        console.log(values)
      
    }
  })
    
    return (
        <>
          <Modal 
            show={modalStatus} 
            onHide={handleClose} 
            dialogClassName="modal-dialog-centered">
              <Modal.Header closeButton>
                <Modal.Title>Добавить канал</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group >
                    <Form.Control className='mb-2'
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      name="name"
                      id='name'
                      isInvalid={(formik.errors.name && formik.touched.name)}
                      autoFocus
                    />
                    <label class="visually-hidden" for="name">Имя канала</label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.name}
                    </Form.Control.Feedback>
                    <div className="d-flex justify-content-end">
                      <Button
                        className="me-2"
                        variant="secondary"
                        type="button"
                        onClick={handleClose}
                      >
                        Отменить
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                      >
                      Отправить
                      </Button>
                    </div>
                  </Form.Group>
                </Form>
              </Modal.Body>
          </Modal>
        </>
      );
};

export default ModalChannel;