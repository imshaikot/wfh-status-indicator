import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { default as Context } from "../context";

function MainCard() {
  const { setIsActive } = useContext(Context);
  return (
    <Card style={{ width: "18rem" }} className="bg-dark text-light">
      <Card.Body>
        <Card.Title>Work from Home Indicator</Card.Title>
        <Card.Text>
          You need to activate the service below, and whenever you open Google
          Meet for the first time, you will be asked to pair your LED strip
          using Bluetooth.
        </Card.Text>
        <Button onClick={() => setIsActive(true)} variant="primary">
          Activate
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MainCard;
