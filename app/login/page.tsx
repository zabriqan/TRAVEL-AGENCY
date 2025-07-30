import { signIn } from '@/app/auth/actions';
import Form from '../components/form';

export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="w-80 sm:w-[400px] bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
            
            <Form
              fields={[
                {
                  id: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "Enter your email",
                  required: true,
                },
                {
                  id: "password",
                  label: "Password",
                  type: "password",
                  placeholder: "Enter your password",
                  required: true,
                },
              ]}
              // onSubmit={}
              submitText="Sign In"
            />
          </div>
        </div>
      );
    }

