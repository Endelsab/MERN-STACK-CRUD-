import { Link } from "react-router-dom";
import axios from "axios";
import useStore from "./zustand/useStore";

const Student = ({ student }) => {
	const deleteStudent = useStore((state) => state.deleteStudent);
	const handleDelete = async (id) => {
		try {
			await axios.delete("http://localhost:5000/delete/" + id);
			await deleteStudent(id);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<tr
			key={student._id}
			className="glowing_border hover:text-sky-500  hover:underline underline-offset-8    ">
			<td>{student.Firstname}</td>
			<td>{student.Lastname}</td>
			<td>{student.Course}</td>
			<td>
				<Link to={`update/${student._id}`}>
					<button className="hover:scale-105">edit</button>
				</Link>
				<button
					onClick={() => handleDelete(student._id)}
					className="ml-2 hover:scale-105">
					delete
				</button>
			</td>
		</tr>
	);
};

export default Student;
