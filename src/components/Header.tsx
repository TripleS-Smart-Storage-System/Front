import logo from '../images/warehouse.png'
import '../App.css';
import { NavLink } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { isAuthorized } from '../Utils/Common';
import { useTranslation } from "react-i18next";
import i18n from '../services/i18n';

function changeLangUA() {
    
       i18n.changeLanguage("ua");
     
}

function changeLangEN() {
    
       i18n.changeLanguage("en");
}

function CommonPages() {
    const { t } = useTranslation();
    return (
        <div>
<<<<<<< Updated upstream
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/supplies">Supplies</NavLink>
            <NavLink to="/warehouses">Warehouses</NavLink>
            <NavLink to="/relocation">Relocation</NavLink>
=======
            <NavLink to="/users">{t("Users")}</NavLink>
            <NavLink to="/products">{t("Products")}</NavLink>
            <NavLink to="/supplies">{t("Supplies")}</NavLink>
            <NavLink to="/warehouses">{t("Warehouses")}</NavLink>
            <NavLink to="/relocation">{t("Relocation")}</NavLink>
            <NavLink to="/statistics">{t("Statistics")}</NavLink>
>>>>>>> Stashed changes
        </div>
    );
}

function Header() {
    const isLoggedIn: boolean = isAuthorized()
    const { t } = useTranslation();
    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <img
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="TripleS logo"
            />
            <Navbar.Brand href="/">TripleS</Navbar.Brand>
            <Button onClick={changeLangEN}>en</Button>
            <Button onClick={changeLangUA}>ua</Button>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {isLoggedIn && (
                        <CommonPages />
                    )}
                </Nav>
                <Nav>
                    {isLoggedIn ?
                        (<NavLink to="/logout">{t("Log Out")}</NavLink>) :
                        (
                            <div>
                                <NavLink to="/signin">Sign In</NavLink>
                                <NavLink to="/signup">Sign Up</NavLink>
                            </div>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    );
}

export default Header;