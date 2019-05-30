#All the following instructions are made for Windows 10 OS

#Django environment
1. Open a PyCharm and go to File>NewProject
2. Enter the intended location (e.g. H:\Project\heatmap)
3. Click Project Interpreter: New Virtualenv environment
4. Check the correctness of the location and name your virtual environment folder (e.g. H:\Project\heatmap\venv)
5. Choose the correct Base interpreter (e.g. C:\Program Files (x86)\Python36-32\python.exe) and click Create

After that, whenever you open this project folder in PyCharm, and open a terminal, 
the "(venv)" should precede the location of the project folder. That means all your commands in that terminal 
will be run within a virtual environment and you can start installing packages safely without altering the global
scope. If that doesn't happen, try the following:

In the Terminal after your project's location enter "~name of the venv folder~\Scripts\activate".
It should look like "H:\Project\heatmap>venv\Scripts\activate"

#Installing project

##Django part:
1. Get the project from the working repo (read the git documentation on the web) into your main project folder
2. Run "pip install -r requirements.txt" in the PyCharm terminal. That will install all the required packages into your
virtual environment
3. Run "python manage.py migrate" to initially set up the database
4. If you install any additional packages, run the following command in the PyCharm terminal:
"pip freeze > requirements.txt". This will add the packages to the requirements file, so that anyone else
who downloads the project can install the required packages too.

##React part:
1. Download and install node.js from the web
2. CD into the "front-end" directory in the terminal
3. Run "npm install"
4. Run "npm build"
5. CD upwards into the project folder and run "python manage.py runserver". This should run the Django project and you
should be able navigate to http://localhost:8000 and see the React app running and being served by Django

#NPM error:
If you get an error that npm command is not recognized make sure node.js is added to your environment veriables:
1. Make a global OS search for "environment", open the Edit the system environment variables and press
Environment variables in the Advanced tab of the System Properties
2. Press New under the User variable for ~your-user-name~
3. Name your variable somehow (e.g. Path) and add a path to your nodejs installation (e.g. C:\Program Files\nodejs\)
4. Restart all the terminals and the problem should be fixed

#Deployment(Ubuntu 16.04.3 LTS)
1. The app is written in Python 3.6.7, so make sure you have the latter or higher version
2. Login into Ubuntu server and navigate to the folder where you intend to keep the app
3. Clone the project from the repo using git
4. (optional) Install and create Python Virtual environment, for example, following the insttructions here: https://virtualenv.pypa.io/en/latest/ . This step is necessary if you plan to host and run multiple python/Django apps on the same server
5. If you have completed step 4, activate the virtual env and make sure it uses the mentioned version of Python or higher by running 'python'
6. Navigate to the app folder and install all python/django packages used by the app by running the following command: 'pip install -r requirements.txt'. This will install all the required packages specified in project's requirements
7. Run "python manage.py migrate" to initially set up the database and apply all the existing migrations
8. Create an admin user by running the following command and providing username, email and password in the corresponding prompts: 'python manage.py createsuperuser'
9. Start the app by running the following command: 'python manage.py runserver 0.0.0.0:80 --noreload' . This will start the server and you should be able to navigate to the ip address of your server and see the latest React front-end


