import { Link } from 'react-router'
import { useLoggedIn } from '../context/LoggedInContext';

// Home page component
const HomePage = () => {
    const { isLoggedIn } = useLoggedIn();
  
    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded shadow-md">
                <h1 className="text-2xl mb-4">Welcome to the Zealthy onboarding page</h1>
                <Link to={isLoggedIn ? "/user-onboard-form" : "/user-onboard-auth"} className="text-md underline">Start Onboarding</Link>
            </div>
        </div>
    )
}

export default HomePage;
