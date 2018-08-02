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
1. Get the project from the working repo (read the git documentation on the web) into your main project folder
2. Run "pip install -r requirements.txt" in the PyCharm terminal. That will install all the required packages into your
virtual environment
3. Run "python manage.py migrate" to initially set up the database
4. If you install any additional packages, run the following command in the PyCharm terminal:
"pip freeze > requirements.txt". This will add the packages to the requiremens file, so that anyone else
who downloads the project can install the required packages too.