import { Link } from "react-router-dom";
import DashBoardCard from "../components/DashBoardCard";
import NavBar from "../components/NavBar";
import "./dashboard.css";

const data = [
  {
    heading: "Total Task",
    count: 2,
  },
  {
    heading: "Total Completed",
    count: 2,
  },
  {
    heading: "Total Pending",
    count: 2,
  },
];
const DashBoard = () => {
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
