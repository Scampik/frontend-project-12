import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Form, Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import filter from "leo-profanity";

import { isClose } from "../../slices/modalSlice.js";
import * as Yup from "yup";
import { selectors } from "../../slices/channelsSlice.js";
import { useWSocket } from "../../hooks/index.jsx";

const AddChannel = () => {
  const dispatch = useDispatch();
  const wsocket = useWSocket();
  const { t } = useTranslation();

  const { isShow } = useSelector((state) => state.modalInfo);
  const channels = useSelector(selectors.selectAll);

  // console.log('lol', channels)

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Обязательное поле")
      .min(3, "Минимум 3 буквы")
      .max(10, "Максимум 10 букв")
      .notOneOf(
        channels.map((item) => item.name.trim()),
        "Должно быть уникальным"
      ),
  });

  const handleClose = () => {
    formik.values.name = "";
    formik.errors.name = "";
    formik.touched.name = false;
    dispatch(isClose());
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const cleanName = filter.clean(values.name);
      wsocket.emitNewChannel(cleanName);
      formik.values.name = "";
      handleClose();
    },
  });

  return (
    <>
      <Modal
        show={isShow}
        onHide={handleClose}
        dialogClassName="modal-dialog-centered"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("addChannel")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                className="mb-2"
                onChange={formik.handleChange}
                value={formik.values.name}
                // onBlur={formik.handleBlur}
                name="name"
                id="name"
                required
                isInvalid={formik.errors.name && formik.touched.name}
                autoFocus
              />
              <label className="visually-hidden" htmlFor="name">
                {t("nameChannel")}
              </label>
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
                  {t("cancel")}
                </Button>
                <Button variant="primary" type="submit">
                  {t("send")}
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannel;
