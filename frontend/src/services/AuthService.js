export const loginWithGoogle = () => {
  window.location.href = 'http://localhost:5000/api/auth/google';
};

export const getTokenFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('token');
};
