import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Pagination from "../../components/pagination/Pagination";
import Table from "../../components/table/Table";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { userRole } from "../../utils/constants";

const PostManage = () => {
  const [post, setPost] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "posts");
    const newRef = filterInput
      ? query(
          colRef,
          where("title", ">=", filterInput),
          where("title", "<=", filterInput + "utf8")
        )
      : colRef;
    onSnapshot(newRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPost(results);
    });
  }, [filterInput]);
  const handleFilter = debounce((e) => {
    setFilterInput(e.target.value);
  }, 500);
  const handleRemovePost = (id) => {
    const docRef = doc(db, "posts", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        await deleteDoc(docRef);
      }
    });
  };
  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <h1 className="mb-5 text-4xl font-bold text-primary">Manage post</h1>
      <div className="flex justify-end mb-5">
        <div className="w-full max-w-[300px]">
          <Button to={"/manage/add-post"} type="button" className={"w-full"}>
            Add new Post
          </Button>
        </div>
      </div>
      <div className="flex justify-end mb-10">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
            onChange={handleFilter}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {post.length > 0 &&
            post.map((data) => {
              const date = data?.createdAt?.seconds
                ? new Date(data?.createdAt?.seconds * 1000)
                : new Date();
              const formatDate = new Date(date).toLocaleDateString("vi-VI");
              return (
                <tr key={data.id}>
                  <td>{data.id.slice(0, 8)}</td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <img
                        src={data.image}
                        alt=""
                        className="w-[66px] max-h-[55px] rounded object-cover h-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{data.title}</h3>
                        <time className="text-sm text-gray-500">
                          {/* {new Date(data.createdAt.seconds * 1000).toUTCString(
                          "VI-vi"
                        )} */}
                          {formatDate}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-500">{data.category.name}</span>
                  </td>
                  <td>
                    <span className="text-gray-500">{data.user.username}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <ActionDelete
                        onClick={() => handleRemovePost(data.id)}
                      ></ActionDelete>
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-post?id=${data.id}`)
                        }
                      ></ActionEdit>
                      <ActionView onClick={() => navigate(`/${data.slug}`)}>
                        {" "}
                      </ActionView>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="mt-10">
        <Pagination></Pagination>
      </div>
    </div>
  );
};

export default PostManage;
