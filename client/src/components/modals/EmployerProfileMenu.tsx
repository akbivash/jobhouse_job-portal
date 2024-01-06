import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useStore from "../../store/store";
import { useLogout } from "../../hooks/useLogout";


const EmployerProfileMenu = () => {
  const ref = useRef<HTMLDivElement>(null);
  const store = useStore();
const{handleLogout} = useLogout()

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [store.jobseekerProfileMenuModalOpen]);

  const handleClickOutside = (e: MouseEvent) => {
    if ((e.target as Element).classList.contains("profile-menu-button")) return;
    if (
      store.jobseekerProfileMenuModalOpen &&
      ref.current &&
      !ref.current.contains(e.target as Element)
    ) {
      store.toggleJobseekerProfileMenuModal();
    }
  };

  //this is only client side logout
  

  return (
    <div
      ref={ref}
      className="absolute max-w-sm bg-white sm:px-xl w-full shadow-xl top-10 sm:top-12 grid  place-items-start gap-xs text-black-default  p-md right-0"
    >
      <Link
        to="/jobs/create"
        className="text-black-default border-b-sm border-green-dark hover:text-green-dark"
      >
        Create Job
      </Link>
      <Link
        to="/employer/profile/basic-info"
        className="text-black-default border-b-sm border-green-dark hover:text-green-dark md:block hidden"
      >
        Update Profile
      </Link>
      <Link
        to="/employer/profile"
        className="text-black-default border-b-sm border-green-dark hover:text-green-dark md:hidden"
      >
        Profile
      </Link>
      <Link
        to="/employer/overview"
        className="text-black-default border-b-sm border-green-dark hover:text-green-dark md:hidden"
      >
        Overview
      </Link>
      <button
        className="text-black-light font-medium border-b-sm border-green-dark hover:text-green-dark"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default EmployerProfileMenu;
