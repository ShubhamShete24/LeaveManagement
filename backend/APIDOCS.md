## To seed the database 
- Use the command `npm run seed` to create and populate database
  - __Provide following information in .env file__
    ```
    DB_URL=
    PORT=8000
    DB_NAME=lms_dev
    JWT_SECRET_KEY=lmsSystem
    JWT_SESSION_TIMEOUT=5hr
    ```
  - You can provide __admin information__ in _createDatabase.js_ file 
  - Provide __roles__ details 
  - Run `npm run seed` 

## LMS.postman_collection.json
- Import this file in postman to get basic formulaed api calls already written.

## Basic guide to use API
Initially in absence of Admin user and Roles a user can 
1. Directly create admin role with roleName as 'ADMIN'
2. After performing step 1, user can create Admin user

By doing so one can bring following operations under admin authorisation
1. Role assignment
2. CRUD operations on Role
3. Manager Assignment


Feel free to modify/re-write code as per convinience.

### In case of any prblem feel free to raise issues.
