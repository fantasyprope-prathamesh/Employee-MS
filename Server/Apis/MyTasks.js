const MyTasks = (req, res, con) => {
  const sql =
    "select task_description , due_date , status from taskinfo where emp_id = ?";

  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send("Error during select query");
    } else if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send("No data found!");
    }
  });
};

export default MyTasks;
