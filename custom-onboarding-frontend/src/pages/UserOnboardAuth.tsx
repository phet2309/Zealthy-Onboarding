import React, { useState } from 'react'
import { useLoggedIn } from '../context/LoggedInContext';
import { UserData } from '../types';
import { createUser, loginUser } from '../api/userApi';
import { showToast } from '../components/Toast';
import { useNavigate } from 'react-router';
import Input from '../components/Input';

// User onboarding authentication page
const UserOnboardAuth: React.FC = () => {
  const { setIsLoggedIn, setEmailVal } = useLoggedIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleCreateUser = async () => {
    if (!email || !password || !validateEmail(email)) {
      showToast("Please provide a valid email and password", "error");
      return;
    }

    const payload: UserData = {
      email: email,
      password: password
    };

    const resp = await createUser(payload);

    if (typeof resp === 'string') {
      showToast(resp, "error");
    } else {
      showToast("User created successfully", "success");
    }
  }


  const handleCredSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);

      if (response === "Success") {
        console.log('Login successful');
        setIsLoggedIn(true);
        setEmailVal(email);
        showToast("Login successful", "success");

        navigate('/user-onboard-form', {
          replace: true,
          state: { email: email }
        });

      } else {
        console.log('Login failed');
        showToast("Login failed", "error");
      }
    } catch (error) {
      console.error('Error during login', error);
      showToast("Login failed", "error");
    }
  };

  return (
    <>
      <div className='min-w-screen min-h-screen flex flex-col items-center justify-center'>
        <h1 className='text-2xl my-7'>Welcome to the Zealthy onboarding page</h1>
        <div className='min-w-[50%] flex items-center justify-center'>
          <form onSubmit={handleCredSubmit} className="space-y-4">
            <Input
              label="Email:"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password:"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='flex justify-between space-x-5'>
              <button
                type="button"
                onClick={handleCreateUser}
                className="min-w-[100px] p-4 mt-4 border-2 border-blue-500 text-blue-500 rounded hover:border-blue-600 hover:text-blue-600"
              >
                Sign up
              </button>
              <button
                type="submit"
                className="min-w-[100px] p-4 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default UserOnboardAuth;

