
import { createContext } from "react";

// create a context with default values
const ControlContext = createContext({
  
  loginUser:   () => {},
  logoutUser:  () => {},
  user:        null,
  setUser:     ()=>{},
 
});
  
export default ControlContext;
  


