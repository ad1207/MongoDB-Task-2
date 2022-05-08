use 'zen-class'
db.createCollection('users');
db.users.insert(
    {    
        "id":2,
        "name":"BBB",
        "batch":"b30we",
        "phone":123456789
    })
    
db.createCollection('topics');
db.topics.insert(
    {
        "title":"NodeJS",
        "StartDate": new ISODate("2021-11-15T15:00:00Z"),
        "EndDate": new ISODate("2021-11-30T18:10:30Z"),
        "Sessions":6
    })

db.createCollection('tasks');    
db.tasks.insert(
    {
        "taskId":5,
        "Date": new ISODate("2021-11-12T15:00:00Z"),
        "CompletedBy":[1,2,3,4,5,6,7,8,9]
    })

db.createCollection('codekata');    
db.codekata.insert(
    {
        "problemId":5,
        "difficulty":"Easy",
        "solvedBy":[1,2,3,4,5,6,7,8,9]
    })

db.createCollection('mentors');
db.mentors.insert(
    {
        "id":3,
        "name":"ZZZZ",
        "menteeCount":13,
        "email":"zzz@email.com"
    })

db.createCollection('company_drives');
db.company_drives.insert(
    {
        "name":"TTTT",
        "Placement Date":new ISODate('2021-10-28T11:00:00Z'),
        "StudentsAppeared":[1,2,4,5,6,8,9]
    })
    
//1.Find all the topics and tasks which are thought in the month of October
db.topics.find({$and:[{"StartDate":{$gte :new ISODate("2021-10-01T00:00:00Z")}},{"StartDate":{$lte :new ISODate("2021-11-01T00:00:00Z")}}]})
db.tasks.find({$and:[{"Date":{$gte :new ISODate("2021-10-01T00:00:00Z")}},{"Date":{$lte :new ISODate("2021-11-01T00:00:00Z")}}]})

//2.Find all the company drives which appeared between 15 oct-2021 and 31-oct-2021
db.company_drives.find({$and:[{"Placement Date":{$gte :new ISODate("2021-10-15T00:00:00Z")}},{"Placement Date":{$lte :new ISODate("2021-10-31T23:59:59Z")}}]})

//3.Find all the company drives and students who are appeared for the placement.
db.company_drives.aggregate(
    [
        {
            $lookup: {
                   from: "users",
                   localField: "StudentsAppeared",
                   foreignField: "id",
                   as: "Student List"
                 }
        }  
    ])



//4.Find the number of problems solved by the user in codekata
db.codekata.aggregate([
    {
        $group: { 
                _id:"$problemId"
                ploblemsSolved:{"$sum":{$size: "$solvedBy"}}
        }
    }
    ])

//5.Find all the mentors with who has the mentee's count more than 15
db.mentors.find({menteeCount:{$gt:15}})

//6.Find the number of users who are absent and task is not submitted  between 15 oct-2021 and 31-oct-2021
db.tasks.aggregate([
    {
        $match:{
            $and:[{"Date":{$gte :new ISODate("2021-10-15T00:00:00Z")}},{"Date":{$lte :new ISODate("2021-10-31T23:59:59Z")}}]
        }
    },
    {
        $lookup: {
              from: "users",
              localField: "CompletedBy",
              foreignField: "id",
              as: "Students Completed"
             }
    }
    ])





