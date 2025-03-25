# Link Aggregator Site
This site aggregator website includes user authentication to ensure secure access to personalized content. It uses the bcrypt.js library to salt and hash user passwords before storing them in a MongoDB collection, enhancing security by protecting against plaintext password leaks. The website allows users to register and log in, with the backend built using Node.js and Express. Upon registration, user credentials are hashed with a unique salt, and on login, the entered password is compared with the stored hash. MongoDB is used to manage user data and aggregated site content, offering a scalable and efficient solution for storing structured information.

![Home](/Documentation/Home.png "Home Page")
![Add-Post](/Documentation/Add-Post.png "Adding a Post")

## Run
The program is hosted locally so you will need mongodb on your system to run (link). Download the code and run "node app.mjs" to start the site. On a browser (chrome recommended) type "localhost:3000" to access the website