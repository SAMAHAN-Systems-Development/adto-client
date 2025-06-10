/**
 * Builds a query string from an object of parameters
 * @param params Object containing query parameters
 * @returns Formatted query string (including '?' if parameters exist)
 */
export const buildQueryString = (params: Record<string, unknown>): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : "";
};
