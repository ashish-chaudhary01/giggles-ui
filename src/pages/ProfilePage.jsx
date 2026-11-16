import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { ArrowLeft, Camera, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { authUser, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    username: authUser?.username || "",
    bio: authUser?.bio || "",
    profilePic: authUser?.profilePic || "",
  });

  const fileInputRef = useRef(null);
  const inputClassName =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-default disabled:bg-slate-50 disabled:text-slate-600";

  // reseting states if user cancel profile update
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      fullName: authUser?.fullName || "",
      email: authUser?.email || "",
      username: authUser?.username || "",
      bio: authUser?.bio || "",
      profilePic: authUser?.profilePic || "",
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
    <div className="min-h-dvh overflow-y-auto bg-linear-to-br from-pink-50/70 via-white to-blue-100/70 px-4 py-6 sm:px-8 sm:py-10">
      <main className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-center gap-3">
          <Link
            to="/home"
            aria-label="Back to chats"
            className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-[#394E6A]"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="text-sm font-medium text-slate-500">GIGGLES ACCOUNT</p>
            <h1 className="text-2xl font-semibold text-[#394E6A] sm:text-3xl">
              My profile
            </h1>
          </div>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 text-center shadow-sm sm:p-8">
            <div className="relative mx-auto mb-5 size-32">
              <img
                src={imagePreview || formData.profilePic || "/avtar.jpg"}
                alt="Profile"
                className="size-full rounded-full border-4 border-white object-cover shadow-md ring-1 ring-slate-200"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                aria-label="Change profile photo"
                onClick={() => {
                  fileInputRef.current?.click();
                  setIsEditing(true);
                }}
                className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-blue-500 p-2.5 text-white shadow-sm transition hover:bg-blue-600"
              >
                <Camera size={18} />
              </button>
            </div>
            <h2 className="text-xl font-semibold capitalize text-[#394E6A]">
              {formData.fullName || "Your name"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              @{formData.username || "username"}
            </p>
            <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
              {formData.bio || "Add a short bio to tell people a little about you."}
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#394E6A]">
                  Profile details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep your details up to date.
                </p>
              </div>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                >
                  <Pencil size={15} />
                  Edit profile
                </button>
              )}
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullname"
                    className="mb-2 block text-sm font-medium text-slate-600"
                  >
                    Full name
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
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-slate-600"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    value={formData.username}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className={inputClassName}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClassName}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="bio"
                    className="mb-2 block text-sm font-medium text-slate-600"
                  >
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows={4}
                    value={formData.bio}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className={`${inputClassName} resize-y`}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
                  >
                    Save changes
                  </button>
                </div>
              )}
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
