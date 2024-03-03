import "../custom.css"
import { useState} from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import  signin_img  from "../assets/singin.jpg"
import PasswordInput from "../components/PasswordInput"



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
    return  <div className="main_container  "> 
    <Navbar/>
    <div className="sigin_ui  flex w-full items-center">
      {/* img code */}
      <div className="form-img w-1/2">
        <img className="form_img mt-11 w-full  object-cover " src={signin_img} alt="" />
      </div>
      {/* form code */}
    <div className="bg-white-300 w-1/2 ">
      <div className="rounded-lg bg-white  text-center shadow_md">
        <Heading label={"Sign in"}  />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e) => {setUserName(e.target.value)}}   placeholder="harkirat@gmail.com" label={"Email"} />
        <PasswordInput onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="Enter Password"  label={"Password"}/>
        <div className="pt-4">
          <Button label={"Sign in"}  onClick={handleSignin}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
  </div>
 
  }