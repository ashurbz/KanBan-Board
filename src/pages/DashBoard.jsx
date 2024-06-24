import { Link } from "react-router-dom";
import DashBoardCard from "../components/DashBoardCard";
import NavBar from "../components/NavBar";
import "./dashboard.css";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const tasks = useSelector((state) => state.tasks);

  const isAuth = useSelector((store) => store.auth.isAuthenticated);
  const countTasks = (stage) => {
    return tasks.filter((task) => task.stage === stage).length;
  };

  const TASK_STAGES = {
    TO_DO: 1,
    ONGOING: 2,
    DONE: 3,
    BACKLOG: 0,
  };
  // const stages = ["Backlog", "To Do", "Ongoing", "Done"];

  const data = [
    {
      heading: "Total Task",
      count: tasks.length,
    },
    {
      heading: "Total Completed",
      count: countTasks(TASK_STAGES.DONE),
    },
    {
      heading: "Total Pending",
      count: countTasks(TASK_STAGES.BACKLOG),
    },
  ];

  console.log(isAuth);
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="card-container">
        {data.map((data) => {
          return <DashBoardCard data={data} key={data.heading} />;
        })}
      </div>
      <Link style={{ textDecoration: "none" }} to="/task_management">
        <p style={{ textAlign: "center", fontSize: "x-large" }}>
          Go To Task Management Page
        </p>
      </Link>
    </>
  );
};

export default DashBoard;
