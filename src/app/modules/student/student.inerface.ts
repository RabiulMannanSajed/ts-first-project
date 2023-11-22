// ** in interface data type will small latter

import { Model } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}
export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string

  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  password: string
  name: TUserName
  gender: 'male' | 'female' | 'other' // union type litarel
  email: string
  dateOfBirth?: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  isActive: 'active' | 'blocked'
  isDeleted: boolean
}

// for create static
export interface StudentModel extends Model<TStudent> {
  isUserExits(id: string): Promise<TStudent | null>
}

//for creating instance
// export type StudentMethods = {
// isUserExits(id: string): Promise<TStudent | null>
// }
//
// export type StudentModel = Model<
// TStudent,
// Record<string, never>,
// StudentMethods
// >
