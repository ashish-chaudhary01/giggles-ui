function UserProfileModal({ selectedUser, setIsProfileModalOpen }) {
  return (
    <div
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) {
          setIsProfileModalOpen(false);
        }
      }}
      className="absolute inset-0 flex items-end"
    >
      <div className="flex-1 bg-base-300 rounded-t-4xl p-2 sm:p-4 slide-up h-lg">
        <div className="relative">
          {/* image */}
          <div className="absolute left-1/2 top-0 translate-x-[-50%] translate-y-[-50%] size-40 rounded-full p-1.5 bg-white">
            <img
              src={selectedUser.profilePic || "/avtar.jpg"}
              alt="user-profile-img"
              className="size-full object-cover rounded-full"
            />
          </div>
        </div>
        {/* user details */}
        <div className="pt-25 text-center mx-auto max-w-lg p-2">
          <h2 className="font-bold text-2xl text-slate-900 leading-5 capitalize">
            {selectedUser.fullName}
          </h2>
          <p className="font-medium text-lg text-gray-600 lowercase">
            @{selectedUser.username}
          </p>
          <p className="font-medium text-gray-500 text-md line-clamp-3 mt-2">
            {selectedUser.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfileModal;
