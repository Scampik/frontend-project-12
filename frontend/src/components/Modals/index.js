import Add from "./AddChannel";
import Remove from "./RemoveChannel";
import Rename from "./RenameChannel";

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const getModal = ({ type }) => {
  console.log(type);
  if (!type) {
    return null;
  }
  const Component = modals[type];
  return <Component />;
};
export default getModal;
