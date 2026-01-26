// 
Intro to Backend Exercise

In this exercise I have learned how to set up node.js with express and knex to create a simple backend server that can handle HTTP requests and interact with a database. 

I have created routes to get all tasks and users, add new users, get the user count with styled HTML response, and delete users by ID. 

 I was also able to practice handling different HTTP methods such as GET, POST, and DELETE, as well as working with JSON data and SQL queries. 
 
 Overall, this exercise has provided me with a solid foundation in backend development concepts and techniques. I have also learned about postman and (thunder client) which was recommended by mentor(Karo) to test my API endpoints.

 -Separation of Concerns:

deleteUser(id): Only does database work (the "data layer").

The endpoint: Only handles the web request/response (the "presentation layer").

This is like separating cooking (database) from serving food (HTTP responses).

-Readability: The endpoint now reads like a high-level story: "Get the ID from 

the request, delete the user, check if it worked, send a response." No 

distracting database details.

-Reusability: If you need to delete a user elsewhere (e.g., in 

another endpoint or a script), just call deleteUser(id). No code 

duplication.

-Testing: You can test deleteUser(id) separately (e.g., "Does it 

return 1 when a user is deleted?") without dealing with HTTP. The 

endpoint test can focus on "Does it send the right status code?"

-Maintainability: If the database logic changes (e.g., add logging or 

validation), you only update deleteUser(). The endpoint stays clean.
