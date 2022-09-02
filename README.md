### backend api to register user, login user, get the posts.

## Technologies Used :
* Node
* Express
* Mongodb
* JSONWEBTOKEN
* BCRYPTJS

 
 To test api use Postman
   ``` 
   user register :  http://localhost:8000/register ,body:{user details}
  
   user login:   http://localhost:8000/register/login ,body:{login details}

   create post:   http://localhost:8000/posts ,authorization token and body:{post details}
   
    get post:   http://localhost:8000/posts ,authorization token 
    
    update post:   http://localhost:8000/posts/{postid} ,authorization token and body:{post details}
    
    delete post:   http://localhost:8000/posts/{postid} ,authorization token and post id
     
    get active and inactive post : http://localhost:8000/status ,authorization token
    
    get post using geolocation : http://localhost:8000/geolocation ,authorization token and body:{geolocation:[latitude,longitude]}

   ``` 

## Getting Started :

### Prerequisites 
* VS Code

### Installation 
* Clone the repository
    ``` 
  git clone https://github.com/pankaj5417/knovator
    ```
To run on local server

### open  terminal for server
 * npm i
 * npm start
 
 
