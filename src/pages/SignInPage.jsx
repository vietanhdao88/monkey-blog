import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Authentication from "./Authentication";
import { auth } from "../firebase/firebaseconfig";
import { useAuth } from "../contexts/auth-context";
import InputPassword from "../components/input/InputPassword";
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, "Your password must have at min 8 characters or more than")
    .required("Please enter your password"),
});
const SignInPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const hanldeSignIn = async (value) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, value.email, value.password);
    toast.success("Sign In successfull navigate at HomePage");
    navigate("/");
  };
  const { userInfo } = useAuth();

  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0].message);
    }
  }, [errors]);
  return (
    <Authentication>
      <form
        action=""
        className="w-full mx-auto mt-10"
        autoComplete="off"
        onSubmit={handleSubmit(hanldeSignIn)}
      >
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="Enter your fullname"
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
            You have an account?{" "}
            <NavLink to={"/sign-up"} className="underline text-primary">
              Sign Up
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
          Sign In
        </Button>
      </form>
    </Authentication>
  );
};

export default SignInPage;
