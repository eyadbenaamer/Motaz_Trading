import SmallScreen from "./SmallScreen";
import LargeScreen from "./LargeScreen";

import { useWindowWidth } from "hooks/useWindowWidth";

const Header = () => {
  const windowWidth = useWindowWidth();
  if (windowWidth <= 768) {
    return <SmallScreen />;
  } else {
    return <LargeScreen />;
  }
};

export default Header;
