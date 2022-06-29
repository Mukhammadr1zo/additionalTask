import { read, write } from "../utils/model.js";
import { NotFoundError, CannotAddToGroup, InternalServerError } from "../utils/errors.js";


function POST(req, res, next) {
  try {
    let groups = read("group");
    let students = read('student')

    let { group_id, student_id} = req.body

    let findGroup = groups.find(
        (group) => group.group_id == group_id
        
    );
    let findStudent = students.find(student => student.student_id == student_id); 
    if(!findGroup)
    return res.status(401).json({
      status: 401,
      message: "student or group not found",
    });
    if(!findStudent)
    return res.status(401).json({
      status: 401,
      message: "student or group not found",
    });
    
    findGroup.group_id = findGroup.group_id
    findStudent.student_id = findStudent.student_id
    
    if(findStudent.balance >= findGroup.group_price ){
      findStudent.group_id = group_id
      
      write('student', students)
      return res.status(200).json({
          status: 200,
          message: "student added for group",
          
          
        });
    }else {
      return res.status(301).json({
        status: 301,
        message: "students balance is not enough ",
      });
    }
    

  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
}
function DELETE(req, res, next) {
  try {
    let groups = read("group");
    let students = read('student')
    
    let { group_id, student_id } = req.body

    let findGroup = groups.find(
      (group) => group.group_id == group_id
      
  );
  let findStudent = students.find(student => student.student_id == student_id ); 
    if (!findGroup)
      return next(new NotFoundError(404, "group not found"));
         
    if(!findStudent) return next(new NotFoundError(404, "Student not found"));
         
      
    delete  findStudent.group_id;
       write('student', students)
       return res.status(200).json({
           status: 200,
           message: "student deleted from group",
             })
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
}


export default {
  
  POST,
  DELETE,
};
