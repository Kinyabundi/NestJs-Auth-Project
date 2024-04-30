'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async () => {
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const resp = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: '/',
      });

      if (!resp.ok) {
        toast.error(resp.error);
        return;
      }
       console.log("This resp",resp);
      setLoading(false);
      setEmail('');
      setPassword('');
      toast.success('Logged in successfully');
      router.push('/add-task');
    } catch (error) {
      toast.error('Failed to login');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md space-y-4">
        <div className="space-y-3">
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john.doe@gmail.com"
          />
        </div>
        <div className="space-y-3">
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={'**********'}
          />
        </div>

        <div>
          <p>
            Don't have an account? <Link href="/register" className='text-blue-500 hover:underline'>Register Here</Link>
          </p>
        </div>
        <Button onClick={onSubmit} disabled={loading}>
          {loading && <Loader2 className="w-6 h-6 mr-2 animate-spin" />}
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
