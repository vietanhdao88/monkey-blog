import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import LabelStatus from "../../components/label/LabelStatus";
import { userRole, userStatus } from "../../utils/constants";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseconfig";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";

const UserTable = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUser(results);
    });
  }, []);
  const handleRemoveUser = async (id) => {
    const docRef = doc(db, "users", id);
    await deleteDoc(docRef);
  };
  const getLastName = (name) => {
    if (!name) return null;
    const length = name.split(" ").length;
    return name.split(" ")[length - 1];
  };
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Ban</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      default:
        break;
    }
  };
  const renderRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Infor</th>
          <th>UserName</th>
          <th>Email</th>
          <th>Password</th>
          <th>Status</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {user.length > 0 &&
          user.map((user) => (
            <tr key={user.id}>
              <td>{user.id.slice(0, 6)}</td>
              <td>
                <div className="whitespace-nowrap">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={
                        user?.avatar ||
                        "https://images.unsplash.com/photo-1683009426501-028aabdd7b8a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt=""
                      className="flex-shrink-0 object-cover w-10 h-10 rounded-lg"
                    />
                    <div className="flex-1">
                      <h3>{user.fullname}</h3>
                    </div>
                  </div>
                </div>
              </td>
              <td>{user?.username}</td>
              <td>{user.email}</td>

              <td>{user.password}</td>
              <td>{renderLabelStatus(user.status)}</td>
              <td>{renderRole(user.role)}</td>
              <td>
                <div className="flex users-center gap-x-3">
                  <ActionEdit
                    onClick={() =>
                      navigate(`/manage/update-user?id=${user.id}`)
                    }
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => handleRemoveUser(user.id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
