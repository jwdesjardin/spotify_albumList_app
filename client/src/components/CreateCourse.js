import { useRef, useContext, useState } from 'react';
import { AuthContext } from '../context/auth';
import axios from 'axios';

const CreateCourse = props => {
	const { authUser, userPassword } = useContext(AuthContext);

	const [ errors, setErrors ] = useState([]);

	const titleInput = useRef('');
	const descInput = useRef('');
	const estTimeInput = useRef('');
	const materialsInput = useRef('');

	const cancelHandler = event => {
		event.preventDefault();
		props.history.goBack();
	};

	const createCourseHandler = async event => {
		event.preventDefault();

		// shape body object from user input
		const body = {
			title: titleInput.current.value,
			description: descInput.current.value,
			userId: authUser.id,
			estimatedTime: estTimeInput.current.value || null,
			materialsNeeded: materialsInput.current.value || null
		};

		// create the config object for authorization
		const credentials = btoa(authUser.emailAddress + ':' + userPassword);
		const basicAuth = 'Basic ' + credentials;
		const config = {
			headers: {
				Authorization: basicAuth
			}
		};

		try {
			// post the body and config to the api; redirect to login on success
			await axios.post('http://localhost:5000/api/courses', body, config);
			props.history.push('/');
		} catch (error) {
			// if error is bad request set errors in state; else show server error
			if (error.response.status === 400) {
				const messages =
					error.response && error.response.data.errors
						? error.response.data.errors
						: error.message;
				setErrors([ ...messages ]);
			} else {
				props.history.push('/error');
			}
		}
	};

	return (
		<div className='bounds course--detail'>
			<h1>Create Course</h1>
			<div>
				{/* show errors if there are any */}
				{errors.length > 0 && (
					<div>
						<h2 className='validation--errors--label'>Validation errors</h2>
						<div className='validation-errors'>
							<ul>
								{errors.map((message, index) => <li key={index}>{message}</li>)}
							</ul>
						</div>
					</div>
				)}
				{/* create course form */}
				<form>
					<div className='grid-66'>
						<div className='course--header'>
							<h4 className='course--label'>Course</h4>
							<div>
								<input
									id='title'
									name='title'
									type='text'
									className='input-title course--title--input'
									placeholder='AlbumList title...'
									ref={titleInput}
								/>
							</div>
							{authUser && (
								<p>
									By: {authUser.firstName} {authUser.lastName}
								</p>
							)}
						</div>
						<div className='course--description'>
							<div>
								<textarea
									id='description'
									name='description'
									placeholder='Course description...'
									ref={descInput}
								/>
							</div>
						</div>
					</div>
					<div className='grid-25 grid-right'>
						<div className='course--stats'>
							<ul className='course--stats--list'>
								<li className='course--stats--list--item'>
									<h4>Estimated Time</h4>
									<div>
										<input
											id='estimatedTime'
											name='estimatedTime'
											type='text'
											className='course--time--input'
											placeholder='Hours'
											ref={estTimeInput}
										/>
									</div>
								</li>
								<li className='course--stats--list--item'>
									<h4>Materials Needed</h4>
									<div>
										<textarea
											id='materialsNeeded'
											name='materialsNeeded'
											placeholder='List materials...'
											ref={materialsInput}
										/>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div className='grid-100 pad-bottom'>
						<button className='button' onClick={createCourseHandler} type='submit'>
							Create Course
						</button>
						<button className='button button-secondary' onClick={cancelHandler}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateCourse;
