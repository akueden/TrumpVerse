import {Link} from 'react-router-dom';

const MainNavigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Hjem</Link></li>
                <li><Link to="register">Legge ut innlegg</Link></li>
                <li><Link to="update-delete">Administrer Innlegg</Link></li>
                <li><Link to="search">Søk etter Innlegg</Link></li>
            </ul>
        </nav>
    )
}

export default MainNavigation;