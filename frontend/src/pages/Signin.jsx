import { useState} from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"



export const Signin = () => {
  const navigate = useNavigate();
  const [username,setUserName] =useState("");
  const [password,setPassword] =useState("");
  const handleSignin = async function () {
    try {
      const postData = {
        username,
        password
      }
      const response = await axios.post("http://localhost:3000/api/v1/user/signin",postData);
      window.localStorage.setItem("Authorization","Bearer "+response.data.token)
      navigate("/dashboard");
    }catch (error) {
      // Handle Axios error and display user-friendly message
      console.error("Signin error:", error);
      // Display appropriate error message to the user based on error.response.data
    }
  }
    return  <div className="main_container "> 
    <Navbar/>
    <div className="bg-swhite-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e) => {setUserName(e.target.value)}}   placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange= {(e)  =>   {setPassword(e.target.value)}}   placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign in"}  onClick={handleSignin}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
  </div>
  }