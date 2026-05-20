import { LoaderCircle } from "lucide-react";
import BackgroundTheme from "./BackgroundTheme";

const Loading = () => {
  return (
    <>
      <BackgroundTheme />
      <div className="relative flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
    </>
  );
};

export default Loading;
