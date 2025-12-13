import SignUpForm from '../components/SignUpForm';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const navigate = useNavigate();
  const handleSignUpSuccess = () => {
    navigate('/auth/login');
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-green-600">Vehiclete</h1>
          <p className="text-slate-700">Your Vehicle Management Platform</p>
        </div>
        <SignUpForm onSuccess={handleSignUpSuccess} />
        <div className="text-center text-sm text-slate-500 font-bold">
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-600 hover:underline font-bold">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
