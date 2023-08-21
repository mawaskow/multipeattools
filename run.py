import os
from sys import exit
from flask import Flask
from flask import url_for, render_template, flash, request, redirect
from werkzeug.utils import secure_filename
from flask_wtf.csrf import CSRFProtect
#
from modules import parse_assum, update_assum, parse_usrinp, update_usrinp, assum_json_to_dict, usrinp_json_to_dict, assum_form_to_dict, usrinp_form_to_dict
from ffp import Conditional_Executor

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

#FFP ASSUMPTION FORM
FFP_INIT_ASSUM_FILE = "./inputs/initial_assumptions.json"
FFP_FIN_ASSUM_FILE = "./inputs/final_assumptions.json"
#FFP USER INPUT FORM
FFP_INIT_USR_INP_FILE = "./inputs/user_input_default.json"
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

@app.route('/ffptool', methods=['GET', 'POST'])
def ffp_tool():
    #initializes values for populating each the user input and assumptions forms with default variables
    #and loads the dictionary values into a list for passing through Erica's function that calculates results
    aform = assum_json_to_dict(FFP_FIN_ASSUM_FILE)
    assumdata = [aform['nom_int_rt'], aform['inflation_rt'], aform['reg_acct_open_fee'], aform['reg_listing_cost_p_credit'], aform['reg_conv_cost_fee_p_inspect'], aform['reg_conv_cost_p_cred_abv_min_thresh_of_credits'], aform['reg_levy_cost_p_cred'], aform['valid_and_verif_app_cost_p_inspect'], aform['valid_and_verif_stmnt_cost_p_inspect'], aform['valid_and_verif_inspctr_travel_cost_p_inspect'], aform['inspect_cycle_len'], aform['min_thresh_of_credits'], aform['interest_rt'], aform['payments_p_yr']]
    uform = usrinp_json_to_dict(FFP_FIN_USR_INP_FILE)
    userdata = [uform['num_yrs'], uform['cred_p_hect_p_yr'], uform['hect_restored'], uform['invest_amt'], uform['start_yr'], uform['price_p_cred'], uform['invest_costs_inc'], uform['reg_costs_inc']]
    results_dict = Conditional_Executor(userdata, assumdata)
    ### Convert_to_Json(results_dict, "./outputs/results.json")
    #if one of the forms is submitted, checks which form based on the submit button name/id
    if request.method == 'POST':
        if request.form.get('submit_usrinpt') == "Update":
            # converts the form inputs into a dictionary and converts them into their appropriate values (from strings)
            # loads the dictionary into a list for passing to Erica's function that calculates results
            uform = usrinp_form_to_dict(request.form)
            userdata = [uform['num_yrs'], uform['cred_p_hect_p_yr'], uform['hect_restored'], uform['invest_amt'], uform['start_yr'], uform['price_p_cred'], uform['invest_costs_inc'], uform['reg_costs_inc']]
            ### update_usrinp(FFP_FIN_USR_INP_FILE, userdata)
            results_dict = Conditional_Executor(userdata, assumdata)
            ###Convert_to_Json(results_dict, "./outputs/results.json")
            # renders the page
            return render_template("ffp_tool.html", aform=aform, uform=uform, results_dict = results_dict)
        elif request.form.get('submit_assum') == "Update":
            aform = assum_form_to_dict(request.form)
            assumdata = [aform['nom_int_rt'], aform['inflation_rt'], aform['reg_acct_open_fee'], aform['reg_listing_cost_p_credit'], aform['reg_conv_cost_fee_p_inspect'], aform['reg_conv_cost_p_cred_abv_min_thresh_of_credits'], aform['reg_levy_cost_p_cred'], aform['valid_and_verif_app_cost_p_inspect'], aform['valid_and_verif_stmnt_cost_p_inspect'], aform['valid_and_verif_inspctr_travel_cost_p_inspect'], aform['inspect_cycle_len'], aform['min_thresh_of_credits'], aform['interest_rt'], aform['payments_p_yr']]
            ### update_assum(FFP_FIN_ASSUM_FILE, assumdata)
            results_dict = Conditional_Executor(userdata, assumdata)
            ### Convert_to_Json(results_dict, "./outputs/results.json")
            return render_template("ffp_tool.html", aform=aform, uform=uform, results_dict = results_dict)
    if request.method == 'GET':
        # refreshes to original default values
        aform = assum_json_to_dict(FFP_INIT_ASSUM_FILE)
        assumdata = [aform['nom_int_rt'], aform['inflation_rt'], aform['reg_acct_open_fee'], aform['reg_listing_cost_p_credit'], aform['reg_conv_cost_fee_p_inspect'], aform['reg_conv_cost_p_cred_abv_min_thresh_of_credits'], aform['reg_levy_cost_p_cred'], aform['valid_and_verif_app_cost_p_inspect'], aform['valid_and_verif_stmnt_cost_p_inspect'], aform['valid_and_verif_inspctr_travel_cost_p_inspect'], aform['inspect_cycle_len'], aform['min_thresh_of_credits'], aform['interest_rt'], aform['payments_p_yr']]
        uform = usrinp_json_to_dict(FFP_INIT_USR_INP_FILE)
        userdata = [uform['num_yrs'], uform['cred_p_hect_p_yr'], uform['hect_restored'], uform['invest_amt'], uform['start_yr'], uform['price_p_cred'], uform['invest_costs_inc'], uform['reg_costs_inc']]
        results_dict = Conditional_Executor(userdata, assumdata)
        ### Convert_to_Json(results_dict, "./outputs/results.json")
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
    #app.run(host='0.0.0.0', port=8000)
