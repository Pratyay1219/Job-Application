import { Link } from "react-router-dom";

const DashboardCard = ({ to, icon: Icon, title, description }) => {
  return (
    <div>
  <Link
    to={to}
    className="block w-full p-4 bg-blue-light rounded-xl hover:bg-blue/20 h-full border border-blue shadow-sm transition duration-300"
  >
    <span className="flex w-10 h-10 rounded-full items-center justify-center text-blue bg-white text-xl shadow">
      <Icon />
    </span>
    <h5 className="md:text-lg font-bold text-blue mt-2">{title}</h5>
    <p className="text-blue text-sm">{description}</p>
  </Link>
</div>
  );
};

export default DashboardCard;
