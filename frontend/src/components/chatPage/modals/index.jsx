import { useSelector } from 'react-redux';

import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

const ModalForm = () => {
  const { type } = useSelector((state) => state.modalInfo);

  if (!type) {
    return null;
  }
  const Component = modals[type];
  return <Component />;
};
export default ModalForm;
