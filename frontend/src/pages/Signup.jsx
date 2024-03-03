import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const  handleSignup = async function () {
      try {
        const data = {
          username,
          firstName,
          lastName,
          password

        }
        // Log the request data
    console.log("Request Data:", data);

        const response = await axios.post(
          "http://localhost:3000/api/v1/user/signup",
          JSON.stringify(data),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
    
        // Handle successful response
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } catch (error) {
        // Handle Axios error and display user-friendly message
        console.error("Signup error:", error);
        // Display appropriate error message to the user based on error.response.data
      }
    }
    
    return <div className="main_container "> 
    <Navbar/>
     <div className="bg-white-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
       
        <InputBox  onChange={e => {
        
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />

        <InputBox  onChange={(e) => {
            
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />

        <InputBox onChange={e => {
          
          setUsername(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Email"} />

        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />


        <div className="pt-4">
          <Button onClick={handleSignup} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
  </div>
}