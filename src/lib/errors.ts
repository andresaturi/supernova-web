import { AxiosError } from "axios";

interface ValidationError {
  msg: string;
  loc: string[];
}

interface ApiError {
  detail?: string | ValidationError[];
}

const fieldLabels: Record<string, string> = {
  price_table_id: "Tabela de preço",
  name: "Nome",
  document: "CPF/CNPJ",
  email: "E-mail",
  phone: "Telefone",
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const detail = (error.response?.data as ApiError)?.detail;

    if (typeof detail === "string") {
      return detail;
    }

    if (Array.isArray(detail)) {
      return detail
        .map((item) => {
          const field = item.loc[item.loc.length - 1];
          const label = fieldLabels[field] ?? field;

          if (item.msg === "Field required") {
            return `${label} é obrigatório.`;
          }

          return `${label}: ${item.msg}`;
        })
        .join("\n");
    }

    return "Erro ao processar a requisição.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Erro inesperado.";
}