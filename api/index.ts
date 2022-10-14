export async function fetcher<T = any>(url: any, options?: any) {
  let response = await fetch(url, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY1NzEyNzA0LCJleHAiOjE2NjgzMDQ3MDR9.H8-HDqxfTkcUyDhY04a7lND2N94yxGyAj8iv1i9lqDk',
    }
  })
  return response.json() as T;
}