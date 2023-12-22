import { useState, useEffect } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Layout from "../../components/ui/Layout";
import { MdWork } from "react-icons/md";
import { FaPlus, FaUser } from "react-icons/fa";
import RecentJobs from "./RecentJobs";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useProfile } from "./hooks/useEmployerProfile";
import AllJobs from "./AllJobs";
import Error from "../../components/shared/Error";
import Loader from "../../components/shared/Loader";

const Overview = () => {
  const [selected, setSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useCurrentUser();
  const loading = !user
  const navigate = useNavigate();
  const { profile, error, isLoading } = useProfile();

useEffect(() => {
window.scrollTo(0,0)
},[])

  const handleCreate = () => {
    if (!profile?.basic_information.id) {
      toast.error("Update profile first");
    } else {
      navigate("/jobs/create");
    }
  };

  useEffect(() => {
    if (profile?.basic_information.id) {
      setSelected("recent");
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }, [profile]);
  
  if (isLoading || loading) return <Loader/>;

  if (user.role !== 'employer') return <Error />;
  
  return (
    <Layout>
      <div className="relative py-md grid gap-sm">
        <header className="relative h-full grid gap-xs place-items-center border-b-sm border-default pb-sm ">
          <img
            src={
              profile?.basic_information?.image
                ? profile.basic_information.image
                : "https://template.canva.com/EAENvp21inc/1/0/1600w-qt_TMRJF4m0.jpg"
            }
            alt=""
            className="w-20 h-20 "
          />
          <div className="grid gap-1 place-items-center">
            <p className="font-semibold text-xl">
              {profile?.basic_information?.organization_name
                ? profile.basic_information.organization_name
                : user.fullName}
            </p>
            <p className="text-gray-dark">
              {profile?.basic_information?.industry_type }
            </p>
            <p>{profile?.basic_information?.phone_number || user.phoneNumber}</p>
            <p>{profile?.basic_information?.email || user.email}</p>
          </div>
        </header>

        <section className="grid gap-md md:flex items-start">
          <div className=" grid gap-xs flex-[0.4] max-w-xs mx-auto w-full ">
            <div className="grid gap-xs shadow-sm p-sm">
              <p className="flex items-center gap-sm">
                <MdWork className="text-blue-dark" /> 0
              </p>
              <p>Total job posted</p>
            </div>
            <div className="grid gap-xs shadow-sm p-sm">
              <p className="flex items-center gap-sm">
                <MdWork className="text-orange-default" /> 0
              </p>
              <p>Total Vacancies</p>
            </div>
            <div className="grid gap-xs shadow-sm p-sm">
              <p className="flex items-center gap-sm">
                <FaUser className="text-blue-default" /> 0
              </p>
              <p>Total Applicants</p>
            </div>
          </div>

          <div className="grid gap-sm  flex-1">
            <header className="flex gap-xs sm:gap-sm flex-wrap items-center ">
              <span
                className={`${
                  selected === "recent" && "border-b-2 border-blue-dark"
                } cursor-pointer`}
                onClick={() => setSelected("recent")}
              >
                Recent
              </span>
              <span
                className={`${
                  selected === "all" && "border-b-2 border-blue-dark "
                } cursor-pointer`}
                onClick={() => setSelected("all")}
              >
                All
              </span>
              <span   className={`${
                  selected === "applications" && "border-b-2 border-blue-dark "
                } cursor-pointer`}  onClick={() => setSelected("applications")}>Applications</span>
              <button
                className="flex items-center gap-2 bg-orange-light text-white px-sm rounded-sm p-xs"
                onClick={handleCreate}
              >
                new <FaPlus />{" "}
              </button>
            </header>
            <section className="grid gap-sm">
              {selected === "recent" && (
                <RecentJobs employerId={profile?.user_id} />
              )}
              {selected === "all" && (
                <AllJobs employerId={profile?.user_id} />
              )}
              {isModalOpen && (
                <div className="grid gap-sm">
                  <p>Please update your profile to post a job.</p>
                  <Link
                    to="/employer/profile/basic-info"
                    className="bg-blue-dark w-fit text-white hover:text-white p-xs px-sm rounded-sm "
                  >
                    Update now
                  </Link>
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Overview;