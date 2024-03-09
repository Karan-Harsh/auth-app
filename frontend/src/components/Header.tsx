import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authenticatedAtom } from "../store/atoms/email";

const Header = () => {
  const isAuthenticated = useRecoilValue(authenticatedAtom);
  const setAuthenticated = useSetRecoilState(authenticatedAtom);
  const navigate = useNavigate();
  function handleSignOut() {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/signin");
  }
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          {isAuthenticated ? (
            <li onClick={handleSignOut}>Sign Out</li>
          ) : (
            <Link to={"/signin"}>
              <li>Sign In</li>
            </Link>
          )}
          {isAuthenticated && (
            <Link to={"profile"}>
              <li>Profile</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
