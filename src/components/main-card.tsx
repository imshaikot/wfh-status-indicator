import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function MainCard() {
  return (
    <Card style={{ width: "18rem" }} className="bg-dark text-light">
      <Card.Body>
        <Card.Title>Work from Home Indicator</Card.Title>
        <Card.Text>
          You need to activate the service below, and whenever you open Google
          Meet for the first time, you will be asked to pair your LED strip
          using Bluetooth.
        </Card.Text>
        <Button variant="primary">Activate</Button>
      </Card.Body>
    </Card>
  );
}

export default MainCard;
