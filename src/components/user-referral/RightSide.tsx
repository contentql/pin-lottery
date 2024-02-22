import DataTable from "./DataTable";
import Overview from "./Overview";
import Referral from "./Referral";

const RightSide = () => {
  return (
    <div className="col-lg-8 mt-lg-0 mt-4">
      {/* Referral Link Here */}
      <Referral />

      {/* Overview here */}
      <Overview />

      {/* Data table here */}
      <DataTable />
    </div>
  );
};

export default RightSide;
