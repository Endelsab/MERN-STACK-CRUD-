import { Link } from "react-router-dom";
import Student from "./Student";
import useStore from "./zustand/useStore";
import { useEffect } from "react";

const StudentLists = () => {
	const setStudents = useStore((state) => state.setStudents);
	const students = useStore((state) => state.students);

	useEffect(() => {
		const fetchStudent = async () => {
			try {
				const res = await fetch("http://localhost:5000");
				const data = await res.json();
				setStudents(data);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchStudent();
	}, []);

	
	return (
		<div className="flex h-screen items-center justify-center ">
			<div className="size-[500px] glowing_border p-4">
				<Link className=" btn btn-outline btn-info font-sans" to="/add">
					Add student
				</Link>
				<div className="overflow-x-auto mt-5">
					<table className="table ">
						<thead>
							<tr className="text-xl text-sky-500 ">
								<th>Firstname</th>
								<th>Lastname</th>
								<th>Course</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{students &&
								students.map((student) => {
									return <Student student={student} key={student._id} />;
								})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default StudentLists;
