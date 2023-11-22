// making a controller fnc
import { Request, Response } from 'express'
import { StudentServices } from './student.service'

// this is uing for joi
// import studentValidationSchema from './student.validation'

import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  // many way to take data from client site
  // by param
  // by qurey
  // to take big data use (body)
  try {
    // const { student: studentData } = req.body

    // creating a schema validation using joi start
    // const result = await StudentServices.createStudentIntoDB(studentData)

    // const { error, value } = studentValidationSchema.validate(studentData)
    // console.log('value and error ', error, value)

    // const result = await StudentServices.createStudentIntoDB(value)
    // if (error) {
    //   res.status(500).json({
    //     success: true,
    //     message: ' Student is created successfully',
    //     error,
    //   })
    // }
    // joi end

    // data validation using zod start

    const { student: studentData } = req.body
    const zodParsedData = studentValidationSchema.parse(studentData)

    const result = await StudentServices.createStudentIntoDB(zodParsedData)

    // will call service fnc to send this data

    // send res
    res.status(200).json({
      success: true,
      message: ' Student is created successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      error: err,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb()
    res.status(200).json({
      success: true,
      message: ' Students are retrieved successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      error: err,
    })
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDb(studentId)
    res.status(200).json({
      success: true,
      message: ' Student is retrieved successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message || 'somthing is worn',
      data: err,
    })
  }
}

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteStudentFromDb(studentId)

    res.status(200).json({
      success: true,
      message: 'Student successFully deleted ',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message || 'something is wrong',
      data: err,
    })
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
