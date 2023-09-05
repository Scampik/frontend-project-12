import ChannelForm from './ChannelForm.jsx';
import ChatForm from './ChatForm.jsx';

const MainForm = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <ChannelForm />
      <ChatForm />
    </div>
  </div>
);

export default MainForm;
