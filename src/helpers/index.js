import queryString from 'query-string';

export const getActiveCategories = location => {
  const activeCategories = queryString.parse(location.search, {
    arrayFormat: 'comma',
  }).categories;

  if (!activeCategories) return [];

  return typeof activeCategories === 'string' ? [activeCategories] : activeCategories;
};
