import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { categoryStatus } from "../../utils/constants";
import DashBoardHeading from "../dashboard/DashBoardHeading";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";
import { toast } from "react-toastify";
import slugify from "slugify";
import FieldCheckboxes from "../../components/field/FieldCheckbox";
const CategoryAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 2,
      createdAt: new Date(),
    },
  });
  const handleAddCategory = async (values) => {
    if (!isValid) return;
    try {
      const cloneValue = { ...values };
      cloneValue.slug = slugify(values.slug || values.name, { lower: true });
      cloneValue.status = Number(values.status);
      const colRef = collection(db, "categories");
      await addDoc(colRef, {
        ...cloneValue,
        createdAt: serverTimestamp(),
      });
      toast.success("Add category successfully");
      console.log(cloneValue);
      reset({
        name: "",
        slug: "",
        status: 2,
      });
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    document.title = "Category add new";
  }, []);
  const watchStatus = watch("status");
  return (
    <div>
      <DashBoardHeading
        title="New category"
        desc="Add new category"
      ></DashBoardHeading>

      <form onSubmit={handleSubmit(handleAddCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
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
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          isLoading={isSubmitting}
          disable={isSubmitting}
          className={isSubmitting ? "opacity-[0.5] pointer-events-none" : ""}
          classNameNormal="text-2xl max-w-[300px] w-full  mx-auto"
          type="submit"
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
