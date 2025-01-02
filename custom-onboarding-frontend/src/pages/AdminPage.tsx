import React, { useState, useEffect } from 'react';
import { fetchAdminConfig, updateAdminProperty } from '../api/adminApi';
import { showToast } from '../components/Toast';
import { Assignment } from '../types';


const AdminPage: React.FC = () => {
  const defaultAssignments = {
    aboutMe: {
      id: '',
      currentPage: 1
    },
    address: {
      id: '',
      currentPage: 2
    },
    birthDateSelector: {
      id: '',
      currentPage: 2
    },
  };

  const [assignments, setAssignments] = useState<Assignment>(defaultAssignments);
  // Store the initial assignments to compare with the updated assignments
  const [initialAssignments, setInitialAssignments] = useState<Assignment>({
    aboutMe: { id: '', currentPage: 1 },
    address: { id: '', currentPage: 1 },
    birthDateSelector: { id: '', currentPage: 2 },
  });

  // Enable the Apply button if there are changes
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetchAdminConfig();

      if (typeof response === 'string') {
        showToast('Failed to fetch admin config', 'error');
        return;
      }

      console.log('Admin Config:', response);

      const aboutMe = response.find((config) => config.componentName === 'aboutMe');
      const address = response.find((config) => config.componentName === 'address');
      const birthDateSelector = response.find((config) => config.componentName === 'birthDateSelector');

      const updatedAssignments = {
        'aboutMe': {
          id: aboutMe?.id || '',
          currentPage: aboutMe?.pageNumber || 1
        },
        'address': {
          id: address?.id || '',
          currentPage: address?.pageNumber || 1
        },
        'birthDateSelector': {
          id: birthDateSelector?.id || '',
          currentPage: birthDateSelector?.pageNumber || 2
        }
      };


      setAssignments(updatedAssignments);
      setInitialAssignments(updatedAssignments);
    };

    fetchConfig();
  }, []);

  useEffect(() => {
    setHasChanges(
      JSON.stringify(assignments) !== JSON.stringify(initialAssignments)
    );
  }, [initialAssignments, assignments]);

  const handleInputChange = (field: keyof Assignment, newPageNumber: number) => {
    setAssignments(prevAssignments => ({
      ...prevAssignments,
      [field]: {
        ...prevAssignments[field],
        currentPage: newPageNumber
      }
    }));
  };
  
  const handleApply = async () => {
    if(assignments['aboutMe'].currentPage === assignments['address'].currentPage 
        && assignments['aboutMe'].currentPage === assignments['birthDateSelector'].currentPage) {
      showToast('Please assign different pages to each component', 'error');
      return;
    }
    for (const [key, value] of Object.entries(assignments)) {
      const requestBody = {
        id: value.id,
        componentName: key,
        pageNumber: value.currentPage
      };
      const response = await updateAdminProperty(requestBody);

      if (typeof response === 'string') {
        showToast(`Failed to update ${key}!`, 'error');
      } else {
        showToast(`Changes applied successfully for ${key}!`, 'success');
        setInitialAssignments({
          ...initialAssignments,
          [key]: {
            id: value.id,
            currentPage: value.currentPage
          }
        })

      }
    }
    setInitialAssignments(assignments);
  };

  return (
    <div className='min-h-full min-w-full flex flex-col items-center justify-center'>
      <h1 className='text-2xl mt-7'>Welcome to the Zealthy onboarding page</h1>
      <div className="min-w-screen min-h-screen flex items-center justify-center">
        <div className="p-6 bg-white rounded shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
          <p className="mb-6">Assign components to specific pages:</p>
          <div className="space-y-4">

            {/* About Me */}
            <div>
              <label htmlFor="aboutMe" className="block mb-2">
                About Me Page:
              </label>
              <select
                id="aboutMe"
                value={assignments?.aboutMe?.currentPage || 1}
                onChange={(e) => handleInputChange('aboutMe', parseInt(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block mb-2">
                Address Page:
              </label>
              <select
                id="address"
                value={assignments?.address?.currentPage || 1}
                onChange={(e) => handleInputChange('address', parseInt(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>

            {/* BirthDateSelector */}
            <div>
              <label htmlFor="birthDateSelector" className="block mb-2">
                BirthDate Selector Page:
              </label>
              <select
                id="birthDateSelector"
                value={assignments?.birthDateSelector?.currentPage || 2}
                onChange={(e) => handleInputChange('birthDateSelector', parseInt(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          
          {/* Apply Button */}
          <button
            onClick={handleApply}
            disabled={!hasChanges}
            className={`min-w-[100px] py-2 mt-6 rounded text-white ${hasChanges
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
