# Authentication app
A simple authentication application which lets users signup, login and create messages. Guest users can create and see messages, premium users can also see who and when created that message and admin also delete messages. You can become a premium member or an admin by inputting a sceret password.

## Requirements
- Node.js
- PostgreSQL

## Installation
### 1.Clone git repository
```
git clone https://github.com/apacz1/authentication-app
cd authentication-app
```
### 2. Install dependencies
```
npm install
```
### 3a. Create an empty database in PSQL
### 3b. Create .env file which should look like this
```
SESSION_SECRET="<your_sessionsecret_value>"
SECRET_MEMBER="<your_member_secretpassword>" ## when user enters your made up password his membership status is updated to member
SECRET_ADMIN="<your_admin_secretpassword>"  ## when user enters your made up password his membership status is updated to admin
HOST="<your_hostname>"
PORT=<your_port_value>
USERNAME="<your_postrges_username>"
PASSWORD="<your_postgres_password>"
DATABASE="<your_database_name>"
```
### 4. Run the database setup
```
node populatedb.js
```
### 5. Run the app
```
node app.js
```
