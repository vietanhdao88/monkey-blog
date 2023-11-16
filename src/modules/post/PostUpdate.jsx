import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseconfig";
import { toast } from "react-toastify";
import slugify from "slugify";

import { useFireBase } from "../../hooks/useFireBase";
import { useForm } from "react-hook-form";
import Label from "../../components/label/Label";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import DropDown from "../../components/dropdown/DropDown";
import Select from "../../components/dropdown/Select";
import List from "../../components/dropdown/List";
import ImageUpload from "../../components/input/ImageUpload";
import FieldCheckboxes from "../../components/field/FieldCheckbox";
import Radio from "../../components/checkbox/Radio";
import { postStatus } from "../../utils/constants";
import Toggle from "../../components/toggle/Toggle";
import Button from "../../components/button/Button";
import { useSearchParams } from "react-router-dom";

import Option from "../../components/dropdown/Option";
import { useMemo } from "react";

const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
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

  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [data, setData] = useState({});
  const [quill, setQuill] = useState("");
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const snapshot = await getDocs(colRef);
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(results);
    }
    getData();
  }, []);

  useEffect(() => {
    const fecthData = async () => {
      const colRef = doc(db, "posts", postId);
      const singleDoc = await getDoc(colRef);
      setData(singleDoc.data());
      reset(singleDoc.data());
      setSelectCategory(singleDoc.data()?.category || "");
      setQuill(singleDoc?.data()?.content || "");
    };
    fecthData();
  }, [postId, reset]);
  console.log(data);
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const {
    handleDeleteImage,
    image,
    progress,
    setImage,
    handleSelectImage,
    handleResetUpload,
  } = useFireBase(setValue, getValues, imageName, deletePostImage);
  async function deletePostImage() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      image: "",
    });
  }

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  const UpdatePostHandler = async (values) => {
    if (!postId) return;
    try {
      const cloneValue = { ...values };
      cloneValue.slug = slugify(values.slug || values.title, { lower: true });
      cloneValue.status = Number(values.status);
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, {
        // ...cloneValue,
        // image: image,
        content: quill,
      });

      toast.success("Update a post successfull");
      reset({
        title: "",
        slug: "",
        category: "",
        content: "",
        hot: false,
        status: 2,
      });
      setSelectCategory("");
      handleResetUpload();
      setQuill("");
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
  if (!postId) return;
  return (
    <div>
      <h1 className="dashboard-heading">Add new post</h1>
      <form autoComplete="off" onSubmit={handleSubmit(UpdatePostHandler)}>
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
                {categories?.length > 0 &&
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
        <div className="mb-10">
          <Field>
            <Label>Content</Label>
            <div>
              <ReactQuill theme="snow" value={quill} onChange={setQuill} />
            </div>
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
          Update Post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
