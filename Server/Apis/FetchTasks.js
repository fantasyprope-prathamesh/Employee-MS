
const FetchTasks = (req,res,con)=>{
    // console.log("New api handling :)")
    // const sql = "select task_id as Id , name as Employee Name , task_description as Task Description , due_date as Due Date , status as Status , priority as Priority from taskinfo inner join employee on taskinfo.emp_id = employee.id";
    const sql = "select task_id, emp_id , name, task_description, due_date, status, priority from taskinfo inner join employee on taskinfo.emp_id = employee.id";

    con.query(sql,(err,result)=>{
        if(err){
            console.log("Error during task query")
            res.status(500).send("Error during task query");
        }else if(result.length > 0){
            console.log("Task data fetched succesfully:)");
            res.status(200).send(result);
        }else{
            console.log("No data found")
            res.status(404).send("No data found");
        }
    })
}       

export default FetchTasks;