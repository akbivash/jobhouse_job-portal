import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../../components/layout";
import PageNotFound from "../../misc/routes/PageNotFound";
import Job from "./JobDetails";
import Jobs from "./Jobs";
import SearchResults from "./SearchResults";
import PublicProfile from "../../employer/routes/PublicProfile";

export const JobsPublicRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="" element={<Jobs />} />
        <Route path="/employer/:employerName/:id" element={<PublicProfile />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/:jobId" element={<Job />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </MainLayout>
  );
};
