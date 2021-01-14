import { Link } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/auth';
import styles from './UserSignUp.module.css';

const UserSignUp = props => {
	const { actions } = useContext(AuthContext);
	const [ errors, setErrors ] = useState([]);

	const usernameInput = useRef('');
	const passwordInput = useRef('');
	const confirmPasswordInput = useRef('');

	const cancelHandler = event => {
		event.preventDefault();
		props.history.goBack();
	};

	const signUpHandler = async event => {
		event.preventDefault();

		// shape body object from user input
		const body = {
			username: usernameInput.current.value,
			password: confirmPasswordInput.current.value
		};

		try {
			// post the body to the api
			const res = await actions.createUser(body);
			// if response is returned setErrors with response
			if (res) {
				console.log(res);
				setErrors([ ...res ]);
				// if no response, sign in with current credentials and redirect to login
			} else {
				await actions.signIn(
					usernameInput.current.value,
					confirmPasswordInput.current.value
				);
				props.history.push('/');
			}
			// server error for any error not already caught and returned
		} catch (error) {
			props.history.push('/error');
		}
	};

	return (
		<div className={styles.signupContainer}>
			<div className={styles.flexColumnCenter}>
				<h1>Sign Up</h1>
				<div className={styles.formContainer}>
					{/* show errors if there are any */}
					{errors.length > 0 && (
						<div>
							<h2 className='validation--errors--label'>Validation errors</h2>
							<div className='validation-errors'>
								<ul>
									{errors.map((error, index) => <li key={index}>{error}</li>)}
								</ul>
							</div>
						</div>
					)}
					{/* sign up form */}
					<form>
						<div className={styles.inputContainer}>
							<input
								id='username'
								name='username'
								className='textInput'
								type='text'
								placeholder='Username'
								ref={usernameInput}
							/>
						</div>
						<div className={styles.inputContainer}>
							<input
								id='password'
								name='password'
								className='textInput'
								type='password'
								placeholder='Password'
								ref={passwordInput}
							/>
						</div>
						<div className={styles.inputContainer}>
							<input
								id='confirmPassword'
								name='confirmPassword'
								className='textInput'
								type='password'
								placeholder='Confirm Password'
								ref={confirmPasswordInput}
							/>
						</div>
						<div className={styles.buttonContainer}>
							<button
								className='btn btn-third-fill'
								onClick={signUpHandler}
								type='submit'
							>
								Sign Up
							</button>
							<button className='btn btn-third' onClick={cancelHandler}>
								Cancel
							</button>
						</div>
					</form>
				</div>
				<p>&nbsp;</p>
				<p>
					Already have a user account? <Link to='/signin'>Click here</Link> to sign in!
				</p>
			</div>
		</div>
	);
};

export default UserSignUp;
