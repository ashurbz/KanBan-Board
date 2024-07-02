import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { addTask } from "../redux/TaskSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./taskForm.css";

const TaskForm = () => {
  const [task, setTask] = useState({ name: "", priority: "low", deadline: "" });
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name || !task.deadline) {
      window.alert("Please fill in all fields");
      return;
    }
    dispatch(
      addTask({ ...task, id: Date.now(), stage: 0, createdBy: user.id })
    );
    setTask({ name: "", priority: "low", deadline: "" });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="p-4">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Task Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="name"
              placeholder="Task Name"
              value={task.name}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Priority
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Deadline
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className="click"
              type="date"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
              min={today}
            />
          </Col>
        </Form.Group>

        <Button type="submit" variant="success">
          Create Task
        </Button>
      </Form>
    </Container>
  );
};

export default TaskForm;
