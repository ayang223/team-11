#Frontend client for Team 11

<h2>Introduction </h2> 
This is the frontend web client for Team 11's project. To run the project on a server you'll need access to a bash tool to run command line utilities. For Linux or MacOS, you can just use the command line terminal, but for windows you'll can use something like gitbash to run commands. 

<h2> Stack </h2> 
This is the current tech stack the frontend is running on: 
- NodeJS 
- Express
- ReactJS 
- ReactDOM
- Webpack
- Foundation (CSS) 
- Jquery

List will be updated as development progresses 


<h2> Directory Structure </h2> 
| Directory      |                                                                                        |
|----------------|----------------------------------------------------------------------------------------|
| public/        | public files, including the bundle.js that is generated by webpack, and any html files |
| src/           | Source code for the client, app.jsx is at the root of this dir                         |
| src/components | individual components will be stored here                                              |
| src/css        | any custom css files                                                                   |
| src/scenes     | jsx files that are mapped to specific pages                                            |
| src/static     | static files e.g images (folder not created yet)                                       |

**These are the only files that should be present in the github repo, anything generated by your IDE or npm (node_modules dir) should be gitignored!!** 

<h2> Installation </h2> 
To start, install  NPM (Node package manager)
To check if you have it installed: 
```
npm -v
```

Navigate to the client/ and run: 

```
npm install 
```

This will install all the dependencies and create a node_modules/ folder along side src and public. 

You'll need to install webpack globally to run webpack as a command: 

```
npm install webpack -g 
```

Very that you have install webpack: 

```
webpack --help
```

Should list out webpack commands. 


<h2> Development </h2> 

To start development, run webpack in the client folder. Webpack will run according to the webpack.config.js file to compile the program. It'll throw a descriptive error if there are any and will not compile until the error is fixed. 

Compile: 

```
webpack
```

You can also run this command: 

```
webpack -w
```
Which webpack will now watch for any changes in any .jsx files to recompile the build. You'll need to open a new terminal to run the webserver if you choose to use webpack -w

After running webpack, you should see a bundle.js file in public. If not, there is something wrong and the webserver will not display anything. 

You can start the webserver by running

```
node server
```

Then access the port specified by the console.log. 

If you make any changes, just run webpack again and reload the browser. 

<h2> ToDo </h2> 
-Deploy web application to heroku
-Add testing framework 

<h2> Credits </h2> 
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

There is a guide that comes with the bootstrapped React App: 
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).