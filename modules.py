from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, FloatField, RadioField
from wtforms.validators import ValidationError, DataRequired, Length, NumberRange, InputRequired
import json

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


####################
###   FFP TOOL   ###
####################

'''
FORMS
'''

class FFPAssumForm(FlaskForm):
    '''
    Creates form for modifying the FFP Tool's assumptions
    '''
    avg_cred_p_hect_p_yr = FloatField(label=("Credits per Hectare per Year: "), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    nom_int_rt = FloatField(label= ('Nominal Interest Rate: '), validators=[DataRequired(), NumberRange(min=0.000000001, max=0.999999)])
    inflation_rt = FloatField(label= ('Inflation Rate: '), validators=[DataRequired(), NumberRange(min=0.000000001, max=0.999999)])
    reg_acct_open_fee = FloatField(label= ('Registry Account Opening Fee: '), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    reg_listing_cost_p_credit = FloatField(label= ('Registry Listing Cost per Credit: '), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    reg_conv_cost_fee_p_inspect = FloatField(label= ('Registry Conversion Cost Fee per Inspection: '), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    reg_conv_cost_p_cred_abv_min_thresh_of_credits = FloatField(label= ('Registry Conversion Cost per Credit above Minimum Threshold of Credits: '), validators=[DataRequired(), NumberRange(min=0.000000001, max=0.999999)])
    reg_levy_cost_p_cred = FloatField(label= ('Registry Levy Cost per Credit: '), validators=[DataRequired(), NumberRange(min=0.000000001, max=0.999999)])
    valid_and_verif_app_cost_p_inspect = FloatField(label= ('Validation and Verification Application Cost per Inspection: '), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    valid_and_verif_stmnt_cost_p_inspect = FloatField(label= ('Validation and Verification Statement Cost per Inspection: '), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    valid_and_verif_inspctr_travel_cost_p_inspect = FloatField(label= ('Validation and Verification Inspector Travel Costs per Inspection: '), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    inspect_cycle_len = FloatField(label= ('Inspection Cycle Length: '), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    min_thresh_of_credits = FloatField(label= ('Minimum Threshold of Credits: '), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    interest_rt = FloatField(label= ('Interest Rate: '), validators=[DataRequired(), NumberRange(min=0.000000001, max=0.999999)])
    payments_p_yr = IntegerField(label= ('Payments per Year: '), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    submit=SubmitField("Update")

class FFPUserInputForm(FlaskForm):
    '''
    Creates form for modifying the FFP Tool's user input
    '''
    num_yrs = FloatField(label=("Period of Years: "), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    cred_p_hect_p_yr = FloatField(label=("Credits per Hectare per Year: "), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    hect_restored = FloatField(label=("Hectares Restored: "), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    invest_amt = FloatField(label=("Investment Amount: "), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    start_yr = IntegerField(label= ('Start Year: '), validators=[DataRequired(), NumberRange(min=1900, max=3000)])
    price_p_cred = FloatField(label=("Price per Credit: "), validators=[DataRequired(), NumberRange(min=0, max=9999999)])
    submit=SubmitField("Update")

####################
###   SET TOOL   ###
####################


'''
Function Definitions
'''

####################
###   FFP TOOL   ###
####################

def parse_assum(ASSUM_FILE):
    '''
    Parses the FFP Tool's assumption json file into a list of values
    '''
    assum_json = Configuration.load_json(ASSUM_FILE)
    avg_cred_p_hect_p_yr = assum_json.avg_cred_p_hect_p_yr
    nom_int_rt = assum_json.nom_int_rt
    inflation_rt = assum_json.inflation_rt
    reg_acct_open_fee = assum_json.reg_acct_open_fee
    reg_listing_cost_p_credit = assum_json.reg_listing_cost_p_credit
    reg_conv_cost_fee_p_inspect = assum_json.reg_conv_cost_fee_p_inspect
    reg_conv_cost_p_cred_abv_min_thresh_of_credits = assum_json.reg_conv_cost_p_cred_abv_min_thresh_of_credits
    reg_levy_cost_p_cred = assum_json.reg_levy_cost_p_cred
    valid_and_verif_app_cost_p_inspect = assum_json.valid_and_verif_app_cost_p_inspect
    valid_and_verif_stmnt_cost_p_inspect = assum_json.valid_and_verif_stmnt_cost_p_inspect
    valid_and_verif_inspctr_travel_cost_p_inspect = assum_json.valid_and_verif_inspectr_travel_cost_p_inspect
    inspect_cycle_len = assum_json.inspect_cycle_len
    min_thresh_of_credits = assum_json.min_thresh_of_credits
    interest_rt = assum_json.interest_rt
    payments_p_yr = assum_json.payments_p_yr
    # pack values into list
    jsondata = [avg_cred_p_hect_p_yr, nom_int_rt, inflation_rt, reg_acct_open_fee, reg_listing_cost_p_credit, reg_conv_cost_fee_p_inspect, reg_conv_cost_p_cred_abv_min_thresh_of_credits, reg_levy_cost_p_cred, valid_and_verif_app_cost_p_inspect, valid_and_verif_stmnt_cost_p_inspect, valid_and_verif_inspctr_travel_cost_p_inspect, inspect_cycle_len, min_thresh_of_credits, interest_rt, payments_p_yr]
    return jsondata

def update_assum(ASSUM_FILE, formdata):
    '''
    Updates the FFP Tool assumption json with a list of values from a form
    '''
    # unpack values from list
    [avg_cred_p_hect_p_yr, nom_int_rt, inflation_rt, reg_acct_open_fee, reg_listing_cost_p_credit, reg_conv_cost_fee_p_inspect, reg_conv_cost_p_cred_abv_min_thresh_of_credits, reg_levy_cost_p_cred, valid_and_verif_app_cost_p_inspect, valid_and_verif_stmnt_cost_p_inspect, valid_and_verif_inspctr_travel_cost_p_inspect, inspect_cycle_len, min_thresh_of_credits, interest_rt, payments_p_yr] = formdata
    # load the data from the current assumption file [for structure]
    with open(ASSUM_FILE, "r") as assum_json:
        data = json.load(assum_json)
    data["avg_cred_p_hect_p_yr"] = avg_cred_p_hect_p_yr
    data["nom_int_rt"] = nom_int_rt
    data["inflation_rt"] = inflation_rt
    data["reg_acct_open_fee"] = reg_acct_open_fee
    data["reg_listing_cost_p_credit"] = reg_listing_cost_p_credit
    data["reg_conv_cost_fee_p_inspect"] = reg_conv_cost_fee_p_inspect
    data["reg_conv_cost_p_cred_abv_min_thresh_of_credits"] = reg_conv_cost_p_cred_abv_min_thresh_of_credits
    data["reg_levy_cost_p_cred"] = reg_levy_cost_p_cred
    data["valid_and_verif_app_cost_p_inspect"] = valid_and_verif_app_cost_p_inspect
    data["valid_and_verif_stmnt_cost_p_inspect"] = valid_and_verif_stmnt_cost_p_inspect
    data["valid_and_verif_inspectr_travel_cost_p_inspect"] = valid_and_verif_inspctr_travel_cost_p_inspect
    data["inspect_cycle_len"] = inspect_cycle_len
    data["min_thresh_of_credits"] = min_thresh_of_credits
    data["interest_rt"] = interest_rt
    data["payments_p_yr"] = payments_p_yr
    # overwrite the file with new data values
    with open(ASSUM_FILE, "w") as assum_json:
        json.dump(data, assum_json)

def parse_usrinp(USRINP_FILE):
    '''
    Parses the FFP Tool's user input json file into a list of values
    '''
    usrinp_json = Configuration.load_json(USRINP_FILE)
    num_yrs = usrinp_json.num_yrs
    cred_p_hect_p_yr = usrinp_json.cred_p_hect_p_yr
    hect_restored = usrinp_json.hect_restored
    invest_amt = usrinp_json.invest_amt
    start_yr = usrinp_json.start_yr
    price_p_cred = usrinp_json.price_p_cred
    jsondata = [num_yrs, cred_p_hect_p_yr, hect_restored, invest_amt, start_yr, price_p_cred]
    return jsondata

def update_usrinp(USRINP_FILE, formdata):
    '''
    Updates the FFP Tool user input json with a list of values from a form
    '''
    # unpack values from list
    [num_yrs, cred_p_hect_p_yr, hect_restored, invest_amt, start_yr, price_p_cred] = formdata
    # load the data from the current user input file [for structure]
    with open(USRINP_FILE, "r") as usrinp_json:
        data = json.load(usrinp_json)
    data["num_yrs"] = num_yrs
    data["cred_p_hect_p_yr"] = cred_p_hect_p_yr
    data["hect_restored"] = hect_restored
    data["invest_amt"] = invest_amt
    data["start_yr"] = start_yr
    data["price_p_cred"] = price_p_cred
    # overwrite the file with new data values
    with open(USRINP_FILE, "w") as usrinp_json:
        json.dump(data, usrinp_json)

'''
CALCULATIONS
'''


####################
###   SET TOOL   ###
####################

