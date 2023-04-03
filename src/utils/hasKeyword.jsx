export function hasKeyword(query, keywords) {
  const hasKeyword = keywords.some((keyword) =>
    query.toLowerCase().includes(keyword)
  );

  return hasKeyword;
}
