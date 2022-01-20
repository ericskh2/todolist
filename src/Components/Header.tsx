import { Box, Button } from "@mui/material";
import firebase from "firebase/compat/app";

const header = () => {
    return (<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Box> <h1>TodoList</h1> </Box>
        <Box>Welcome {firebase.auth().currentUser!.displayName}! You are now signed-in!</Box>
        <Button onClick={() => {firebase.auth().signOut();}}>Sign-out</Button>
    </Box>);
}

export default header;