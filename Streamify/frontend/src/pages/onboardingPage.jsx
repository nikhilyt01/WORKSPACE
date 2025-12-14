import { useAuthUser } from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CameraIcon } from 'lucide-react';

const onboardingPage = () => {
  const {authUser} = useAuthUser();
  const queryClient =useQueryClient();

  const [formState,setFrormState]=useState({
    fullName:authUser?.fullName||"",
    bio:authUser?.bio || "",
    nativeLanguage:authUser?.nativeLanguage || "",
    learningLanguage:authUser?.learningLanguage||"",
    location:authUser?.location || "",
    profilePic:authUser?.profilePic || "",
  })
  const {mutate:onboardingMutation,isPeding}=useMutation({
    mutationFn:completeOnboarding,
    onSuccess:()=>{
      toast.success("Profile onBoarded successfully");
      queryClient.invalidateQueries({queryKey:["authUser"]});
    }

  })
  const handlesSubmit=(e)=>{
    e.preventDefault() ;
    onboardingMutation(formState); 
  }
  return (
    <div className="h-screen flex items-center justify-center  bg-base-100 p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete your Profile</h1>

          <form onSubmit={handlesSubmit} className="space-y-6">
            {/*profile pic container */}
            <div className="flex flex-col items-center space-y-4">
              {/*Image preview */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic?(
                  <img src={formState.profilePic} alt="Profile Preview" className="w-full h-full object-cover"/>
                ):(
                  <div className="w-full h-full flex items-center justify-center text-3xl text-base-content/50">
                     <CameraIcon className="size-12 text-base-content opacity-40"/>
                  </div>
                )}
              </div>

            </div>
            </form>

        </div>
        

      </div>

    </div>
  )
}

export default onboardingPage
