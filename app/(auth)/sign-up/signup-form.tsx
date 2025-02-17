'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpDefaultValues } from '@/lib/constants';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signUp } from '@/lib/actions/user.action';

const SignUpForm = () => {
  const [data, action] = useActionState(signUp, {
    message: '',
    success: false,
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'Submitting...' : 'Sign Up'}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            name='name'
            required
            type='text'
            defaultValue={signUpDefaultValues.name}
            autoComplete='name'
          />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            required
            type='email'
            defaultValue={signUpDefaultValues.email}
            autoComplete='email'
          />
        </div>
        <div>
          <Label htmlFor='phoneNumber'>Phone Number</Label>
          <Input
            id='phoneNumber'
            name='phoneNumber'
            required
            type='number'
            defaultValue={signUpDefaultValues.phoneNumber}
            autoComplete='phone-number'
          />
        </div>
        <div>
          <Label htmlFor='gender'>Gender</Label>
          <Input
            id='gender'
            name='gender'
            required
            type='text'
            defaultValue={signUpDefaultValues.gender}
            autoComplete='gender'
          />
        </div>
        <div>
          <Label htmlFor='age'>Age</Label>
          <Input
            id='age'
            name='age'
            required
            type='text'
            defaultValue={signUpDefaultValues.age}
            autoComplete='age'
          />
        </div>
        <div>
          <Label htmlFor='dob'>Date of Birth</Label>
          <Input
            id='dob'
            name='dob'
            required
            type='text'
            defaultValue={signUpDefaultValues.dob}
            autoComplete='dob'
          />
        </div>
        <div>
          <Label htmlFor='city'>City</Label>
          <Input
            id='city'
            name='city'
            required
            type='city'
            defaultValue={signUpDefaultValues.city}
            autoComplete='city'
          />
        </div>
        <div>
          <Label htmlFor='state'>State</Label>
          <Input
            id='state'
            name='state'
            required
            type='text'
            defaultValue={signUpDefaultValues.state}
            autoComplete='state'
          />
        </div>
        <div>
          <Label htmlFor='age'>Country</Label>
          <Input
            id='country'
            name='country'
            required
            type='text'
            defaultValue={signUpDefaultValues.country}
            autoComplete='country'
          />
        </div>
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            name='password'
            required
            type='password'
            defaultValue={signUpDefaultValues.password}
            autoComplete='current-password'
          />
        </div>
        <div>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            required
            type='password'
            defaultValue={signUpDefaultValues.confirmPassword}
            autoComplete='current-password'
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {!data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}

        <div className='text-sm text-center text-muted-foreground'>
          Already have an account?{' '}
          <Link
            target='_self'
            className='link'
            href={`/sign-in?callbackUrl=${callbackUrl}`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;