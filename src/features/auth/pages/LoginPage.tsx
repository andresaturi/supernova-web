import { AuthLayout } from "../components/AuthLayout";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <AuthLayout>
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          SupernovaPrint
        </h1>

        <p className="text-muted-foreground">
          Faça login para continuar
        </p>
      </div>

      <LoginForm />
    </AuthLayout>
  );
}