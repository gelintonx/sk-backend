# SK-Speech 📢 🔐

This repo had been created to a speech about security keys, this is a little example following Clean architecture and best practices as possible.


To run this project is mandatory to have a **Security Key**, there are many options. The most common are the Yubikeys but you can use other key who implements FIDO U2F

- Setup
    
    When we are working with FIDO authentication we must use HTTPS, in development enviroment we can use a self signed SSL cert. To do it you need OpenSSL, then execute the next commands: 


    ``` bash
        $ openssl genrsa -des3 -out server.key 4096
        $ openssl req -new -key server.key -out server.csr
        $ openssl rsa -in server.key.org -out server.key
        $ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
    ```


    

    ```bash
        $ npm install 
        $ npm run dev
    ```


Made with ❤️ by @gelintonx
