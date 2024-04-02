import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useStore from "./zustand/useStore";

const UpdateStudent = () => {
	const { id } = useParams();
	const student = useStore((state) => state.students);
	const updateStudent = useStore((state) => state.updateStudent);
	const targetStudent = student.find((target) => target._id === id);

	// const [Firstname, setFirstname] = useState(targetStudent.Firstname);
	// const [Lastname, setLastname] = useState(targetStudent.Lastname);
	// const [Course, setCourse] = useState(targetStudent.Course);
	// const updatedStudent = { Firstname, Lastname, Course };
	// console.log("update student : ", updatedStudent);

	const [updatedStudent, setUpdatedStudent] = useState({
		Firstname: targetStudent.Firstname,
		Lastname: targetStudent.Lastname,
		Course: targetStudent.Course,
	});
	const handleChange = (e) => {
		setUpdatedStudent({ ...updatedStudent, [e.target.name]: e.target.value });
	};
	const navigate = useNavigate();

	const handleUpdateStudent = async (e) => {
		e.preventDefault();
		try {
			const editedStudent = await axios.put(
				"http://localhost:5000/update/" + id,
				updatedStudent,
			);
			updateStudent(id, editedStudent);
			navigate("/");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="  flex justify-center items-center h-screen">
			<div className=" glowing_border  rounded-md ">
				<h1 className="text-3xl text-sky-500 font-bold text-center mt-5 ">
					Update the Student
				</h1>

				<form>
					<div className="flex flex-col p-8 gap-2 ">
						<label htmlFor="Firstname">Firstname:</label>
						<input
							id="Firstname"
							className="glowing_border p-2  w-[270px]  h-10 bg-transparent outline-none   rounded-md "
							type="text"
							name="Firstname"
							onChange={handleChange}
							value={updatedStudent.Firstname}
							//onChange={(e) => setFirstname(e.target.value)}
						/>
						<label className="mt-2" htmlFor="Lastname">
							Lastname:
						</label>
						<input
							id="Lastname"
							className=" glowing_border p-2 w-[270px]  h-10 bg-transparent outline-none rounded-md"
							name="Lastname"
							type="text"
							onChange={handleChange}
							value={updatedStudent.Lastname}
							//value={Lastname}
							//onChange={(e) => setLastname(e.target.value)}
						/>
						<label className="mt-2" htmlFor="Course">
							Course:
						</label>
						<input
							id="Course"
							className=" glowing_border p-2 w-[270px]  h-10 bg-transparent outline-none rounded-md"
							type="text"
							name="Course"
							value={updatedStudent.Course}
							onChange={handleChange}
							//value={Course}
							//onChange={(e) => setCourse(e.target.value)}
						/>
						<button
							onClick={handleUpdateStudent}
							className="btn glowing_border bg-sky-500 my-5 text-black hover:bg-gray-500">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateStudent;
