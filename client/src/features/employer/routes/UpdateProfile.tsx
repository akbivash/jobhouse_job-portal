import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthStore from "../../../store/auth";
import { useProfile } from "../api/getProfile";
import BasicInformation from "../components/BasicInformation";
import OtherInformation from "../components/OtherInformation";
import NoUser from "../../misc/routes/NoUser";
import AlmostLoaded from "../../../components/elements/loader/AlmostLoaded";
import Error from "../../../components/ui/Error";

const UpdateProfile = () => {
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const { isAunthenticated } = useAuthStore();
  const { profile, isLoading, error } = useProfile();
  const params = useParams();
  const title = params.title;

  const data = [
    {
      title: "Basic Information",
      link: "basic-info",
      component: (
        <BasicInformation
          profile={profile}
          setIsEditorOpen={setIsEditorOpen}
          isEditorOpen={isEditorOpen}
        />
      ),
    },
    {
      title: "Other Information",
      link: "other-info",
      component: (
        <OtherInformation
          profile={profile}
          setIsEditorOpen={setIsEditorOpen}
          isEditorOpen={isEditorOpen}
        />
      ),
    },
  ];

  if (isLoading) return <AlmostLoaded />;
  if (!isAunthenticated) return <NoUser />;
  if (!isLoading && (error || profile?.user_id === undefined)) return <Error />;

  return (
    <div className="grid p-sm  gap-sm mx-auto md:flex max-w-3xl  md:gap-xl md:items-start">
      <header className="grid gap-xs w-fit h-fit border-b-sm pb-sm md:flex-[0.5]">
        <h2 className="font-semibold border-b-sm pb-sm">EDIT PROFILE </h2>

        {data.map((item) => {
          return (
            <Link
              to={`/employer/profile/${item.link}`}
              key={item.title}
              className={`${
                title === item.link
                  ? "text-green-dark hover:text-green-dark "
                  : "text-black-default hover:text-black-dark"
              } w-fit`}
            >
              {item.title}
            </Link>
          );
        })}
      </header>
      <section className="flex flex-col  min-h-[80vh]  md:flex-1 ">
        {data.map((item) => {
          return (
            <div key={item.link}>{item.link === title && item.component}</div>
          );
        })}
      </section>
    </div>
  );
};

export default UpdateProfile;
