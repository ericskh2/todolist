import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { ITask } from "../Interfaces";
import TodoTask from "./TodoTask";

interface IProps {
    todoList: ITask[];
    completeTask(key: string): void;
}

const TaskList = ({todoList, completeTask}:IProps) => {
    return (
        <Box display="flex" justifyContent="center">
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {todoList.map((task,key) =>{
            console.log(key);
            return (

            <TodoTask task={task} completeTask={completeTask}/>
            
            )})}
        </List>
        </Box>
    );
}

export default TaskList;