import { useStateContext } from "../../contexts/ContextProvider";

const LoginPage = ({ isLoggedIn }) => {
  const { currentColor } = useStateContext();

  return (
    <div
      className={
        isLoggedIn
          ? "hidden absolute"
          : " fixed top-0 left-0 z-40  flex justify-center items-center h-screen w-screen bg-white/50 backdrop-blur-xl"
      }
    >
      <div className="flex flex-col justify-center items-center gap-6 w-fit">
        <img src="/logoacademy.png" alt="The Academy" width={70} />
        <div className="border-2 border-gray-300/60 p-7 rounded-xl flex flex-col justify-center items-start w-full gap-5">
          <h2 className="text-lg md:text-2xl font-bold w-full text-left ">
            Login to Dashboard!
          </h2>
          <form action="">
            <div className="w-full flex justify-center items-center flex-col gap-2">
              <label
                htmlFor="email"
                className="font-semibold text-left text-sm w-full"
              >
                Official Email address:
              </label>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full min-w-[400px] h-[40px] block border rounded-md border-gray-500 px-3 text-sm focus:outline"
                style={{ outline: currentColor }}
                required
              />
            </div>
            <div className="w-full flex justify-center items-center flex-col gap-2 my-3 md-4">
              <label
                htmlFor="email"
                className="font-semibold text-left text-sm w-full"
              >
                Password:
              </label>
              <input
                type="password"
                placeholder="*********"
                className="w-full min-w-[400px] h-[40px] block border rounded-md border-gray-500 px-3 text-sm focus:outline"
                style={{ outline: currentColor }}
                required
              />
            </div>
            <button
              type="submit"
              className="font-bold text-sm w-full h-[40px] rounded-md text-white hover:opacity-90 active:scale-95"
              style={{ background: currentColor }}
            >
              Login
            </button>
          </form>
          <div className="w-full p-[1px] bg-gray-500/20"></div>
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
