import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { companySchema, type CompanyFormData } from "@/features/companies/validation";
import { useAuth } from "@/providers/AuthProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/features/companies/hooks/useCompany";
import { useCreateCompany } from "@/features/companies/hooks/useCreateCompany";
import { useUpdateCompany } from "@/features/companies/hooks/useUpdateCompany";

type Props = {
  mode: "create" | "edit";
};

export function CompanyForm({ mode }: Props) {
 
  const navigate = useNavigate();
  const { data: company } = useCompany(mode === "edit");
  const { mutateAsync: createCompany } = useCreateCompany();
  const { mutateAsync: updateCompany } = useUpdateCompany();
  const { refreshUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  useEffect(() => {
    if (mode === "edit" && company) {
      reset({
        name: company.name,
        legal_name: company.legal_name,
        document: company.document,
        email: company.email,
        phone: company.phone,
        whatsapp: company.whatsapp,
      });
    }
  }, [mode, company, reset]);

  async function onSubmit(data: CompanyFormData) {
  try {
    if (mode === "create") {
      await createCompany(data);
      await refreshUser();

      toast.success("Empresa cadastrada com sucesso.");

      navigate("/dashboard", {
        replace: true,
      });

      return;
    }

    await updateCompany(data);
    toast.success("Empresa atualizada com sucesso.");

  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.data?.code) {
        case "company_document_exists":
          toast.error("Já existe uma empresa cadastrada com este documento.");
          return;

        default:
          toast.error(
            error.response?.data?.message ??
            error.response?.data?.detail ??
            "Erro ao cadastrar empresa."
          );
          return;
      }
    }

    toast.error("Erro inesperado.");
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
        {isSubmitting
          ? "Salvando..."
          : mode === "create"
            ? "Cadastrar Empresa"
            : "Salvar Alterações"}
      </Button>
    </form>
  );
}
