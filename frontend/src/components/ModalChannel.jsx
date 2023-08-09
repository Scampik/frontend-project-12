import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { isClose } from '../slices/modalSlice.js'
import * as Yup from 'yup'
import _ from 'lodash'
import { actions as channelsActions, selectors } from '../slices/channelsSlice.js'



const ModalChannel = (show, set, handle) => {
  const dispatch = useDispatch()

  const { modalStatus } = useSelector((state) => state.modal)
  const channels = useSelector(selectors.selectAll)

  // console.log('lol', channels)

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('Обязательное поле')
      .min(3, 'Минимум 3 буквы')
      .max(10, 'Максимум 10 букв')
      .notOneOf(channels.map((item) => item.name.trim()), 'Должно быть уникальным'),
  })

  const handleClose = () => {
    dispatch(isClose())
  }

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema,
    onSubmit: (values) => {
      // alert(values.name)
      dispatch(channelsActions.addChannel({
        name: values.name, 
        id: 2 + _.uniqueId()
      }));
      handleClose();
    }
  })

  return (
    <>
      <Modal
        show={modalStatus}
        onHide={handleClose}
        dialogClassName='modal-dialog-centered'
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                className='mb-2'
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                name='name'
                id='name'
                required
                isInvalid={(formik.errors.name && formik.touched.name)}
                autoFocus
              />
              <label className='visually-hidden' htmlFor='name'>Имя канала</label>
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
                  Отменить
                </Button>
                <Button
                  variant='primary'
                  type='submit'
                >
                  Отправить
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalChannel
