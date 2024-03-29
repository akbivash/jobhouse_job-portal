import { useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import { FaIndustry } from "react-icons/fa";
import { UseQueryResult, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { AppliedJobs, IJob } from "../../../types/postgres/types";
import { publicRequest } from "../../../lib/axios";
import AlmostLoaded from "../../../components/elements/loader/AlmostLoaded";
import Error from "../../../components/ui/Error";
import ContentLayout from "../../../components/layout/ContentLayout";
import JobCard from "../../../components/ui/JobCard";
import Categories from "../components/Categories";
import Industries from "../components/Industries";
import { useAppliedJobs } from "../../jobseeker/api/getAppliedJobs";

type AppliedJobsType = {
  jobs: AppliedJobs[];
  isLoading: boolean;
  isError: boolean;
};

const Jobs = () => {
  const location = useLocation().search;
  const category = new URLSearchParams(location).get("category");
  const industry = new URLSearchParams(location).get("industry");
  const level = new URLSearchParams(location).get("level");
  const type = new URLSearchParams(location).get("type");
  const id = new URLSearchParams(location).get("id");
  const { jobs: appliedJobs }: AppliedJobsType = useAppliedJobs();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getJobs = async () => {
    const queryStr = category
      ? `categoryId=${id}`
      : industry
        ? `industryId=${id}`
        : null;
    const url =
      queryStr || level || type
        ? `/api/v1/jobs/filters?${queryStr}&level=${level}&type=${type}`
        : `/api/v1/jobs`;
    const result = await publicRequest.get(url);
    return result.data;
  };

  const {
    data: jobs,
    isLoading,
    isError,
  }: UseQueryResult<IJob[]> = useQuery(["jobs", id], getJobs);

  if (isLoading) return <AlmostLoaded />;
  if (isError) return <Error />;

  return (
    <ContentLayout>
      <div className="grid gap-sm ">
        <div className="grid gap-xs bg-green-50 p-sm">
          <h2 className="text-2xl font-bold text-black-light">
            {" "}
            {industry || category}
          </h2>
          <p>
            This list show the latest job vacancy in{" "}
            <span className="font-semibold">
              {industry ||
                category ||
                (level && level + " level") ||
                (type && type)}
            </span>{" "}
            Jobs in Nepal. Click on the job that interests you, read the job
            detail and if it is suitable for you, Click on the apply button to
            send your job application.
          </p>
        </div>
        <main className="grid gap-xl ">
          <section className="grid sm:grid-cols-auto-sm place-items-center md:grid-cols-auto-md gap-sm ">
            {jobs !== undefined && jobs?.length > 0 ? (
              jobs?.map((job) => {
                return (
                  <JobCard
                    appliedJobs={appliedJobs}
                    job={job}
                    key={job.job_id}
                  />
                );
              })
            ) : (
              <div className="h-[200px] grid place-items-center bg-green-50">
                <p className="text-black-light font-bold">No jobs found</p>
                <img
                  src="https://static.merojob.com/images/search/industry/jobs_by_industry.svg"
                  alt=""
                />
              </div>
            )}
          </section>
          <div className=" border-sm  flex-[0.3] ">
            <header className=" flex items-center gap-2 font-bold border-b-sm   p-sm  text-green-dark">
              <BiCategory /> Jobs By Category
            </header>
            <Categories />
          </div>
        </main>
        <div className=" border-sm  flex-[0.3] ">
          <header className="flex items-center font-bold gap-2 border-b-sm p-sm  text-green-dark">
            <FaIndustry /> Jobs By Industry
          </header>
          <Industries />
        </div>
      </div>
    </ContentLayout>
  );
};

export default Jobs;
