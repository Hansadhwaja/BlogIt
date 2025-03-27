const setToLocalStorage = ({
  authToken,
  email,
  userId,
  userName,
  organizationId,
}) => {
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("authEmail", email);
  localStorage.setItem("authUserId", userId);
  localStorage.setItem("authUserName", userName);
  localStorage.setItem("authUserOrganizationId", organizationId);
};

const getFromLocalStorage = key => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export { setToLocalStorage, getFromLocalStorage };
