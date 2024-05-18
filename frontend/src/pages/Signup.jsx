import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import loginimg from "../assets/login.jpg";
import PasswordInput from "../components/PasswordInput";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const data = {
        username,
        firstName,
        lastName,
        password,
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
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
            src={loginimg}
            alt="Signup"
          />
        </div>

        {/* Form section */}
        <div className="lg:w-1/2 w-full max-w-lg bg-white rounded-lg shadow-md p-6">
          <Heading label="Sign up" />
          <SubHeading label="Enter your information to create an account" />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            label="First Name"
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            label="Last Name"
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="akshit@gmail.com"
            label="Email"
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            label="Password"
          />
          <div className="pt-4">
            <Button onClick={handleSignup} label="Sign up" />
          </div>
          <BottomWarning
            label="Already have an account?"
            buttonText="Sign in"
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
};
