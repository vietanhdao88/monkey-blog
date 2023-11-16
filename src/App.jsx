import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostDetailPage from "./pages/PostDetailPage";
import DashBoardPage from "./pages/DashBoardPage";

import PostManage from "./modules/post/PostManage";
import DashboardLayout from "./modules/dashboard/DashBoardLayout";
import PostAddNew from "./modules/post/PostAddNew";
import PostUpdate from "./modules/post/PostUpdate";
import CategoryAddNew from "./modules/category/CategoryAddNew";
import CategoryManage from "./modules/category/CategoryManage";
import CategoryUpdate from "./modules/category/CategoryUpdate";
import UserManage from "./modules/user/UserManage";
import UpdateUser from "./modules/user/UpdateUser";
import UserAddNew from "./modules/user/UserAddNew";
import UserProfile from "./modules/user/UserProfile";
import CategoryPage from "./modules/category/CategoryPage";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailPage></PostDetailPage>}
          ></Route>
          <Route
            path="/category/:slug"
            element={<CategoryPage></CategoryPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashBoardPage></DashBoardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/update-post"
              element={<PostUpdate></PostUpdate>}
            ></Route>
            <Route
              path="/manage/update-post"
              element={<PostUpdate></PostUpdate>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/update-category"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/update-user"
              element={<UpdateUser></UpdateUser>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>

            <Route
              path="/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
          </Route>

          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
