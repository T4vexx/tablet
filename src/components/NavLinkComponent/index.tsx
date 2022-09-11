import { NavLink } from "react-router-dom";
import styles from "./navlink.module.scss";

type Props = {
    name: string,
    path: string,
    children: JSX.Element,
};

export const NavLinkComponent = ({name,path,children}: Props) => {
    return (
        <div className={styles.navlink_wrap}>
            <NavLink
                to={path}
                style={{textDecoration: 'none'}}
                className={({ isActive }) =>
                    isActive ? styles.active_link : ""
                }
            >
                <div>
                    {children}
                    <p>{name}</p>
                </div>   
            </NavLink>
        </div>
    );
}