import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";

import slugify from "slugify";
import { postStatus } from "../../utils/constants";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import ImageUpload from "../../components/input/ImageUpload";
import { useFireBase } from "../../hooks/useFireBase";
import Toggle from "../../components/toggle/Toggle";
import { db } from "../../firebase/firebaseconfig";
import DropDown from "../../components/dropdown/DropDown";
import Option from "../../components/dropdown/Option";
import Select from "../../components/dropdown/Select";
import List from "../../components/dropdown/List";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import FieldCheckboxes from "../../components/field/FieldCheckbox";
import { useNavigate } from "react-router-dom";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const navigate = useNavigate();
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      hot: false,
      category: {},
      user: {},
    },
  });

  const {
    handleDeleteImage,
    image,
    progress,
    handleSelectImage,
    handleResetUpload,
  } = useFireBase(setValue, getValues);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let results = [];
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(results);
    }
    getData();
  }, []);
  const watchStatus = watch("status");
  const { userInfo } = useAuth();

  const watchHot = watch("hot");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  useEffect(() => {
    async function getData() {
      if (!userInfo.uid) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email]);
  const addPostHandler = async (values) => {
    try {
      const cloneValue = { ...values };
      cloneValue.slug = slugify(values.slug || values.title, { lower: true });
      cloneValue.status = Number(values.status);
      const colRef = collection(db, "posts");
      console.log(cloneValue);
      await addDoc(colRef, {
        ...cloneValue,
        userId: cloneValue.user.id,
        categoryId: cloneValue.category.id,
        image,
        createdAt: serverTimestamp(),
      });

      toast.success("Create a post successfull");
      reset({
        title: "",
        slug: "",
        status: 2,
        hot: false,
        category: {},
        user: {},
        image: "",
      });
      setSelectCategory({});
      handleResetUpload();
      navigate("/manage/post");
    } catch (err) {
      toast(err);
    }

    // handleUploadImage(cloneValue.image);
  };
  const handleSelectOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);

    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    // setValue("categoryId", item.id);
    setSelectCategory(item);
  };
  useEffect(() => {
    document.title = "Monkey Blogging - Add Post";
  }, []);
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form autoComplete="off" onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Category</Label>
            <DropDown>
              <Select
                placeholder={
                  selectCategory?.name
                    ? selectCategory.name
                    : "Select your category"
                }
              ></Select>
              <List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Option
                      key={item.id}
                      onClick={() => handleSelectOption(item)}
                    >
                      {item.name}
                    </Option>
                  ))}
              </List>
            </DropDown>
            {selectCategory?.name && (
              <span className="inline-block p-4 mt-4 text-green-800 rounded-lg bg-primary">
                {selectCategory.name}
              </span>
            )}
          </Field>
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              name="image"
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Feature</Label>
            <Toggle
              on={watchHot === true}
              name="hot"
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disable={isSubmitting}
          className={isSubmitting ? "opacity-[0.5] pointer-events-none" : ""}
          classNameNormal="text-2xl max-w-[300px] w-full  mx-auto"
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
