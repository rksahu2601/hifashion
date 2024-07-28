import Admin from '@/components/backoffice/Admin';
import Navbar from '../../components/backoffice/navbar/Navbar';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Admin>
      {children}
    </Admin>
  )
}
