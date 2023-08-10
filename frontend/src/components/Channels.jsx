import { Button, Dropdown, ButtonGroup } from "react-bootstrap";

const Channels = ({
  id,
  name,
  removable,
  handleCurrenChannel,
  currentChannel,
}) => {
  console.log(currentChannel);
  const handleRemoveChannel = (id) => {
    // const curChannelName = event.target.innerText.slice(1)
    // const getCurrentChannel = channels.find((item) => item.name === curChannelName)
    // console.log(id, "id");
    // wsocket.sendRemoveChannel()
  };

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        type="button"
        variant={id === currentChannel ? "secondary" : ""}
        key={id}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={handleCurrenChannel}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle
        split
        className="flex-grow-0"
        variant={id === currentChannel ? "secondary" : ""}
      >
        <span className="visually-hidden">меню</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemoveChannel(id)}>
          Удалить канал
        </Dropdown.Item>
        <Dropdown.Item onClick={handleRemoveChannel}>
          Переименовать канал
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Channels;
