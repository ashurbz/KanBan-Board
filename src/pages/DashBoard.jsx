import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import DashBoardCard from "../components/DashBoardCard";
import NavBar from "../components/NavBar";
import "./dashboard.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/TaskSlice";
import axios from "axios";

const DashBoard = () => {
  const [data, setData] = useState([]);
  const user = useSelector((store) => store.auth.user);
  const tasks = useSelector((store) => {
    return store.tasks.tasks;
  });

  const dispatch = useDispatch();
  const countTasks = (stage) =>
    tasks.filter((task) => task.stage === stage).length || 0;

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/tasks`);
      const userTasks = res.data.filter((task) => task.createdBy === user.id);

      dispatch(setTasks(userTasks));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const temp = [
      { heading: "Total Task", count: tasks.length },
      { heading: "Total Completed", count: countTasks(TASK_STAGES.DONE) },
      { heading: "Total Pending", count: countTasks(TASK_STAGES.BACKLOG) },
    ];

    setData(temp);
  }, [tasks, tasks.length]);

  const TASK_STAGES = {
    TO_DO: 1,
    ONGOING: 2,
    DONE: 3,
    BACKLOG: 0,
  };

  return (
    <>
      <NavBar />
      <Container style={{ minHeight: "100vh" }}>
        <Row className="my-4">
          {data.map((dataItem) => (
            <Col xs={12} md={6} lg={4} key={dataItem.heading} className="mb-4">
              <DashBoardCard data={dataItem} />
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Link to="/task_management">
              <Button variant="primary" size="lg">
                Go To Task Management Page
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashBoard;
