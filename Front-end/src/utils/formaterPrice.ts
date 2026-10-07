// funcao para formatar valor para casa decimal correcta
export const formaterPrice = (value: number | string) => {
  const numberValue = Number(value);
  return `${numberValue.toFixed(2).replace(".", ",")} €`;
};
