'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Button from '@/components/buttons';
import InputField from '@/components/input-fields';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [remember, setRemember] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push('/movies');
  }, [router]);

 const onSubmit = async (data: LoginForm) => {
  try {
    const res = await api.post('/auth/login', data);
    if (res.status === 200) {
      localStorage.setItem('token', res.data.access_token);
      toast.success(res.data.message || 'Login successful');
      router.push('/movies');
    } else {
      toast.error(res.data.message || 'Login failed');
    }
  } catch (err: any) {
    console.error('Login failed:', err?.response?.data || err.message);
    toast.error(err?.response?.data?.message || 'Login failed');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-primary">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card p-8 rounded-xl w-full max-w-sm space-y-4  "
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Sign in</h1>
        <InputField
          label="Email"
          type="email"
          placeholder="Email"
          register={register("email")}
          error={errors.email?.message}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Password"
          register={register("password")}
          error={errors.password?.message}
        />
        <div className="flex items-center justify-center space-x-2">
          <input 
           id="remember"
           type="checkbox"
           className="accent-primary cursor-pointer"
           checked={remember}
           onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember" className="text-sm text-white">
            Remember me
          </label>
        </div>
        <Button type="submit" className="w-full" variant='primary'>
          Login
        </Button>
      </form>
    </div>
  );
}
