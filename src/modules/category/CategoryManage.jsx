import { useEffect, useState } from "react";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import Button from "../../components/button/Button";
import LabelStatus from "../../components/label/LabelStatus";
import Table from "../../components/table/Table";
import DashBoardHeading from "../dashboard/DashBoardHeading";
import { db } from "../../firebase/firebaseconfig";
import { debounce } from "lodash";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  limit,
  orderBy,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { categoryStatus, userRole } from "../../utils/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "categories");
    const newRef = filterInput
      ? query(
          colRef,
          where("name", ">=", filterInput),
          where("name", "<=", filterInput + "utf8")
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
      setCategoryList(results);
    });
  }, [filterInput]);
  // if (!categoryList || categoryList.length <= 0) return;
  const handleRemovePost = async (id) => {
    //get docs id
    const colRefId = doc(db, "categories", id);
    //delete
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
        await deleteDoc(colRefId);
      }
    });
  };
  const handleFilter = debounce((e) => {
    setFilterInput(e.target.value);
  }, 500);
  const handleLoadMore = async () => {
    const first = query(
      collection(db, "categories"),
      orderBy("name"),
      limit(1)
    );
    const documentSnapshots = await getDocs(first);

    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    // Construct a new query starting at this document,
    // get the next 25 cities.
    const nextRef = query(
      collection(db, "categories"),
      orderBy("name"),
      startAfter(lastVisible),
      limit(1)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(results);
    });
  };
  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <DashBoardHeading title="Categories" desc="Manage your category">
        <Button type="button" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashBoardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-3 text-gray-300 border border-gray-300 rounded-lg outline-none"
          onChange={handleFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((categories) => (
              <tr key={categories.id}>
                <td>{categories.id}</td>
                <td>{categories.name}</td>
                <td>
                  <span className="italic text-gray-400">
                    {categories.slug}
                  </span>
                </td>
                <td>
                  {Number(categories.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {Number(categories.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">UnApproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex categoriess-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${categories.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleRemovePost(categories.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="mt-10">
        <Button type="button" onClick={handleLoadMore}>
          Load More
        </Button>
      </div>
    </div>
  );
};

export default CategoryManage;
