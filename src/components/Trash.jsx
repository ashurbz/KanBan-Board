import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Droppable } from "react-beautiful-dnd";

const Trash = () => {
  return (
    <Droppable droppableId="trash">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Button variant="danger" className="d-flex align-items-center">
            <i className="fas fa-trash-alt fa-3x"></i>
          </Button>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Trash;
