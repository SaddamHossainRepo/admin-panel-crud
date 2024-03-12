export function generateQueryString(params: { [key: string]: any }): string {
    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined) // Exclude undefined values
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
  
    return `?${queryString}`;
  }