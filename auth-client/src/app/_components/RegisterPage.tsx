'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { API_URL } from '@/env';
import { useRouter } from 'next/navigation';
import { IApiResponse } from '@/types/Api';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';


const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const RegisterPage = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setRole('');
  }

  const onSubmit = async () => {
    if (!firstName) {
      toast.error('First Name is required');
      return;
    }
    if (!lastName) {
      toast.error('Last Name is required');
      return;
    }

    if (!email) {
      toast.error('Email is required');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('Invalid email');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!role) {
      toast.error('Role is required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          systemRole: role,
        }),
      })

      if (!response.ok) {
        const result = await response.json()  as IApiResponse;
        throw new Error(result?.msg ?? 'Failed to register user');
      }
      resetForm();
      router.push('/login');
      toast.success('User registered successfully');
    } catch (error) {
      toast.error(error?.message ?? 'Failed to register user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md space-y-4">
        <div className="space-y-3">
          <Label>FirstName</Label>
          <Input
            type="text"
            value={firstName}
            placeholder="John"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <Label>LastName</Label>
          <Input
            type="text"
            value={lastName}
            placeholder="Doe"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            placeholder="**********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <RadioGroup
            defaultValue="integrator"
            value={role}
            onValueChange={(val) => setRole(val)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="admin" id="admin" />
              <Label htmlFor="admin">Admin</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="integrator" id="integrator" />
              <Label htmlFor="admin">Integrator</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <p>
            Already have an account? <Link  className='text-blue-500 hover:underline'  href="/login">Login</Link>
          </p>
        </div>

        <Button onClick={onSubmit} disabled={loading}>
          {loading && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
          {loading ? 'Loading...' : 'Register'}
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
