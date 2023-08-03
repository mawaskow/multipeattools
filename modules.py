from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, FloatField, RadioField, BooleanField
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
    jsondata = [nom_int_rt, inflation_rt, reg_acct_open_fee, reg_listing_cost_p_credit, reg_conv_cost_fee_p_inspect, reg_conv_cost_p_cred_abv_min_thresh_of_credits, reg_levy_cost_p_cred, valid_and_verif_app_cost_p_inspect, valid_and_verif_stmnt_cost_p_inspect, valid_and_verif_inspctr_travel_cost_p_inspect, inspect_cycle_len, min_thresh_of_credits, interest_rt, payments_p_yr]
    return jsondata

def assum_json_to_dict(ASSUM_FILE):
    '''
    Parses the FFP Tool's assumption json file into a dictionary
    '''
    assum_json = Configuration.load_json(ASSUM_FILE)
    assum_dct={}
    #assum_dct['avg_cred_p_hect_p_yr'] = assum_json.avg_cred_p_hect_p_yr
    assum_dct['nom_int_rt'] = assum_json.nom_int_rt
    assum_dct['inflation_rt'] = assum_json.inflation_rt
    assum_dct['reg_acct_open_fee'] = assum_json.reg_acct_open_fee
    assum_dct['reg_listing_cost_p_credit'] = assum_json.reg_listing_cost_p_credit
    assum_dct['reg_conv_cost_fee_p_inspect'] = assum_json.reg_conv_cost_fee_p_inspect
    assum_dct['reg_conv_cost_p_cred_abv_min_thresh_of_credits'] = assum_json.reg_conv_cost_p_cred_abv_min_thresh_of_credits
    assum_dct['reg_levy_cost_p_cred'] = assum_json.reg_levy_cost_p_cred
    assum_dct['valid_and_verif_app_cost_p_inspect'] = assum_json.valid_and_verif_app_cost_p_inspect
    assum_dct['valid_and_verif_stmnt_cost_p_inspect'] = assum_json.valid_and_verif_stmnt_cost_p_inspect
    assum_dct['valid_and_verif_inspctr_travel_cost_p_inspect'] = assum_json.valid_and_verif_inspectr_travel_cost_p_inspect
    assum_dct['inspect_cycle_len'] = assum_json.inspect_cycle_len
    assum_dct['min_thresh_of_credits'] = assum_json.min_thresh_of_credits
    assum_dct['interest_rt'] = assum_json.interest_rt
    assum_dct['payments_p_yr'] = assum_json.payments_p_yr
    return assum_dct

def assum_form_to_dict(aform_request):
    '''
    Parses the FFP Tool's assumption json file into a dictionary
    '''
    assum_dct={}
    #assum_dct['avg_cred_p_hect_p_yr'] = float(aform_request['avg_cred_p_hect_p_yr'])
    assum_dct['nom_int_rt'] = float(aform_request['nom_int_rt'])
    assum_dct['inflation_rt'] = float(aform_request['inflation_rt'])
    assum_dct['reg_acct_open_fee'] = float(aform_request['reg_acct_open_fee'])
    assum_dct['reg_listing_cost_p_credit'] = float(aform_request['reg_listing_cost_p_credit'])
    assum_dct['reg_conv_cost_fee_p_inspect'] = float(aform_request['reg_conv_cost_fee_p_inspect'])
    assum_dct['reg_conv_cost_p_cred_abv_min_thresh_of_credits'] = float(aform_request['reg_conv_cost_p_cred_abv_min_thresh_of_credits'])
    assum_dct['reg_levy_cost_p_cred'] = float(aform_request['reg_levy_cost_p_cred'])
    assum_dct['valid_and_verif_app_cost_p_inspect'] = float(aform_request['valid_and_verif_app_cost_p_inspect'])
    assum_dct['valid_and_verif_stmnt_cost_p_inspect'] = float(aform_request['valid_and_verif_stmnt_cost_p_inspect'])
    assum_dct['valid_and_verif_inspctr_travel_cost_p_inspect'] = float(aform_request['valid_and_verif_inspctr_travel_cost_p_inspect'])
    assum_dct['inspect_cycle_len'] = float(aform_request['inspect_cycle_len'])
    assum_dct['min_thresh_of_credits'] = float(aform_request['min_thresh_of_credits'])
    assum_dct['interest_rt'] = float(aform_request['interest_rt'])
    assum_dct['payments_p_yr'] = float(aform_request['payments_p_yr'])
    return assum_dct

def update_assum(ASSUM_FILE, formdata):
    '''
    Updates the FFP Tool assumption json with a list of values from a form
    '''
    # unpack values from list
    [nom_int_rt, inflation_rt, reg_acct_open_fee, reg_listing_cost_p_credit, reg_conv_cost_fee_p_inspect, reg_conv_cost_p_cred_abv_min_thresh_of_credits, reg_levy_cost_p_cred, valid_and_verif_app_cost_p_inspect, valid_and_verif_stmnt_cost_p_inspect, valid_and_verif_inspctr_travel_cost_p_inspect, inspect_cycle_len, min_thresh_of_credits, interest_rt, payments_p_yr] = formdata
    # load the data from the current assumption file [for structure]
    with open(ASSUM_FILE, "r") as assum_json:
        data = json.load(assum_json)
    #data["avg_cred_p_hect_p_yr"] = avg_cred_p_hect_p_yr
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
    invest_costs_inc = usrinp_json.invest_costs_inc
    reg_costs_inc = usrinp_json.reg_costs_inc
    jsondata = [num_yrs, cred_p_hect_p_yr, hect_restored, invest_amt, start_yr, price_p_cred, invest_costs_inc, reg_costs_inc]
    return jsondata

def usrinp_json_to_dict(USRINP_FILE):
    '''
    Parses the FFP Tool's user input json file into a list of values
    '''
    usrinp_json = Configuration.load_json(USRINP_FILE)
    usrinp_dict={}
    usrinp_dict['num_yrs'] = usrinp_json.num_yrs
    usrinp_dict['cred_p_hect_p_yr'] = usrinp_json.cred_p_hect_p_yr
    usrinp_dict['hect_restored'] = usrinp_json.hect_restored
    usrinp_dict['invest_amt'] = usrinp_json.invest_amt
    usrinp_dict['start_yr'] = usrinp_json.start_yr
    usrinp_dict['price_p_cred'] = usrinp_json.price_p_cred
    usrinp_dict['invest_costs_inc'] = usrinp_json.invest_costs_inc
    usrinp_dict['reg_costs_inc'] = usrinp_json.reg_costs_inc
    return usrinp_dict

def usrinp_form_to_dict(uform_request):
    '''
    Parses the FFP Tool's user input json file into a list of values
    '''
    usrinp_dict={}
    usrinp_dict['num_yrs'] = float(uform_request['num_yrs'])
    usrinp_dict['cred_p_hect_p_yr'] = float(uform_request['cred_p_hect_p_yr'])
    usrinp_dict['hect_restored'] = float(uform_request['hect_restored'])
    usrinp_dict['invest_amt'] = float(uform_request['invest_amt'])
    usrinp_dict['start_yr'] = int(uform_request['start_yr'])
    usrinp_dict['price_p_cred'] = float(uform_request['price_p_cred'])
    #usrinp_dict['invest_costs_inc'] = bool(uform_request['invest_costs_inc'])
    #usrinp_dict['reg_costs_inc'] = bool(uform_request['reg_costs_inc'])
    usrinp_dict['invest_costs_inc'] = uform_request.get('invest_costs_inc')
    usrinp_dict['reg_costs_inc'] = uform_request.get('reg_costs_inc')
    return usrinp_dict

def update_usrinp(USRINP_FILE, formdata):
    '''
    Updates the FFP Tool user input json with a list of values from a form
    '''
    # unpack values from list
    [num_yrs, cred_p_hect_p_yr, hect_restored, invest_amt, start_yr, price_p_cred, invest_costs_inc, reg_costs_inc] = formdata
    # load the data from the current user input file [for structure]
    with open(USRINP_FILE, "r") as usrinp_json:
        data = json.load(usrinp_json)
    data["num_yrs"] = num_yrs
    data["cred_p_hect_p_yr"] = cred_p_hect_p_yr
    data["hect_restored"] = hect_restored
    data["invest_amt"] = invest_amt
    data["start_yr"] = start_yr
    data["price_p_cred"] = price_p_cred
    data["invest_costs_inc"] = invest_costs_inc
    data["reg_costs_inc"] = reg_costs_inc
    # overwrite the file with new data values
    with open(USRINP_FILE, "w") as usrinp_json:
        json.dump(data, usrinp_json)

'''
CALCULATIONS
'''


####################
###   SET TOOL   ###
####################

