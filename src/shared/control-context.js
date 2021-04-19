
import { createContext } from "react";

// create a context with default values
const ControlContext = createContext({
  
  loginUser:   () => {},
  logoutUser:  () => {},
  user:        null,
  setUser:     ()=>{},
  data:        null
 
});
  
export default ControlContext;
  


