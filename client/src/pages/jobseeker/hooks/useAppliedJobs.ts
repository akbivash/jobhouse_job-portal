import { useQuery } from "react-query";
import { privateRequest } from "../../../lib/axios";
import useAuthStore from "../../../store/auth";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

export const useAppliedJobs = () => {
  const { isAunthenticated } = useAuthStore();
  const { role } = useCurrentUser();

  const getJobs = async () => {
    if (!isAunthenticated || role !== "jobseeker") return;
    const result = await privateRequest.get("/api/v1/jobs/applied");
    return result.data;
  };
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery(["appliedJobs", isAunthenticated, role], getJobs);

  return { jobs, isError, isLoading };
};
