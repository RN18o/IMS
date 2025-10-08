# Incident Management System

A full-stack web application to report, track, and manage incidents efficiently.  
This system allows users to create, update, and view their own incidents, while ensuring that users can’t modify others’ reports.  

---


# Setup and launch process
**1). Clone the Repository**<br/>
       Open your terminal and run the following command to clone the repository:<br/>
      
       ```
       git clone https://github.com/RN18o/IMS.git
       
       ``` 

       
**2). Navigate to the Project Directory**<br/>
       Change into the project frontend directory:</br>
       
       ```
       cd Frontend
       
       ```
       
       Change into the project Backend directory:</br>
       
       ```
       cd Backend
       
       ```

       
**3). Install Dependencies**<br/>
       Install the necessary packages using npm in both Frontend and Backend:<br/>
       
       ```
       npm install all
       or
       yarn install
       
       ```


**3). Create .env file both Frontend and Backend**<br/>
     For Backend -->
     
     PORT=4000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     SMPT_HOST=your_host
     SMPT_PORT=your_port
     SMPT_SERVICE=your_services
     SMPT_MAIL=your_mail
     SMPT_PASSWORD=your_password_key

     For Frontend --> 
     
     VITE_BASE_URL=http://localhost:4000
       

       
**4). Start the Development Server**<br/>
       After installing the dependencies, you can start the development server with:<br/>
       For Frontend and Backend --> 
      
      ```
      
       npm run dev
       or 
       yarn run dev
      
       ```

       
**5). Access the Application**<br/>
      Open your web browser and navigate to:<br/> 
     ```
      http://localhost:5173/login
      ``` <br/>
      You should see the Incident management System application running on  your local. 


**5). Screenshots**<br/>
![image alt](https://github.com/RN18o/IMS/blob/1c8d68d8e636add1c1326ff316f2c5bde1075e1d/Screenshot%202025-10-08%20224806.png)
![image alt](https://github.com/RN18o/IMS/blob/1c8d68d8e636add1c1326ff316f2c5bde1075e1d/Screenshot%202025-10-08%20224352.png)
![image alt](https://github.com/RN18o/IMS/blob/1c8d68d8e636add1c1326ff316f2c5bde1075e1d/Screenshot%202025-10-08%20224408.png)

      

