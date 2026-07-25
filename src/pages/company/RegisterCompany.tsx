import CompanyForm from "@/components/CompanyForm";

export default function RegisterCompany() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow p-8">
        <h1 className="text-2xl font-bold mb-6">Cadastro da Empresa</h1>
        <CompanyForm />
      </div>
    </div>
  );
}
