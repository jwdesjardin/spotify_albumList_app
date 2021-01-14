import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth';
import styles from './UserSignIn.module.css';

const UserSignIn = props => {
	const { actions } = useContext(AuthContext);

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState('');

	const signInHandler = async event => {
		event.preventDefault();

		try {
			const response = await actions.signIn(email, password);
			// if response comes back from signIn set errors with it
			if (response) {
				console.log(response.data);
				setError(response.data);
				// if no response push to either courses or the from in location
			} else {
				const loc = props.location.state ? props.location.state.from : '/';
				props.history.push(loc);
			}
			// server error if result of sign in is not access denied or success
		} catch (error) {
			props.history.push('/error');
		}
	};

	const cancelHandler = event => {
		event.preventDefault();
		props.history.goBack();
	};

	return (
		<div className={styles.signInContainer}>
			<div className={styles.flexColumnCenter}>
				<h1>Sign In</h1>
				<div className={styles.formContainer}>
					{/* show error if is exists */}
					{error && (
						<div>
							<h2 className=''>{error}</h2>
						</div>
					)}
					{/* sign in form */}
					<form>
						<div className={styles.inputContainer}>
							<input
								id='emailAddress'
								name='emailAddress'
								className='textInput'
								type='text'
								placeholder='Email Address'
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<input
								id='password'
								name='password'
								className='textInput'
								type='password'
								placeholder='Password'
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<div className={styles.buttonContainer}>
							<button
								className='btn btn-primary-fill'
								type='submit'
								onClick={signInHandler}
							>
								Sign In
							</button>
							<button className='btn' onClick={cancelHandler}>
								Cancel
							</button>
						</div>
					</form>
				</div>
				<p>&nbsp;</p>
				<p>
					Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!
				</p>
			</div>
		</div>
	);
};

export default UserSignIn;
