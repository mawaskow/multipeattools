import os
from sys import exit
from flask import Flask
from flask import url_for, render_template, request, redirect, jsonify, make_response
from flask_wtf.csrf import CSRFProtect
from werkzeug.utils import secure_filename
import json
#
from modules import parse_assum, update_assum, FFPAssumForm, FFPUserInputForm, parse_usrinp, update_usrinp
from VSCode_FF_Eqns import Output_From_Json

# powershell: $env:FLASK_APP = "run"
# bash: export FLASK_APP=run
# flask run

app = Flask(__name__)

csrf=CSRFProtect(app)
'''
APP CONFIGURATION
'''
ALLOWED_EXTENSIONS = {'txt', 'json'}

SECRET_KEY = "please_dont_hack_us_thanks"
app.config['SECRET_KEY'] = SECRET_KEY

#FFP ASSUMPTION FORM
FFP_INIT_ASSUM_FILE = "./static/initial_assumptions.json"
FFP_FIN_ASSUM_FILE = "./inputs/final_assumptions.json"
#FFP USER INPUT FORM
FFP_INIT_USR_INP_FILE = "./static/user_input_default.json"
FFP_FIN_USR_INP_FILE = "./inputs/user_input_data.json"

'''
Internal Functions
'''
#FFP TOOL
# initialize final assumption file with default values
ajsondata = parse_assum(FFP_INIT_ASSUM_FILE)
update_assum(FFP_FIN_ASSUM_FILE, ajsondata)
# initialize final user input file with default values
ujsondata = parse_usrinp(FFP_INIT_USR_INP_FILE)
update_usrinp(FFP_FIN_USR_INP_FILE, ujsondata)

'''
ROUTES
'''
@app.route('/')
def landingpage():
    return redirect(url_for('homepage'))
    
@app.route('/home')
def homepage():
    return render_template('home.html')

@app.route('/ffptool', methods=['GET', 'POST'])
def ffp_tool():
    #initialize submission notification variables
    asubmitted=False
    usubmitted= False
    #initialize forms from modules.py -defined classes
    aform = FFPAssumForm()
    uform = FFPUserInputForm()
    # if assumption form is submitted
    if aform.validate_on_submit():
        # store the information from the form into a list
        aformdata = [aform.avg_cred_p_hect_p_yr.data, aform.nom_int_rt.data, aform.inflation_rt.data, aform.reg_acct_open_fee.data, aform.reg_listing_cost_p_credit.data, aform.reg_conv_cost_fee_p_inspect.data, aform.reg_conv_cost_p_cred_abv_min_thresh_of_credits.data, aform.reg_levy_cost_p_cred.data, aform.valid_and_verif_app_cost_p_inspect.data, aform.valid_and_verif_stmnt_cost_p_inspect.data, aform.valid_and_verif_inspctr_travel_cost_p_inspect.data, aform.inspect_cycle_len.data, aform.min_thresh_of_credits.data, aform.interest_rt.data, aform.payments_p_yr.data]
        # and update the assumption json file with the information
        update_assum(FFP_FIN_ASSUM_FILE, aformdata)
        asubmitted=True
    # if the user input form is submitted
    if uform.validate_on_submit():
        # store the information from the form into a list
        uformdata = [uform.num_yrs.data, uform.cred_p_hect_p_yr.data, uform.hect_restored.data, uform.invest_amt.data, uform.start_yr.data, uform.price_p_cred.data, uform.invest_costs_inc.data, uform.reg_costs_inc.data]
        # and update the user input json file with the information
        update_usrinp(FFP_FIN_USR_INP_FILE, uformdata)
        usubmitted=True
    # read the assumption information from the json (to display default values and updated values)
    aformdata = parse_assum(FFP_FIN_ASSUM_FILE)
    # unpack the information so it can be sent to the html
    [aform.avg_cred_p_hect_p_yr.data, aform.nom_int_rt.data, aform.inflation_rt.data, aform.reg_acct_open_fee.data, aform.reg_listing_cost_p_credit.data, aform.reg_conv_cost_fee_p_inspect.data, aform.reg_conv_cost_p_cred_abv_min_thresh_of_credits.data, aform.reg_levy_cost_p_cred.data, aform.valid_and_verif_app_cost_p_inspect.data, aform.valid_and_verif_stmnt_cost_p_inspect.data, aform.valid_and_verif_inspctr_travel_cost_p_inspect.data, aform.inspect_cycle_len.data, aform.min_thresh_of_credits.data, aform.interest_rt.data, aform.payments_p_yr.data] = aformdata
    # read the user input information from the json (to display default values and updated values)
    uformdata = parse_usrinp(FFP_FIN_USR_INP_FILE)
    # unpack the information so it can be sent to the html
    [uform.num_yrs.data, uform.cred_p_hect_p_yr.data, uform.hect_restored.data, uform.invest_amt.data, uform.start_yr.data, uform.price_p_cred.data, uform.invest_costs_inc.data, uform.reg_costs_inc.data] = uformdata
    # displays results beneath forms
    # calculates the result of the input files
    Output_From_Json(FFP_FIN_USR_INP_FILE, FFP_FIN_ASSUM_FILE)
    print("updated")
    FFP_SIMPLE_RESULT = "./outputs/simple_output.json"
    with open(FFP_SIMPLE_RESULT, "r") as result_json:
        result_json_text = json.load(result_json)
    return render_template("ffp_tool.html", aform=aform, asubmitted=asubmitted, uform=uform, usubmitted=usubmitted, result_json_text = result_json_text)

@app.route('/settool', methods=['GET', 'POST'])
def set_tool():
    return render_template("set_tool.html")

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
    app.run()