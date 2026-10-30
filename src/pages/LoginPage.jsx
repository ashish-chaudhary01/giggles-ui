import { Loader, Lock, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputData = [
    {
      label: "Email",
      placeholder: "Enter your registered email",
      icon: Mail,
      value: formData.email,
      onChange: (e) => setFormData({ ...formData, email: e.target.value }),
      type: "email",
    },
    {
      label: "Password",
      placeholder: "Enter your password",
      icon: Lock,
      value: formData.password,
      onChange: (e) => setFormData({ ...formData, password: e.target.value }),
      type: "password",
    },
  ];

  const { isLoggingIn, login } = useAuthStore();

  function validateForm() {
    if (!formData.email.trim()) return toast.error("email is required");
    if (!formData.password.trim()) return toast.error("Password required");

    return true;
  }

  // form submit
  function handleFormSubmit(e) {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid === true) {
      login(formData);
    }
  }

  return (
    <>
      {/* navigation */}
      <nav className="sticky top-0 left-0 right-0 p-2 bg-bas-100 backdrop-blur-xl border-b border-black/10 shadow flex justify-between items-center gap-2 sm:gap-10 z-1000">
        <div className="ml-0 sm:ml-4">
          <a href="/" className="flex items-center gap-2">
            <span>
              <MessageCircle className="text-blue-500" />
            </span>
            <span className="text-xl font-bold text-[#394E6A]">Giggles</span>
          </a>
        </div>
        <a
          href="/signup"
          className="btn btn-ghost text-[1rem] rounded-lg px-2 sm:px-4 py-6"
        >
          Sign Up
        </a>
      </nav>

      {/* content */}
      <div className="h-screen w-full">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* left */}
          <div className="bg-white flex items-center justify-center p-6 sm:p-12 h-full">
            <div className="flex flex-col gap-6 md:p-6 max-w-md w-full">
              <div className="flex flex-col items-center gap-2 mb-4">
                <span className="p-4 rounded-full bg-linear-to-br from-blue-600 to-indigo-500">
                  <MessageCircle size={35} className="text-white" />
                </span>
                <h2 className="text-3xl font-bold">Sign In</h2>
                <p className="text-gray-500 leading-relaxed">
                  Welcome Back, Login to start conversation
                </p>
              </div>

              {/* form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {inputData.map((input, idx) => (
                  <div key={idx} className="">
                    <label className="block mb-2 text-sm font-medium">
                      {input.label}
                    </label>
                    <div className="relative">
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        className="input input-lg w-full placeholder:text-md px-12"
                        value={input.value}
                        onChange={input.onChange}
                      />
                      <span className="absolute left-2 top-3">
                        <input.icon size={25} className="text-zinc-400" />
                      </span>
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  className="mt-2 w-full py-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 duration-300 active:scale-[0.95]"
                >
                  {isLoggingIn ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader className="animate-spin" />
                      <span>Signing In</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
                <div className="text-center text-gray-500 leading-relaxed mt-1">
                  <p>
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-500">
                      Sign Up
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* right */}
          <div className="hidden bg-[#F6F6F6] min-h-screen w-full lg:flex items-center justify-center">
            <img
              src="/chatting-img.jpg"
              alt="chatting-image"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
