import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import DashBoardCard from "../components/DashBoardCard";
import NavBar from "../components/NavBar";
import "./dashboard.css";

const DashBoard = () => {
  const tasks = useSelector((state) => state.tasks);
  const isAuth = useSelector((store) => store.auth.isAuthenticated);

  const countTasks = (stage) =>
    tasks.filter((task) => task.stage === stage).length;

  const TASK_STAGES = {
    TO_DO: 1,
    ONGOING: 2,
    DONE: 3,
    BACKLOG: 0,
  };

  const data = [
    { heading: "Total Task", count: tasks.length },
    { heading: "Total Completed", count: countTasks(TASK_STAGES.DONE) },
    { heading: "Total Pending", count: countTasks(TASK_STAGES.BACKLOG) },
  ];

  console.log(isAuth);
  return (
    <>
      <NavBar />
      <Container>
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
