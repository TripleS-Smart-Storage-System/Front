import '../App.css';
import { useEffect } from 'react';
import { removeUserSession } from '../Utils/Common';
import i18n from '../services/i18n';


function Logout() {
  removeUserSession()
 
  useEffect(() => {
    setTimeout(function() {
      window.location.href="/"
    }, 500)
  }, [])

  return (
    <div className="page-not-found">
      <div className="text-center py-5">
        <h1 className="display-1">Bye</h1>
        <h2>{i18n.t("Log out")}</h2>
      </div>
    </div>
  );
}

export default Logout;
