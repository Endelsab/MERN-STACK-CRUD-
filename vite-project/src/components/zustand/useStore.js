import { create } from "zustand";

const useStore = create((set) => ({
	students: [],
	setStudents: (students) => set({ students }),
	addStudents: (student) => set((state) => ({ ...state.students, student })),
	deleteStudent: (studentId) =>
		set((state) => ({
			students: state.students.filter((student) => student._id !== studentId),
		})),
	updateStudent: (studentId, updatedStudent) =>
		set((state) => ({
			students: state.students.map((student) =>
				student._id === studentId ? { ...student, updatedStudent } : student,
			),
		})),
}));

export default useStore;
