import { useSelector } from "react-redux";
import { selectISLoggedIn } from "../../redux/features/auth/authSlice";



export const ShowOnLogin =({children}) =>{
    const isLoggedIn = useSelector(selectISLoggedIn);

  if (isLoggedIn) {
    return <> {children}</>;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
    const isLoggedIn = useSelector(selectISLoggedIn);
  
    if (!isLoggedIn) {
      return <> {children}</>;
    }
    return null;
  };