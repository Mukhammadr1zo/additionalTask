import {read, write} from '../utils/model.js'
import { InternalServerError} from "../utils/errors.js"



const GET = (req, res, next) => {
    try {
        let { studentId } = req.params

        if(studentId){
            
            let  [students]  = read('student').filter(student => student.student_id == studentId)
            if(!students) return res.status(203).send('student not found')
            students.studentId = students.student_id
            delete students.student_id
            return res.status(200).send(students)
        }
        
        let students = read('student').filter(student => {
            student.studentId = student.student_id
            delete student.student_id
            return true
        })
        res.status(200).send(students)

    } catch (error) {
        return next( new InternalServerError(500, error.message) )
    }
}

function POST(req, res, next) {
    try {
      let students = read("student");
      let {  student_name, age, balance} = req.body;
      let newStudent = {
        student_id: students.length ? students[students.length - 1].student_id +1:1,
        student_name: student_name,
        age: age,
        balance: balance,
      };
      students.push(newStudent);
      write('student', students)
      return res.status(200).json({
          status: 200,
          message: "student added",
          data: [
            {
              student_id: newStudent.student_id,
              student_name,
              age,
              balance
            },
          ],
        });
    } catch (error) {
      return next(new InternalServerError(500, error.message));
    }
  }
  function DELETE(req, res, next){
      try {
        let students = read("student");

      let {studentId} = req.params
      let findStudent = students.find(student => student.student_id == studentId);
      if(!findStudent) return next(new NotFoundError(404, "Student not found"));
      let filtredStudent = students.filter(student => student.students != studentId)
      write("student", filtredStudent);
      res.status(200).json({
          status: 200,
          message: "Student chopildi",
          data: [
            findStudent
          ],
        });
      } catch (error) {
      return next(new InternalServerError(500, error.message));
      }
  
  }


export default {GET, POST, DELETE}