import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios library
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const [formData, setFormData] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { loading, error } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { id: any; value: any } }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formData
      );
      dispatch(signInSuccess(res.data)); // Assuming you're interested in the response data
      navigate("/");
      return res; // Return the response explicitly
    } catch (error) {
      dispatch(signInFailure(error));
      console.error(error);
      throw error; // Throw the error to propagate it further
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSumbit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account ?</p>
        <Link to={"/signup"}>
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-500">{error && "Something went wrong"}</p>
    </div>
  );
};

export default Signin;
