import os
import json
from sys import exit
from flask import Flask
from flask import url_for, render_template, send_file, request, redirect
from werkzeug.utils import secure_filename
from flask_wtf.csrf import CSRFProtect
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from flask_wtf.csrf import CSRFProtect
from flask import Flask, render_template, request, redirect, url_for, session
from flask import Flask, flash, redirect, url_for, render_template
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, validators
import psycopg2
from flask import request, jsonify
#
from modules import get_db_cnxn, assum_json_to_dict, usrinp_json_to_dict

# powershell: $env:FLASK_APP = "run"
# bash: export FLASK_APP=run
# flask run

app = Flask(__name__)

SECRET_KEY = "please_dont_hack_us_thanks"
app.config['SECRET_KEY'] = SECRET_KEY

csrf = CSRFProtect(app)

'''
APP CONFIGURATION
'''
ALLOWED_EXTENSIONS = {'txt', 'json'}
# populates SET and FFP pages with python from jsons
# FFP inputs
FFP_FIN_ASSUM_FILE = "./inputs/final_assumptions.json"
FFP_RESULTS = './inputs/results_default_ffp.json'
# FFP results
FFP_FIN_USR_INP_FILE = "./inputs/user_input_data.json"
# SET inputs
SET_INIT_INPT_FILE = './inputs/user_input_SET.json'
GEST_CSV= ['./inputs/GEST_2_Static_Values.csv']
# SET results
SET_OUTPUT_FILE = './inputs/output_SET.json'
#
KWD_FILE = './static/keywords.json'

'''
Admin Login Settings
'''
DB_NAME = 'geoapp'
DB_USER = 'postgres'
DB_PASSWORD = 'P0stgr3sql'
DB_HOST = '140.203.155.91'
DB_PORT = '5432'

def connect_db():
    return psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
conn_params = {
    'dbname': 'geoapp',
    'user': 'postgres',
    'password': 'P0stgr3sql',
    'host': '140.203.155.91',
    'port': '5432'
}

class RegistrationForm(FlaskForm):
    username = StringField('Username', [validators.Length(min=4, max=25)])
    password = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password')
    submit = SubmitField('Sign Up')

class LoginForm(FlaskForm):
    username = StringField('Username', [validators.InputRequired()])
    password = PasswordField('Password', [validators.InputRequired()])
    submit = SubmitField('Sign In')

@app.route('/register', methods=['GET', 'POST'])
def signup():
    form = LoginForm()
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        try:
            # Establish a connection to the database
            with psycopg2.connect(**conn_params) as conn:
                with conn.cursor() as cur:
                    # Execute the insert statement with parameterized query
                    cur.execute(
                        "INSERT INTO users (email, password, name) VALUES (%s, %s, %s)",
                        (email, password, name)
                    )
                    # Commit the transaction
                    conn.commit()

            flash('User signed up successfully!')
            return redirect(url_for('login'))
        except psycopg2.Error as e:
            # Handle any database errors
            return f'Error: {e}'
    else:
        # Render the sign-up form template
    
     return render_template('register.html',form=form)


# Index page
@app.route('/login', methods=['GET', 'POST'])

def login():
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        try:
            username = form.username.data
            password = form.password.data
            db = connect_db()
            cur = db.cursor()
            cur.execute("SELECT * FROM users WHERE email = %s AND password = %s", (username, password))
            user = cur.fetchone()
            cur.close()
            db.close()
            if user:
                session['username'] = username
                #flash('User Logged In successfully!', 'success')
                return redirect(url_for('dashboard'))  # Redirect to dashboard route
            else:
                flash('Invalid username or password. Please try again.', 'danger')
        except Exception as e:
            flash('An error occurred. Please try again.', 'danger')
            print(f"Error: {e}")  # Log the error to the console or a log file
            return render_template('login.html', form=form)
    
    # Check if user is already logged in
    if 'username' in session:
        return redirect(url_for('map_page'))  # Redirect to dashboard route if already logged in
    
    return render_template('login.html', form=form)
@app.route('/logout', methods=['POST', 'GET'])
def logout():
    # Clear the session data
    session.pop('username', None)
    return jsonify({'message': 'Logout successful'}), 200
@app.route('/dashboard')
def dashboard():
    if 'username' in session:
     return render_template('map.html', username=session['username'])
    return redirect(url_for('login'))

'''
ROUTES
'''
@app.route('/')
def landingpage():
    return redirect(url_for('map_page'))

@app.route('/map', methods=['GET', 'POST'])
def map_page():
    username = session.get('username')
    if username is None:
        return render_template('map.html')
    return render_template('map.html', username=session['username'])

@app.route('/ffptool', methods=['GET', 'POST'])
def ffp_tool():
    username = session.get('username')
    if username is None:
        with open(FFP_RESULTS) as json_file:
            results_dict = json.load(json_file)
        aform = assum_json_to_dict(FFP_FIN_ASSUM_FILE)
        uform = usrinp_json_to_dict(FFP_FIN_USR_INP_FILE)
        return render_template('ffp_tool.html',aform=aform, uform=uform, results_dict=results_dict)
    else:
        with open(FFP_RESULTS) as json_file:
            results_dict = json.load(json_file)
        # initializes values for populating each the user input and assumptions forms with default variables
        # and loads the dictionary values into a list for passing through Erica's function that calculates results
        aform = assum_json_to_dict(FFP_FIN_ASSUM_FILE)
        uform = usrinp_json_to_dict(FFP_FIN_USR_INP_FILE)
        with open(FFP_RESULTS) as json_file:
            results_dict = json.load(json_file)
    
    return render_template('ffp_tool.html', username=session['username'], aform=aform, uform=uform, results_dict=results_dict)

@app.route('/settool', methods=['GET', 'POST'])
def set_tool():
    username = session.get('username')
    if username is None:
        with open(SET_INIT_INPT_FILE) as json_file:
            input_dct = json.load(json_file)
        with open(SET_OUTPUT_FILE) as json_file:
            results_dct = json.load(json_file)
        return render_template('set_tool.html',results=results_dct,inpt=input_dct)
    
    # If username is present in session, load input and output files, and render template
    with open(SET_INIT_INPT_FILE) as json_file:
        input_dct = json.load(json_file)
    with open(SET_OUTPUT_FILE) as json_file:
        results_dct = json.load(json_file)
    
    return render_template("set_tool.html", username=session['username'], results=results_dct, inpt=input_dct)

@app.route('/keywords', methods=['GET', 'POST'])
def policy_keywords():
    username = session.get('username')
    if username is None:
        return render_template('keywords.html')
    return render_template('keywords.html', username=session['username'])
    
@app.route('/policy', methods=['GET', 'POST'])
def policy():
    if 'username' not in session:
         return render_template('policymain.html')
    return render_template('policymain.html', username=session['username'])

@app.route('/stakeholders', methods=['GET', 'POST'])
def stakeholders():
    if 'username' not in session:
         return render_template('stakeholders.html')
    return render_template('stakeholders.html', username=session['username'])

# DATA ENDPOINTS

@app.route('/policy/level=<level>')
def policy_bylevel(level):
    conn = connect_db()
    if conn is None:
        return None  # Return None or handle error as needed
    cur = conn.cursor()
    try:
        cur.execute(f"SELECT engname,dates,engabst,classif,country,link,publisher,level FROM upd_geopol WHERE level='{level}'")
        data = cur.fetchall()
    except psycopg2.Error as e:
        print(f"Error fetching data: {e}")
        return None
    finally:
        cur.close()
        conn.close()
        return data
    
@app.route('/policy/categ=<categ>')
def policy_bycateg(categ):
    categdct = {"bio":"Biodiversity",
                "clm":"Climate",
                "enr":"Energy",
                "econ":"Economy",
                "land":"Land-Use / Agriculture",
                "comm":"Community and Culture",
                "res":"Research and applied sciences",
                "env":"Environmental quality: water, soil, air"}
    conn = connect_db()
    if conn is None:
        return None  # Return None or handle error as needed
    cur = conn.cursor()
    try:
        cur.execute(f"SELECT engname,dates,engabst,classif,country,link,publisher,level FROM upd_geopol WHERE classif='{categdct[categ]}'")
        data = cur.fetchall()
    except psycopg2.Error as e:
        print(f"Error fetching data: {e}")
        return None
    finally:
        cur.close()
        conn.close()
        return data

@app.route('/policy/country=<country>')
def policyCountry(country):
    conn = connect_db()
    if conn is None:
        return None  # Return None or handle error as needed
    cur = conn.cursor()
    try:
        cur.execute("SELECT engname,dates,engabst,classif,country,link,publisher,level FROM upd_geopol WHERE country LIKE %s", ('%' + country + '%',))
        data = cur.fetchall()
    except psycopg2.Error as e:
        print(f"Error fetching data: {e}")
        return None
    finally:
        cur.close()
        conn.close()
        return data

@app.route('/getpols/<int:lint>')
def getpols_eventual(lint):
    lvldct = {0:'European',1:'Global'}
    level = lvldct[lint]
    conn = get_db_cnxn()
    cur = conn.cursor()
    cur.execute(f"SELECT engname, level, classif, link FROM upd_geopol WHERE level='{level}'")
    policies = cur.fetchall()
    cur.close()
    conn.close()
    return policies

@app.route('/getkwds')
def getkwds():
    with open(KWD_FILE, encoding="utf-8") as json_file:
        kwds = json.load(json_file)
    return kwds

'''
Error Handling
'''
@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

@app.errorhandler(400)
def bad_request_error(error):
    return render_template('400.html'), 400

if __name__ == "__main__":
    #app.run(debug=True, passthrough_errors=True, use_debugger=False, use_reloader=False)
    app.run(host='0.0.0.0', port=5000)
