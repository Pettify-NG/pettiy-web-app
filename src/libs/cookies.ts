import Cookies from 'universal-cookie';

const day = 60 * 60 * 24 * 7 * 1000;
export const tokenExpiryTime = new Date(Date.now() + day);


type ICookie = {
  key: string;
  value: string;
};

export default function storeCookies(cookies: ICookie[]) {
  const cookieStore = new Cookies();

  cookies.forEach((cookie) => {
    cookieStore.remove(cookie.key);
    cookieStore.set(cookie.key, cookie.value, {
      path: '/',
      expires: tokenExpiryTime,
    });
  });
}
