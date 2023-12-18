import toast from "react-hot-toast";
import { IJobseekerJobPreferenceInputs } from "../../../types/react/types";
import { privateRequest } from "../../../lib/axios";


type Category = {
    category_name:string
    category_id:string
  }
  
  type Industry = {
    industry_name:string
    industry_id:string
  }

export const updateJobPrefetence = (data: IJobseekerJobPreferenceInputs, setIsLoading: (props: any) => void, setIsEditorOpen:(props:any) => void, industries:Industry[] | undefined, categories:Category[] | undefined) => {
  
    const getIndustryId = (industryName:string) => {
        const industry = industries?.find(ind => ind.industry_name === industryName)
        return industry ? industry.industry_id : null
        }
        const getCategoryId = (category:string) => {
          const cat = categories?.find(cat => cat.category_name === category)
          return cat ? cat.category_id : null
        }
        let preferredIndustries = data.jobIndustries.map(item => getIndustryId(item))
        let preferredCategories = data.jobCategories.map(item => getCategoryId(item))

        
    try {
        let dataToBeSent = {
                available_for: data.availableFor,
                expected_salary: data.expectedSalary,
                job_categories: preferredCategories,
                job_industries: preferredIndustries,
                job_level: data.jobLevel,
                job_location: data.jobLocation,
                job_title: data.jobTitle,
                summary: data.objective,
                skills: data.skills
        }
        setIsLoading(true)

        toast.promise(privateRequest.put('/api/v1/jobseeker/profile/jobPreference', dataToBeSent), {

            loading: 'Loading',
            success: () => {
                setIsLoading(false)
                setIsEditorOpen(false)
                return 'Success'
            },
            error: (err) => {
                console.log(err)
                setIsLoading(false)
                return 'Failed'
            }
        })
    } catch (err) {
        console.log(err)
        setIsLoading(false)

    }
}