'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter()
  return (
    <div className="flex justify-center h-screen items-center">
      <Button onClick={() => router.push("/login")}>Login</Button>
    </div>
  );
};

export default HomePage;
