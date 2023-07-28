import os
from sys import exit
from flask import Flask
from flask import url_for, render_template, flash, request, redirect
from werkzeug.utils import secure_filename
import glob
import json
from flask_wtf.csrf import CSRFProtect
#
from modules import parse_assum, update_assum, FFPAssumForm, FFPUserInputForm, parse_usrinp, update_usrinp, assum_to_dict, usrinp_to_dict
from VSCode_FF_Eqns import Output_From_Json, Convert_to_Json
from Python_FeasibilityModel import Conditional_Executor

# powershell: $env:FLASK_APP = "run"
# bash: export FLASK_APP=run
# flask run

app = Flask(__name__)
csrf = CSRFProtect(app)

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
assumdata = parse_assum(FFP_INIT_ASSUM_FILE)
update_assum(FFP_FIN_ASSUM_FILE, assumdata)
# initialize final user input file with default values
userdata = parse_usrinp(FFP_INIT_USR_INP_FILE)
update_usrinp(FFP_FIN_USR_INP_FILE, userdata)

'''
ROUTES
'''
@app.route('/')
def landingpage():
    return redirect(url_for('homepage'))
    
@app.route('/home')
def homepage():
    return render_template('home.html')
'''
@app.route('/ffptool', methods=['GET', 'POST'])
def ffp_tool():
    #initialize submission notification variables
    asubmitted=False
    usubmitted= False
    #initialize forms from modules.py -defined classes
    aform = FFPAssumForm()
    uform = FFPUserInputForm()
    # if assumption form is submitted
    if request.method == 'POST':
        if aform.validate_on_submit():
            # store the information from the form into a list
            assumdata = [aform.avg_cred_p_hect_p_yr.data, aform.nom_int_rt.data, aform.inflation_rt.data, aform.reg_acct_open_fee.data, aform.reg_listing_cost_p_credit.data, aform.reg_conv_cost_fee_p_inspect.data, aform.reg_conv_cost_p_cred_abv_min_thresh_of_credits.data, aform.reg_levy_cost_p_cred.data, aform.valid_and_verif_app_cost_p_inspect.data, aform.valid_and_verif_stmnt_cost_p_inspect.data, aform.valid_and_verif_inspctr_travel_cost_p_inspect.data, aform.inspect_cycle_len.data, aform.min_thresh_of_credits.data, aform.interest_rt.data, aform.payments_p_yr.data]
            # and update the assumption json file with the information
            update_assum(FFP_FIN_ASSUM_FILE, assumdata)
            asubmitted=True
        # if the user input form is submitted
        if uform.validate_on_submit():
            # store the information from the form into a list
            userdata = [uform.num_yrs.data, uform.cred_p_hect_p_yr.data, uform.hect_restored.data, uform.invest_amt.data, uform.start_yr.data, uform.price_p_cred.data, uform.invest_costs_inc.data, uform.reg_costs_inc.data]
            # and update the user input json file with the information
            update_usrinp(FFP_FIN_USR_INP_FILE, userdata)
            usubmitted=True
        
        if request.form.get('reset_usrinpt') == "Reset to Defaults":
            userdata = parse_usrinp(FFP_INIT_USR_INP_FILE)
            update_usrinp(FFP_FIN_USR_INP_FILE, userdata)
    # read the assumption information from the json (to display default values and updated values)
    assumdata = parse_assum(FFP_FIN_ASSUM_FILE)
    # unpack the information so it can be sent to the html
    [aform.avg_cred_p_hect_p_yr.data, aform.nom_int_rt.data, aform.inflation_rt.data, aform.reg_acct_open_fee.data, aform.reg_listing_cost_p_credit.data, aform.reg_conv_cost_fee_p_inspect.data, aform.reg_conv_cost_p_cred_abv_min_thresh_of_credits.data, aform.reg_levy_cost_p_cred.data, aform.valid_and_verif_app_cost_p_inspect.data, aform.valid_and_verif_stmnt_cost_p_inspect.data, aform.valid_and_verif_inspctr_travel_cost_p_inspect.data, aform.inspect_cycle_len.data, aform.min_thresh_of_credits.data, aform.interest_rt.data, aform.payments_p_yr.data] = assumdata
    # read the user input information from the json (to display default values and updated values)
    userdata = parse_usrinp(FFP_FIN_USR_INP_FILE)
    # unpack the information so it can be sent to the html
    [uform.num_yrs.data, uform.cred_p_hect_p_yr.data, uform.hect_restored.data, uform.invest_amt.data, uform.start_yr.data, uform.price_p_cred.data, uform.invest_costs_inc.data, uform.reg_costs_inc.data] = userdata
    # displays results beneath forms
    # calculates the result of the input files
    results_dict = Conditional_Executor(userdata, assumdata)
    Convert_to_Json(results_dict, "./outputs/results.json")
    return render_template("ffp_tool.html", aform=aform, asubmitted=asubmitted, uform=uform, usubmitted=usubmitted, results_dict = results_dict)
'''

@app.route('/ffptool', methods=['GET', 'POST'])
def ffp_tool():
    if request.method == 'POST':
        if 'submit_assum' in request.form:
            assumdata = [aform.avg_cred_p_hect_p_yr.data, aform.nom_int_rt.data, aform.inflation_rt.data, aform.reg_acct_open_fee.data, aform.reg_listing_cost_p_credit.data, aform.reg_conv_cost_fee_p_inspect.data, aform.reg_conv_cost_p_cred_abv_min_thresh_of_credits.data, aform.reg_levy_cost_p_cred.data, aform.valid_and_verif_app_cost_p_inspect.data, aform.valid_and_verif_stmnt_cost_p_inspect.data, aform.valid_and_verif_inspctr_travel_cost_p_inspect.data, aform.inspect_cycle_len.data, aform.min_thresh_of_credits.data, aform.interest_rt.data, aform.payments_p_yr.data]
            update_assum(FFP_FIN_ASSUM_FILE, assumdata)
        elif 'submit_usrinpt' in request.form:
            userdata = [uform.num_yrs.data, uform.cred_p_hect_p_yr.data, uform.hect_restored.data, uform.invest_amt.data, uform.start_yr.data, uform.price_p_cred.data, uform.invest_costs_inc.data, uform.reg_costs_inc.data]
            update_usrinp(FFP_FIN_USR_INP_FILE, userdata)
    elif request.method == 'GET':
        aform = assum_to_dict(FFP_FIN_ASSUM_FILE)
        assumdata = [aform['avg_cred_p_hect_p_yr'], aform['nom_int_rt'], aform['inflation_rt'], aform['reg_acct_open_fee'], aform['reg_listing_cost_p_credit'], aform['reg_conv_cost_fee_p_inspect'], aform['reg_conv_cost_p_cred_abv_min_thresh_of_credits'], aform['reg_levy_cost_p_cred'], aform['valid_and_verif_app_cost_p_inspect'], aform['valid_and_verif_stmnt_cost_p_inspect'], aform['valid_and_verif_inspctr_travel_cost_p_inspect'], aform['inspect_cycle_len'], aform['min_thresh_of_credits'], aform['interest_rt'], aform['payments_p_yr']]
        uform = usrinp_to_dict(FFP_FIN_USR_INP_FILE)
        userdata = [uform['num_yrs'], uform['cred_p_hect_p_yr'], uform['hect_restored'], uform['invest_amt'], uform['start_yr'], uform['price_p_cred'], uform['invest_costs_inc'], uform['reg_costs_inc']]
        results_dict = Conditional_Executor(userdata, assumdata)
        Convert_to_Json(results_dict, "./outputs/results.json")
        return render_template("ffp_tool.html", aform=aform, uform=uform, results_dict = results_dict)


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
    app.run(debug=True, passthrough_errors=True, use_debugger=False, use_reloader=False)