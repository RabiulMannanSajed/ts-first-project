// handle route
import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router() // this is will give us router obj

// this is call controller fnc
router.post('/create-student', StudentControllers.createStudent)

router.get('/', StudentControllers.getAllStudents)

router.get('/:studentId', StudentControllers.getSingleStudent)

router.delete('/:studentId', StudentControllers.deleteStudent)

export const StudentRoutes = router // don't send this as obj cause oue route is giving a obj
