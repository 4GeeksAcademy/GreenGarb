# To run the backend:
-  pipenv install
- install axios: npm install axios
- install flask jwt extended: pip install flask-jwt-extended
- intall flask bcrypt: pip install Flask-Bcrypt

  # For the front End:
- Make sure you are using node version 14+ and that you have already successfully installed and runned the backend.
- npm install

# Enter these 2 command into the terminal:
- npm run start (to render the website)
- pipenv run start (for the backend)

# Create a user at the register page and login
You can add a shop and products into the markteplace after creating a user. You can create multiple users and creative product descriptions to make GreenGarb look full.
All the data is fetched from the local database and is unique per codespace.


![greenGarbMobile](https://github.com/4GeeksAcademy/GreenGarb/assets/39809411/fb6feb6c-6de5-4c52-bc4c-49593749b72a)  ![greenGarbMobile2](https://github.com/4GeeksAcademy/GreenGarb/assets/39809411/efe79668-6f3a-4568-8ee3-77dfbc6e8f74)

![greenGarbProductPage](https://github.com/4GeeksAcademy/GreenGarb/assets/39809411/a232f4c5-c512-47a7-975d-417c6457e20f) ![Screenshot (154)](https://github.com/4GeeksAcademy/GreenGarb/assets/39809411/bfe16f9f-a36a-4617-9423-a29ea3e03787)


# WebApp boilerplate with React JS and Flask API

Build web applications using React.js for the front end and python/flask for your backend API.

- Documentation can be found here: https://start.4geeksacademy.com/starters/react-flask
- Here is a video on [how to use this template](https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b)
- Integrated with Pipenv for package managing.
- Fast deployment to heroku [in just a few steps here](https://start.4geeksacademy.com/backend/deploy-heroku-posgres).
- Use of .env file.
- SQLAlchemy integration for database abstraction.

### 1) Installation:

> If you use Github Codespaces (recommended) or Gitpod this template will already come with Python, Node and the Posgres Database installed. If you are working locally make sure to install Python 3.10, Node 

It is recomended to install the backend first, make sure you have Python 3.8, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the valudes with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`

> Note: Codespaces users can connect to psql by typing: `psql -h localhost -U gitpod example`

### Backend Populate Table Users

To insert test users in the database execute the following command:

```sh
$ flask insert-test-users 5
```

And you will see the following message:

```
  Creating test users
  test_user1@test.com created.
  test_user2@test.com created.
  test_user3@test.com created.
  test_user4@test.com created.
  test_user5@test.com created.
  Users created successfully!
```

To update with all yours tables you can edit the file app.py and go to the line 80 to insert the code to populate others tables


## Publish your website!

This boilerplate it's 100% read to deploy with Render.com and Heroku in a matter of minutes. Please read the [official documentation about it](https://start.4geeksacademy.com/deploy).

### Contributors

This template was built as part of the 4Geeks Academy [Coding Bootcamp](https://4geeksacademy.com/us/coding-bootcamp) by [Alejandro Sanchez](https://twitter.com/alesanchezr) and many other contributors. Find out more about our [Full Stack Developer Course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer), and [Data Science Bootcamp](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).

You can find other templates and resources like this at the [school github page](https://github.com/4geeksacademy/).



