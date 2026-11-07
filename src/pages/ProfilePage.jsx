import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { ArrowLeft, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { authUser, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName,
    email: authUser?.email,
    username: authUser?.username,
    bio: authUser?.bio,
    profilePic: authUser?.profilePic,
  });

  const fileInputRef = useRef(null);

  // reseting states if user cancel profile update
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      fullName: authUser?.fullName,
      email: authUser?.email,
      username: authUser?.username,
      bio: authUser?.bio,
      profilePic: authUser?.profilePic,
    });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  // handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return toast.error("Please select image only");

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return toast.error("Name required");
    if (formData.username.length < 3)
      return toast.error("Username should be at least of 3 characters");
    if (!formData.email) return toast.error("Email required");
    const updatedProfile = {
      ...formData,
      profilePic: imagePreview || formData.profilePic,
    };
    setFormData(updatedProfile);
    updateProfile(updatedProfile);
    setIsEditing(false);
  };
  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="max-w-xl w-full p-6 rounded-lg sm:border border-black/15 sm:shadow">
        <div>
          <Link
            to={"/home"}
            className="text-gray-500 p-2 hover:bg-black/10 hover:text-black/80 inline-block rounded-full duration-200"
          >
            <ArrowLeft />
          </Link>
          <h1 className="text-center font-semibold text-[2rem] bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
            My Profile
          </h1>
        </div>

        {/* profile pic container */}
        <div className="flex items-center justify-center mt-4 mb-6">
          <div className="relative rounded-full">
            <img
              src={imagePreview || formData.profilePic || "avtar.jpg"}
              alt="userProfilePic"
              className="size-40 sm:size-60 rounded-full object-cover"
            />
            <div
              onClick={() => {
                fileInputRef?.current.click();
                setIsEditing(true);
              }}
              className="absolute right-8 bottom-1 p-2 bg-red-500/70 hover:bg-red-500 duration-150 text-white rounded-full"
            >
              <Pencil />
            </div>
          </div>
        </div>

        {/* form */}
        <form onSubmit={handleFormSubmit} className="space-y-10">
          {/* image change  */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          <div>
            <label
              htmlFor="fullname"
              className="block font-medium text-gray-500 mb-1 capitalize"
            >
              Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullName}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className={`w-full border border-black/20 outline-none px-4 py-2.5 rounded-xl bg-gray-50 ${isEditing && "bg-white"}`}
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block font-medium text-gray-500 mb-1 capitalize"
            >
              username
            </label>
            <input
              type="text"
              name="username"
              required
              id="username"
              value={formData.username}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className={`w-full border border-black/20 outline-none px-4 py-2.5 rounded-xl bg-gray-50 ${isEditing && "bg-white"}`}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-gray-500 mb-1 capitalize"
            >
              email
            </label>
            <input
              type="email"
              name="email"
              required
              id="email"
              value={formData.email}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full border border-black/20 outline-none px-4 py-2.5 rounded-xl bg-gray-50 ${isEditing && "bg-white"}`}
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block font-medium text-gray-500 mb-1 capitalize"
            >
              bio
            </label>
            <textarea
              type="text"
              name="bio"
              id="bio"
              rows={5}
              value={formData.bio}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className={`w-full border border-black/20 outline-none px-4 py-2.5 rounded-xl bg-gray-50 ${isEditing && "bg-white"}`}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            {isEditing && (
              <button
                aria-label="save changes"
                type="submit"
                className={`px-4 py-2 bg-blue-600 text-white capitalize hover:bg-blue-700 duration-150 cursor-pointer`}
              >
                Save
              </button>
            )}

            <button
              type="button"
              aria-label="edit"
              onClick={() => setIsEditing(true)}
              className={`px-4 py-2 bg-slate-600 text-white capitalize hover:bg-slate-700 duration-150 ${isEditing && "hidden"} cursor-pointer`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              aria-label="cancel"
              className={`px-4 py-2 bg-slate-600 text-white capitalize hover:bg-slate-700 duration-150 ${!isEditing && "hidden"} cursor-pointer`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
