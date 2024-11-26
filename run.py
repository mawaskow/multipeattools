import os
import json
from sys import exit
from flask import Flask
from flask import url_for, render_template, send_file, request, redirect, session, send_from_directory, flash, jsonify
from werkzeug.utils import secure_filename
from flask_wtf import FlaskForm
from flask_wtf.csrf import CSRFProtect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
from wtforms import StringField, PasswordField, SubmitField, validators
import psycopg2
#
from modules import assum_json_to_dict, usrinp_json_to_dict
import requests
#added remarks for run.py
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

def create_dataendpoint(url):
    headers = {
        'Content-Type': 'application/json'
        #'Cookie': 'session_id='+str(cookie_value)
    }
    # Prepare the JSON payload
    payload = {
        "jsonrpc": "2.0",
        "params": {}
    }
    # Send the GET request
    #response = requests.get(url, headers=headers, json=payload)
    response = requests.post(url, headers=headers, json=payload, stream=True)
    # Check if the request was successful
    if response.status_code == 200:
        try:
            # Parse the JSON response
            data = response.json()
            #print(json.dumps(data, indent=2))
        except ValueError:
            print("Invalid JSON response")
    else:
        print(f"Request failed with status code {response.status_code}")
        print(response.text)
    return data

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
        url = 'http://140.203.154.253:8016/aspect/signup/'
        headers = {'Content-Type': 'application/json'}
        data = {
        'jsonrpc': '2.0',
        'params': {
        "db": "aspect",
        "login": email,
        "password": password,
        "name": name}
    }
        response = requests.post(url, headers=headers, json=data, stream=True)
        data = response.json()
        print(json.dumps(data, indent=2))
        result = data.get("result", {})
        status = result.get("status")
        message_text = result.get("message")
        if status == 200 and message_text == "success":
                 flash('User signed up successfully!')
                 return redirect(url_for('login'))
        else:
                 flash('User signed up Failed!')
                 return render_template('register.html',form=form)
    else:
                 return render_template('register.html',form=form)
# Check if the request was successful
def authenticate_external_api(username, password):
    
    print("authenticate_external_api called with Username:", username) 
    url = 'http://140.203.154.253:8016/web/session/authenticate'
    headers = {'Content-Type': 'application/json'}
    data = {
    'jsonrpc': '2.0',
    'params': {
        "db": "aspect",
        "login": username,
        "password": password
    }
}
    headers = {
        'Content-Type': 'application/json',
        'Cookie': 'session_id=108ca25e671d3265eab2a008c0d97de905642029'
    }
    
    try:
        print("Sending API request...")
        response = requests.post(url, headers=headers, json=data, stream=True)
        data = response.content 
        
            
        
        # Decode the response from bytes to a string
        response = json.loads(data.decode("utf-8"))
        
        # Print the entire response for debugging
        print("API Response:", json.dumps(response, indent=4))  # Pretty-print the response
        
        # Check for a successful response
        if 'result' in response:
            print("Authentication successful.")
            return True, response['result']
        else:
            print("Authentication failed:", response.get('error', 'Unknown error occurred'))
            return False, response.get('error', 'Unknown error occurred')
    
    except Exception as e:
        # Print the exception details
        print(f"Error during API request: {e}")
        return False, str(e)
# Index page
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        try:
            username = form.username.data
            password = form.password.data
            print("Form data - Username:", username)
            print("Form data - Password:", password)
            print("Calling authenticate_external_api()...")
            # Authenticate using the external API
            success, result = authenticate_external_api(username, password)
            print("API call returned. Success:", success)
            print("API result:", result)
        
            if success:
                print("Authentication successful, storing session data...")
                # Store relevant session information
                session['username'] = result['username']
                session['user_id'] = result['uid']
                session['name'] = result['name']
                session['company_id'] = result['company_id']
                
                # Redirect to dashboard or home after successful login
                return redirect(url_for('dashboard'))
        
            else:
                # Handle API login failure
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

@app.route('/about', methods=['GET', 'POST'])
def about():
    username = session.get('username')
    if username is None:
        return render_template('about.html')
    return render_template('about.html', username=session['username'])

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
    
@app.route('/policy-suggestion', methods=['GET', 'POST'])
def sub_policy():
    #
    categdct = {
        'bio-cls': 1,
        'clm-cls': 2,
        'enr-cls': 3,
        'econ-cls': 4,
        'land-cls': 5,
        'comm-cls': 6,
        'res-cls': 7,
        'env-cls': 8
    }
    if request.method == 'POST':
        #url = 'http://localhost:8616/aspect/create_policy/'
        url = 'http://140.203.154.253:8016/aspect/create_policy/'
        # Set up the headers
        headers = {
            'Content-Type': 'application/json',
            #='Cookie': 'session_id='+str(cookie_value)
        }
        # get policy level for conditional
        policy_level = request.form['govlvl']
        category_list = []
        pub_list = []
        stk_list = []
        kwd_list=[]
        # get category list
        for key in list(categdct):
            # try/ except so non-selected categories don't trigger bad request 
            try: 
                if request.form[key]:
                    category_list.append(categdct[key])
            except:
                pass
        # get publisher list and handle "other"
        # [int(entry) for entry in request.form.getlist('polpub')] if request.form['polpub'] else [] # triggers error when "other"
        # try/except for 
        try:
            for entry in request.form.getlist('polpub'):
                if entry != "other":
                    pub_list.append(int(entry))
        except:
            pass
        # get stakeholder list and handle "other"
        try:
            for entry in request.form.getlist('polsta'):
                if entry != "other":
                    stk_list.append(int(entry))
        except:
            pass
        # if english name is empty, set to native language name
        engname = request.form['engtitle']
        if engname == "":
            engname = request.form['nattitle']
        # get keyword list [may need to handle 'other' in future]
        try:
            for entry in request.form.getlist('polkwd'):
                kwd_list.append(int(entry))
        except:
            pass
        #
        payload = {
            "jsonrpc": "2.0",
            "params": {
                "name": engname,
                "name_language": request.form['nattitle'],
                "language": request.form['pollang'],
                "type": "Policy",  
                "category": category_list,
                "policy_level": request.form['govlvl'],  
                "country_group": 1,  
                "country": request.form['ctry'],  
                "localauthority1": request.form['loc'], 
                "nuts_level_1": '' if policy_level in ['Global', 'European'] else request.form['reg'],  # Conditional assignment
                "year_from": request.form['startyr'],  
                "year_to": request.form['endyr'],
                "publisher": pub_list,
                "publisher_char": request.form['polpub_t'],
                "stakholder_ids": stk_list,
                "stakeholder_char": request.form['polsta_t'],
                "publisher_link": request.form['pglnk'], 
                "data_link": request.form['pdflnk'],  
                "excerpt": request.form['excnat'],  
                "excerpt_english": request.form['exceng'],  
                "abstract": request.form['absnat'],  
                "abstract_english": request.form['abseng'],  
                "keywords":kwd_list,
                "state": "Draft"
            }
        }
        # Send the GET request
        print(payload)
        response = requests.post(url, headers=headers, json=payload, stream=True)
        # Check if the request was successful
        if response.status_code == 200:
            try:
                # Parse the JSON response
                data = response.json()
                print(json.dumps(data, indent=2))
                print ('policy suggestion sent successfully')
                result = data.get("result", {})
                status = result.get("status")
                message_text = result.get("message")
                if status == 200 and message_text == "success":
                 message = "We have received your policy suggestion!"
                else:
                 message = "Policy suggestion failed. Please try again."
                return render_template('polsubmit.html',message=message)
            except ValueError:
                return render_template('polsubmit.html',message="Policy suggestion failed. Please try again")
        else:
            return render_template('polsubmit.html',message="Policy suggestion failed. Please try again")
        
    # non-post request
    if 'username' not in session:
         return render_template('polsubmit.html')
    return render_template('polsubmit.html', username=session['username'])

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
    #conn = get_db_cnxn()
    conn = connect_db()
    cur = conn.cursor()
    cur.execute(f"SELECT engname, level, classif, link FROM upd_geopol WHERE level='{level}'")
    policies = cur.fetchall()
    cur.close()
    conn.close()
    return policies

@app.route('/categorydata')
def getcateg():
    url = 'http://140.203.154.253:8016/aspect/category/'
    return create_dataendpoint(url)

@app.route('/countrydata')
def getctry():
    url = 'http://140.203.154.253:8016/aspect/countries/'
    return create_dataendpoint(url)

@app.route('/localdata/<int:code>')
def getlocal(code):
    url = f'http://140.203.154.253:8016/aspect/state/{code}/'
    return create_dataendpoint(url)

@app.route('/nutsdata/<int:code>')
def getnuts(code):
    url = f'http://140.203.154.253:8016/aspect/nuts/{code}/'
    return create_dataendpoint(url)

@app.route('/languagedata')
def getlangs():
    url = 'http://140.203.154.253:8016/aspect/languages/'
    return create_dataendpoint(url)

@app.route('/keyworddata')
def getkwdsnew():
    url = 'http://140.203.154.253:8016/aspect/keywords/'
    return create_dataendpoint(url)

@app.route('/stakeholderdata/<int:code>')
def getstknew(code):
    url = f'http://140.203.154.253:8016/aspect/stakeholders/{code}/'
    return create_dataendpoint(url)

@app.route('/publisherdata/<int:code>')
def getpubs(code):
    url = f'http://140.203.154.253:8016/aspect/publishers/{code}/'
    return create_dataendpoint(url)

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
