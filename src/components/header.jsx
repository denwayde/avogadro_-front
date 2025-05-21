import React from 'react'
import { BiAtom } from "react-icons/bi";
import RegisteModal from './registeModal';
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalVisible } from '../features/openRegisterModal';

function Header() {

    const isVisible = useSelector((state) => state.isVisible.value);
    const dispatch = useDispatch();

    const changeVisible = () => {
        dispatch(setIsModalVisible(isVisible === false ? true :  false));
      };
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand my-brand" href="#">
                    <BiAtom/> авогадро
                </a>


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse header-div" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-evenly header-div-ul">
                        <li className="nav-item d-flex align-items-center">
                            <a className="nav-link active" aria-current="page" href="#">Главная</a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a className="nav-link" href="#">Курсы</a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a className="nav-link" href="#">Статьи</a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a className="btn btn-outline-success" href="#">Войти</a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a className="btn btn-outline-danger" onClick={changeVisible}>Подать заявку</a>
                        </li>
                    </ul>
                {/* <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}
                </div>
            </div>
        </nav>

        <RegisteModal clName = {isVisible ? "modal fade show": "modal fade"} dsp={isVisible ? {display: 'block'} : {display: 'none'}}/>
        </>
    )
}

export default Header
