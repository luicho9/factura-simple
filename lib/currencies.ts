const currencyNames = new Intl.DisplayNames(["es"], {
  type: "currency",
});

const codes: string[] = Intl.supportedValuesOf("currency");

export type CurrencyOption = { code: string; name: string };

export const currencies: CurrencyOption[] = codes.map((code) => ({
  code,
  name: currencyNames.of(code) ?? code,
}));
