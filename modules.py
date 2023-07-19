from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, FloatField, RadioField
from wtforms.validators import ValidationError, DataRequired, Length, NumberRange, InputRequired
import json

INIT_CONFIG_FILE = "./static/initial_assumptions.json"

'''
Class Definitions
'''
# thanks to andy for these two classes
class Dict(dict):
    """dot.notation access to dictionary attributes"""
    __getattr__ = dict.get
    __setattr__ = dict.__setitem__
    __delattr__ = dict.__delitem__
class Configuration(object):
    @staticmethod
    def __load__(data):
        if type(data) is dict:
            return Configuration.load_dict(data)
        else:
            return data
    @staticmethod
    def load_dict(data: dict):
        result = Dict()
        for key, value in data.items():
            result[key] = Configuration.__load__(value)
        return result
    @staticmethod
    def load_json(path: str):
        with open(path, "r") as f:
            result = Configuration.__load__(json.loads(f.read()))
        return result

class ConfigForm(FlaskForm):
    cred_p_hect_p_yr = FloatField(label=("Credits per Hectare per Year: "), validators=[DataRequired(), NumberRange(min=0, max=9999)])
    nom_interest_rt = FloatField(label= ('Nominal Interest Rate: '), validators=[DataRequired(), NumberRange(min=0.001, max=0.999)])
    inflation_rt = FloatField(label= ('Inflation Rate: '), validators=[DataRequired(), NumberRange(min=0.001, max=0.999)])
    reg_acct_opening_fee = FloatField(label= ('Registry Account Opening Fee: '), validators=[DataRequired(), NumberRange(min=0, max=9999)])
    reg_lsting_cost_p_credit = FloatField(label= ('Registry Listing Cost per Credit: '), validators=[DataRequired(), NumberRange(min=0, max=9999)])
    reg_conv_cost_fee_p_inspect = FloatField(label= ('Registry Conversion Cost Fee per Inspection: '), validators=[DataRequired(), NumberRange(min=0, max=9999)])
    reg_conv_cost_p_credit_abv_min_thresh_of_credit = FloatField(label= ('Registry Conversion Cost per Credit above Minimum Threshold of Credits: '), validators=[DataRequired(), NumberRange(min=0.001, max=0.999)])
    reg_levy_cost_p_credit = FloatField(label= ('Registry Levy Cost per Credit: '), validators=[DataRequired(), NumberRange(min=0.001, max=0.999)])
    valid_and_verif_app_cost_p_inspect = FloatField(label= ('Validation and Verification Application Cost per Inspection: '), validators=[DataRequired(), NumberRange(min=0, max=9999)])
    valid_and_verif_stmt_cost_p_inspect = FloatField(label= ('Validation and Verification Statement Cost per Inspection: '), validators=[DataRequired(), NumberRange(min=0, max=9999)])
    valid_and_verif_inspctr_travel_costs_p_inspect = FloatField(label= ('Validation and Verification Inspector Travel Costs per Inspection: '), validators=[DataRequired(), NumberRange(min=0, max=9999)])
    inspect_cycle_length = FloatField(label= ('Inspection Cycle Length: '), validators=[DataRequired(), NumberRange(min=0, max=9999)])
    min_thresh_of_credits = FloatField(label= ('Minimum Threshold of Credits: '), validators=[DataRequired(), NumberRange(min=0, max=9999)])
    interest_rate = FloatField(label= ('Interest Rate: '), validators=[DataRequired(), NumberRange(min=0.001, max=0.999)])
    payments_p_yr = IntegerField(label= ('Payments per Year: '), validators=[DataRequired(), NumberRange(min=0, max=9999)])
    submit=SubmitField("Submit")

'''
Function Definitions
'''

def parse_config(INIT_CONFIG_FILE):
    # reads the json file into a list of values
    config_json = Configuration.load_json(INIT_CONFIG_FILE)
    cred_p_hect_p_yr = config_json.avg_cred_p_hect_p_yr
    nom_interest_rt = config_json.nom_int_rt
    inflation_rt = config_json.inflation_rt
    reg_acct_opening_fee = config_json.reg_acct_open_fee
    reg_lsting_cost_p_credit = config_json.reg_listing_cost_p_credit
    reg_conv_cost_fee_p_inspect = config_json.reg_conv_cost_fee_p_inspect
    reg_conv_cost_p_credit_abv_min_thresh_of_credit = config_json.reg_conv_cost_p_cred_abv_min_thresh_of_credits
    reg_levy_cost_p_credit = config_json.reg_levy_cost_p_cred
    valid_and_verif_app_cost_p_inspect = config_json.valid_and_verif_app_cost_p_inspect
    valid_and_verif_stmt_cost_p_inspect = config_json.valid_and_verif_stmnt_cost_p_inspect
    valid_and_verif_inspctr_travel_costs_p_inspect = config_json.valid_and_verif_inspectr_travel_cost_p_inspect
    inspect_cycle_length = config_json.inspect_cycle_len
    min_thresh_of_credits = config_json.min_thresh_of_credits
    interest_rate = config_json.interest_rt
    payments_p_yr = config_json.payments_p_yr

    return cred_p_hect_p_yr, nom_interest_rt, inflation_rt, reg_acct_opening_fee, reg_lsting_cost_p_credit, reg_conv_cost_fee_p_inspect, reg_conv_cost_p_credit_abv_min_thresh_of_credit, reg_levy_cost_p_credit, valid_and_verif_app_cost_p_inspect, valid_and_verif_stmt_cost_p_inspect, valid_and_verif_inspctr_travel_costs_p_inspect, inspect_cycle_length, min_thresh_of_credits, interest_rate, payments_p_yr

def populate_config(cred_p_hect_p_yr, nom_interest_rt, inflation_rt, reg_acct_opening_fee, reg_lsting_cost_p_credit, reg_conv_cost_fee_p_inspect, reg_conv_cost_p_credit_abv_min_thresh_of_credit, reg_levy_cost_p_credit, valid_and_verif_app_cost_p_inspect, valid_and_verif_stmt_cost_p_inspect, valid_and_verif_inspctr_travel_costs_p_inspect, inspect_cycle_length, min_thresh_of_credits, interest_rate, payments_p_yr):
    with open(INIT_CONFIG_FILE, "r") as config_json:
        data = json.load(config_json)
    data["avg_cred_p_hect_p_yr"] = cred_p_hect_p_yr
    data["nom_int_rt"] = nom_interest_rt
    data["inflation_rt"] = inflation_rt
    data["reg_acct_open_fee"] = reg_acct_opening_fee
    data["reg_listing_cost_p_credit"] = reg_lsting_cost_p_credit
    data["reg_conv_cost_fee_p_inspect"] = reg_conv_cost_fee_p_inspect
    data["reg_conv_cost_p_cred_abv_min_thresh_of_credits"] = reg_conv_cost_p_credit_abv_min_thresh_of_credit
    data["reg_levy_cost_p_cred"] = reg_levy_cost_p_credit
    data["valid_and_verif_app_cost_p_inspect"] = valid_and_verif_app_cost_p_inspect
    data["valid_and_verif_stmnt_cost_p_inspect"] = valid_and_verif_stmt_cost_p_inspect
    data["valid_and_verif_inspectr_travel_cost_p_inspect"] = valid_and_verif_inspctr_travel_costs_p_inspect
    data["inspect_cycle_len"] = inspect_cycle_length
    data["min_thresh_of_credits"] = min_thresh_of_credits
    data["interest_rt"] = interest_rate
    data["payments_p_yr"] = payments_p_yr
    
    with open(INIT_CONFIG_FILE, "w") as config_json:
        json.dump(data, config_json)
