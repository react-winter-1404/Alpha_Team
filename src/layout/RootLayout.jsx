import { Outlet } from "react-router-dom";
import VoiceNavigator from "../voice/components/VoiceNavigator";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <VoiceNavigator />
    </>
  );
};

export default RootLayout;