import { createSwitchNavigator } from "react-navigation";
import LoginSreen from "../components/login";
import DisplayMessageScreen from "../components/displayMessage";

let SignedOut = createSwitchNavigator({
  Login: LoginSreen,
  DisplayMessage: DisplayMessageScreen
});

let SignedIn = createSwitchNavigator({
  DisplayMessage: DisplayMessageScreen
});

export { SignedIn, SignedOut };
