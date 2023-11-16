import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashBoardHeader from "./DashBoardHeader";
import SideBar from "./SideBar";
import { useAuth } from "../../contexts/auth-context";
import NotFoundPage from "../../pages/NotFoundPage";
import { userRole } from "../../utils/constants";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 40px;
      color: ${(props) => props.theme.primary};
      letter-spacing: 1px;
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
    }
    &-children {
      padding: 20px;
    }
  }
`;
const DashboardLayout = () => {
  const { userInfo } = useAuth();
  if (!userInfo) return <NotFoundPage></NotFoundPage>;

  if (userInfo.role !== userRole.ADMIN) return null;
  return (
    <DashboardStyles>
      <DashBoardHeader></DashBoardHeader>
      <div className="dashboard-main">
        <SideBar></SideBar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
