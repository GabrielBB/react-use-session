export default (token: string): any => {
  const base64Url: string = token.split('.')[1];
  const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
};
