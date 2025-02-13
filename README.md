<p align="center">
 <img src="lostitem.gif" style="width: 500px; height: auto;">

# <h1 align="center">CometClaim 💫</h1>

<p align="center">
UTD's Lost and Found system needs a digital upgrade to improve convenience. Instead of relying on physical visits or phone calls, CometClaim is an online platform where students and staff can easily upload and browse a virtual inventory of lost items, retrieve misplaced belongings, and query a chatbot for any questions from the comfort of their home before making a trip to the Lost and Found office.
</p>
<br>

## MVP 🛠️

- User account with user authentication
  - Administrator and student login
  - Item recovery history
- Register New Items (Found and Lost)
  - Add "Pending Verification," "Claimed," or "Available for Pickup" statuses for items.
- Fuzzy search to look for items
  - Item Categories and Filters
- Claim Process
  - Submit tickets to claim items
- Chatbot for answering any questions
  - If a person has claimed an item that is mine, what should I do?
  - What is the process for claiming an item?
- Alerts/Notification System
  - when new items matching their description are added to the inventory.
    <br> <br>

## Tech Stack & Resources 💻

<details>
  
**<summary>Comprehensive Full-Stack Tutorials</summary>**

- [AWS Project - Build a Full End-to-End Web App with 7 Services](https://www.youtube.com/watch?v=K6v6t5z6AsU&t=1624s)
- [Build a React To-Do App | AWS Projects](https://www.youtube.com/watch?v=7-7ugqAxgxI)

</details>

<details>
  
**<summary>Front-end</summary>**
- [World's Shortest Figma Course](https://www.youtube.com/watch?v=1pW_sk-2y40)
- [Official React Documentation / Setup](https://tailwindcss.com/docs/guides/create-react-app)
- [React Tutorial for Beginners](https://youtu.be/SqcY0GlETPk?si=7m4sb_bs-ksPQLkv)
- [JS Mastery React JS Full Course 2023, 1 hour](https://www.youtube.com/watch?v=b9eMGE7QtTk&ab_channel=JavaScriptMastery)
- [Official TailwindCSS Documentation / Setup](https://tailwindcss.com/docs/installation)
- [Tailwind Tutorial for Beginners](https://www.youtube.com/watch?v=DenUCuq4G04)

</details>

<details>
  
**<summary>Back-end</summary>**
- Database
  - S3
    - [Amazon/AWS S3 (Simple Storage Service) Basics](https://www.youtube.com/watch?v=mDRoyPFJvlU)
    - [Storing Images in S3 from Node Server](https://www.youtube.com/watch?v=eQAIojcArRY)
  - DynamoDB
    - [AWS DynamoDB Tutorial For Beginners](https://www.youtube.com/watch?v=2k2GINpO308)
- User Authentication
  - AWS Cognitio
    - [Implement AWS Cognito login and registration (Sign In and Sign Up) in React JS](https://www.youtube.com/watch?v=WymSgBVrD9s)
    - [How to use AWS Cognito to build an Authentication / Login System](https://www.youtube.com/watch?v=8a0vtkWJIA4&t=401s)
- API
  - Chatbot
    - AWS Lex
      - [How to Make a Chatbot Using Amazon Lex and AWS Lambda ](https://www.youtube.com/watch?v=RB8yw2nzA2Q&list=PLAMHV77MSKJ7s4jE7F_k_Od8qZlFGf1BY)
      - [Amazon Lex: 8 Things You HAVE To Know](https://www.youtube.com/watch?v=iDCWxfI2EQo)
    - AWS Kendra
    - AWS Polly
      - [Text to Speech with Amazon Polly](https://www.youtube.com/watch?v=XUd5M_mQaA0)
      - [Building Intelligent Chatbots with Amazon Lex & Amazon Polly](https://www.youtube.com/watch?v=PLnRzHNmcao)
</details>

<details>
  
**<summary>Third-party Integrations / APIs</summary>**
- [Fuzzing Searching with fuse.js](https://www.fusejs.io/)
- [AI UI Generator for a template](https://uizard.io/)

</details>

<details>
  
**<summary>Dev Tools/Software</summary>**

- [Git](https://git-scm.com/downloads)
- [VS Code](https://code.visualstudio.com/download)
- [Node.js](https://nodejs.org/en/download/package-manager)
- [Postman](https://www.postman.com/downloads/)

</details>

## Milestones 📅

<table>
  <tr>
    <th>Week</th>
    <th>Overall</th>
    <th>Frontend Tasks</th>
    <th>Backend Tasks</th>
  </tr>
  <tr>
    <td>Week 1</td>
    <td>
       <ul>
        <li>Discuss who’s frontend/backend and the overall project/tech stack</li>
        <li>Set up communication, environments, and WhenToMeet</li>
        <li>Set up development environments for both front-end and back-end </li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Begin UI/UX design</li>
        <li>Set up development environments for front-end</li>
        <li>Look into React and Tailwind</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Set up development environments for back-end</li>
        <li>Start looking into AWS tech stack</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Week 2</td>
    <td>
      <ul>
        <li>Get familiar with tech stack</li>
        <li>Begin starting with basic deliverables</li>
       <li>Brainstorm schemas for the database (Both front-end and back-end should be in agreement before creating states/models)</li>
        <ul>
      </ul>
    </td>
    <td>
      <ul>
        <li>Go over some UI design basics</li>
        <li>Flesh out the collective vision for the app</li>
        <li>Figma Design due by the end of week 2</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Plan out database design schema</li>
        <li>Keep doing research with the tech stack and AWS</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Week 3/4</td>
    <td>
       <ul>
        <li>Begin starting with basic deliverables</li>
        <ul>
      </ul>
    </td>
    <td>
      <ul>
        <li>Finalize UI/UX design concepts (Finish by end of Week 3)</li>
        <li>Implement designs for Login/SignUp Pages, Upload/Claim Item pages, Search Page</li>
        <li>Implement user auth with AWS Cognito due by End of Week 3 </li>
         <li>Set up routing for pages and set up context components</li>
      </ul>  
    </td>
    <td>
      <ul>
        <li>Configure the AWS environment with Polly, Lex, Amplify, and S3/DynamoDB</li>
        <li>Set up S3 buckets for storing uploaded item photos</li>
        <li>Start developing AWS Lex and AWS Polly</li>
      </ul>  
    </td>
  </tr>
  <tr>
    <td>Week 5/6</td>
    <td>
       <ul>
      </ul>
    </td>
    <td>
      <ul>
         <li>Implement designs for Claim page, Home Page, and chatbot page/modal</li>
      </ul> 
    </td>
    <td>
      <ul>
        <li>Integrate user and item database with the frontend</li>
        <li>Chatbot should be functional and reply to queries</li>
      </ul>   
    </td>
  </tr>
   <tr>
    <td>Week 7/8</td>
    <td>
       <ul>
        <li>Backend and Frontend communicate to finish integration to connect and test</li>
        <li>Have the entire app working</li>
        <li>If possible work on stretch goals</li>
        <li>Begin working on the script</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Polish up MVP features and help the backend if needed</li>
      </ul> 
    </td>
     <td>
      <ul>
        <li>Finish everything</li>
      </ul> 
    </td>
  </tr>
  <tr>
    <td>Week 9</td>
    <td>
       <ul>
       <li>EVERYONE HANDS ON to DEPLOY our app with AWS Amplify</li>
      </ul>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>
  <tr>
    <td>Week 10</td>
    <td>
      <ul>
        <li>NO MORE CODING unless for bug fixes</li>
        <li>Prepare for Presentation Night!</li>
        <li>Polish app and slides so they are ready to go</li>
      </ul>
    </td>
    <td></td>
    <td></td>
  </tr>
</table>

## Stretch Goals 🚀

- In-app messaging feature
- Real-time call support for answering questions?
  - Connect me to a real person
  - Any other questions that the chatbot can use
- Anonymous Reporting
- Crowdsourcing
  - Allow students and staff to upload photos of lost items ANYWHERE on campus
- Map Integration
- Social Media Integration
- Location-based notification
 - When you mark a location on the map, if a new item is uploaded in that location, you get a notification

<br>

## Roadblocks and Possible Solutions 🚧 💡

- React Environment Setup
  - Pivot to other technologies such as Svelte or Nuxt
- Running to AWS Tech Stack Issues
  - If we are in the early stages, we would pivot to PERN/MERN (PostgreSQL, Express, React, Node)
- Issues with AWS Kendra and AWS Lex (or AWS Polly)
  - Pivot to different technologies offering voice generation and AI Chat such as LangChain
- Either the Frontend or Backend team falling behind.
  - If this happens the best course would be to get some assistance from the other side until caught up

<br>

## Competition 🥊

- UTD PD Lost and Found Inquiry
- UTD SU Lost and Found
- Social Media apps like (Reddit, Instagram, X)

  <br>

## Git Cheatsheet 📓

| Command                             | What it does                               |
| ----------------------------------- | ------------------------------------------ |
| git init                            | Initalize a new Git repo                   |
| git clone "rep-url"                 | Clone a repo from a URL                    |
|                                     |                                            |
| git status                          | Show changes status                        |
| git add "file"                      | Add changes to staging, use "." for all    |
| git commit -m "Descriptive Message" | Commit changes with a message              |
| git push                            | Upload local repo content to a remote repo |
| git log                             | View commit history                        |
|                                     |                                            |
| git branch                          | Lists all the branches                     |
| git branch "branch-name"            | Create a new branch                        |
| git checkout "branch-name"          | Switch to a branch                         |
| git checkout -b "branch-name"       | Combines the previous 2 commands           |
| git merge "branch-name"             | Merge changes from a branch                |
| git branch -d "branch-name"         | Delete a branch                            |
| git push origin "branch-name"       | Push to branch                             |
| git pull origin "branch-name"       | Pull updates from a specific branch        |
|                                     |                                            |
| git pull                            | Fetch and merge changes                    |
| git fetch                           | Fetch changes without merging              |
| git reset --hard HEAD               | Discard changes                            |
| git revert <commit-hash>            | Revert changes in a commit                 |

<br>

## CometClaim TEAM!! :tada:

- Mohammad Mehrab
- Hannah Rauch
- Tien Phan
- Neeharika Dasaraju
- Jason Luu - Project Manager
- Suraj Khosla - Industry Mentor
