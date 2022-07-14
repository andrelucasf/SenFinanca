import logo from "../../assets/logo.png"
import "./styles.css"

const Header = () => {
  return (
    <div className='header-content'>
      <div className="header-logo">
        <img className="logo" src={logo} alt="/"></img>
        <h1 className="header-h1">SenFinança</h1>
      </div>
    </div>
  );
};

export default Header;