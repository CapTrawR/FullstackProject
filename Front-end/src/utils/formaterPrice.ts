// funcao para formatar valor para casa decimal correcta
export const formaterPrice = (value: number) => {
  return `${value.toFixed(2).replace(".", ",")} €`;
};
