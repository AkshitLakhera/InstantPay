import "../custom.css";
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import signin_img from "../assets/singin.jpg";
import PasswordInput from "../components/PasswordInput";

export const Signin = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const postData = {
        username,
        password,
      };
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        postData
      );
      window.localStorage.setItem(
        "Authorization",
        "Bearer " + response.data.token
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch w-full p-4 lg:p-8">
        {/* Image section */}
        <div className="lg:w-1/2 w-full flex justify-center lg:justify-start mb-4 lg:mb-0">
          <img
            className="w-full lg:w-auto lg:max-w-md object-cover rounded-lg"
            src={signin_img}
            alt="Signin"
          />
        </div>

        {/* Form section */}
        <div className="lg:w-1/2 w-full max-w-lg bg-white rounded-lg shadow-md p-6">
          <Heading label="Sign in" />
          <SubHeading label="Enter your credentials to access your account" />
          <InputBox
            onChange={(e) => setUserName(e.target.value)}
            placeholder="harkirat@gmail.com"
            label="Email"
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            label="Password"
          />
          <div className="pt-4">
            <Button label="Sign in" onClick={handleSignin} />
          </div>
          <BottomWarning
            label="Don't have an account?"
            buttonText="Sign up"
            to="/signup"
          />
        </div>
      </div>
    </div>
  );
};
