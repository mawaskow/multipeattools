#from flask import Flask
import psycopg2
import json
from config import SECURE_PWD, HOSTADR, DBNAME, USERNM

def get_db_cnxn():
    return psycopg2.connect(
            host=HOSTADR,
            database=DBNAME,
            user=USERNM,
            password=SECURE_PWD)

####################
###   FFP TOOL   ###
####################

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
