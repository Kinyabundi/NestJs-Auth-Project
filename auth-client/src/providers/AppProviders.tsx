import { ReactNode, FC } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import AppLayout from '@/layouts/AppLayout';

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <AppLayout>{children}</AppLayout>
      <Toaster />
    </SessionProvider>
  );
};

export default AppProviders;
