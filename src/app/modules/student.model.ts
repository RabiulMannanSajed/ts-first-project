import { Schema, model } from 'mongoose'
import validator from 'validator'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
  StudentMethods,
} from './student/student.inerface'
import bcrypt from 'bcrypt'
import config from '../config'
// ** in mongoose data type will in chapeital latter (String )

// this is mongoose model

// this is making schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'firstName must be give this value '],
    trim: true, // this is use to remove space
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)

        return firstNameStr === value
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: { type: String },

  lastName: {
    type: String,
    required: [true, 'lastName must be give this value '],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'fatherName must be give this value '],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'fatherOccupation must be give this value '],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'fatherContactNo must be give this value '],
  },
  motherName: {
    type: String,
    required: [true, 'motherName must be give this value '],
  },
  motherOccupation: {
    type: String,
    required: [true, 'motherOccupation must be give this value '],
  },
  motherContactNo: {
    type: String,
    required: [true, 'motherContactNo must be give this value '],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'localGuardian name must be give this value'],
  },
  occupation: {
    type: String,
    required: [true, 'localGuardian occupation must be give this value'],
  },
  contactNo: {
    type: String,
    required: [true, 'localGuardian contactNo must be give this value'],
  },
  address: {
    type: String,
    required: [true, 'localGuardian address must be give this value'],
  },
})
//Schema making end

// / this is making instance
// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
// this is for Static
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [20, ' pass can not be more then 20 cher '],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name must be give this value'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} IS NOT valid',
      },
      required: true,
    }, // this is  enum type
    dateOfBirth: { type: String },
    email: { type: String, required: [true, 'email must be give this value'] },
    contactNo: { type: String, required: [true, 'must be give this value'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'must be give this value'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

// virtual who it work (this is data not exist in data base but u derived from existing data and u have to on the virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName}`
})

/// pre save middleware/hook will work on create() save()
// here using brcypt fro password

studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : will will save the data')

  //hashing password and saved to DB
  const userPass = this
  userPass.password = await bcrypt.hash(
    userPass.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})
// post save middleware
studentSchema.post('save', function (doc, next) {
  // after the save password become empty string
  doc.password = ' '
  next()
})

// in this way find those property which isDeleted value is not true
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
// in this way find those property which isDeleted value is not true
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
///creating a custom static method
studentSchema.statics.isUserExits = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// creating a  custom instance method
// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
