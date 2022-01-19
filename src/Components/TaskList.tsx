import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { ITask } from "../Interfaces";
import TodoTask from "./TodoTask";

interface IProps {
    todoList: ITask[];
    completeTask(key: string): void;
}

const TaskList = ({todoList, completeTask}:IProps) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {todoList.map((task,key) =>{
            console.log(key);
            return (

            <TodoTask task={task} completeTask={completeTask}/>
            
            )})}
        </List>
    );
}

export default TaskList;