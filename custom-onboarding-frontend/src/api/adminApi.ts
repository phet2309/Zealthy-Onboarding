import axios from 'axios';
import { AdminConfig, AdminRequestBody } from '../types';
import { BACKEND_URL } from './backendUrl';

// This handles the API calls to the admin endpoint
const BASE_URL = `${BACKEND_URL}/v1/admin`;

// Get admin config
export const fetchAdminConfig = async (): Promise<AdminConfig[] | string> => {
  try {
    const response = await axios.get(BASE_URL);

    return response.data as AdminConfig[];
  } catch (error) {
    console.error('Error fetching admin config:', error);
    return 'Failed to fetch admin config';
  }
};

// Update admin property
export const updateAdminProperty = async (
    requestBody: AdminRequestBody
  ): Promise<AdminConfig | string> => {
  
    try {
      const response = await axios.put(BASE_URL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response.data as AdminConfig;
    } catch (error) {
      console.error('Error updating admin property:', error);
      return 'Failed to update admin property';
    }
  };