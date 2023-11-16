import { userRole } from "../../utils/constants";
import UserTable from "./UserTable";
import Button from "../../components/button/Button";
import { useAuth } from "../../contexts/auth-context";
import DashBoardHeading from "../dashboard/DashBoardHeading";

const UserManage = () => {
  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <DashBoardHeading title="UserManage" desc="List user">
        <div className="flex justify-end mb-10">
          <Button to="/manage/add-user" type="button">
            Add new user
          </Button>
        </div>
      </DashBoardHeading>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
