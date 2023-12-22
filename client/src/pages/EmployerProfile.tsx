import { MdLocationPin} from "react-icons/md"
import { FaEnvelope } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';

import { useEffect } from 'react';
import Loader from "../components/shared/Loader";
import { UseQueryResult, useQuery } from "react-query";
import { publicRequest } from "../lib/axios";
import Error from "../components/shared/Error";
import Layout from "../components/ui/Layout";
import { IEmployerProfile } from "../types/postgres/types";
import RecentJobs from "./employer/RecentJobs";

const EmployerProfile = () => {
const params = useParams()
const id = params.id

const {data:profile, isLoading, isError}:UseQueryResult<IEmployerProfile> = useQuery(['profile',id], async() => {
const result = await publicRequest.get(`/api/v1/employer/profile/${id}`)
return result.data
} )


useEffect(() => {
  window.scrollTo(0,0)
    },[])

if(isLoading) return <Loader/>
if(isError) return <Error/>

   return (
    <Layout>
      <div className='grid gap-sm lg:flex lg:gap-md' >
       <section className='grid gap-sm flex-1 h-fit'>
       <header className="relative h-full">
        <div className='cover-image'>
        <img
          src={profile?.basic_information?.cover_image ? profile.basic_information.cover_image : "https://template.canva.com/EAENvp21inc/1/0/1600w-qt_TMRJF4m0.jpg"}
          alt=""
          className="w-full h-full max-h-[300px] relative object-contain "
        />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-sm">
          <img
            src={profile?.basic_information?.image ? profile.basic_information.image : "https://media.istockphoto.com/id/1340893300/vector/technology-logo-design-template-networking-vector-logo-design.jpg?s=612x612&w=0&k=20&c=-8XBWFDRAAYe3leL4nuMnei0wWpL6-IqsPCAbWIhASk="}
            alt=""
            className="h-20 w-20 rounded-sm object-contain"
          />
        </div>
       {id === undefined &&  <Link to='/employer/profile/basic-info' className='absolute right-2 bottom-2 bg-blue-dark rounded-md text-white hover:text-white px-sm p-xs'>Edit Profile</Link>}
       
       
      </header>
      <div className='grid gap-xs  border-b-sm border-gray-300 pb-sm place-items-center'>
            <h2 className='font-semibold text-xl'>{profile?.basic_information?.organization_name }</h2>
            <p>{profile?.basic_information?.industry_type}</p>
            <p>{profile?.other_information?.website}</p>
        </div>
      <div className='grid gap-xs place-items-center border-b-sm border-gray-300 pb-sm'>
           <p className='flex items-center gap-xs'><MdLocationPin className='text-blue-dark'/> {profile?.basic_information?.address || 'Not available'}</p>
           <p className='flex items-center gap-xs'><FaEnvelope className='text-blue-dark'/> {  profile?.basic_information.email || 'Not available'}</p>
           <p className='flex items-center gap-xs'><FaPhoneAlt className='text-blue-dark'/>{profile?.basic_information?.phone_number || 'Not available'}</p>
        </div>
        <div className='grid gap-xs'>
       <h2 className='font-semibold text-xl'>Summary</h2>
        {profile?.basic_information?.summary ? profile.basic_information.summary : <div className='grid gap-sm'>
   No summary available!
        </div>}</div>
       </section>
      <section className='flex-1 grid gap-sm h-fit'>

      
    <div className='grid gap-sm'>
          <h2 className='font-semibold text-xl border-y-sm py-xs border-default'>Recent jobs by {profile?.basic_information?.organization_name }</h2>
          <div>
          <RecentJobs employerId={profile?.user_id} params={id}/>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  )
}

export default EmployerProfile