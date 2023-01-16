import './Header.scss';
import CheckSun from '../../Assets/icon-sun.svg';
import CheckMoon from '../../Assets/icon-moon.svg'
const Header = ({themeApp, setThemeApp}) => {
    const handleThemeApp = () => {
        if(themeApp == "light") 
            setThemeApp("dark")
        else if(themeApp == "dark")
            setThemeApp("light")
    }

    return (
        <header className='header'>
            <h1>TODO</h1>
            <button onClick={handleThemeApp}>
                <img 
                src={themeApp == "dark" && CheckSun || themeApp == "light" && CheckMoon } 
                alt={`Active theme ${themeApp == "dark" && "light" || themeApp == "light" && "dark" }`}
                />
            </button> 
        </header>
    )
}

export default Header;