export function getHnCompanyPresetFields(fields: Record<string, unknown>) {
  const companyFields = { ...fields };
  delete companyFields.rtnCliente;
  return companyFields;
}
