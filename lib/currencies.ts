const currencyNames = new Intl.DisplayNames(["es"], {
  type: "currency",
});

const fallbackCurrencyCodes = [
  "CRC",
  "EUR",
  "GTQ",
  "HNL",
  "NIO",
  "PAB",
  "SVC",
  "USD",
];

const currencyNameOverrides: Record<string, string> = {
  HNL: "lempira hondureño",
};

export function mergeCurrencyCodes(supportedCodes: string[]) {
  return Array.from(
    new Set([...supportedCodes, ...fallbackCurrencyCodes]),
  ).sort();
}

const codes =
  typeof Intl.supportedValuesOf === "function"
    ? mergeCurrencyCodes(Intl.supportedValuesOf("currency"))
    : fallbackCurrencyCodes;

export type CurrencyOption = { code: string; name: string };

export const currencies: CurrencyOption[] = codes.map((code) => ({
  code,
  name: currencyNameOverrides[code] ?? currencyNames.of(code) ?? code,
}));
