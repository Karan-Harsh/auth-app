import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios library

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { id: any; value: any } }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSumbit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://auth-app-f6ld.onrender.com/api/auth/signup",
        formData
      ); // Use axios.post for POST request
      console.log(res.data);
      navigate("/signin");
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSumbit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          autoComplete="off"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          autoComplete="off"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          autoComplete="off"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to={"/signin"}>
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-500">{error && "Something went wrong"}</p>
    </div>
  );
};

export default Signup;
