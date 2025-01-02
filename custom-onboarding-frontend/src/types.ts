export interface Assignment {
    aboutMe: {
      id: string,
      currentPage: number
    },
    address: {
      id: string,
      currentPage: number
    },
    birthDateSelector: {
      id: string,
      currentPage: number
    }
  }
  

export interface FormInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AdminConfig {
    id?: string;
    pageNumber: number;
    componentName: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserData {
    id?: string | undefined;
    email: string;
    password: string;
    aboutMe?: string;
    address?: Address;
    birthdate?: string;
    currentStep?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface Address {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
}


export interface ComponentConfig {
    componentName: string;
    pageNumber: number;
}

export interface AdminRequestBody {
    id: string;
    componentName: string;
    pageNumber: number;
}
