//Import Libs:
const express = require('express');
const bodyParser = require('body-parser');
//Permet de créer un server
const Server = require('http').Server;
//Permet d'importer  d'autres fichier 
const fs = require('fs');

///Import files:
const users = JSON.parse(fs.readFileSync('users.json'));
const posts = JSON.parse(fs.readFileSync('posts.json'));

//Server initalisation:
const app = express();
const server = Server(app);
const port = 3001;
app.use(bodyParser.json());
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  // response.header('Access-Control-Allow-Credentials', true);
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//Routes:
app.get('/', (request, response) => {
    response.send(`
        <div style="margin: 5em auto; width: 50%; line-height: 1.5">
        <h1 style="text-align: center">Hello World!</h1>
        <p>Le server est bien lancé</p>
        <div>Liste des endspoints</div>
        <ul style="display: inline-block; margin-top: .2em">
            <li>Lister tous les utilisateurs: <code>GET http://localhost:${port}/users</code></li>
            <li>Lister tous les posts: <code>GET http://localhost:${port}/posts</code></li>
            <li>Obtenir un utilisateur par son ID :<code>GET http://localhost:${port}/user/?id=</code></li>
            <li>Obtenir un post par son ID :<code>GET http://localhost:${port}/post/?id=</code></li>
        </ul>
        </div>
    `);
});

//Get all users
app.get('/users', (request, response) => {
    response.json({users});
});

//Get all posts
app.get('/posts', (request, response) => {
    response.json({posts});
});

//Get a user by id
app.get('/user/:id', (request, response) => {
    const user = users.find((user) => user.id == request.params.id);
    if (user != undefined) {
        response.json({user});
    } else {
        response.status(404).send('Not found');
    }  
});

//Get a post by id
app.get('/post/:id', (request, response) => {
    const post = posts.find((post) => post.id == request.params.id);
    if (post != undefined) {
        response.json({post});
    } else {
        response.status(404).send('Not found');
    }
});

//Listen:
server.listen(port, () => {
    console.log(`listening on *:${port}`);
});