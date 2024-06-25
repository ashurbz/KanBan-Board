import Card from "react-bootstrap/Card";

const DashBoardCard = ({ data }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{data.heading}</Card.Title>
        <Card.Text>{data.count}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DashBoardCard;
