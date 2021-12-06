export const checkAuth = (user) => {
  if (!user) {
    alert('Авторизуйтесь');
    return null;
  } else {
    return user;
  }
}