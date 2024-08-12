import SignUpForm from "@/components/forms/SignUpForm";
import { getUserSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function SignUp({searchParams}:{searchParams: { [key: string]: string | undefined }}) {
const {message} = searchParams;

const user = await getUserSession()
  if(user) redirect("/")

  return (
    <div className="contain mt-[5rem] w-full min-h-screen"><SignUpForm message={message}  /></div>
  )
}
