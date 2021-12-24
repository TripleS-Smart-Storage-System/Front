import '../App.css';
import { useTranslation } from "react-i18next";


function Home(){
  const { t } = useTranslation();
  return(
    <div className='home'>
      <h1>{t("Home page")}</h1>
    </div>
  );
}

export default Home;