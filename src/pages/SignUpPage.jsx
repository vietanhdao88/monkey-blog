import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Field from "../components/field/Field";
import Button from "../components/button/Button";
import { useEffect } from "react";

import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebaseconfig";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Authentication from "./Authentication";
import InputPassword from "../components/input/InputPassword";
import { slugify } from "slugify";
import { userRole, userStatus } from "../utils/constants";
const schema = yup.object({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, "Your password must have at min 8 characters or more than")
    .required("Please enter your password"),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = async (value) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, value.email, value.password);
    await updateProfile(auth.currentUser, {
      displayName: value.fullname,
      photoURL:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    });

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: value.fullname,
      email: value.email,
      password: value.password,
      username: slugify(value.fullname, { lower: true }),
      avatar:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    });

    toast.success("Register successfully!!!");
    navigate("/sign-in");
  };
  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      toast.error(arrayError[0].message);
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Sign Up Page";
  }, []);

  return (
    <Authentication>
      <form
        action=""
        className="w-full mx-auto mt-10"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            placeholder="Enter your fullname"
            name="fullname"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="Enter your email"
            type="email"
            name="email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPassword control={control}></InputPassword>
        </Field>
        <div className="flex justify-center w-full mb-10">
          <p>
            You already have an account?{" "}
            <NavLink to={"/sign-in"} className="underline text-primary">
              Sign In
            </NavLink>
          </p>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disable={isSubmitting}
          className={isSubmitting ? "opacity-[0.5] pointer-events-none" : ""}
          classNameNormal="text-2xl max-w-[300px] w-full  mx-auto"
        >
          Sign Up
        </Button>
      </form>
    </Authentication>
  );
};

export default SignUpPage;
