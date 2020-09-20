import React, { Component } from 'react';

import { Button, Dropdown, Icon, Nav, Navbar } from 'rsuite';
import { UserServiceContext } from '../App/App';
import './Header.scss';

export class Header extends Component {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
      //  this. _userService = React.useContext(UserServiceContext);
    }



    render() {
        return (
            <Navbar appearance="default" className="navbar">
                <Navbar.Header className="header">
                    <a href="/" className="logo">Fin Wonder</a>
                </Navbar.Header>
                <Navbar.Body>
                    <Nav>
                        <Nav.Item icon={<Icon className="icon" icon="user-analysis" />} >Балансы</Nav.Item>
                        <Nav.Item icon={<Icon className="icon" icon="money" />} >Пополнения</Nav.Item>
                        <Nav.Item icon={<Icon className="icon" icon="bars" />} >Позиции</Nav.Item>
                        <Nav.Item icon={<Icon className="icon" icon="bar-chart" />} >Инвестиции</Nav.Item>
                    </Nav>
                    <Nav pullRight>
                        <Nav.Item icon={<Icon className="icon" icon="sign-in" />} >Вход</Nav.Item>
                        <Nav.Item icon={<Icon className="icon" icon="sign-out" />} >Выход</Nav.Item>
                        <Nav.Item icon={<Icon className="icon" icon="cog" />} >Регистрация</Nav.Item>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        )
    }
}

export default Header;
