import SignInForm from '@/components/forms/SignInForm'
import { getUserSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function SignIn({searchParams}:{searchParams: { [key: string]: string | undefined }}) {
  const {message} = searchParams;

  const user = await getUserSession()
  if(user) redirect("/")

  return (
    <div className="contain mt-[5rem] w-full min-h-screen">
      <SignInForm message={message}/>
    </div>
    
  )
}
