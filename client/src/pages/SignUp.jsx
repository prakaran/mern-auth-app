import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event)=>{
    setUserData((prevState)=>{
      return {
        ...prevState,
        [event.target.id] : event.target.value
      }
    })
  }

  const submitHandler = async(event)=>{
    event.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if(data.success === false){
        setError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <input onChange={handleChange} type="text" id="username" placeholder="Username" className="bg-slate-100 p-3 rounded-lg" />
        <input onChange={handleChange} type="email" id="email" placeholder="Email" className="bg-slate-100 p-3 rounded-lg" />
        <input onChange={handleChange} type="password" id="password" placeholder="Password" className="bg-slate-100 p-3 rounded-lg" />
        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80">{loading ? 'Loading...':'Sign Up' }</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
        <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something went wrong'}</p>
    </div>
  );
};


export default SignUp;
