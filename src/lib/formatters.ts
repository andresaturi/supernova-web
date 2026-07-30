export function capitalize(value: string): string {
  if (!value.trim()) {
    return "";
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\b\p{L}/gu, (char) => char.toUpperCase());
}


export function formatCpfCnpj(value?: string): string {
  if (!value) return "";

  const digits = value.replace(/\D/g, "");

  if (digits.length <= 11) {
    return digits.replace(
      /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
      (_, a, b, c, d) =>
        `${a}.${b}.${c}${d ? "-" + d : ""}`
    );
  }

  return digits.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/,
    (_, a, b, c, d, e) =>
      `${a}.${b}.${c}/${d}${e ? "-" + e : ""}`
  );
}

export function formatPhone(value?: string): string {
  if (!value) return "";

  const digits = value.replace(/\D/g, "");

  if (digits.length === 11) {
    return digits.replace(
      /(\d{2})(\d{5})(\d{4})/,
      "($1) $2-$3"
    );
  }

  return digits.replace(
    /(\d{2})(\d{4})(\d{4})/,
    "($1) $2-$3"
  );
}


export function formatCep(value?: string): string {
  if (!value) return "";

  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d{3})/, "$1-$2");
}


export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}