import { use, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { handleLoginAdmin } from "../../actions/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import authAtom from "../../atoms/auth/auth.atom";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { currentColor } = useStateContext();
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const setAuth = useSetRecoilState(authAtom);
  const authData = useRecoilValue(authAtom);
  const navigate = useNavigate();

  const isLoggedIn = authData.isLoggedIn;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginUser = async () => {
    setLoading(true);
    try {
      const response = await handleLoginAdmin(adminData);
      if (response) {
        setAuth({
          ...authData,
          isLoggedIn: true,
          token: response.token,
          user: response.user,
        });
        localStorage.setItem("adminToken", response.token);
        navigate("/dashboard");
      } else {
        console.log("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 z-40 flex justify-center items-center h-screen w-screen bg-white/50 backdrop-blur-xl`}
    >
      <div className="flex flex-col justify-center items-center gap-6 w-fit p-3">
        <img src="/logoacademy.png" alt="The Academy" width={70} />
        <div className="border-2 border-gray-300/60 p-7 rounded-xl flex flex-col justify-center items-start w-full gap-5">
          <h2 className="text-lg md:text-2xl font-bold w-full text-left">
            Login to Dashboard!
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLoginUser();
            }}
          >
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-semibold text-left text-sm w-full"
              >
                Official Email address:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="johndoe@gmail.com"
                className="w-full min-w-[300px] md:min-w-[400px] h-[40px] border rounded-md border-gray-500 px-3 text-sm focus:outline focus:outline-gray-400"
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full flex flex-col gap-2 my-4">
              <label
                htmlFor="password"
                className="font-semibold text-left text-sm w-full"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*********"
                className="w-full min-w-[300px] md:min-w-[400px] h-[40px] border rounded-md border-gray-500 px-3 text-sm focus:outline focus:outline-gray-400"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="font-bold text-sm w-full h-[40px] rounded-md text-white hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: currentColor }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="w-full h-[1px] bg-gray-500/20 my-4"></div>
          <button
            className="font-bold text-sm w-full h-[40px] rounded-md text-white hover:opacity-90 active:scale-95"
            style={{ background: currentColor }}
          >
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
