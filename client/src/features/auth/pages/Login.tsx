import LoginForm from '../components/LoginForm';

const Login = () => {
  const handleSignUpSuccess = () => {};
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-green-600">Vehiclete</h1>
          <p className="text-slate-700">Your Vehicle Management Platform</p>
        </div>
        <LoginForm onSuccess={handleSignUpSuccess} />
        <div className="text-center text-sm text-slate-500 font-bold">
          Don't have an account?{' '}
          <a href="/sign-up" className="text-blue-600 hover:underline font-bold">
            SignUp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
