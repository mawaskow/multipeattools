import os
import json
from sys import exit
from flask import Flask
from flask import url_for, render_template, send_file, request, redirect
from werkzeug.utils import secure_filename
from flask_wtf.csrf import CSRFProtect
from flask_sqlalchemy import SQLAlchemy
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

'''
ROUTES
'''
@app.route('/')
def landingpage():
    return redirect(url_for('map_page'))

@app.route('/map', methods=['GET', 'POST'])
def map_page():
    return render_template("map.html")

@app.route('/ffptool', methods=['GET', 'POST'])
def ffp_tool():
    #initializes values for populating each the user input and assumptions forms with default variables
    #and loads the dictionary values into a list for passing through Erica's function that calculates results
    aform = assum_json_to_dict(FFP_FIN_ASSUM_FILE)
    uform = usrinp_json_to_dict(FFP_FIN_USR_INP_FILE)
    with open(FFP_RESULTS) as json_file:
        results_dict = json.load(json_file)
    return render_template("ffp_tool.html", aform=aform, uform=uform, results_dict = results_dict)

@app.route('/settool', methods=['GET', 'POST'])
def set_tool():
    #initializes values for populating form
    #and loads the dictionary values into a list for passing through function that calculates results
    # load json into dict --  populates form via variable passed to html
    # load dict into list of arguments for function
    # calculate output
    #
    with open(SET_INIT_INPT_FILE) as json_file:
        input_dct = json.load(json_file)
    with open(SET_OUTPUT_FILE) as json_file:
        results_dct = json.load(json_file)
    return render_template("set_tool.html", results= results_dct, inpt = input_dct)

@app.route('/keywords')
def policy_keywords():
    return render_template("keywords.html")

@app.route('/policy')
def policy():
    return render_template("policy.html")

@app.route('/getpols/<int:lint>')
def getpols_eventual(lint):
    lvldct = {0:'European',1:'Global'}
    level = lvldct[lint]
    conn = get_db_cnxn()
    cur = conn.cursor()
    cur.execute(f"SELECT name, level, classif, link FROM geo_pol WHERE level='{level}'")
    policies = cur.fetchall()
    cur.close()
    conn.close()
    return policies

'''
Admin
'''
@app.route('/login')
def login():
    return render_template("login.html")

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
