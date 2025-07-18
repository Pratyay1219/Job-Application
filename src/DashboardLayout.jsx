import SideBar from "./Components/SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="bg-blue-light">
      <SideBar />
      <div className="px-6 pb-6 flex-grow lg:ml-56 h-auto pt-16 lg:pt-4 bg-blue-light">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
