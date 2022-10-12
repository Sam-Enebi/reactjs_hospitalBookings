import { USER_STORAGE_KEY } from "../config/helpers/variables";

const useAuthenticate = () => {
  const user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
  // Authenticates user if its logged in by checking localstorage
  const authenticate = () => user;

  return { authenticate };
};

export default useAuthenticate;
