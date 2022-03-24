import dynamoDBClient from "../model";
// import TodoServerice from "./todosService"
import BadgesServerice from "./badgesService"


// export const todoService = new TodoServerice(dynamoDBClient()); 
const badgesService = new BadgesServerice(dynamoDBClient());

// export todoService;
export default badgesService;