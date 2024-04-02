import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "./zustand/useStore";
import axios from "axios";

const AddStudent = () => {
	const addStudent = useStore((state) => state.addStudents);
	const [student, setStudent] = useState({
		Firstname: "",
		Lastname: "",
		Course: "",
	});

	const handleChange = (e) => {
		setStudent({ ...student, [e.target.name]: e.target.value });
	};

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const add = await axios.post("http://localhost:5000/add", student);
			await addStudent(add);
			navigate("/");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="  flex justify-center items-center h-screen">
			<div className=" glowing_border  rounded-md ">
				<h1 className="text-3xl text-sky-500 font-bold text-center mt-5 ">
					Add new Student
				</h1>

				<form onSubmit={handleSubmit}>
					<div className="flex flex-col p-8 gap-2 ">
						<label htmlFor="Firstname">Firstname:</label>
						<input
							id="Firstname"
							className="glowing_border p-2  w-[270px]  h-10 bg-transparent outline-none   rounded-md "
							type="text"
							name="Firstname"
							onChange={handleChange}
						/>
						<label htmlFor="Lastname">Lastname:</label>
						<input
							id="Lastname"
							className=" glowing_border p-2 w-[270px]  h-10 bg-transparent outline-none rounded-md"
							type="text"
							name="Lastname"
							onChange={handleChange}
						/>
						<label htmlFor="Course">Course:</label>
						<input
							id="Course"
							className=" glowing_border p-2 w-[270px]  h-10 bg-transparent outline-none rounded-md"
							type="text"
							name="Course"
							onChange={handleChange}
						/>

						<button className="btn glowing_border bg-sky-500 my-5 text-black hover:bg-gray-500">
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddStudent;
