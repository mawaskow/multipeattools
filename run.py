import os
from sys import exit
from flask import Flask
from flask import url_for, render_template, flash, request, redirect, send_from_directory, abort, send_file
from werkzeug.utils import secure_filename
import glob
#
from modules import parse_assum, update_assum, FFPAssumForm, FFPUserInputForm, parse_usrinp, update_usrinp
# temp until analysis can be in modules

# powershell: $env:FLASK_APP = "run"
# bash: export FLASK_APP=run
# flask run

app = Flask(__name__)

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
jsondata = parse_assum(FFP_INIT_ASSUM_FILE)
update_assum(FFP_FIN_ASSUM_FILE, jsondata)
# initialize final user input file with default values

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
    asubmitted=False
    usubmitted= False
    aform = FFPAssumForm()
    uform = FFPUserInputForm()
    if aform.validate_on_submit():
        aformdata = [aform.cred_p_hect_p_yr.data, aform.nom_interest_rt.data, aform.inflation_rt.data, aform.reg_acct_opening_fee.data, aform.reg_lsting_cost_p_credit.data, aform.reg_conv_cost_fee_p_inspect.data, aform.reg_conv_cost_p_credit_abv_min_thresh_of_credit.data, aform.reg_levy_cost_p_credit.data, aform.valid_and_verif_app_cost_p_inspect.data, aform.valid_and_verif_stmt_cost_p_inspect.data, aform.valid_and_verif_inspctr_travel_costs_p_inspect.data, aform.inspect_cycle_length.data, aform.min_thresh_of_credits.data, aform.interest_rate.data, aform.payments_p_yr.data]
        update_assum(FFP_FIN_ASSUM_FILE, aformdata)
        asubmitted=True
    if uform.validate_on_submit():
        uformdata = [uform.num_yrs.data, uform.cred_p_hect_p_yr.data, uform.hect_restored.data, uform.invest_amt.data, uform.start_yr.data, uform.price_p_cred.data]
        update_usrinp(FFP_FIN_USR_INP_FILE, uformdata)
        usubmitted=True
    aformdata = parse_assum(FFP_FIN_ASSUM_FILE)
    [aform.cred_p_hect_p_yr.data, aform.nom_interest_rt.data, aform.inflation_rt.data, aform.reg_acct_opening_fee.data, aform.reg_lsting_cost_p_credit.data, aform.reg_conv_cost_fee_p_inspect.data, aform.reg_conv_cost_p_credit_abv_min_thresh_of_credit.data, aform.reg_levy_cost_p_credit.data, aform.valid_and_verif_app_cost_p_inspect.data, aform.valid_and_verif_stmt_cost_p_inspect.data, aform.valid_and_verif_inspctr_travel_costs_p_inspect.data, aform.inspect_cycle_length.data, aform.min_thresh_of_credits.data, aform.interest_rate.data, aform.payments_p_yr.data] = aformdata
    uformdata = parse_usrinp(FFP_FIN_USR_INP_FILE)
    [uform.num_yrs.data, uform.cred_p_hect_p_yr.data, uform.hect_restored.data, uform.invest_amt.data, uform.start_yr.data, uform.price_p_cred.data] = uformdata
    return render_template("ffp_tool.html", aform=aform, asubmitted=asubmitted, uform=uform, usubmitted=usubmitted)

@app.route('/settool', methods=['GET', 'POST'])
def set_tool():
    return render_template("set_tool.html")

@app.route('/results')
def results():
    return render_template("results.html")

'''
Error Handling
'''
@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == "__main__":
    app.run()