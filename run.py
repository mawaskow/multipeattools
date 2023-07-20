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

INIT_CONFIG_FILE = "./static/initial_assumptions.json"
FIN_CONFIG_FILE = "./inputs/final_assumptions.json"

'''
Internal Functions
'''
# initialize final config file with default values
jsondata = parse_config(INIT_CONFIG_FILE)
populate_config(FIN_CONFIG_FILE, jsondata)

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
    form = ConfigForm()
    if form.validate_on_submit():
        formdata = [form.cred_p_hect_p_yr.data, form.nom_interest_rt.data, form.inflation_rt.data, form.reg_acct_opening_fee.data, form.reg_lsting_cost_p_credit.data, form.reg_conv_cost_fee_p_inspect.data, form.reg_conv_cost_p_credit_abv_min_thresh_of_credit.data, form.reg_levy_cost_p_credit.data, form.valid_and_verif_app_cost_p_inspect.data, form.valid_and_verif_stmt_cost_p_inspect.data, form.valid_and_verif_inspctr_travel_costs_p_inspect.data, form.inspect_cycle_length.data, form.min_thresh_of_credits.data, form.interest_rate.data, form.payments_p_yr.data]
        populate_config(FIN_CONFIG_FILE, formdata)
        return redirect(url_for('results'))
    formdata = parse_config(FIN_CONFIG_FILE)
    [form.cred_p_hect_p_yr.data, form.nom_interest_rt.data, form.inflation_rt.data, form.reg_acct_opening_fee.data, form.reg_lsting_cost_p_credit.data, form.reg_conv_cost_fee_p_inspect.data, form.reg_conv_cost_p_credit_abv_min_thresh_of_credit.data, form.reg_levy_cost_p_credit.data, form.valid_and_verif_app_cost_p_inspect.data, form.valid_and_verif_stmt_cost_p_inspect.data, form.valid_and_verif_inspctr_travel_costs_p_inspect.data, form.inspect_cycle_length.data, form.min_thresh_of_credits.data, form.interest_rate.data, form.payments_p_yr.data] = formdata
    return render_template("ffp_tool.html", form=form)

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