import app from "./app";
import { connectToDB } from "./config/db";

const PORT = 8080

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
    connectToDB()
});