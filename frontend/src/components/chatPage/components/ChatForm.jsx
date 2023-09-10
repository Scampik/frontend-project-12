import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import * as Yup from 'yup';
import { ArrowRightSquare } from 'react-bootstrap-icons';

import { currentChannelMessages } from '../../../slices/messagesSlice.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import { channelIdSelector, channelNameSelector } from '../../../slices/channelsSlice.js';
import { useWSocket } from '../../../context/WScontext.jsx';
import bgChatImage from '../../../assets/bg-chat.svg';

const ChatForm = () => {
  const auth = useAuth();
  const inputRef = useRef(null);
  const scrollbarRef = useRef(null);
  const wsocket = useWSocket();
  const { t } = useTranslation();

  const currentChannelId = useSelector(channelIdSelector);
  const currentNameChannel = useSelector(channelNameSelector);
  const messages = useSelector(currentChannelMessages);
  const userData = auth.user;

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, messages]);

  useEffect(() => {
    scrollbarRef.current?.scrollIntoView();
  }, [messages.length]);

  const validationSchema = Yup.object().shape({
    body: Yup.string().trim().required(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const cleanBody = filter.clean(values.body);
      try {
        await wsocket.emitNewMessage({
          body: cleanBody,
          channelId: currentChannelId,
          username: userData.username,
        });
        formik.resetForm();
      } catch (err) {
        console.log(err);
      }
      formik.setSubmitting(false);
    },
  });

  return (
    <>
      <div className="col p-0 h-100">
        <div
          className="d-flex flex-column h-100 bg-success"
          style={{
            backgroundImage: `url(${bgChatImage}), linear-gradient(to bottom, #9ed182, #dcf6c0)`,
            backgroundRepeat: 'repeat',
          }}
        >
          <div className="bg-light mb-4 p-3 shadow-sm small bg-body-tertiary">
            <p className="m-0">
              <b>
                {'# '}
                {currentNameChannel}
              </b>
            </p>
            <span className="text-muted">
              {t('messages.counter.count', { count: messages.length })}
            </span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5">
            {messages.map((msg) => (msg.username === auth.user.username ? (
              <div key={msg.id} className="text-break mb-2 d-flex justify-content-end" ref={scrollbarRef}>
                <div className="text-break border bg-info-subtle p-2 rounded">
                  <b>{msg.username}</b>
                  :
                  {' '}
                  {msg.body}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="text-break mb-2" ref={scrollbarRef}>
                <div className="d-inline-flex bg-white p-2 rounded border">
                  <div>
                    <b>{msg.username}</b>
                  </div>
                  :
                  {' '}
                  {msg.body}
                </div>
              </div>
            )))}
          </div>
          <div className="mt-auto px-5 py-3">
            <Form
              onSubmit={formik.handleSubmit}
              noValidate
              className="py-1 border rounded-2 bg-body-secondary"
            >
              <Form.Group className="input-group has-validation">
                <Form.Control
                  className="border-0 p-0 ps-2"
                  onChange={formik.handleChange}
                  value={formik.values.body}
                  name="body"
                  aria-label="Новое сообщение"
                  ref={inputRef}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  placeholder="Введите сообщение..."
                />
                <Button type="submit" variant="group-vertical" disabled={formik.isSubmitting}>
                  <ArrowRightSquare
                    size={20}
                  />
                  <span className="visually-hidden">{t('send')}</span>
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatForm;
