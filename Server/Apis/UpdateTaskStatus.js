const UpdateTaskStatus = (req, res, con) => {
  // console.log("heyy brooooos")

  console.log(req.params.id)
  let status = "";
  if (req.body.code === "blue") {
    status = "In Progress";
  } else if (req.body.code === "red") {
    status = "Not Started";
  } else if (req.body.code === "green") {
    status = "Complete";
  }
  const sql = "update taskinfo set status = ? where emp_id = ?";

  con.query(sql, [status, req.params.id], (err, result) => {
    if (err) {
      res.status(500).send("Error during query");
    } else if (result.affectedRows > 0) {
      console.log("Task Status updated successfully");
      res.status(200).send("success");
    } else {
      res.status(404).send("No data found!!");
    }
  });
};

export default UpdateTaskStatus;
