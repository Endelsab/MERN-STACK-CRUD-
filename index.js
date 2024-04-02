const StudentModel = require("./models/studentModel");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
	.connect("mongodb://localhost:27017/crud")
	.then(() => console.log("connected to ohmygosh"))
	.catch((err) => console.log("pesti error: ", err));

//get students
app.get("/", async (req, res) => {
	try {
		const student = await StudentModel.find({});
		res.send(student);
	} catch (error) {
		console.log(error.message);
	}
});

//add student
app.post("/add", async (req, res) => {
	const { Firstname, Lastname, Course } = req.body;
	try {
		const newStudent = await StudentModel.create({
			Firstname,
			Lastname,
			Course,
		});

		await newStudent.save();
		res.send({ newStudent });
	} catch (error) {
		console.log(error.message);
	}
});

//update student
app.put("/update/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const editStudent = await StudentModel.findByIdAndUpdate(id, req.body);

		if (!editStudent) res.send("Student does not exist");

		const updatedStudent = await StudentModel.findById(id);
		res.status(201).json(updatedStudent);
	} catch (error) {
		console.log(error.message);
	}
});

//delete student

app.delete("/delete/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deletedStudent = await StudentModel.findByIdAndDelete(id);

		if (!deletedStudent) res.send("cannot delete student");

		res.status(200).json({ message: "Student deleted" });
	} catch (error) {
		res.status(500).json(error.message);
	}
});

app.listen(5000, () => {
	console.log("Listening on port 5000...");
});
