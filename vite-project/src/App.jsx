import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";
import StudentLists from "./components/StudentLists";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<StudentLists />} />
					<Route path="/add" element={<AddStudent />} />
					<Route path="/update/:id" element={<UpdateStudent />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
