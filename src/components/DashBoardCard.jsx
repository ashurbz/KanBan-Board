import Card from "react-bootstrap/Card";

const DashBoardCard = ({ data }) => {
  return (
    <div className="card">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{data.heading}</Card.Title>
          <Card.Text>{data.count}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashBoardCard;
