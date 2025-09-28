import { Outlet } from "react-router-dom";
import Navbar from "../Navbar"
import Footer from "../Footer"
const Mainlayout = () => {
  return (
    <div className=" mx-auto">
      {/* Navbar */}
      <Navbar></Navbar>

      {/* Page content */}
      <div className="min-h-[calc(100vh-232px)] py-3">
        <Outlet /> {/* Nested routes render here */}
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Mainlayout;