import NavBar from "../components/NavBar";
import "./home.css";
const Home = () => {
  return (
    <div className="home-page-container">
      <NavBar />
      <h3 className="home-content">
        Welcome To KanBan HomePage , Please Sign In to Continue
      </h3>
    </div>
  );
};

export default Home;
