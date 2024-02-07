<h1 align="center">QuizMe</h1>
<h2 align="center">CSC 342: Applied Web-based Client-Server Computing</h2>
<h2 align="center">Final Project</h2>
<p align="center">Tyler Bradshaw</p>
<p align="center">Jack Maggio</p>
<p align="center">Lane Nickson</p>

Run using `docker-compose up --build`

<h4>What works:</h4>
<p>At this stage, we have implemented and tested user authentication for our system. Additionally, we have completed all of the implementation for all planned pages within the system. In its current state, we are able to register new users, authenticate users, get all courses, get, create, update, and delete studysets, get, create, update, and delete flashcards, get, create, update, and delete posts, and get, create, update, and delete replies to posts. Furthermore, the application can now be accessed offline via a service worker in addition to it being installable. All pages have seemless transition to a mobile perspective throught the mobile-friendly style decisions and additional stylesheets to support this. All API endpoints return the correct data and all pages serve their content dynamically. Each page's data corresponds to the elements selected before it, for example the studysets data is based on the course selected. A database is implemented that holds data for the system, and it used to retrieve, post, update, and delete data when and where necessary.</p>

<h4>What does not work:</h4>
<p>At this stage we believe we have all major functionality present within our application.</p>

<h4>A brief description of your authentication and authorization processes. What techniques are you using? What data is being stored where and how? How are you making sure users only access what they are allowed to?</h4>
<p>Our authentication system is very much like the process described in class. When registering, the user's password is hashed with a random salt that is generated on the api backend. The user's email, hashed password, and salt are stored in the database. When the user wishes to login with a provided username and password, the backend checks to see if the given password (hased with the salt) matches the hash in the database. If the hashes match, the client is sent a session token cookie that verifies that the user is logged in. The cookie will last for a few minutes, or until the user logs out. The cookie is deleted in the case that the user wants to log out. If the user is not logged in, attempting to access api or frontend pages that need authentication will result in a 401 unauthorized error and a redirect back to the login page. Authorization is not needed in our current system but may be implemented before the final deadline if the need arises. </p>

<h4>A list of all the pages in your app, how to navigate them, and the offline functionality they provide, if any:</h4>

Pages   | Naviagation | Offline Functionality
------- | ------ | -----
Register | Accessed through login page when clicking the sign up button. | 
Login   | Accessed when running/accessing the web application. | If previously visited when online, this page can let a user login to the system.
Course Selection  | Accessed when logging in as a registered user. | If previously visited when online, this page can get all of the courses.
Course Page | Accessed when selecting a course from the Course Selection page | If previously visited when online, this page can get all of the studysets for that course.
Study Set   | Accessed when selecting a study set from the Course Page. | If previously visited when online, this page can get all of the flashcards for that studyset.
Create Study Set  | Accessed when selecting create studyset from the Course Page. | If previously visited when online, this page can be open, but no creation will be allowed. 
Discussion | Accessed when selecting the discuss option on the Study Set Page. | If previously visited when online, this page can get all of the discussion posts for that course.
Post Discussion | Accessed when selecting the post a question option on the Discussion Page. | If previously visited when online, this page can be open, but no creation will be allowed. 
Discussion Replies | Accessed when selecting a discussion post from the Discussion Page. | If previously visited when online, this page can get all of the replies for the selected discussion post, but will not allow the creation of a new reply.

<h4>A description of your caching strategy and why you chose it:</h4>

If a user visits a new page, it is automatically cached by the serviceworker. This includes study sets and courses a user has visited in their current session. We implemented a fetch-first caching scheme in the interest of maintaining authenticated sessions. With cache-first caching, a user could access content that they are no longer authenticated to see, which may be undesirable. Our scheme first fetches, and if an error response is returned, it defaults to returning content from the cache. If a page is not in the cache, an offline page is displayed. Upon reconnection and a page refresh, the user is sent the latest page.

<h4>An ER diagram of your final database schema</h4>

(idk if this changed at all)
  
<h4>An ER diagram of your database schema.</h4>
  
![](https://github.ncsu.edu/engr-csc342/csc342-2023Fall-GroupF/blob/development/Milestone2/quizme_erd.drawio.png)

<h4>All API endpoints and description of their behavior: </h4>

Method | Route                 | Description
------ | --------------------- | ---------
`GET` | `/courses/`              | Retrieves an array of all courses in the system
`GET` | `/courses/:courseId`     | Retrieves a course in the system based on the course id
`GET`  | `/courses/:courseId/studysets/`    | Retrieves an array of all studysets in the system based on the specificifed course id
`GET`  | `/courses/:courseId/studysets/:studysetId`      | Retrieves a studyset in the system based on the specificifed studyset id, given the course id
`POST` | `/courses/:courseId/studysets/`  | Receives a id, title, creator, and a course
`DELETE` | `/courses/:courseId/studysets/:studysetId`  | Removes a studyset with the given id from the studysets in the system
`PUT` | `/courses/:courseId/studysets/:studyset"`  | Updates a study set based on the given studyset
`GET` | `/courses/:courseId/studysets/:studysetId/flashcards/"`  | Retrieves an array of all flashcards for a given studyset for a given course in the system
`GET` | `/courses/:courseId/studysets/:studysetId/flashcards/:question"` | Retrieves a question from the flashcards for a given studyset for a given course in the system
`POST` | `/courses/:courseId/studysets/:studysetId/flashcards/"` | Receives an id, answer, question, creator, course, and studyset id.
`DELETE` | `/courses/:courseId/studysets/:studysetId/flashcards/:flashcardId"` | Deletes a flashcard from the flashcards for a given studyset for a given course in the system
`PUT` | `/courses/:courseId/studysets/:studysetId/flashcards/:flashcard"` | Updates a flashcard from the flashcards for a given studyset for a given course in the system
`GET`  | `/courses/:courseId/forumPosts/`  | Retrieves an array of all forum posts in the system based on the specificifed course id
`GET`  | `/courses/:courseId/forumPosts/:forumPostId`    | Retrieves a forum post in the system based on the specificifed forum post id, given the course id
`POST` | `/courses/:courseId/forumPosts/`  | Receives a id, course, creator, and a question
`DELETE` | `/courses/:courseId/forumPosts/:forumPostId`  | Removes a forum post with the given id from the forum posts based on the course in the system 
`PUT` | `/courses/:courseId/forumPosts/:forumPost"`  | Updates a forum post based on the given forum posts based on the course in the system
`GET`  | `/courses/:courseId/forumPosts/:forumPostId/replies/`  | Retrieves an array of all forum post replies in the system based on the specificifed forum post and course id
`GET`  | `/courses/:courseId/forumPosts/:forumPostId/replies/:forumReplyId`  | Retrieves a specific forum post reply in the system based on the specificifed forum reply id, forum post id, and course id
`POST`  | `/courses/:courseId/forumPosts/:forumPostId/replies/`  | Receives id, course, creator, postId, and body
`DELETE`  | `/courses/:courseId/forumPosts/:forumPostId/replies/:forumReplyId`  | Deletes a specific forum post reply in the system based on the specificifed forum reply id, forum post id, and course id
`PUT`  | `/courses/:courseId/forumPosts/:forumPostId/replies/:forumReplyId`  | Updates a specific forum post reply in the system based on the specificifed forum reply id, forum post id, and course id
`GET`  | `/users/:userId` | Retrieves a specific user based on the provided email
`POST`  | `/users/`  | Receives first name, last name, email, and password
`POST` | `/login` | Logs the user in when given the correct username/password combo. Generates a session token for the browser to maintain.
`POST` | `/logout` | Logs the user out
`POST` | `/register` | Registers a new user with a provided (unique) username and password. 


<h4>Detailed individual team member contributions, including a recap of what each team member did for each milestone.</h4>

<h5>Milestone 1:</h5>

| Name | Contribution(s) |
| ------- | ---------------- |
| Tyler Bradshaw | Menu Page, Create Study Set Page, Milestone Report |
| Jack Maggio | Login Page, Course Selection Page, Course Page, Course APIs/Router, Studyset APIs/Router, Flashcards APIs/Router, Forum Post APIs/Router, Forum Replies APIs/Router, Linked completed pages together, Implemented pages to serve dynamic content  |
| Lane Nickson | Docker/starter code setup, Register Page, Study Set Page, User API/mock data, API route organization/consolidation|

<h5>Milestone 2:</h5>

| Name | Contribution(s) |
| ------- | ---------------- |
| Tyler Bradshaw | Discussion Page, Discussion Post Page, Discussion Replies Page, Forum Post DAO/Scripts/API Routes, Forum Reply DAO/Scripts/API Routes, Milestone Report |
| Jack Maggio | Database setup, Database schema design, ER Diagram, Refactor Milestone1 code to serve content dynamically from database, Implement studyset creation, Implement flashcard creation, Remove unnecessary first and last name from user registration |
| Lane Nickson | API and Frontend Authentication, Registration, Logout buttons|

<h5>Final Project:</h5>

| Name | Contribution(s) |
| ------- | ---------------- |
| Tyler Bradshaw | Edit and Delete Discussion Post and Replies, All Pages Mobile Styles, Forum Post DAO/Scripts/API Routes, Forum Reply DAO/Scripts/API Routes, Final Project Report |
| Jack Maggio | Edit and Delete Studysets and Flashcards, Mobile Styles when page height changes, Input Validation for registering users and creating or updating studysets, flashcards, posts, and replies, Integrated large features with merge conflicts |
| Lane Nickson | Offline functionality/caching, Mobile flashcard style updates, General flashcard sizing/text wrapping, Authentication regression testing/bugfixes|
