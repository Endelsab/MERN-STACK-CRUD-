const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
	{
		Firstname: String,
		Lastname: String,
		Course: String,
	},
	{
		timestamps: true,
	},
);

const StudentModel = new mongoose.model("students", studentSchema);
module.exports = StudentModel;
