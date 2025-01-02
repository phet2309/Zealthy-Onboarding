import React, { useEffect, useState } from 'react'
import { fetchAdminConfig } from '../api/adminApi';
import { fetchUserData, updateUserData } from '../api/userApi';
import { Address, AdminConfig, UserData } from '../types';
import { showToast } from '../components/Toast';
import { useLocation } from 'react-router';
import ProgressBar from '../components/ProgressBar';

// User onboarding form page
const UserOnboardForm: React.FC = () => {

  const location = useLocation();
  const { email } = location.state || {};

  const getLastUsedPage = (email: string) => {
    if(!email) return 1;
    const key = 'lastUsedPage_' + email;
    if (localStorage.getItem(key)) {
      return parseInt(localStorage.getItem(key) as string);
    }
    localStorage.setItem(key, '1');
    return 1;
  }

  const [page, setPage] = React.useState<number>(getLastUsedPage(email));
  const [adminConfig, setAdminConfig] = useState<AdminConfig[]>([]);
  const [formData, setFormData] = useState<UserData>({
    id: '',
    email: '',
    password: '',
    aboutMe: '',
    birthdate: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    }
  });

  const handleChange = (value: string, field: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAddressChange = (value: string, field: keyof Address) => {
    setFormData((prevState) => {

      const updatedAddress = prevState.address
        ? { ...prevState.address, [field]: value }
        : { [field]: value };

      return {
        ...prevState,
        address: updatedAddress,
      };
    });
  };

  const handleNextClick = async () => {
    const resp = await updateUserData(formData);
    if (typeof resp === 'string') {
      console.error('Failed to submit form:', resp);
      showToast('Failed to submit form', 'error');
      return;
    }
    showToast('Data saved successfully', 'success');
    localStorage.setItem('lastUsedPage_' + email, (page + 1).toString());
    setPage(page + 1);
  }

  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      try {
        const user = await fetchUserData(email);
        if (typeof user === 'object' && user !== null) {
          setFormData({
            id: user.id || '',
            email: user.email || '',
            password: user.password || '',
            aboutMe: user.aboutMe || '',
            birthdate: user.birthdate || '',
            address: user.address || {
              street: '',
              city: '',
              state: '',
              zip: '',
            },
          });
        } else {
          console.error('Invalid user data:', user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
    setPage(getLastUsedPage(email));
  }, [email]);


  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await fetchAdminConfig();
        if (typeof config === 'string') {
          throw new Error("Failed to fetch admin config")
        };
        setAdminConfig(config);
      } catch (error) {
        console.error('Error fetching admin config:', error);
      }
    };

    fetchConfig();
  }, [page]);


  return (
    <>
      <div className='min-h- min-w-full flex flex-col items-center justify-center'>
        <ProgressBar currentPage={page} setCurrentPage={setPage} email={email} />
        <h1 className='text-2xl my-7'>Welcome to the Zealthy onboarding page</h1>

        <div className='min-w-[80%] flex flex-col'>
          {
            page === adminConfig.find(config => config.componentName === "aboutMe")?.pageNumber
            && (
              <div className="mb-4">
                <label htmlFor="about-me" className="block text-md font-medium text-gray-700 mb-2">
                  About Me
                </label>
                <textarea
                  id="about-me"
                  value={formData.aboutMe}
                  onChange={(e) => handleChange(e.target.value, 'aboutMe')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Tell us about yourself..."
                />
              </div>
            )
          }


          {
            page === adminConfig.find(config => config.componentName === "birthDateSelector")?.pageNumber && (
              <div className="mb-4">
                <label htmlFor="birthdate" className="block text-md font-medium text-gray-700 mb-2">
                  Birthdate
                </label>
                <input
                  id="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => handleChange(e.target.value, 'birthdate')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            )
          }

          {
            page === adminConfig.find(config => config.componentName === "address")?.pageNumber && (
              <div className="mb-4">
                <label htmlFor="street" className="block text-md font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  id="street"
                  value={formData?.address?.street ?? ''}
                  onChange={(e) => handleAddressChange(e.target.value, 'street')}
                  className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="123 Main St"
                />
                <label htmlFor="city" className="block text-md font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  id="city"
                  value={formData?.address?.city ?? ''}
                  onChange={(e) => handleAddressChange(e.target.value, 'city')}
                  className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="City"
                />
                <label htmlFor="state" className="block text-md font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  id="state"
                  value={formData?.address?.state ?? ''}
                  onChange={(e) => handleAddressChange(e.target.value, 'state')}
                  className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="State"
                />
                <label htmlFor="zip" className="block text-md font-medium text-gray-700 mb-2">
                  Zip Code
                </label>
                <input
                  id="zip"
                  value={formData?.address?.zip ?? ''}
                  onChange={(e) => handleAddressChange(e.target.value, 'zip')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Zip Code"
                />
              </div>
            )
          }

          {page === 3 && (
            <div className="mt-4 text-center text-lg">

              <h2>Congratulations, you're all set up! 🎉 We're excited to have you with us. Your account has been successfully created, and you're ready to start.</h2>
              <h2>Happy journey ahead! 🚀</h2>
            </div>
          )

          }
        </div>
        {page <= 2 &&
          (<div className='flex justify-between space-x-5'>
            <button
              type="button"
              onClick={() => {
                localStorage.setItem('lastUsedPage_' + email, (page - 1).toString());
                setPage(page - 1);
              }}
              className={`min-w-[100px] p-4 mt-4 border-2 rounded hover:border-blue-600 hover:text-blue-600 
    ${page === 1
                  ? 'border-gray-400 text-gray-400 cursor-not-allowed hover:border-gray-400 hover:text-gray-400'
                  : 'border-blue-500 text-blue-500'}`}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNextClick}
              className="min-w-[100px] p-4 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {page == 2 ? 'Submit' : 'Next'}
            </button>
          </div>)}
      </div>
    </>
  )
}

export default UserOnboardForm;
