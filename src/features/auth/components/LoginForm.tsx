import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginFormData) {
  try {

    const user = await login(data.email, data.password);

    if (user.company) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/empresa/cadastro", { replace: true });
    }
  } catch (error: unknown) {
    console.error(error);

    const message = axios.isAxiosError<{ detail?: string }>(error)
      ? error.response?.data?.detail
      : undefined;

    form.setError("root", {
      message: message ?? "Usuário ou senha inválidos.",
    });
  }
}

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" placeholder="Digite seu e-mail" {...form.register("email")} />
        {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <PasswordInput id="password" placeholder="Digite sua senha" {...form.register("password")} />
        {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
      </div>
      {form.formState.errors.root && <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>}
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Entrar
      </Button>
    </form>
  );
}
