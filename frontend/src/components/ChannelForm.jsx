import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  actions as channelsActions,
  getChannels,
  selectors,
} from '../slices/channelsSlice.js';
import { isOpen } from '../slices/modalSlice.js';

import getModal from './modals/index.jsx';
import Channels from './Channels.jsx';

const ChannelForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector(selectors.selectAll);
  const { currentChannel } = useSelector((state) => state.channels);
  const { type } = useSelector((state) => state.modalInfo);

  // console.log(isShow, "eto___statsu");
  // console.log(currentChannel, 'currentChannelId') nado kak to zadefoltit
  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

  const handleAddChannel = () => {
    dispatch(isOpen({ type: 'adding', extraData: '' }));
  };

  const handleCurrenChannel = (channel) => () => {
    dispatch(channelsActions.setCurrentChannel(channel));
  };

  const handleRemoveChannel = (channel) => () => {
    dispatch(isOpen({ type: 'removing', extraData: channel }));
  };

  const handleRenameChannel = (channel) => () => {
    dispatch(isOpen({ type: 'renaming', extraData: channel }));
  };

  const renderMainChannels = (channel) => {
    return (
      <Button
        type="button"
        variant={channel.id === currentChannel.id ? 'secondary' : ''}
        className="w-100 rounded-0 text-start"
        onClick={handleCurrenChannel(channel)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    );
  };

  const renderUsersChannels = (channel) => {
    return (
      <Channels
        handleCurrenChannel={handleCurrenChannel(channel)}
        handleRemoveChannel={handleRemoveChannel(channel)}
        handleRenameChannel={handleRenameChannel(channel)}
        channel={channel}
      />
    );
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleAddChannel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-clipboard-plus"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </button>
        {getModal({ type })}
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            {!channel.removable
              ? renderMainChannels(channel)
              : renderUsersChannels(channel)}
          </li>
        ))}
      </ul>
    </div>
  );
};
// btn-secondary
export default ChannelForm;
