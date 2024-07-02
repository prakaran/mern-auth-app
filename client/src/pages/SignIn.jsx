import React, { useState } from "react";
import { Link } from "react-router-dom";
const SignIn = () => {
  const[formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (event)=>{
    setFormData((prevState)=>{
      return {...prevState, [event.target.id]: event.target.value}
    })
  }
  const submitHandler =(event)=>{
    event.preventDefault();
    try {
        
    } catch (error) {
      
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <input onChange={handleChange} type="email" id="email" placeholder="Email" className="bg-slate-100 p-3 rounded-lg" />
        <input onChange={handleChange} type="password" id="password" placeholder="Password" className="bg-slate-100 p-3 rounded-lg" />
        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80">{loading ? 'Loading...':'Sign In' }</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-up">
        <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something went wrong'}</p>
    </div>
  );
};

export default SignIn;
