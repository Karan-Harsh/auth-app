import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios library
import { useSetRecoilState } from "recoil";
import { authenticatedAtom, emailAtom } from "../store/atoms/email";

const Signin = () => {
  interface FormData {
    email: string;
    password: string;
    // Add more properties as needed
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setAuthenticated = useSetRecoilState(authenticatedAtom); // Correct usage of useSetRecoilState
  const setEmail = useSetRecoilState(emailAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://auth-app-f6ld.onrender.com/api/auth/signin",
        formData
      );
      localStorage.removeItem("token");
      localStorage.setItem("token", res.data.token);
      setAuthenticated(true);
      setEmail(formData.email);
      console.log("Response:", res.data);
      navigate("/");
      return res;
    } catch (error) {
      setError("Something went wrong");
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account ?</p>
        <Link to={"/signup"}>
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-500">{error}</p>
    </div>
  );
};

export default Signin;
