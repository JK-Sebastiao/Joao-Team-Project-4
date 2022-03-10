import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import navLogo from './../../assets/img/nav-logo.svg';

const Navbar = () => {
	const menu = useRef(null);
	const navigate = useNavigate();
	const { auth, setAuth } = useAuth();

	const logout = async () => {
		setAuth({});
		navigate('/home');
	};

	const items = [
		{
			label: 'Account',
			items: [
				{
					label: 'Log in',
					icon: 'pi pi-users',
					command: () => navigate('/login')
				},
				{
					label: 'Register',
					icon: 'pi pi-user-plus',
					command: () => navigate('/register')
				},
				{
					label: 'My Account',
					icon: 'pi pi-user',
					command: () => navigate('/my-account')
				},
				{
					label: 'Admin Account',
					icon: 'pi pi-user',
					command: () => navigate('/admin-test')
				},
				{
					label: 'Log Out',
					icon: 'pi pi-user-minus',
					command: () => logout()
				}
			]
		}
	];

	const hide = async () => {
		if (!auth.accessToken) return (items[0].items[4].className = 'hide');
	};

	hide();

	return (
		<div className="flex bg-gray-900">
			<div className="flex-auto flex align-items-center justify-content-left">
				<Link to="/" className="block max-h-full p-1">
					<img className="max-h-full h-3rem" src={navLogo} alt="Monokino logo" />
				</Link>
			</div>
			<div className="flex-auto flex align-items-center justify-content-end p-2">
				<Menu model={items} popup ref={menu} id="popup_menu" />
				<Button
					icon="pi pi-user"
					className="p-button-rounded p-button-info p-button-outlined"
					aria-controls="popup_menu"
					onClick={(event) => menu.current.toggle(event)}
					aria-haspopup
					style={{
						color: 'var(--purple-300)'
					}}
				/>
			</div>
		</div>
	);
};

export default Navbar;
