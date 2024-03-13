import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authenticatedAtom } from "../store/atoms/email";

interface NavItemProps {
  to: string;
  label: string;
}

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
    <div className="bg-gray-800 text-white">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"} className="font-bold text-lg">
          Auth App
        </Link>
        <ul className="flex gap-4">
          <NavItem to="/" label="Home" />
          <NavItem to="/about" label="About" />
          {isAuthenticated ? (
            <>
              <li
                onClick={handleSignOut}
                className="cursor-pointer hover:text-gray-300"
              >
                Sign Out
              </li>
              <NavItem to="/profile" label="Profile" />
            </>
          ) : (
            <NavItem to="/signin" label="Sign In" />
          )}
        </ul>
      </div>
    </div>
  );
};

const NavItem = ({ to, label }: NavItemProps) => (
  <Link to={to} className="hover:text-gray-300">
    <li>{label}</li>
  </Link>
);

export default Header;
