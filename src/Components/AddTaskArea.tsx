import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

interface IProps {
    task: string;
    deadline: Date;
    setTask: (val:string)=>void;
    setDeadline: (val:Date)=>void;
    addTask: ()=>void;
}

const AddTaskArea = ({task, deadline, setTask, setDeadline, addTask}:IProps) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setTask(event.target.value);
    }

    // .inputContainer {
    //   display: flex;
    //   flex-direction: column;
    //   align-items: center;
    // }
    
    return (        
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <TextField label="Task..." variant="outlined" name="task" value={task} onChange={handleChange} sx={{margin:2}}></TextField>
        {/* <TextField label="Deadline (in Days)..." variant="outlined" value={deadline} name="deadline" onChange={handleChange}></TextField> */}

        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={deadline}
        onChange={(newDeadline) => {
          if(newDeadline!=null) setDeadline(newDeadline);
        }}
      />
    </LocalizationProvider>

        <Button variant="contained" onClick={addTask} sx={{margin:2}}>Add Task</Button>
        {/* <button onClick={addTask}>Add Task</button> */}
        
    </Box>
  );
}

export default AddTaskArea;