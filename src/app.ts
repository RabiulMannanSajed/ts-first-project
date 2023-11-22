import express, { Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/student/student.route'
const app = express()

// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1/students', StudentRoutes)

// making Controller
const getAController = (req: Request, res: Response) => {
  const a = 10
  res.send(a)
}
app.get('/', getAController)
// console.log(process.cwd()) // this is find  the path of a folder
export default app
