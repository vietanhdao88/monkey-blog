import { useForm } from "react-hook-form";
import DashBoardHeading from "../dashboard/DashBoardHeading";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import FieldCheckboxes from "../../components/field/FieldCheckbox";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/button/Button";
import { userRole, userStatus } from "../../utils/constants";
import ImageUpload from "../../components/input/ImageUpload";
import { useFireBase } from "../../hooks/useFireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../contexts/auth-context";
import { auth, db } from "../../firebase/firebaseconfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";

const UserAddNew = () => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: 2,
      role: 3,
      createdAt: serverTimestamp(),
    },
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const {
    handleDeleteImage,
    image,
    progress,
    handleSelectImage,
    handleResetUpload,
  } = useFireBase(setValue, getValues);
  const { userInfo } = useAuth();
  const handleAddUser = async (values) => {
    if (!isValid) return;
    try {
      const cloneValues = { ...values };
      cloneValues.status = Number(values.status);
      cloneValues.role = Number(values.role);
      await createUserWithEmailAndPassword(
        auth,
        cloneValues.email,
        cloneValues.password
      );
      await addDoc(collection(db, "users"), {
        fullname: cloneValues.fullname,
        email: cloneValues.email,
        password: cloneValues.password,
        username: slugify(cloneValues.username || cloneValues.fullname, {
          lower: true,
          trim: true,
        }),
        avatar: image,
        status: Number(cloneValues.status),
        role: Number(cloneValues.role),
        createdAt: serverTimestamp(),
      });
      toast.success("Create user successfully");
      handleResetUpload();
      console.log(cloneValues);
      reset({
        fullname: "",
        username: "",
        email: "",
        password: "",
        status: 2,
        role: 3,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <DashBoardHeading
        title="New user"
        desc="Add new user to system"
      ></DashBoardHeading>
      <form onSubmit={handleSubmit(handleAddUser)}>
        <div className="w-[200px] h-[200px] mb-10 mx-auto ">
          <ImageUpload
            className="!rounded-full h-full w-full"
            onChange={handleSelectImage}
            name="image"
            progress={progress}
            image={image}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disable={isSubmitting}
          className={isSubmitting ? "opacity-[0.5] pointer-events-none" : ""}
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
