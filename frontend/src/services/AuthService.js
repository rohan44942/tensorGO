export const loginWithGoogle = () => {
  window.location.href = "http://localhost:5000/api/auth/google";
};
export const logoutFromGoogle = () => {
  localStorage.removeItem("token");

  // Redirect to Google logout endpoint
  // const GOOGLE_LOGOUT_URL =
  //   "https://accounts.google.com/Logout?continue=http://localhost:5173";
  window.location.href = "http://localhost:5000/api/auth/logout";
};

export const getTokenFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
};
