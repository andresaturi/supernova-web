import { AuthLayout } from "../components/AuthLayout";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <AuthLayout>
      <div className="mb-8 space-y-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <img src="/logo.png" className="w-40" alt="" />
        </div>        
      </div>
      <LoginForm />
    </AuthLayout>
  );
}