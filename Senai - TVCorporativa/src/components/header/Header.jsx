import logo from "../../assets/img/logo.svg"
import "./Header.css"

const Header = () => {
    return(
        <header className="header_login">
            <img className="logo_login" src={logo}/>
        </header>
    )
}

export default Header;