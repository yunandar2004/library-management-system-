export const convertSearchPramsToObject = (searchParams) => {
  return Object.fromEntries(searchParams.entries());
};

export const extractSearchPramsObjectFromUrl = (url) => {
  const params = new URL(url).searchParams;
  const searchParamsObject = Object.fromEntries(params.entries());
  return searchParamsObject;
};
