import { useCustomers } from "../hooks/useCustomers";

export function CustomerTable() {
  const { data, isLoading } = useCustomers();

  if (isLoading) {
    return (
      <div className="rounded-lg border p-8 text-center">
        Carregando...
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="rounded-lg border p-8 text-center">
        Nenhum cliente cadastrado.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left">Nome</th>
            <th className="px-4 py-3 text-left">Documento</th>
            <th className="px-4 py-3 text-left">Telefone</th>
            <th className="px-4 py-3 text-left">E-mail</th>
            <th className="px-4 py-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((customer) => (
            <tr
              key={customer.id}
              className="border-t"
            >
              <td className="px-4 py-3">
                {customer.name}
              </td>

              <td className="px-4 py-3">
                {customer.document}
              </td>

              <td className="px-4 py-3">
                {customer.phone}
              </td>

              <td className="px-4 py-3">
                {customer.email}
              </td>

              <td className="px-4 py-3 text-center">
                {customer.is_active ? "Ativo" : "Inativo"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}