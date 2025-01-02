import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to show toast messages
export const showToast = (message: string, type: "success" | "error" = "success") => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    pauseOnHover: true,
    theme: "light",
  };

  if(type === "success") {
    toast.success(message, options);
  } else {
    toast.error(message, options);
  }
};

