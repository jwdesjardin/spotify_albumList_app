import { Link } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/auth';

const UserSignUp = props => {
	const { actions } = useContext(AuthContext);
	const [ errors, setErrors ] = useState([]);

	const firstNameInput = useRef('');
	const lastNameInput = useRef('');
	const emailInput = useRef('');
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
			firstName: firstNameInput.current.value,
			lastName: lastNameInput.current.value,
			emailAddress: emailInput.current.value,
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
				await actions.signIn(emailInput.current.value, confirmPasswordInput.current.value);
				props.history.push('/');
			}
			// server error for any error not already caught and returned
		} catch (error) {
			props.history.push('/error');
		}
	};

	return (
		<div className='bounds'>
			<div className='grid-33 centered signin'>
				<h1>Sign Up</h1>
				<div>
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
						<div>
							<input
								id='firstName'
								name='firstName'
								type='text'
								placeholder='First Name'
								ref={firstNameInput}
							/>
						</div>
						<div>
							<input
								id='lastName'
								name='lastName'
								type='text'
								placeholder='Last Name'
								ref={lastNameInput}
							/>
						</div>
						<div>
							<input
								id='emailAddress'
								name='emailAddress'
								type='text'
								placeholder='Email Address'
								ref={emailInput}
							/>
						</div>
						<div>
							<input
								id='password'
								name='password'
								type='password'
								placeholder='Password'
								ref={passwordInput}
							/>
						</div>
						<div>
							<input
								id='confirmPassword'
								name='confirmPassword'
								type='password'
								placeholder='Confirm Password'
								ref={confirmPasswordInput}
							/>
						</div>
						<div className='grid-100 pad-bottom'>
							<button className='button' onClick={signUpHandler} type='submit'>
								Sign Up
							</button>
							<button className='button button-secondary' onClick={cancelHandler}>
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
