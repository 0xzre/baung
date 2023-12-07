import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAction, clearMessage } from "../redux/actions/authActions";
import { AiFillGoogleCircle } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { MdAdminPanelSettings } from "react-icons/md";
import ButtonLoadingSpinner from "../components/loader/ButtonLoadingSpinner";
import Logo from "../assets/Baung-clean-rectangle.png";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingText("Signing in...");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const timeout = setTimeout(() => {
      setLoadingText(
        "This is taking longer than usual. Please wait while backend services are getting started."
      );
    }, 5000);
    await dispatch(signInAction(formData, navigate));
    setLoading(false);
    clearTimeout(timeout);
  };

  const signInError = useSelector((state) => state.auth?.signInError);
  const successMessage = useSelector((state) => state.auth?.successMessage);

  const handleClearMessage = () => {
    dispatch(clearMessage());
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-6">
        <form className="w-full max-w-md">
          <div className="mx-auto flex justify-center">
            <img className="h-10 w-auto sm:h-12" src={Logo} alt="Baung" />
          </div>
          {signInError && (
            <div
              className="mt-6 flex items-center justify-between rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert"
            >
              <div>
                <span className="block sm:inline">{signInError}</span>
              </div>
              <button
                className="font-bold text-red-700"
                onClick={handleClearMessage}
              >
                <RxCross1 className="h-3 w-3" />
              </button>
            </div>
          )}
          {successMessage && (
            <div
              className="mt-6 flex items-center justify-between rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
              role="alert"
            >
              <div>
                <span className="block sm:inline">{successMessage}</span>
              </div>
              <button
                className="font-bold text-green-700"
                onClick={handleClearMessage}
              >
                <RxCross1 className="h-3 w-3" />
              </button>
            </div>
          )}
          <div className="mt-6 flex items-center justify-center">
            <Link
              to={"/signin"}
              className="w-1/3 border-b-2 border-l-2 border-green-500 pb-4 pt-2 text-center font-semibold text-gray-800 rounded-bl-2xl"
            >
              Sign In
            </Link>
            <Link
              to={"/signup"}
              className="w-1/3 border-t border-r border-gray-400 pb-4 pt-2 text-center font-semibold text-gray-500 rounded-tr-2xl"
            >
              Sign Up
            </Link>
          </div>

          <div className="relative mt-6 flex items-center">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border bg-white px-11 py-3 text-gray-700 focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40"
              placeholder="Email / Username"
              required
              autoComplete="on"
            />
          </div>
          <div className="relative mt-4 flex items-center">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border bg-white px-10 py-3 text-gray-700 focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40"
              placeholder="Password"
              required
              autoComplete="off"
            />
          </div>
          <div className="mt-6">
            <button
              disabled={loading}
              onClick={handleSubmit}
              className={`w-full transform rounded-lg bg-primary px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-primary-700 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {loading ? (
                <ButtonLoadingSpinner loadingText={loadingText} />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
        <span className="flex sm:flex-row flex-col items-center justify-center py-4 text-sm text-gray-600 gap-3">
          <a
            href={null}
            className="flex items-center cursor-not-allowed text-gray-400"
            disabled
          >
            <AiFillGoogleCircle className="mr-2 h-5 w-5" />
            <span>Sign In with Gmail</span>
          </a>
          <Link
            to="/admin"
            className="flex items-center hover:text-green-500"
          >
            <MdAdminPanelSettings className="mr-2 h-5 w-5" />
            <span>Sign In as Admin</span>
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignIn;
