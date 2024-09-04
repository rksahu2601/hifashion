import Admin from '@/components/backoffice/Admin';
import { getUserSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';


export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const user = await getUserSession()
if(!user || user.role !== "admin"){
  redirect("/signin")
}

  return (
    <Admin>
      {children}
    </Admin>
  )
}
