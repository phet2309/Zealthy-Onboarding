import axios, { AxiosResponse } from 'axios';
import { UserData } from '../types';
import { BACKEND_URL } from './backendUrl';

// This handles the API calls to the users endpoint
const BASE_URL = `${BACKEND_URL}/v1/users`;

// Parse response
const parseResponse = (response: any): UserData => {
    return {
        id: response.id,
        email: response.email,
        password: response.password,
        aboutMe: response.aboutMe,
        birthdate: response.birthdate,
        currentStep: response.currentStep,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
        address: {
            street: response.streetAddress ?? undefined,
            city: response.city ?? undefined,
            state: response.state ?? undefined,
            zip: response.zip ?? undefined,
        }
    };
}

// Create user
export const createUser = async (payload: UserData): Promise<UserData | string> => {
    try {
        const response: AxiosResponse = await axios.post(
            BASE_URL,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 201) {
            console.log('User created successfully');
            return response.data;
        } else {
            console.error('User creation failed');
            return "User creation failed";
        }
    } catch (error) {
        console.error('Error during user creation:', error);
        return "User creation failed";
    }
};

// Login
export const loginUser = async (email: string, password: string): Promise<string> => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response);
        if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem('jwt', token);
            return "Success";
        } else {
            console.error('Login failed');
            return "Login failed";
        }
    } catch (error) {
        console.error('Error during login:', error);
        return "Login failed";
    }
}

// Logout
export const logoutUser = async (): Promise<string> => {
    const jwtToken = localStorage.getItem('jwt');

    if (!jwtToken) {
        console.error('No JWT token found');
        return "No JWT token found";
    }

    try {
        const response: AxiosResponse = await axios.post(
            `${BASE_URL}/logout`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );

        if (response.status === 200) {
            console.log('Logged out successfully');
            localStorage.removeItem('jwt');
            return "Success";
        } else {
            console.error('Logout failed');
            return "Logout failed";
        }
    } catch (error) {
        console.error('Error during logout:', error);
        return "Logout failed";
    }
};

// Fetch all users
export const fetchUsers = async (): Promise<UserData[] | string> => {
    try {
        const response = await fetch(BASE_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const usersResp = await response.json();
        const users = usersResp.map((user: any) => parseResponse(user));
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return "Failed to fetch users";
    }
};

// Fetch user by email
export const fetchUserData = async (email: string): Promise<UserData | string> => {
    const jwtToken = localStorage.getItem('jwt');
    try {
        const response = await axios.get<UserData>(`${BASE_URL}/email`, {
            params: { email },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const userResp = response.data;
        return parseResponse(userResp);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return "Failed to fetch user data";
    }
};

// Update user data
export const updateUserData = async (
    userData: UserData,
): Promise<boolean> => {
    const jwtToken = localStorage.getItem('jwt');
    try {
        const response = await axios.put(BASE_URL, {
                id: userData.id,
                createdAt: userData.createdAt || null,
                updatedAt: userData.updatedAt,
                email: userData.email,
                password: userData.password,
                aboutMe: userData.aboutMe,
                streetAddress: userData.address?.street || null,
                city: userData.address?.city || null,
                state: userData.address?.state || null,
                zip: userData.address?.zip || null,
                birthdate: userData.birthdate
            }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
            },
        });

        if (response.status === 200) {
            console.log('User data updated successfully');
            return true;
        } else {
            console.error('Failed to update user data:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Unexpected error during update request:', error);
        return false;
    }
};

export const validateToken = async (): Promise<boolean> => {
    const jwtToken = localStorage.getItem('jwt');
    if (!jwtToken) {
        return false;
    }

    try {
        const response = await axios.get(`${BASE_URL}/validate-token`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        if (response.status === 200) {
            return true;
        } else {
            console.error('Token validation failed');
            return false;
        }
    } catch (error) {
        console.error('Error during token validation:', error);
        return false;
    }
}
