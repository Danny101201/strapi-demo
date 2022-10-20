import { getTokenFromLocalCookie } from 'utils/auth';
export async function fetcher<T = any>(url: string, options?: RequestInit) {
  const token = getTokenFromLocalCookie()
  let response = await fetch(url,options)
  return response.json() as T;
}