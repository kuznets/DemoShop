# DemoShop

Online store testing implementation.

### Features:
1. Admin module
* Products CRUD
* Categories CRUD

2. Main module
* Products board
* Product page
* User registration
* User Sign in
* User Sign out

### Current routes
* sitename/ - Home page
* sitename/register - Registration page
* sitename/login - Authorization page
* sitename/products - Production list
* sitename/product/:slug - Product page

* sitename/admin - Admin panel
* sitename/admin/products - Admin panel for products
* sitename/admin/categories - Admin panel for categories

### How to start application.

You need to have installed version control git

Git installation: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

You need to have installed package manager npm and node.js

Npm installation: https://nodejs.org/en/download/

In your work directory open command line

	$ git clone https://github.com/kuznets/DemoShop.git
	
Go to directory DemoShop

	$ cd DemoShop

Create file .env in the project root directory and to fill the fields:

    NODE_ENV=development
    MONGODB_MLAB_USER=
    MONGODB_MLAB_PWD=
    MONGODB_MLAB_URL=
    SESSION_SECRET=

    GITHUB_CLIENT_ID=
    GITHUB_CLIENT_SECRET=
    GITHUB_CALLBACK_URL=


Install the dependencies

	$ npm install

Run the node application

	$ npm run dev

Start browser and open url

http://localhost:3000/