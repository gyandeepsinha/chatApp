# Simple Chat Application in Node.js.
A simple project contains a chat layout.

I have developed this project for learning basic socket.io use. In this project, you can enter a username and room name to start chatting.

## What You Need to run this project
============================================================================<br>
<b>Nodejs :</b>You need to download and install the node js setup and setup environment variable for running node.js server. (https://nodejs.org/en/) please use the given url to download the setup and please install the recommended version.<br>


## How to run this code
============================================================================<br>
I am assuming that you have installed all the required setup for the project. <br>
step-1 : open this project in any editor(vscode or sublime) as per your choice and use command npm install to install all NPM modules.<br>
step-2 : open command prompt and reach to your project folder and write node node index.js (In my case my main file name is index.js).<br>
step-3 : command prompt will show message that your server is running on . Your server is running on PORT 3000 (In my case i have setup and allocat PORT 3000 to project).

Hope it will work fine.<br>

when you will open localhost:3000/ then it will look like the below Images.

![image](https://user-images.githubusercontent.com/18578725/190896412-3cc915b9-dd96-4ee2-85c8-e94076824dcc.png)

![image](https://user-images.githubusercontent.com/18578725/190896429-a486bd12-3c96-4757-b5de-0f8bc4254cdb.png)

In the second screenshot, User A and User B has logged in same room and doing chat. If both the user select different room then they can not chat with each other.<br>
User can send simple Location link to each other in chat.

This is the simplest chat application in Node.js which has basic functionalities. I have not used any database but stored user information in simple Array for authenticating other user for unique userName selection. If user join or left then all the members knows about it with Notification Message.
#### Regards.
