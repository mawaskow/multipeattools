import os
from sys import exit
from flask import Flask
from flask import url_for, render_template, flash, request, redirect, send_from_directory, abort, send_file
from werkzeug.utils import secure_filename
import glob
#
from modules import parse_config, populate_config, ConfigForm
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

'''
Internal Functions
'''


'''
ROUTES
'''
@app.route('/')
def landingpage():
    return redirect(url_for('homepage'))
    
@app.route('/home')
def homepage():
    return render_template("home.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/formtemp', methods=['GET', 'POST'])
def engage_json():
    submitted = False
    form = ConfigForm()
    if form.validate_on_submit():
        populate_config(form.cred_p_hect_p_yr.data, form.nom_interest_rt.data, form.inflation_rt.data, form.reg_acct_opening_fee.data, form.reg_lsting_cost_p_credit.data, form.reg_conv_cost_fee_p_inspect.data, form.reg_conv_cost_p_credit_abv_min_thresh_of_credit.data, form.reg_levy_cost_p_credit.data, form.valid_and_verif_app_cost_p_inspect.data, form.valid_and_verif_stmt_cost_p_inspect.data, form.valid_and_verif_inspctr_travel_costs_p_inspect.data, form.inspect_cycle_length.data, form.min_thresh_of_credits.data, form.interest_rate.data, form.payments_p_yr.data)
        submitted = True
    form.cred_p_hect_p_yr.data, form.nom_interest_rt.data, form.inflation_rt.data, form.reg_acct_opening_fee.data, form.reg_lsting_cost_p_credit.data, form.reg_conv_cost_fee_p_inspect.data, form.reg_conv_cost_p_credit_abv_min_thresh_of_credit.data, form.reg_levy_cost_p_credit.data, form.valid_and_verif_app_cost_p_inspect.data, form.valid_and_verif_stmt_cost_p_inspect.data, form.valid_and_verif_inspctr_travel_costs_p_inspect.data, form.inspect_cycle_length.data, form.min_thresh_of_credits.data, form.interest_rate.data, form.payments_p_yr.data = parse_config("./static/initial_assumptions.json")
    return render_template('formtemp.html', form=form, submitted=submitted)

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