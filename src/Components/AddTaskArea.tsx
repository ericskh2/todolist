import { Button, TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface IProps {
    task: string;
    deadline: number;
    setTask: (val:string)=>void;
    setDeadline: (val:number)=>void;
    addTask: ()=>void;
}

const AddTaskArea = ({task, deadline, setTask, setDeadline, addTask}:IProps) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if(event.target.name === "task") {
          setTask(event.target.value);
        } else {
          setDeadline(Number(event.target.value));
        }
    }

    return (        
    <div className="inputContainer">
        <TextField label="Task..." variant="outlined" name="task" value={task} onChange={handleChange}></TextField>
        <TextField label="Deadline (in Days)..." variant="outlined" value={deadline} name="deadline" onChange={handleChange}></TextField>
        {/* <input type="text" placeholder="Task..." name="task" value={task} onChange={handleChange}></input> */}
        {/* <input type="number" placeholder="Deadline (in Days)..." value={deadline} name="deadline" onChange={handleChange}></input> */}
        <Button variant="contained" onClick={addTask}>Add Task</Button>
        {/* <button onClick={addTask}>Add Task</button> */}
    </div>
  );
}

export default AddTaskArea;