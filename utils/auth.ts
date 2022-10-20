import Router from 'next/router';
import Cookies from 'js-cookie';
import { fetcher } from 'api';
import { NextApiRequest } from 'next';

type DataType = { jwt: string, user: UserInfo }
export const setToken = (data: DataType) => {
  if (typeof window == 'undefined') {
    return
  }

  Cookies.set('id', data.user.id.toString());
  Cookies.set('username', data.user.username);
  Cookies.set('jwt', data.jwt);
  if (Cookies.get('username')) {
    Router.reload();
  };
}
export const unsetToken = () => {
  if (typeof window == 'undefined') {
    return
  }
  Cookies.remove('id');
  Cookies.remove('username');
  Cookies.remove('jwt');
  if (!Cookies.get('username')) {
    Router.reload();
  }
}

export const getTokenFromLocalCookie = () => {
  return Cookies.get('jwt');
};
export const getTokenFromServerCookie = (req: NextApiRequest) => {
  if (!req.headers.cookie || '') {
    return undefined
  }
  const jwtCookie = req.headers.cookie
    .split(';')
    .find((c: string) => c.trim().startsWith('jwt'))
  if (!jwtCookie) {
    return undefined
  }
  const jwt = jwtCookie.split('=')[1] as string
  return jwt
};
export const getUserIdFromLocalCookie = () => {
  return Cookies.get('id');
};
export const getUserIdFromServerCookie = (req: NextApiRequest) => {
  if (!req.headers.cookie || '') {
    return undefined
  }
  const idCookie = req.headers.cookie
    .split(';')
    .find((c: string) => c.trim().startsWith('id'))
  if (!idCookie) {
    return undefined
  }
  const id = idCookie.split('=')[1]
  return id
};
export const getUsernameFromLocalCookie = () => {
  return Cookies.get('username');
};
export const getUserNameIdFromServerCookie = (req: NextApiRequest) => {
  if (!req.headers.cookie || '') {
    return undefined
  }
  const userNameCookie = req.headers.cookie
    .split(';')
    .find((c: string) => c.trim().startsWith('username'))
  if (!userNameCookie) {
    return undefined
  }
  const userName = userNameCookie.split('=')[1]
  return userName
};
export const getUserFromLocalCookie = async () => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    const data = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      }
    })
    return data.username
  } else {
    return
  }
}
export const getIdFromLocalCookie = async () => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    const data = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      }
    })
    return data.id
  } else {
    return
  }
}