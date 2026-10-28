import { Lock, Mail, MessageCircle, User } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const inputData = [
    {
      label: "Full Name",
      placeholder: "e.g. John Doe",
      icon: User,
      value: formData.fullName,
      onChange: (e) => setFormData({ ...formData, fullName: e.target.value }),
      type: "text",
    },
    {
      label: "Email",
      placeholder: "e.g. example@.com",
      icon: Mail,
      value: formData.email,
      onChange: (e) => setFormData({ ...formData, email: e.target.value }),
      type: "email",
    },
    {
      label: "Username",
      placeholder: "e.g. john@",
      icon: User,
      value: formData.username,
      onChange: (e) => setFormData({ ...formData, username: e.target.value }),
      type: "text",
    },
    {
      label: "Password",
      placeholder: "password must be strong",
      icon: Lock,
      value: formData.password,
      onChange: (e) => setFormData({ ...formData, password: e.target.value }),
      type: "password",
    },
  ];

  const { signup, isSignigUp } = useAuthStore();

  function validateForm() {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (formData.username.length < 3)
      return toast.error("username must be at least 3 characters");
    if (!formData.email.trim()) return toast.error("email is required");
    if (formData.password.length < 8)
      return toast.error("Password must be at least 8 characters");

    return true;
  }

  // form submit
  function handleFormSubmit(e) {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid === true) {
      signup(formData);
    }
  }

  return (
    <div className="h-screen w-full">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* left */}
        <div className="bg-white flex items-center justify-center p-6 sm:p-12 h-full">
          <div className="flex flex-col gap-6 md:p-6 max-w-md w-full">
            <div className="flex flex-col items-center gap-2 mb-4">
              <span className="p-4 rounded-full bg-linear-to-br from-blue-600 to-indigo-500">
                <MessageCircle size={35} className="text-white" />
              </span>
              <h2 className="text-3xl font-bold">Sign Up</h2>
              <p className="text-gray-500 leading-relaxed">
                Get started with giggles
              </p>
            </div>

            {/* form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {inputData.map((input, idx) => (
                <div key={idx} className="">
                  <label className="block mb-2 text-sm font-medium">
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    className="input input-lg w-full"
                    value={input.value}
                    onChange={input.onChange}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="mt-2 w-full py-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 duration-300 active:scale-[0.95]"
              >
                {isSignigUp ? "Signing up" : "Sign up"}
              </button>
              <div className="text-center text-gray-500 leading-relaxed mt-1">
                <p>
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-500">
                    Sign In
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
  );
}

export default SignUpPage;
