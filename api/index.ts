import { getTokenFromLocalCookie } from 'utils/auth';
export async function fetcher<T = any>(url: string, options?: RequestInit) {
  try {
    const token = getTokenFromLocalCookie()
    let response = await fetch(url, options)
    return response.json() as T;
  } catch (e) {
    console.log(e)
  }
}