import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../../components/layout/Heading";
import DashBoardHeading from "../dashboard/DashBoardHeading";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import FieldCheckboxes from "../../components/field/FieldCheckbox";
import Radio from "../../components/checkbox/Radio";
import { categoryStatus } from "../../utils/constants";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";
import slugify from "slugify";
import { toast } from "react-toastify";

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const categoryId = params.get("id");
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  useEffect(() => {
    const fecthData = async () => {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    };
    fecthData();
  }, [categoryId, reset]);
  const watchStatus = watch("status");
  const handleUpdateCategory = async (values) => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "categories", categoryId);
      await updateDoc(colRef, {
        name: values.name,
        status: Number(values.status),
        slug: slugify(values.slug || values.name, { lower: true }),
      });
      toast.success("update category success");
      navigate("/manage/category");
    } catch (err) {
      toast.error(err);
    }
  };
  if (!categoryId) return null;
  return (
    <>
      <DashBoardHeading
        title="Update category"
        desc={`Update category at here where id : ${categoryId}`}
      ></DashBoardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
          Update category
        </Button>
      </form>
    </>
  );
};

export default CategoryUpdate;
