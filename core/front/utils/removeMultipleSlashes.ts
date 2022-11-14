const removeMultipleSlashes = (string: string) =>
  string.replace(/(?<!https:|http:)[/]+/, "/");

export { removeMultipleSlashes };
