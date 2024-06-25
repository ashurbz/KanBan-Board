import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Trash = () => {
  return (
    <Button variant="danger" className="d-flex align-items-center">
      <i className="fas fa-trash-alt fa-3x"></i>
    </Button>
  );
};

export default Trash;
