import { createAppContainer, createSwitchNavigator } from "react-navigation";

import SignUp from './SignUp';
import Login from './Login';

const LoginStack = createSwitchNavigator(
    {
      Login: Login,
      SignUp: SignUp
    }, 
    {
      initialRouteName: 'Login',
    }
)
export default createAppContainer(LoginStack);