import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth';

const UpdateCourse = ({ history, match }) => {
	const id = match.params.id;
	const [ course, setCourse ] = useState({});
	const [ errors, setErrors ] = useState([]);

	const { authUser, userPassword } = useContext(AuthContext);

	useEffect(
		() => {
			(async () => {
				try {
					// get course detail from api
					const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`);
					if (data) {
						// if the logged in user does not match the course fetched
						if (authUser && data.user.id !== authUser.id) {
							history.push('/forbidden');
						} else {
							// if there is a course and it matches logged user set data in state
							setCourse(data);
						}
					}
				} catch (error) {
					// if error is course not found show notfound page; else server error
					if (error.response.status === 404) {
						history.push('/notfound');
					} else {
						history.push('/error');
					}
				}
			})();
		},
		[ id, history, authUser ]
	);

	const titleInput = useRef('');
	const descInput = useRef('');
	const estTimeInput = useRef('');
	const materialsInput = useRef('');

	const updateHandler = async event => {
		event.preventDefault();

		// shape body object from user input
		const body = {
			id: course.id,
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
			// put body and config to api at the selected course
			const response = await axios.put(
				`http://localhost:5000/api/courses/${course.id}`,
				body,
				config
			);
			// if response is successful redirect to courses
			if (response.status === 204) {
				history.push('/');
			}
		} catch (error) {
			// if error is bad request show errors ; else server error
			if (error.response.status === 400) {
				const messages =
					error.response && error.response.data.errors
						? error.response.data.errors
						: error.message;
				setErrors([ ...messages ]);
			} else {
				history.push('/error');
			}
		}
	};

	const cancelHandler = event => {
		event.preventDefault();
		history.goBack();
	};

	return (
		<div className='bounds course--detail'>
			<h1>Update Course</h1>
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
				{/* update course form ; only shows if course and user have been retrieved */}
				{course &&
				authUser && (
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
										placeholder='Course title...'
										ref={titleInput}
										defaultValue={course.title}
									/>
								</div>
								<p>By {authUser.firstName + ' ' + authUser.lastName}</p>
							</div>
							<div className='course--description'>
								<div>
									<textarea
										id='description'
										name='description'
										placeholder='Course description...'
										ref={descInput}
										defaultValue={course.description}
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
												defaultValue={course.estimatedTime}
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
												defaultValue={course.materialsNeeded}
											/>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div className='grid-100 pad-bottom'>
							<button className='button' type='submit' onClick={updateHandler}>
								Update Course
							</button>
							<button className='button button-secondary' onClick={cancelHandler}>
								Cancel
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default UpdateCourse;
