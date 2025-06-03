import os
import json
from sys import exit
from flask import Flask
from flask import url_for, render_template, send_file, request, redirect, session, send_from_directory, flash, jsonify, abort
from werkzeug.utils import secure_filename
from flask_wtf import FlaskForm
from flask_wtf.csrf import CSRFProtect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
from wtforms import StringField, PasswordField, SubmitField, validators
import psycopg2
from datetime import datetime
import csv
import time
import pandas as pd
import glob
import logging
from markupsafe import Markup
import markdown
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
app.config['MAX_CONTENT_LENGTH'] = 1e8 # 100MB
app.config['UPLOAD_PATH'] = 'uploads'

csrf = CSRFProtect(app)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
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
SAVE_DIR = "saved_files"
os.makedirs(SAVE_DIR, exist_ok=True)  # Ensure directory exists

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

@app.route('/uploads/<filename>')
def upload(filename):
    return send_from_directory(app.config['UPLOAD_PATH'], filename)

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
        # if language, convert to int
        lang = request.form['pollang']
        if lang != "":
            lang = int(request.form['pollang'])
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
                "language": lang,
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
                "additional_info":request.form['addtl'],
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

def fix_markdown_headings_properly(text):
    """Dummy markdown fixer. Replace with your actual logic."""
    return text  # Assuming your original logic will go here

@app.route('/qa-tool', methods=['GET', 'POST'])
def qa_tool():
    if request.method == 'GET':
        return render_template("qa_tool.html")
    elif request.method=='POST':
        reasoning = None
        policies = []
        # Get user input
        question = request.form.get('question')
        language = request.form.get('language')
        category = request.form.get('category')
        country = request.form.get('country')
        governance = request.form.get('governance')
        # Build query parameters
        query_params = {"query": question}
        if language: query_params['language'] = language
        if category: query_params['category'] = category
        if country: query_params['country'] = country
        if governance: query_params['governance_level'] = governance

        if question:
            try:
                # Step 1: Call the RAG backend
                response = requests.get(
                    "https://test-multipeat.insight-centre.org/ask",
                    params=query_params,
                    headers={'Accept': 'application/json'},
                    timeout=200
                )

                if response.status_code == 200:
                    response_data = response.json()
                    raw_answer = response_data.get('answer', "No answer provided.")
                    sources = response_data.get('sources', [])

                    # Fallback checks
                    fallback_phrases = [
                        "do not contain", "does not provide information",
                        "not found in the provided documents", "no relevant documents"
                    ]
                    lowered = raw_answer.lower()
                    is_fallback = any(phrase in lowered for phrase in fallback_phrases)
                    is_too_short = len(raw_answer.strip()) < 50

                    if not is_fallback and not is_too_short:
                        # Step 2: Process reasoning
                        fixed_raw_answer = fix_markdown_headings_properly(raw_answer)
                        reasoning_html = Markup(markdown.markdown(fixed_raw_answer))
                        reasoning = reasoning_html

                        max_score = max([s['score'] for s in sources], default=1)

                        # Step 3: Process each source
                        for src in sources:
                            policy_id = src.get("record_id")
                            file_links = []

                            if policy_id:
                                try:
                                    logging.info(f"Fetching attachments for policy ID: {policy_id}")
                                    file_resp = requests.post(
                                        f"http://aspect-erp.insight-centre.org:8016/aspect/policy/{policy_id}/files",
                                        headers={
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json'
                                        },
                                        json={},  # Important: send empty JSON
                                        timeout=30
                                    )
                                    logging.info(f"Odoo response status: {file_resp.status_code}")
                                    logging.info(f"Odoo raw body: {file_resp.text}")

                                    if file_resp.ok:
                                        file_data = file_resp.json()
                                        # Correct way to get attachments (inside 'result')
                                        file_links = file_data.get('result', {}).get('attachments', [])
                                        logging.info(f"Fetched attachments for policy {policy_id}: {file_links}")
                                    else:
                                        logging.warning(f"Odoo responded with status {file_resp.status_code} for policy {policy_id}")

                                except Exception as fe:
                                    logging.warning(f"Failed to fetch attachments for policy {policy_id}: {fe}")

                            policies.append({
                                "title": src.get("author", "Unknown"),
                                "thumbnail_url": "/static/images/pdf_thumbnail.png",
                                "country": src.get("country", "Unknown"),
                                "language": src.get("language", "Unknown"),
                                "author": src.get("author", "Unknown"),
                                "evidence_location": f"Score: {src['score']}",
                                "similarity": round((src['score'] / max_score) * 100, 1),
                                "files": file_links  # Corrected: fetched from Odoo
                            })
                    else:
                        reasoning = raw_answer
                else:
                    reasoning = f"API Error {response.status_code}: {response.text}"

            except Exception as e:
                reasoning = f"Failed to get response: {str(e)}"
                logging.error("Exception occurred while fetching response: %s", str(e))
        return render_template(
            "qa_tool.html",
            reasoning=reasoning,
            policies=policies,
            asked_question=question,
            selected_language=language,
            selected_category=category,
            selected_country=country,
            selected_governance=governance
        )

# DATA ENDPOINTS

@app.route('/categorydata')
def getcateg():
    url = 'http://140.203.154.253:8016/aspect/category/'
    return create_dataendpoint(url)

@app.route('/policydata')
def getpols():
    url = 'http://140.203.154.253:8016/aspect/policies/'
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

from flask import Flask, request, jsonify
@app.route('/save-csv', methods=['POST'])
@csrf.exempt 
def save_csv():
    try:
        # Check if username is in session
        if "username" not in session:
            return jsonify({"error": "Login Required, You need to log in to save your data "}), 401  # Unauthorized

        username = session["username"]  # Retrieve username from session

        # Extract JSON data
        data = request.get_json()
        print("Parsed JSON:", data)

        if not data:
            return jsonify({"error": "Empty JSON received"}), 400

        if "csvData" not in data:
            return jsonify({"error": "Missing 'csvData' key"}), 400

        csv_content = data["csvData"]

        # Process CSV string into list of lists
        csv_rows = [row.split(",") for row in csv_content.split("\r\n") if row]  # Split rows properly

        # Generate a timestamped filename with username
        timestamp = time.strftime("%Y%m%d-%H%M%S")  # e.g., "20250224-130530"
        csv_filename = f"{username}_{timestamp}.csv"

        # Ensure directory exists
        os.makedirs("csv_outputs", exist_ok=True)
        file_path = os.path.join("csv_outputs", csv_filename)

        # Save to CSV file
        with open(file_path, "w", newline="") as file:
            writer = csv.writer(file)
            writer.writerows(csv_rows)

        print(f"CSV saved as {file_path}")

        return jsonify({"message": "Your Data has been saved successfully saved", "filename": csv_filename}), 200

    except Exception as e:
        print("Exception occurred:", e)
        return jsonify({"error": str(e)}), 500
    
UPLOAD_FOLDER = "/Users/waqasshoukatali/multipeattools/test_git_multipeat/csv_outputs"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def get_latest_csv(username):
    """Find the latest CSV file for the logged-in user"""
    folder_path = app.config["UPLOAD_FOLDER"]
    pattern = os.path.join(folder_path, f"{username}_*.csv")  # Match CSV files
    files = glob.glob(pattern)

    valid_files = [f for f in files if os.path.isfile(f)]
    if not valid_files:
        return None  # No valid file found

    latest_file = max(valid_files, key=os.path.getctime)  # Get the most recent file
    return latest_file  # Return only the latest file path

UPLOAD_FOLDER = "/Users/waqasshoukatali/multipeattools/test_git_multipeat/"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def get_latest_csv(username):
    """Find the latest CSV file for the logged-in user"""
    folder_path = app.config["UPLOAD_FOLDER"]
    pattern = os.path.join(folder_path, f"{username}_*.csv")
    files = glob.glob(pattern)

    valid_files = [f for f in files if os.path.isfile(f)]
    if not valid_files:
        return None  # No valid file found

    return max(valid_files, key=os.path.getctime)  # Return latest file

def get_all_csv_files(username):
    """Get all CSV files for a specific user"""
    # Define the path where user CSV files are stored
    csv_folder = os.path.join(app.config['UPLOAD_FOLDER'], 'csv_outputs')
    
    # Check if the directory exists
    if not os.path.exists(csv_folder):
        print(f"Warning: CSV folder does not exist: {csv_folder}")
        return []
    
    # Get all CSV files in the directory that match the username pattern
    csv_files = []
    try:
        for filename in os.listdir(csv_folder):
            if filename.startswith(f"{username}_") and filename.endswith(".csv"):
                csv_files.append(os.path.join(csv_folder, filename))
                
        # Alternative pattern matching based on your file naming convention
        if not csv_files:  # If no files found with the above pattern
            for filename in os.listdir(csv_folder):
                if filename.startswith(f"{username}") and filename.endswith(".csv"):
                    csv_files.append(os.path.join(csv_folder, filename))
        
        print(f"Found {len(csv_files)} CSV files for user {username}")
    except Exception as e:
        print(f"Error listing CSV files: {str(e)}")
    
    return csv_files

@app.route("/getAvailableSites", methods=["GET"])
def get_available_sites():
    if "username" not in session:
        return jsonify({"error": "User not logged in"}), 401
    
    username = session["username"]
    
    # Get all available CSV files for this user
    csv_files = get_all_csv_files(username)
    
    sites = []
    for idx, csv_file in enumerate(csv_files):
        try:
            if not os.path.exists(csv_file):
                print(f"Warning: File not found: {csv_file}")
                continue
            
            # Extract a meaningful site name from the CSV content
            site_name = extract_site_name_from_csv(csv_file)
            
            # If we couldn't extract a site name, fall back to the filename
            filename = os.path.basename(csv_file)
            display_name = site_name if site_name else filename.replace(f"{username}_", "")
            
            sites.append({
                "id": idx, 
                "name": display_name,  # This is what shows in the dropdown
                "file": filename  # This is the actual filename used for data loading
            })
        except Exception as e:
            print(f"Error processing {csv_file}: {str(e)}")
    
    return jsonify(sites)

def extract_site_name_from_csv(csv_file):
    """
    Extract a proper site name from the CSV file.
    Returns None if no site name could be found.
    """
    try:
        with open(csv_file, "r", encoding="utf-8") as file:
            current_section = None
            for line in file:
                line = line.strip()
                if not line:
                    continue
                
                if "," not in line:
                    current_section = line
                # Look for site name in common locations
                elif current_section == "General Site Data" and line.startswith("Site Name"):
                    return line.split(",", 1)[1].strip()
                elif line.startswith("Site Name") or line.startswith("Name"):
                    return line.split(",", 1)[1].strip()
                elif current_section is None and line.startswith("Site:"):
                    return line.split(":", 1)[1].strip()
            
            # If we couldn't find a proper site name, look for a date in the filename
            # which might be more meaningful than the full filename
            filename = os.path.basename(csv_file)
            import re
            date_match = re.search(r'(\d{8}|\d{6}|\d{4}-\d{2}-\d{2})', filename)
            if date_match:
                date_str = date_match.group(0)
                return f"Site data from {date_str}"
            
            return None
    except Exception as e:
        print(f"Error extracting site name from {csv_file}: {str(e)}")
        return None
    
@app.route("/fetchSiteData/<file_name>", methods=["GET"])
def fetch_site_data(file_name):
    """Fetch data from a specific CSV file"""
    if "username" not in session:
        return jsonify({"error": "User not logged in"}), 401  # Unauthorized
    
    username = session["username"]
    
    # Define the correct path to the CSV files folder
    csv_folder = os.path.join(app.config['UPLOAD_FOLDER'], 'csv_outputs')
    
    # The full path to the file - check both naming patterns
    file_path = os.path.join(csv_folder, file_name)
    
    # Debug information
    print(f"Looking for file: {file_path}")
    print(f"File exists: {os.path.exists(file_path)}")
    
    if not os.path.exists(file_path):
        return jsonify({"error": f"File not found at {file_path}"}), 404
    
    try:
        structured_data = {}
        current_section = None
        with open(file_path, "r", encoding="utf-8") as file:
            for line in file:
                line = line.strip()
                if not line:
                    continue
                
                if "," not in line:
                    current_section = line
                    structured_data[current_section] = {}
                else:
                    key, value = map(str.strip, line.split(",", 1))
                    if value.startswith("[") and value.endswith("]"):
                        try:
                            value = ast.literal_eval(value)
                        except:
                            pass
                    if current_section:
                        structured_data[current_section][key] = value
                    else:
                        structured_data[key] = value
        
        return jsonify(structured_data)
    except Exception as e:
        import traceback
        traceback_str = traceback.format_exc()
        print(f"Error reading file {file_path}: {str(e)}\n{traceback_str}")
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

@app.route("/fetchTestData", methods=["GET"])
def fetch_test_data():
    """Fetch the latest CSV file for the logged-in user"""
    if "username" not in session:
        return jsonify({"error": "User not logged in"}), 401  # Unauthorized

    username = session["username"]
    latest_csv = get_latest_csv(username)

    if not latest_csv:
        return jsonify({"error": "No data found"}), 404  # No CSV file found

    try:
        structured_data = {}
        current_section = None  # Track current section header

        with open(latest_csv, "r", encoding="utf-8") as file:
            for line in file:
                line = line.strip()

                if not line:
                    continue  # Skip empty lines
                
                if "," not in line:
                    # If line has no comma, treat it as a section header
                    current_section = line
                    structured_data[current_section] = {}
                else:
                    # Process key-value pairs
                    key, value = map(str.strip, line.split(",", 1))

                    # Convert list-like values properly
                    if value.startswith("[") and value.endswith("]"):
                        try:
                            value = ast.literal_eval(value)  # Convert to actual list
                        except:
                            pass  # Keep as string if conversion fails

                    if current_section:
                        structured_data[current_section][key] = value
                    else:
                        structured_data[key] = value  # Handle cases without section headers

        return jsonify(structured_data)
        #return render_template("results.html", data=structured_data)


    except FileNotFoundError:
        return jsonify({"error": "CSV file not found"}), 404

    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500



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
    app.run(debug=True)
    app.run(host='0.0.0.0', port=5000)
