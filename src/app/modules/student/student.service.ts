import { Student } from '../student.model'
import { TStudent } from './student.inerface'

/// data qurey will run on mongoose model so call the model file
// make a service fnc
const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExits(studentData.id)) {
    throw new Error('user already exists')
  }
  const result = await Student.create(studentData) // by this we can crete data // built in statice method

  // const student = new Student(studentData) // create an instance
  // if (await student.isUserExits(studentData.id)) {
  //   throw new Error('user already exists')
  // }

  // const result = await student.save() // built in instance method provided by mongoose

  return result
}

const getAllStudentsFromDb = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}
// delete

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })
  return result
}

// now controller call the service fnc so export it

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
}
