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

peat_type_dct = {
    "sphag":"Sphagnum",
    "herbac":"Herbaceous",
    "woody":"Woody",
    "bromo":"Brown moss",
    "unkno":"Unknown",
    "humidif":"Humidified"
}

veg_class_dct = {
    "G1": "G1: Dry to moderately moist grassland",
    "G2":"G2: Moist grassland",
    "G3":"G3: Moist to very moist grassland",
    "G3f":"G3f: Periodically flooded grasslands",
    "G3s":"G3s: Moist to very moist grassland with shunt species",
    "G3m":"G3m: Moist to very moist acidic Molinia meadows",
    "G4":"G4: Very moist grassland",
    "G4s":"G4s: Very moist grassland with shunt species",
    "G5":"G5: Wet grassland",
    "G5s":"G5s: Wet grassland with shunt species",
    "A1":"A1: Dry to moderately moist arable land",
    "A2":"A2: Moist arable land",
    "U1":"U1: Moist bare peat",
    "U2":"U2: Moist bog heath",
    "U3":"U3: Moist Reeds",
    "U6":"U6: Very moist bog heath",
    "U7":"U7: Very moist forbs and sedges",
    "U8":"U8: Very moist Sphagnum lawn",
    "U9":"U9: Very moist tall sedges",
    "U10":"U10: Wet bare peat",
    "U11":"U11: Wet meadows and forbs",
    "U12":"U12: Wet small sedges with mosses",
    "U13":"U13: Wet sphagnum lawn",
    "U14":"U14: Wet tall reeds",
    "U15":"U15: Wet tall sedges",
    "U16":"U16: Wet bog heath",
    "U17":"U17: Very wet tall sedges and Typha",
    "U18":"U18: Very wet Phragmites reeds",
    "U19":"U19: Wet to very wet Sphagnum hollows",
    "U20":"U20: Flooded tall reeds (> 20 cm above surface)",
    "S1":"S1: Dry to moderately moist grassland on peaty soils (Anmoor)",
    "S2":"S2: Dry to moderately moist arable land on peaty soils(Anmoor)",
    "S3":"S3: Cropland (2+) flooded in summer (wet year)",
    "S4":"S4: Grassland (2+/3+) flooded in summer (wet year)",
    "S5":"S5: Simulated harvest (Paludiculture)",
    "S6":"S6: Wet tall reeds (dry year)",
    "S7":"S7: Very wet reeds with lateral import of organic matter",
    "S8":"S8: Ditches in low intensity grassland"
}

synth_fert_dct={
    "nitrate":"Nitrate Based",
    "ammonium":"Ammonium Based"
}

animals_dct={
    "none":"No animal",
    "dairy":"Dairy cows",
    "beef":"Beef cattle",
    "sheep":"Sheep",
    "goat":"Goat",
    "buff":"Water buffalo"
}

crop_resid_dct={
    "Yes":True,
    "on":True,
    "No":False,
    "off":False,
    'True':True,
    "False":False
}

crop_name_dct={
    "cat":"Cattail (Typha sp.)",
    "reed":"Reed (Phragmites australis)",
    "sphag":"Peat moss (Sphagnum sp.)",
    "grass":"Grasses like reed canary grass",
    "alder":"Alder (Alnus sp.)",
    "other":"Other"
}

# values from set.py L174-191
crop_use_dct={
    "build":"Building Materials e.g insulation, taching, timber",
    "bed":"Bedding Material",
    "food":"Food Application",
    "feed":"Fodder/Feed Application",
    "energy":"Energy Use: biogas, combustion, wood etc",
    "paper":"Paper",
    "ingred":"Extraction of Ingredients/Building Blocks: proteins, fibres, cellulose etc",
    "substr":"High Quality Substrate in Horticulture",
    "other":"Other Uses/Unknown"
}


def set_form_to_dict(set_request):
    '''
    Parses the FFP Tool's user input json file into a list of values
    '''
    inp_dict={"gen_site_data":{}, "base":{}, "rewet":{}}
    inp_dict['gen_site_data']['site_name'] = set_request['site_name']
    inp_dict['gen_site_data']['tot_area'] = float(set_request['tot_area'])
    inp_dict['gen_site_data']['coords'] = set_request['coords']
    inp_dict['gen_site_data']['elevation'] = float(set_request['elevation'])
    #inp_dict['gen_site_data']['peat_type'] = set_request.get('peat_type')
    inp_dict['gen_site_data']['peat_type'] = peat_type_dct[set_request.get('peat_type')]
    inp_dict['gen_site_data']['peat_thick'] = float(set_request['peat_thick'])
    inp_dict['gen_site_data']['year_start'] = int(set_request['year_start'])
    inp_dict['base']['med_gw_level_summer'] = float(set_request['bs_med_gw_level_summer'])
    #inp_dict['base']['veg_class'] = set_request.get('bs_veg_class')
    inp_dict['base']['veg_class'] = veg_class_dct[set_request.get('bs_veg_class')]
    inp_dict['base']['amount_manure'] = float(set_request['bs_amount_manure'])
    inp_dict['base']['amount_org_fert'] = float(set_request['bs_amount_org_fert'])
    #inp_dict['base']['type_synth_fert'] = set_request.get('bs_type_synth_fert')
    inp_dict['base']['type_synth_fert'] = synth_fert_dct[set_request.get('bs_type_synth_fert')]
    inp_dict['base']['amount_synth_fert'] = float(set_request['bs_amount_synth_fert'])
    #inp_dict['base']['type_animals'] = set_request.get('bs_type_animals')
    inp_dict['base']['type_animals'] = animals_dct[set_request.get('bs_type_animals')]
    inp_dict['base']['avg_num_animals'] = float(set_request['bs_avg_num_animals'])
    inp_dict['base']['avg_num_days'] = float(set_request['bs_avg_num_days'])
    inp_dict['base']['crop_yield'] = float(set_request['bs_crop_yield'])
    #inp_dict['base']['crop_resid'] = set_request.get('bs_crop_resid')
    inp_dict['base']['crop_resid'] = crop_resid_dct[set_request.get('bs_crop_resid')]
    #inp_dict['base']['crop_name'] = set_request.get('bs_crop_name')
    inp_dict['base']['crop_name'] = crop_name_dct[set_request.get('bs_crop_name')]
    inp_dict['base']['diesel_per_site'] = float(set_request['bs_diesel_per_site'])
    inp_dict['base']['elec_per_site'] = float(set_request['bs_elec_per_site'])
    inp_dict['rewet']['med_gw_level_summer'] = float(set_request['rw_med_gw_level_summer'])
    inp_dict['rewet']['veg_class'] = veg_class_dct[set_request.get('rw_veg_class')]
    #inp_dict['rewet']['veg_class'] = set_request.get('rw_veg_class')
    inp_dict['rewet']['amount_manure'] = float(set_request['rw_amount_manure'])
    inp_dict['rewet']['amount_org_fert'] = float(set_request['rw_amount_org_fert'])
    #inp_dict['rewet']['type_synth_fert'] = set_request.get('rw_type_synth_fert')
    inp_dict['rewet']['type_synth_fert'] = synth_fert_dct[set_request.get('rw_type_synth_fert')]
    inp_dict['rewet']['amount_synth_fert'] = float(set_request['rw_amount_synth_fert'])
    #inp_dict['rewet']['type_animals'] = set_request.get('rw_type_animals')
    inp_dict['rewet']['type_animals'] = animals_dct[set_request.get('rw_type_animals')]
    inp_dict['rewet']['avg_num_animals'] = float(set_request['rw_avg_num_animals'])
    inp_dict['rewet']['avg_num_days'] = float(set_request['rw_avg_num_days'])
    inp_dict['rewet']['crop_yield'] = float(set_request['rw_crop_yield'])
    #inp_dict['rewet']['crop_resid'] = set_request.get('rw_crop_resid')
    inp_dict['rewet']['crop_resid'] = crop_resid_dct[set_request.get('rw_crop_resid')]
    #inp_dict['rewet']['crop_name'] = set_request.get('rw_crop_name')
    inp_dict['rewet']['crop_name'] = crop_name_dct[set_request.get('rw_crop_name')]
    inp_dict['rewet']['diesel_per_site'] = float(set_request['rw_diesel_per_site'])
    inp_dict['rewet']['elec_per_site'] = float(set_request['rw_elec_per_site'])
    #inp_dict['rewet']['crop_use'] = set_request.get('rw_crop_use')
    inp_dict['rewet']['crop_use'] = crop_use_dct[set_request.get('rw_crop_use')]
    return inp_dict

'''
{
     "gen_site_data": {
          "site_name": "Test Site",
          "tot_area": 5,
          "coords": [
               -56,
               100
          ],
          "elevation": 30,
          "peat_type": "Woody",
          "peat_thick": 50,
          "year_start": 2050
     },
     "base": {
          "med_gw_level_summer": -70,
          "veg_class": "G1:Dry to Moderate Moist Grassland",
          "amount_manure": 50,
          "amount_org_fert": 30,
          "type_synth_fert": "Ammonium Based",
          "amount_synth_fert": 100,
          "type_animals": "Sheep",
          "avg_num_animals": 10,
          "avg_num_days": 200,
          "crop_yield": 50,
          "crop_resid": "Yes",
          "crop_name": "Peat Moss (Sphagnum Sp.)",
          "diesel_per_site": 50,
          "elec_per_site": 70
     },
     "rewet": {
          "med_gw_level_summer": 0,
          "veg_class": "U18:Very Wet Phragmites Reeds",
          "amount_manure": 75,
          "amount_org_fert": 60,
          "type_synth_fert": "Ammonium Based",
          "amount_synth_fert": 60,
          "type_animals": "Sheep",
          "avg_num_animals": 20,
          "avg_num_days": 100,
          "crop_yield": 100,
          "crop_resid": "Yes",
          "crop_name": "Reed (Phragmites australis)",
          "diesel_per_site": 75,
          "elec_per_site": 50,
          "crop_use": "Food Application"
     }
}
'''