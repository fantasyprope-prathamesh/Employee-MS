
const AssignTask = (req,res,con)=>{
    const sql = "insert into taskinfo (emp_id,task_description,due_date,status,priority) values(?,?,?,?,?)";

    if(req.body){
        const data = [req.body.empId,req.body.taskDescription,req.body.dueDate,req.body.status,req.body.priority];

        con.query(sql,data,(err,result)=>{
            if(err){
                res.status(500).send("Error during insrt query");
            }else if(result.affectedRows > 0){
                console.log(result);
                res.status(200).send("Task inserted successfully.")
            }else{
                res.status(404).send("No data found")
            }
        })
    }
}

export default AssignTask;