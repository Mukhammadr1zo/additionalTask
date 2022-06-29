import { read, write } from "../utils/model.js";
import { NotFoundError, AlredExistsError, InternalServerError } from "../utils/errors.js";

function GET(req, res, next) {
  try {
    let groups = read("group");
    let students = read("student");

    let { groupId } = req.params;

    if (groupId) {
      let findGroup = groups.find(
        (group) => group.group_id == groupId
      );
      if (!findGroup)
        return next(new NotFoundError(404, "gruop not found"));
        findGroup.groupId = findGroup.group_id;
        findGroup.students = students
        .filter(
          (student) => student.group_id == findGroup.group_id
        )
        .map((student) => {
          return {
            studen_name: student.student_name,
            student_id: student.student_id,
            age: student.age,
            balance: student.balance
          };
        });
      delete findGroup.group_id;
      return res.status(201).json({
        status: 201,
        message: "",
        data: [findGroup],
      });
    }

    groups.forEach((group) => {
      group.groupId = group.group_id;
      group.students = students
        .filter(
          (student) => student.group_id == group.group_id
        )
        .map((student) => {
          return {
            studentName: student.student_name,
            studentId: student.student_id,
            student_age: student.age,
            balance: student.balance
          };
        });
      delete group.group_id;
    });
    res.status(201).json({
      status: 201,
      message: "",
      data: groups,
    });
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
}
function POST(req, res, next) {
  try {
    let groups = read("group");
    let { group_name, group_price } = req.body;
    let findGroup = groups.find(
      (group) => group.group_name == group_name
    );
    if (findGroup)
      return next(new AlredExistsError(403, "group already exists"));
    let newGroup = {
      group_id: groups.length
        ? groups[groups.length - 1].group_id + 1
        : 1,
        group_name: group_name,
        group_price: group_price
    };
    groups.push(newGroup);
    write("group", groups);
    return res.status(200).json({
      status: 200,
      message: "group added",
      data: [
        {
          groupId: newGroup.group_id,
          groupName: group_name,
          group_price: group_price
        },
      ],
    });
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
}
function DELETE(req, res, next) {
  try {
    let groups = read("group");
    let students = read('student')
    let { groupId } = req.params;
    let findGroup = groups.find(
      (group) => group.group_id == groupId
    );
    if (!findGroup)
      return next(new NotFoundError(404, "group not found"));
      
      if(!findGroup) return next(new NotFoundError(404, "Student not found"));
      let filtredGroups = groups.filter(group => group.group_id != groupId)
      let [filtredGroup] = groups.filter(group => group.group_id == groupId)
      let  filtredStudents = students.filter(student => student.group_id == groupId)
      
      for (let studs of filtredStudents){
        studs.balance += filtredGroup.group_price
        delete studs.group_id
      }

      write("group", filtredGroups);
      write('student', students)
      res.status(200).json({
          status: 200,
          message: "Gruppa chopildi va money repaid",
          data: [
            {
              group_id: findGroup.group_id,
              group_name: findGroup.group_name,
            },
          ],
        });
    
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
}


export default {
  GET,
  POST,
  DELETE,
};
