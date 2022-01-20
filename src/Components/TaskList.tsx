import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { ITask } from "../ITask";
import TodoTask from "./TodoTask";
import { useEffect, useState } from "react";

interface IProps {
    todoList: ITask[];
    completeTask(key: string): void;
}

const TaskList = ({todoList, completeTask}:IProps) => {

    const [list,setList] = useState<ITask[]>([]);
    
    // Sort by datetime
    useEffect(()=>{
        setList(todoList.sort((a,b) => {return a.deadLine.getTime() - b.deadLine.getTime();}))
    },[]);

    useEffect(()=>{
        setList(todoList.sort((a,b) => {return a.deadLine.getTime() - b.deadLine.getTime();}))
    },[todoList]);

    return (
        <Box display="flex" justifyContent="center">
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

        {todoList.map((task,key) =>{
            return (
            <TodoTask task={task} completeTask={completeTask} canRemove={true}/>
            )})}
        </List>
        </Box>
    );
}

export default TaskList;