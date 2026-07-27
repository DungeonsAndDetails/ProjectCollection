import { useOutletContext } from "react-router-dom";
import AppPreview from "../features/shell/components/AppPreview";

const HomePage = () => {
  const { activeApp } = useOutletContext();

  return (
    <main className="portal-layout">
      <AppPreview activeApp={activeApp} />
    </main>
  );
};

export default HomePage;
