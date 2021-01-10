import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth';

const UserSignOut = ({ history }) => {
	const { actions } = useContext(AuthContext);

	useEffect(
		() => {
			//log out user redirect to courses page
			console.log('LOGGING OUT USER');
			actions.signOut();
			history.push('/');
		},
		[ actions, history ]
	);

	return null;
};

export default UserSignOut;
