import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { companySchema, type CompanyFormData } from "@/features/companies/validation";
import { useCreateCompany } from "@/features/companies/hooks/UserCreateCompany";
import { useAuth } from "@/providers/AuthProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CompanyForm() {
 
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const { mutateAsync } = useCreateCompany();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  async function onSubmit(data: CompanyFormData) {
    try {
      await mutateAsync(data);
      await refreshUser();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const message = axios.isAxiosError<{ detail?: string }>(error)
        ? error.response?.data?.detail
        : "Erro ao cadastrar empresa.";

      setError("root", {
        message,
      });
    }
  }

  const fields = [
    ["name", "Nome Fantasia", "text"],
    ["legal_name", "Razão Social", "text"],
    ["document", "CPF/CNPJ", "text"],
    ["email", "E-mail", "email"],
    ["phone", "Telefone", "text"],
    ["whatsapp", "WhatsApp", "text"],
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
      {fields.map(([name, label, type]) => (
        <div key={name} className="space-y-2">
          <Label htmlFor={name}>{label}</Label>
          <Input id={name} type={type} {...register(name)} />
          {errors[name] && <p className="text-sm text-destructive">{errors[name].message}</p>}
        </div>
      ))}
      {errors.root && (
        <p className="text-sm text-destructive">
          {errors.root.message}
        </p>
      )}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Cadastrar Empresa"}
      </Button>
    </form>
  );
}
