import styled from "styled-components";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import NotFoundPage from "../../pages/NotFoundPage";
const DashBoardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;

const DashBoardHeader = () => {
  const { userInfo } = useAuth();
  if (!userInfo) return <NotFoundPage></NotFoundPage>;
  return (
    <DashBoardHeaderStyles>
      <Button
        to="/manage/add-post"
        className="header-button"
        height="52px"
        type="button"
      >
        Write new post
      </Button>
      <Link className="header-avatar" to={"/profile"}>
        <img src={userInfo.avatar} alt="" />
      </Link>
    </DashBoardHeaderStyles>
  );
};

export default DashBoardHeader;
