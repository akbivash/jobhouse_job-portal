import moment from "moment";
import { useEffect, useState } from "react";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { FaCheckCircle, FaRegCalendarCheck } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { AppliedJobs, IJob } from "../../types/postgres/types";

interface IJobCard {
  job: IJob;
  appliedJobs: AppliedJobs[];
}

const JobCard = ({ job, appliedJobs }: IJobCard) => {
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    appliedJobs?.length > 0 &&
      appliedJobs?.map((item) => {
        if (item.job_id === job?.job_id) {
          setIsApplied(true);
        }
      });
  }, [job, appliedJobs]);

  return (
    <div className="grid  w-full h-full  max-w-md border-sm   font-normal  ">
      <div className="flex p-sm gap-xs items-center text-black-dark hover:text-black-dark">
        <img
          src={
            job?.employer_details?.image
              ? job.employer_details.image
              : "https://cdn-icons-png.flaticon.com/512/2399/2399888.png"
          }
          alt=""
          loading="lazy"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <Link
            className="text-black-dark hover:text-black-dark"
            to={`/jobs/${job.title}-${job.job_id}`}
          >
            <p className="font-semibold text-black-dark">
              {job.employer_details?.organization_name}
            </p>
            <p className="font-semibold flex items-center">
              <GoDotFill className="text-blue-dark" /> {job.title}
            </p>
            <p className=" flex font-normal items-center gap-xs">
              <CiLocationOn fontSize="small" /> {job.location}
            </p>
          </Link>
        </div>
      </div>
      <div className=" border-t-sm  p-sm">
        <div className="grid gap-2">
          <p className="text-gray-dark flex items-center gap-xs">
            <CiCalendar fontSize="small" /> Expires :{" "}
            {moment(job?.deadline).fromNow()}
          </p>
          {job.job_application_count && (
            <p className="text-gray-dark flex items-center gap-2 ">
              {" "}
              <FaCheckCircle className="text-green-dark" />{" "}
              {job.job_application_count} Applied{" "}
            </p>
          )}
        </div>
        {isApplied && (
          <span className="flex items-center gap-2 text-gray-dark text-right float-right">
            <FaRegCalendarCheck className="text-green-dark" />{" "}
          </span>
        )}
      </div>
    </div>
  );
};

export default JobCard;
