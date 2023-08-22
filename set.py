import pandas as pd
import json

def Load_csvs(list):
    '''
    Parameters: List of csvs
    Returns: Dictionary of dataframes
    Purpose: Function to load the .csv files containing the static tables. 
    This function takes a list as input where each list item is the string of 
    a pathway to a .csv file. The files are then opened as Pandas dataframes 
    and stored in a dictionary where the filename is the key and the dataframe is the value.
    '''
    dic_of_dfs = {}
    for i in list:
        dfname = i.rsplit('\\', 1)[-1]
        dic_of_dfs[dfname] = pd.read_csv(i)
    return dic_of_dfs

def Create_Input_Dict():
    '''
    Parameters: address/ name to give the input file
    Returns: None
    Purpose: Function to create a json containing the user input values. The input 
    values in this function are merely standins until actual user input is provided, 
    at which point the json file will be updated.
    '''
    inputs = {'gen_site_data': {'site_name': 'Test Site',
                                     'tot_area': 5, 
                                     'coords': [-56, 100], 
                                     'elevation': 30, 
                                     'peat_type': 'Woody',
                                     'peat_thick': 50,
                                     'year_start': 2050}, 
            'base': {'med_gw_level_summer': -70,
                         'veg_class': 'G1:Dry to Moderate Moist Grassland',
                         'amount_manure': 50,
                         'amount_org_fert': 30,
                         'type_synth_fert': 'Ammonium Based',
                         'amount_synth_fert': 100,
                         'type_animals': 'Sheep',
                         'avg_num_animals': 10,
                         'avg_num_days': 200,
                         'crop_yield': 50,
                         'crop_resid': True,
                         'crop_name': 'Peat Moss (Sphagnum Sp.)',
                         'diesel_per_site': 50,
                         'elec_per_site': 70},
            'rewet': {'med_gw_level_summer': 0,
                         'veg_class': 'U18:Very Wet Phragmites Reeds',
                         'amount_manure': 75,
                         'amount_org_fert': 60,
                         'type_synth_fert': 'Ammonium Based',
                         'amount_synth_fert': 60,
                         'type_animals': 'Sheep',
                         'avg_num_animals': 20,
                         'avg_num_days': 100,
                         'crop_yield': 100,
                         'crop_resid': True,
                         'crop_name': 'Reed (Phragmites australis)',
                         'diesel_per_site': 75,
                         'elec_per_site': 50,
                         'crop_use': 'Food Application'}}
    '''
    with open(inpt_file, 'w') as outfile:
        print(json.dumps(inputs, indent = 5), file = outfile)
    '''
    return inputs


def Create_Data_Tab(user_input, gest):
    '''
    Parameters: user input file address, GEST df
    Returns: data df
    Purpose: Create the Data tab by calling information from the Input json and 
    GEST 2.0 dataframe. This function takes two parameters. The first is a string 
    of the name of the json file where the user input data is stored, the second 
    is the dataframe which contains the GEST 2.0 table. This function returns a pandas 
    dataframe which contains the output provided in the data tab of the excel file.
    '''
    #Open the json file and convert to dict
    '''
    with open(user_input) as json_file:
        user_input = json.load(json_file)
    '''
    #Initiate the Data dict
    data = {'base': {}, 'rewet': {}}

    #Start populating the data dict with simple data
    data['base']['veg_class'] = user_input['base']['veg_class']
    data['base']['type_animals'] = user_input['base']['type_animals']
    data['base']['type_synth_fert'] = user_input['base']['type_synth_fert']

    data['rewet']['veg_class'] = user_input['rewet']['veg_class']
    data['rewet']['type_animals'] = user_input['rewet']['type_animals']
    data['rewet']['type_synth_fert'] = user_input['rewet']['type_synth_fert']

    #Calculate the Animal Emission Factor and Nitrogen Excretion per head per year
    if data['base']['type_animals'] == 'No Animals':
        data['base']['animal_ef'] = 0
        data['base']['n_excretion'] = 0
    elif data['base']['type_animals'] == 'Dairy Cattle':
        data['base']['animal_ef'] = 0.02
        data['base']['n_excretion'] = 130.1
    elif data['base']['type_animals'] == 'Beef Cattle':
        data['base']['animal_ef'] = 0.02
        data['base']['n_excretion'] = 28.2
    elif data['base']['type_animals'] == 'Sheep':
        data['base']['animal_ef'] = 0.01
        data['base']['n_excretion'] = 9.9
    elif data['base']['type_animals'] == 'Goats':
        data['base']['animal_ef'] = 0.01
        data['base']['n_excretion'] = 7.4
    elif data['base']['type_animals'] == 'Water Buffalo':
        data['base']['animal_ef'] = 0.02
        data['base']['n_excretion'] = 76.5

    if data['rewet']['type_animals'] == data['base']['type_animals']:
        data['rewet']['animal_ef'] = data['base']['animal_ef']
        data['rewet']['n_excretion'] = data['base']['n_excretion']
    else:
        data['rewet']['animal_ef'] = 0
        data['rewet']['n_excretion'] = 0

    #Calculate Synthetic Fertilizer emission factor
    if data['base']['type_synth_fert'] == 'Nitrate Based':
        data['base']['fert_ef'] = 0.02
    elif data['base']['type_synth_fert'] == 'Ammonium Based':
        data['base']['fert_ef'] = 0.01

    if data['rewet']['type_synth_fert'] == 'Nitrate Based':
        data['rewet']['fert_ef'] = 0.02
    elif data['rewet']['type_synth_fert'] == 'Ammonium Based':
        data['rewet']['fert_ef'] = 0.01

    #Find Crop Residues number
    if user_input['base']['crop_resid']:
        data['base']['crop_resid'] = 1
    else:
        data['base']['crop_resid'] = 2

    if user_input['rewet']['crop_resid']:
        data['rewet']['crop_resid'] = 1
    else:
        data['rewet']['crop_resid'] = 2

    #Find Number of crop Name
    if user_input['base']['crop_name'] == 'Cattail (Typha Sp.)':
        data['base']['crop_name'] = 1
    elif user_input['base']['crop_name'] == 'Reed (Phragmites Australis)':
        data['base']['crop_name'] = 2
    elif user_input['base']['crop_name'] == 'Peat Moss (Sphagnum Sp.) ':
        data['base']['crop_name'] = 3
    elif user_input['base']['crop_name'] == 'Grasses like Reed Canary Grass':
        data['base']['crop_name'] = 4
    elif user_input['base']['crop_name'] == 'Alder (Alnus Sp.)':
        data['base']['crop_name'] = 5
    elif user_input['base']['crop_name'] == 'Other':
        data['base']['crop_name'] = 6

    if user_input['rewet']['crop_name'] == 'Cattail (Typha Sp.)':
        data['rewet']['crop_name'] = 1
    elif user_input['rewet']['crop_name'] == 'Reed (Phragmites Australis)':
        data['rewet']['crop_name'] = 2
    elif user_input['rewet']['crop_name'] == 'Peat Moss (Sphagnum Sp.) ':
        data['rewet']['crop_name'] = 3
    elif user_input['rewet']['crop_name'] == 'Grasses like Reed Canary Grass':
        data['rewet']['crop_name'] = 4
    elif user_input['rewet']['crop_name'] == 'Alder (Alnus Sp.)':
        data['rewet']['crop_name'] = 5
    elif user_input['rewet']['crop_name'] == 'Other':
        data['rewet']['crop_name'] = 6

    #Find Product Use Number
    if user_input['rewet']['crop_use'] == 'Building Materials e.g insulation, taching, timber':
        data['rewet']['crop_use'] = 1
    elif user_input['rewet']['crop_use'] == 'Bedding Material':
        data['rewet']['crop_use'] = 2
    elif user_input['rewet']['crop_use'] == 'Food Application':
        data['rewet']['crop_use'] = 3
    elif user_input['rewet']['crop_use'] == 'Fodder/Feed Application':
        data['rewet']['crop_use'] = 4
    elif user_input['rewet']['crop_use'] == 'Energy Use: biogas, combustion, wood etc':
        data['rewet']['crop_use'] = 5
    elif user_input['rewet']['crop_use'] == 'Paper':
        data['rewet']['crop_use'] = 6
    elif user_input['rewet']['crop_use'] == 'Extraction of Ingredients/Building Blocks: proteins, fibres, cellulose etc':
        data['rewet']['crop_use'] = 7
    elif user_input['rewet']['crop_use'] == 'High Quality Substrate in Horticulture':
        data['rewet']['crop_use'] = 8
    elif user_input['rewet']['crop_use'] == 'Other Uses/Unknown':
        data['rewet']['crop_use'] = 9

    #Perform Vegetation Class emission calculations
    veg_num_base = data['base']['veg_class'].split(':', 1)[0]
    veg_num_rewet = data['rewet']['veg_class'].split(':', 1)[0]
    
    for i in range(2, 44):
        if veg_num_base == gest.iloc[i]['Name']:
            data['base']['veg_ch4_gwp'] = gest.iloc[i]['CH4']
            data['base']['veg_c02_gwp'] = gest.iloc[i]['CO2']
            data['base']['veg_cflux_gwp'] = gest.iloc[i]['Total C-flux (GWP)']
        if veg_num_rewet == gest.iloc[i]['Name']:
            data['rewet']['veg_ch4_gwp'] = gest.iloc[i]['CH4']
            data['rewet']['veg_c02_gwp'] = gest.iloc[i]['CO2']
            data['rewet']['veg_cflux_gwp'] = gest.iloc[i]['Total C-flux (GWP)']

    return pd.DataFrame.from_dict(data)

def Create_crop_Use_Tab(user_input, data):
    '''
    Parameters: user input file address, data tab df
    Returns: crop use df
    Purpose: Create the crop_Use tab by calling information from the Input json and the 
    Data Tab dataframe. This function takes two parameters. The first is a string of 
    the name of the json file where the user input data is stored, the second is the 
    dataframe which contains the Data Tab dataframe. This function returns a pandas 
    dataframe which contains the output provided in the data tab of the excel file.
    '''
    #Open the json file and convert to dict
    '''
    with open(user_input) as json_file:
        user_input = json.load(json_file)
    '''
    #Initialize crop_use dictionary
    crop_use = {}

    #Populate the crop_use dictionary
    crop_use['crop_yield'] = user_input['rewet']['crop_yield']

    if data.loc['crop_use']['rewet'] == 2 or data.loc['crop_use']['rewet'] == 3 or data.loc['crop_use']['rewet'] == 4 or data.loc['crop_use']['rewet'] == 9:
        crop_use['product_weight'] = 0
    else:
        crop_use['product_weight'] = crop_use['crop_yield']

    crop_use['carbon_weight'] = crop_use['product_weight']*0.475
    crop_use['ton_co2'] = crop_use['carbon_weight']*(44/12)
    crop_use['ton_co2_per_ha'] = crop_use['ton_co2']*(-1)
    crop_use['ton_co2_per_site'] = crop_use['ton_co2_per_ha']*user_input['gen_site_data']['tot_area']

    #Save crop_use as a pandas dataframe
    crop_use = {'Values': crop_use}
    return pd.DataFrame.from_dict(crop_use)

def Create_C_Content_Soil_Tab(user_input):
    '''
    Parameters: user input file address
    Returns: c content df
    Purpose: Create the C Content Soil Tab by using information from the User Input json.
    '''
    #Open the json file and convert to dict
    '''
    with open(user_input) as json_file:
        user_input = json.load(json_file)
    '''
    #Initialize the C Content Soil dictionary
    c_content = {}

    #Populate C Content dictionary
    c_content['peat_type'] = user_input['gen_site_data']['peat_type']

    if c_content['peat_type'] == 'Sphagnum':
        c_content['c_content_per_cm_thick'] = 0.3496
    elif c_content['peat_type'] == 'Herbaceous':
        c_content['c_content_per_cm_thick'] = 0.5959
    elif c_content['peat_type'] == 'Woody':
        c_content['c_content_per_cm_thick'] = 0.54972
    elif c_content['peat_type'] == 'Brown moss':
        c_content['c_content_per_cm_thick'] = 0.84783
    elif c_content['peat_type'] == 'Unknown':
        c_content['c_content_per_cm_thick'] = 0.55224
    elif c_content['peat_type'] == 'Humidified':
        c_content['c_content_per_cm_thick'] = 0.91008

    c_content['peat_thick'] = user_input['gen_site_data']['peat_thick']
    c_content['c_stock_ton_per_ha'] = c_content['peat_thick']*c_content['c_content_per_cm_thick']*10
    c_content['c_stock_tco2_per_ha'] = c_content['c_stock_ton_per_ha']*(44/12)

    #Save C Content Soil tab as a pandas dataframe
    c_content = {'Values': c_content}
    return pd.DataFrame.from_dict(c_content)

def Create_Soil_Moisture_Classes_Tab(user_input):
    '''
    Parameters: user input file address
    Returns: soil moisture class df
    Purpose: Create the Soil Moisture Classes Tab by using information from the User Input json.
    '''
    #Open the json file and convert to dict
    '''
    with open(user_input) as json_file:
        user_input = json.load(json_file)
    '''
    #Initialize the Soil Moisture Classes dictionary
    sm_classes = {'base': {}, 'rewet': {}}

    #Populate dictionary
    if user_input['base']['med_gw_level_summer'] >= 0 and user_input['base']['med_gw_level_summer'] <= 140:
        sm_classes['base']['summer_moist_class_num'] = '6+'
        sm_classes['base']['summer_moist_class_name'] = 'Flooded (lower eulittoral)'
        sm_classes['base']['summer_moist_class'] = '6+ (Flooded (lower eulittoral))'
    elif user_input['base']['med_gw_level_summer'] >= -10 and user_input['base']['med_gw_level_summer'] < 0:
        sm_classes['base']['summer_moist_class_num'] = '5+'
        sm_classes['base']['summer_moist_class_name'] = 'Wet (upper eulittoral)'
        sm_classes['base']['summer_moist_class'] = '5+ (Wet (upper eulittoral))'
    elif user_input['base']['med_gw_level_summer'] >= -20 and user_input['base']['med_gw_level_summer'] < -10:
        sm_classes['base']['summer_moist_class_num'] = '4+'
        sm_classes['base']['summer_moist_class_name'] = 'Semi wet (very moist)'
        sm_classes['base']['summer_moist_class'] = '4+ (Semi wet (very moist))'
    elif user_input['base']['med_gw_level_summer'] >= -45 and user_input['base']['med_gw_level_summer'] < -20:
        sm_classes['base']['summer_moist_class_num'] = '3+'
        sm_classes['base']['summer_moist_class_name'] = 'Moist'
        sm_classes['base']['summer_moist_class'] = '3+ (Moist)'
    elif user_input['base']['med_gw_level_summer'] >= -85 and user_input['base']['med_gw_level_summer'] < -45:
        sm_classes['base']['summer_moist_class_num'] = '2+'
        sm_classes['base']['summer_moist_class_name'] = 'Moderate moist'
        sm_classes['base']['summer_moist_class'] = '2+ (Moderate moist)'
    elif user_input['base']['med_gw_level_summer'] < -85:
        sm_classes['base']['summer_moist_class_num'] = '2-'
        sm_classes['base']['summer_moist_class_name'] = 'Moderate dry'
        sm_classes['base']['summer_moist_class'] = '2- (Moderate dry)'

    if user_input['rewet']['med_gw_level_summer'] >= 0 and user_input['rewet']['med_gw_level_summer'] <= 140:
        sm_classes['rewet']['summer_moist_class_num'] = '6+'
        sm_classes['rewet']['summer_moist_class_name'] = 'Flooded (lower eulittoral)'
        sm_classes['rewet']['summer_moist_class'] = '6+ (Flooded (lower eulittoral))'
    elif user_input['rewet']['med_gw_level_summer'] >= -10 and user_input['rewet']['med_gw_level_summer'] < 0:
        sm_classes['rewet']['summer_moist_class_num'] = '5+'
        sm_classes['rewet']['summer_moist_class_name'] = 'Wet (upper eulittoral)'
        sm_classes['rewet']['summer_moist_class'] = '5+ (Wet (upper eulittoral))'
    elif user_input['rewet']['med_gw_level_summer'] >= -20 and user_input['rewet']['med_gw_level_summer'] < -10:
        sm_classes['rewet']['summer_moist_class_num'] = '4+'
        sm_classes['rewet']['summer_moist_class_name'] = 'Semi wet (very moist)'
        sm_classes['rewet']['summer_moist_class'] = '4+ (Semi wet (very moist))'
    elif user_input['rewet']['med_gw_level_summer'] >= -45 and user_input['rewet']['med_gw_level_summer'] < -20:
        sm_classes['rewet']['summer_moist_class_num'] = '3+'
        sm_classes['rewet']['summer_moist_class_name'] = 'Moist'
        sm_classes['rewet']['summer_moist_class'] = '3+ (Moist)'
    elif user_input['rewet']['med_gw_level_summer'] >= -85 and user_input['rewet']['med_gw_level_summer'] < -45:
        sm_classes['rewet']['summer_moist_class_num'] = '2+'
        sm_classes['rewet']['summer_moist_class_name'] = 'Moderate moist'
        sm_classes['rewet']['summer_moist_class'] = '2+ (Moderate moist)'
    elif user_input['rewet']['med_gw_level_summer'] < -85:
        sm_classes['rewet']['summer_moist_class_num'] = '2-'
        sm_classes['rewet']['summer_moist_class_name'] = 'Moderate dry'
        sm_classes['rewet']['summer_moist_class'] = '2- (Moderate dry)'

    #Save Soil Moisture Classes tab as a pandas dataframe
    return pd.DataFrame.from_dict(sm_classes)


# Functions corresponding to calculations used in the N2O fertilizer tab

#Direct N2O emissions

def Manure_CO2Site_Base(manure_applied_base, tot_area):

    EF=0.02
    N2O_CO2eq=265 #value from the CO2 equivalent table, just this value is used from the table
    N2O_N=EF*manure_applied_base
    N2O_ha= N2O_N*(44/28)
    N2O_site=N2O_ha*tot_area
    CO2_site_manure_base=N2O_site*N2O_CO2eq

    return CO2_site_manure_base

def Organic_Fert_CO2Site_Base(organic_applied_base,tot_area):

    EF=0.02
    N2O_CO2eq=265 
    N2O_N=EF*organic_applied_base
    N2O_ha= N2O_N*(44/28)
    N2O_site=N2O_ha*tot_area
    CO2_site_organic_base=N2O_site*N2O_CO2eq

    return CO2_site_organic_base

def Grazing_CO2Site_Base(avg_n_animals_base, avg_days_base, n_excretion_value_b, EF_animal_b, tot_area):

    N2O_CO2eq=265
    N_amount_base=(n_excretion_value_b*avg_n_animals_base*(avg_days_base/365)) / tot_area
    N2O_N=EF_animal_b*N_amount_base
    N2O_ha= N2O_N*(44/28)
    N2O_site=N2O_ha*tot_area
    CO2_site_grazing_base=N2O_site*N2O_CO2eq

    return CO2_site_grazing_base, N_amount_base

def Synth_CO2Site_Base(fert_applied_base, EF_fert_b, tot_area): 

    N2O_CO2eq=265 
    N2O_N=EF_fert_b*fert_applied_base
    N2O_ha= N2O_N*(44/28)
    N2O_site=N2O_ha*tot_area
    CO2_site_synth_fert_base=N2O_site*N2O_CO2eq

    return CO2_site_synth_fert_base

def Residue_Left_Input_Base(answer_b, crop_b):

    crops = ["Cattail (Typha sp.)", "Reed (Phragmites australis)", "Peat moss (Sphagnum sp.)", "Grasses like reed canary grass", "Alder (Alnus sp.)", "Other" ]  # List of all crop names
    
    if answer_b == "Yes" and crop_b in crops:
        
        if crop_b == "Cattail (Typha sp.)":
            cropresidue_fraction_tot_yield_b = 0.11627907
        elif crop_b == "Reed (Phragmites australis)":
            cropresidue_fraction_tot_yield_b = 0.046511628
        else:
            cropresidue_fraction_tot_yield_b = 0.0
            
    else:
        cropresidue_fraction_tot_yield_b = 0.0

    return cropresidue_fraction_tot_yield_b

def crop_Residue_Base(cropresidue_fraction_tot_yield_b, crop_yield_base, tot_area):

    nitrogen_content=0.015
    EF=0.02
    N2O_CO2eq=265
    amount_applied=cropresidue_fraction_tot_yield_b*crop_yield_base*1000*nitrogen_content
    N2O_N=EF*amount_applied
    N2O_ha= N2O_N*(44/28)
    N2O_site=N2O_ha*tot_area
    CO2_site_cropres_base=N2O_site*N2O_CO2eq

    return CO2_site_cropres_base

def Basis_value_managed_soils(tot_area):

    N2O_CO2eq=265
    N2O_ha=8 #Not sure why this value is 8
    N2O_site=N2O_ha*tot_area
    CO2_site_managed_soil=N2O_site*N2O_CO2eq

    return  CO2_site_managed_soil

def Total_Direct_N2Oemissions_Base(CO2_site_managed_soil, CO2_site_cropres_base, CO2_site_synth_fert_base, CO2_site_grazing_base, CO2_site_organic_base, CO2_site_manure_base ):

    total_direct_N2Oemiss_base= (CO2_site_managed_soil + CO2_site_cropres_base + CO2_site_synth_fert_base + CO2_site_grazing_base + CO2_site_organic_base + CO2_site_manure_base)/1000
    
    return total_direct_N2Oemiss_base

#Indirect N2O Emissions

def Animal_Ammonia_Base(manure_applied_base, N_amount_base, tot_area, avg_animals, avg_days):

    EF_ammonia=0.1035
    EF_N2O_N=0.01
    N2O_CO2eq=265
    ammonia_applied= manure_applied_base + ((N_amount_base*avg_animals*(avg_days/365))/tot_area)
    volatilization_N= ammonia_applied*EF_ammonia
    N2O_N=EF_N2O_N*volatilization_N
    N2O_ha= N2O_N*(44/28)
    N2O_site=N2O_ha*tot_area
    CO2_site_animal_amm_base=N2O_site*N2O_CO2eq

    return CO2_site_animal_amm_base

def Fert_Ammonia_Base(fert_applied_base, EF_ammonia_b, tot_area):

    EF_N2O_N=0.01
    N2O_CO2eq=265

    if EF_ammonia_b == 0.02:
        EF = 0.015
    else:
        EF = 0.1

    volatilization_N=fert_applied_base*EF
    N2O_N=EF_N2O_N*volatilization_N
    N2O_ha= N2O_N*(44/28)
    N2O_site=N2O_ha*tot_area
    CO2_site_fert_amm_base=N2O_site*N2O_CO2eq

    return CO2_site_fert_amm_base

def N_Oxide_Base(manure_applied_base, fert_applied_base, N_amount_base, avg_animals, avg_days, tot_area):

    EF_NOxide_ammonia=0.15
    EF_N2O_N=0.01
    N2O_CO2eq=265
    N=manure_applied_base + fert_applied_base + ((N_amount_base*avg_animals*(avg_days/365))/tot_area)
    volatilization_N= EF_NOxide_ammonia*N
    N2O_N=EF_N2O_N*volatilization_N
    N2O_ha= N2O_N*(44/28)
    N2O_site=N2O_ha*tot_area
    CO2_site_NOxide_base=N2O_site*N2O_CO2eq

    return CO2_site_NOxide_base

def Nitrate_Base(manure_applied_base, organic_applied_base, cropresidue_fraction_tot_yield_b, crop_yield, fert_applied_base, tot_area, rewet):
    
    EF_nitrate_leaching=0.3
    EF_N2O_N_leached=0.025
    N2O_CO2eq=265


    applied_animal=manure_applied_base + organic_applied_base

    if rewet == True:
        applied_remaining=organic_applied_base + (cropresidue_fraction_tot_yield_b*1000*crop_yield*0.015)
    else:
        applied_remaining = organic_applied_base + cropresidue_fraction_tot_yield_b
        
    nitrate_leached= (applied_animal +  fert_applied_base +  applied_remaining) * EF_nitrate_leaching
    N2O_N_leached= nitrate_leached * EF_N2O_N_leached
    N2O_ha= N2O_N_leached*(44/28)
    N2O_site=N2O_ha*tot_area
    CO2_site_nitrate_base=N2O_site*N2O_CO2eq

    return CO2_site_nitrate_base

def Total_Indirect_N2Oemissions_Base( CO2_site_nitrate_base, CO2_site_NOxide_base, CO2_site_fert_amm_base, CO2_site_animal_amm_base):

    tot_indirect_N2Oemiss_base=(CO2_site_nitrate_base + CO2_site_NOxide_base + CO2_site_fert_amm_base + CO2_site_animal_amm_base)/1000
    return tot_indirect_N2Oemiss_base

def Create_Outcome_Tab(user_input, data, crop_use, c_content, gest):
    '''
    Parameters: user input file address, data df, crop_use df, c content df, and GEST csv
    Returns: outcome df
    Purpose: Create a function for the construction of the Outcome tab using 
    information from the user input json and the N2O, crop_use, Data, and 
    C Content Soil tabs, as well as the GEST 2.0 csv.
    '''
    #Open the json file and convert to dict
    '''
    with open(user_input) as json_file:
        user_input = json.load(json_file)
    '''
    #Initialize the Soil Moisture Classes dictionary
    outcome = {'base': {}, 'rewet': {}, 'creditable_year': {}}

    #Populate the base dictionary
    outcome['base']['veg_ch4_gwp'] = float(data.loc['veg_ch4_gwp']['base'])*user_input['gen_site_data']['tot_area']
    outcome['base']['veg_c02_gwp'] = float(data.loc['veg_c02_gwp']['base'])*user_input['gen_site_data']['tot_area']

    outcome['base']['tot_direct_n2o'] = Total_Direct_N2Oemissions_Base(Basis_value_managed_soils(user_input['gen_site_data']['tot_area']), 
                                                                            crop_Residue_Base(Residue_Left_Input_Base(user_input['base']['crop_resid'], user_input['base']['crop_name']), user_input['base']['crop_yield'], user_input['gen_site_data']['tot_area']), 
                                                                            Synth_CO2Site_Base(user_input['base']['amount_synth_fert'], data.loc['fert_ef']['base'], user_input['gen_site_data']['tot_area']),
                                                                            Grazing_CO2Site_Base(user_input['base']['avg_num_animals'], user_input['base']['avg_num_days'], data.loc['n_excretion']['base'], data.loc['animal_ef']['base'], user_input['gen_site_data']['tot_area'])[0],
                                                                            Organic_Fert_CO2Site_Base(user_input['base']['amount_org_fert'], user_input['gen_site_data']['tot_area']),
                                                                            Manure_CO2Site_Base(user_input['base']['amount_manure'], user_input['gen_site_data']['tot_area']))

    outcome['base']['tot_indirect_n2o'] = Total_Indirect_N2Oemissions_Base(Nitrate_Base(user_input['base']['amount_manure'], user_input['base']['amount_org_fert'], Residue_Left_Input_Base(user_input['base']['crop_resid'], user_input['base']['crop_name']), user_input['base']['crop_yield'], user_input['base']['amount_synth_fert'], user_input['gen_site_data']['tot_area'], False), 
                                                                                 N_Oxide_Base(user_input['base']['amount_manure'], user_input['base']['amount_synth_fert'], data.loc['n_excretion']['base'], user_input['base']['avg_num_animals'], user_input['base']['avg_num_days'], user_input['gen_site_data']['tot_area']), 
                                                                                 Fert_Ammonia_Base(user_input['base']['amount_synth_fert'], data.loc['fert_ef']['base'], user_input['gen_site_data']['tot_area']), 
                                                                                 Animal_Ammonia_Base(user_input['base']['amount_manure'], data.loc['n_excretion']['base'], user_input['gen_site_data']['tot_area'], user_input['base']['avg_num_animals'], user_input['base']['avg_num_days']))
    
    outcome['base']['activity'] = ((user_input['base']['diesel_per_site']*3.35)+(user_input['base']['elec_per_site']*0.581))/1000
    outcome['base']['total'] = sum((float(outcome['base']['veg_ch4_gwp']), float(outcome['base']['veg_c02_gwp']), float(outcome['base']['tot_direct_n2o']), float(outcome['base']['tot_indirect_n2o']), float(outcome['base']['activity'])), 0)
    
    #Populate the Rewetting dictionary
    outcome['rewet']['veg_ch4_gwp'] = float(data.loc['veg_ch4_gwp']['rewet'])*user_input['gen_site_data']['tot_area']
    outcome['rewet']['veg_c02_gwp'] = float(data.loc['veg_c02_gwp']['rewet'])*user_input['gen_site_data']['tot_area']

    outcome['rewet']['tot_direct_n2o'] = Total_Direct_N2Oemissions_Base(Basis_value_managed_soils(user_input['gen_site_data']['tot_area']), 
                                                                            crop_Residue_Base(Residue_Left_Input_Base(user_input['rewet']['crop_resid'], user_input['rewet']['crop_name']), user_input['rewet']['crop_yield'], user_input['gen_site_data']['tot_area']), 
                                                                            Synth_CO2Site_Base(user_input['rewet']['amount_synth_fert'], data.loc['fert_ef']['rewet'], user_input['gen_site_data']['tot_area']),
                                                                            Grazing_CO2Site_Base(user_input['rewet']['avg_num_animals'], user_input['rewet']['avg_num_days'], data.loc['n_excretion']['rewet'], data.loc['animal_ef']['rewet'], user_input['gen_site_data']['tot_area'])[0],
                                                                            Organic_Fert_CO2Site_Base(user_input['rewet']['amount_org_fert'], user_input['gen_site_data']['tot_area']),
                                                                            Manure_CO2Site_Base(user_input['rewet']['amount_manure'], user_input['gen_site_data']['tot_area']))
    
    outcome['rewet']['tot_indirect_n2o'] = Total_Indirect_N2Oemissions_Base(Nitrate_Base(user_input['rewet']['amount_manure'], user_input['rewet']['amount_org_fert'], Residue_Left_Input_Base(user_input['rewet']['crop_resid'], user_input['rewet']['crop_name']), user_input['rewet']['crop_yield'], user_input['rewet']['amount_synth_fert'], user_input['gen_site_data']['tot_area'], True), 
                                                                                 N_Oxide_Base(user_input['rewet']['amount_manure'], user_input['rewet']['amount_synth_fert'], data.loc['n_excretion']['base'], user_input['base']['avg_num_animals'], user_input['base']['avg_num_days'], user_input['gen_site_data']['tot_area']), 
                                                                                 Fert_Ammonia_Base(user_input['rewet']['amount_synth_fert'], data.loc['fert_ef']['rewet'], user_input['gen_site_data']['tot_area']), 
                                                                                 Animal_Ammonia_Base(user_input['rewet']['amount_manure'], data.loc['n_excretion']['rewet'], user_input['gen_site_data']['tot_area'], user_input['rewet']['avg_num_animals'], user_input['rewet']['avg_num_days']))
    
    outcome['rewet']['Product ton_co2_per_site'] = crop_use.loc['ton_co2_per_site']['Values']
    outcome['rewet']['activity'] = ((user_input['rewet']['diesel_per_site']*3.35)+(user_input['rewet']['elec_per_site']*0.581))/1000
    outcome['rewet']['total'] = sum((float(outcome['rewet']['veg_ch4_gwp']), float(outcome['rewet']['veg_c02_gwp']), float(outcome['rewet']['tot_direct_n2o']), float(outcome['rewet']['tot_indirect_n2o']), float(outcome['rewet']['activity']), float(outcome['rewet']['Product ton_co2_per_site'])), 0)

    #Populate creditable_year tab
    veg_num_base = data['base']['veg_class'].split(':', 1)[0]
    veg_num_rewet = data['rewet']['veg_class'].split(':', 1)[0]
    
    for i in range(2, 44):
        if veg_num_base == gest.iloc[i]['Name']:
            outcome['creditable_year']['base_scenario'] = float(c_content.loc['c_stock_ton_per_ha']['Values'])/(float(gest.iloc[i]['Total C-flux (ton C/ha)']))
        
        if veg_num_rewet == gest.iloc[i]['Name']:
            if float(c_content.loc['c_stock_ton_per_ha']['Values'])/float(gest.iloc[i]['Total C-flux (ton C/ha)']) > 0:
                outcome['creditable_year']['rewet_scenario'] = float(c_content.loc['c_stock_ton_per_ha']['Values'])/float(gest.iloc[i]['Total C-flux (ton C/ha)'])
            else:
                #outcome['creditable_year']['rewet_scenario'] = float('inf')
                outcome['creditable_year']['rewet_scenario'] = "Infinity"
    
    #Save the outcome tab in a pandas database
    return pd.DataFrame.from_dict(outcome)

def Create_Timeline_tab(user_input, outcome, c_content, gest):
    '''
    Parameters: user input file address, outcome df, c content df, and gest csv
    Returns: timeline df
    Purpose: Create Timeline tab using information from the user input json, 
    GEST 2.0 csv, and the outcome and C content soil tabs.
    '''        
    #Open the json file and convert to dict
    '''
    with open(user_input) as json_file:
        user_input = json.load(json_file)
    '''
    #Initialize the Timeline dict
    timeline = {}
    list_colnames = ['base_emissions', 'base_GESTv2', 'rewet_emissions', 'rewet_GESTv2', 'carbon_savings_flow', 'carbon_savings_stock', 'carbon_savings_product', 'carbon_savings_total', 'base_GESTnr', 'c_sequestration_base', 'c_stock_soil_base', 'stock_savings_creditable', 'rewet_GESTnr', 'c_sequestration_rewet', 'c_credits_' + user_input['gen_site_data']['site_name']]
    for i in list_colnames:
        timeline[i] = {}
        for j in range(int(user_input['gen_site_data']['year_start']), int(user_input['gen_site_data']['year_start'])+50):
            timeline[i][j] = None

    #Populate dict column by column
    for i in range(list(timeline['base_emissions'].keys())[0], list(timeline['base_emissions'].keys())[-1]+1):
        timeline['base_emissions'][i] = outcome.loc['total']['base']
        timeline['base_GESTv2'][i] = user_input['base']['veg_class']
        timeline['rewet_emissions'][i] = outcome.loc['total']['rewet']
        timeline['rewet_GESTv2'][i] = user_input['rewet']['veg_class']
        timeline['carbon_savings_flow'][i] = float(outcome.loc['tot_direct_n2o']['base']) + float(outcome.loc['tot_indirect_n2o']['base']) + float(outcome.loc['activity']['base']) - float(outcome.loc['tot_direct_n2o']['rewet']) - float(outcome.loc['tot_indirect_n2o']['rewet']) - float(outcome.loc['activity']['rewet'])
        timeline['carbon_savings_stock'][i] = float(outcome.loc['veg_ch4_gwp']['base']) + float(outcome.loc['veg_c02_gwp']['base']) - float(outcome.loc['veg_ch4_gwp']['rewet']) - float(outcome.loc['veg_c02_gwp']['rewet'])
        timeline['carbon_savings_product'][i] = (-1)*float(outcome.loc['Product ton_co2_per_site']['rewet'])
        timeline['carbon_savings_total'][i] = sum((timeline['carbon_savings_flow'][i], timeline['carbon_savings_stock'][i], timeline['carbon_savings_product'][i]), 0)
        timeline['base_GESTnr'][i] = timeline['base_GESTv2'][i].split(':', 1)[0]
        timeline['rewet_GESTnr'][i] = timeline['rewet_GESTv2'][i].split(':', 1)[0]

        for j in range(2, 44):
            if timeline['base_GESTnr'][i] == gest.iloc[j]['Name']:
                timeline['c_sequestration_base'][i] = float(gest.iloc[j]['Total C-flux (ton C/ha)'])*user_input['gen_site_data']['tot_area']*(-1)
            if timeline['rewet_GESTnr'][i] == gest.iloc[j]['Name']:
                timeline['c_sequestration_rewet'][i] = float(gest.iloc[j]['Total C-flux (ton C/ha)'])*user_input['gen_site_data']['tot_area']*(-1)

        if i == list(timeline['base_emissions'].keys())[0]:
            timeline['c_stock_soil_base'][i] = (c_content.loc['c_stock_ton_per_ha']['Values']*user_input['gen_site_data']['tot_area']) + timeline['c_sequestration_base'][i]
        else:
            timeline['c_stock_soil_base'][i] = timeline['c_stock_soil_base'][i-1] + timeline['c_sequestration_base'][i]

        if timeline['c_stock_soil_base'][i] > 0:
            timeline['stock_savings_creditable'][i] = 1
        else:
            timeline['stock_savings_creditable'][i] = 0

        if timeline['stock_savings_creditable'][i] == 1:
            timeline['c_credits_' + user_input['gen_site_data']['site_name']][i] = timeline['carbon_savings_total'][i]
        else:
            if timeline['c_sequestration_rewet'][i] > 0:
                timeline['c_credits_' + user_input['gen_site_data']['site_name']][i] = timeline['carbon_savings_flow'][i] + timeline['carbon_savings_product'][i] + (timeline['c_sequestration_rewet'][i]*(44/12))
            else:
                timeline['c_credits_' + user_input['gen_site_data']['site_name']][i] = timeline['carbon_savings_flow'][i] + timeline['carbon_savings_product'][i]

    #Save the outcome tab in a pandas database
    return pd.DataFrame.from_dict(timeline)


def Create_Output_tab(output_file, user_input, sm_classes, data_tab, outcome, c_content, crop_use):
    '''
    Parameters: output file address, input file address, moisture class df, 
    data df, outcome df, c content df, and crop use df
    Returns: none
    Purpose: Create Output tab using information from the user input json, 
    soil moisture classes, data, outcome, and C content soil tabs.
    '''    
    #Open the json file and convert to dict
    '''
    with open(user_input) as json_file:
        user_input = json.load(json_file)
    '''
    #Initialise Output dict
    output = {'site_data': {}, 'base_outcomes': {}, 'rewet_outcomes': {}, 'carbon_savings': {}}

    #Populate the site_data section
    output['site_data']['site_name'] = user_input['gen_site_data']['site_name']
    output['site_data']['coords'] = user_input['gen_site_data']['coords']
    output['site_data']['tot_area'] = user_input['gen_site_data']['tot_area']
    output['site_data']['peat_type'] = user_input['gen_site_data']['peat_type']
    output['site_data']['peat_thick'] = user_input['gen_site_data']['peat_thick']
    output['site_data']['year_start'] = user_input['gen_site_data']['year_start']
    output['site_data']['sm_class_base'] = sm_classes.loc['summer_moist_class']['base']
    output['site_data']['sm_class_rewet'] = sm_classes.loc['summer_moist_class']['rewet']
    output['site_data']['base veg_class'] = user_input['base']['veg_class']
    output['site_data']['rewet_veg_class'] = user_input['rewet']['veg_class']

    #Populate the base_outcomes section
    output['base_outcomes']['CH4'] = (float(data_tab.loc['veg_ch4_gwp']['base'])*user_input['gen_site_data']['tot_area'])
    output['base_outcomes']['CO2'] = float(data_tab.loc['veg_c02_gwp']['base'])*user_input['gen_site_data']['tot_area']
    output['base_outcomes']['c_emission_gwp_subtotal'] = float(output['base_outcomes']['CH4']) + float(output['base_outcomes']['CO2'])

    output['base_outcomes']['n2o_direct'] = outcome.loc['tot_direct_n2o']['base']
    output['base_outcomes']['n2o_indirect'] = outcome.loc['tot_indirect_n2o']['base']
    output['base_outcomes']['n2o_emission_gwp_subtotal'] = float(output['base_outcomes']['n2o_direct']) + float(output['base_outcomes']['n2o_indirect'])

    output['base_outcomes']['activity_gwp_subtotal'] = outcome.loc['activity']['base']
    output['base_outcomes']['gwp_total'] = outcome.loc['total']['base']

    #Populate the rewet_outcomes section
    output['rewet_outcomes']['CH4'] = (float(data_tab.loc['veg_ch4_gwp']['rewet'])*user_input['gen_site_data']['tot_area'])
    output['rewet_outcomes']['CO2'] = (float(data_tab.loc['veg_c02_gwp']['rewet'])*user_input['gen_site_data']['tot_area'])
    output['rewet_outcomes']['c_emission_gwp_subtotal'] = float(output['rewet_outcomes']['CH4']) + float(output['rewet_outcomes']['CO2'])

    output['rewet_outcomes']['n2o_direct'] = outcome.loc['tot_direct_n2o']['rewet']
    output['rewet_outcomes']['n2o_indirect'] = outcome.loc['tot_indirect_n2o']['rewet']
    output['rewet_outcomes']['n2o_emission_gwp_subtotal'] = float(output['rewet_outcomes']['n2o_direct']) + float(output['rewet_outcomes']['n2o_indirect'])

    output['rewet_outcomes']['activity_gwp_subtotal'] = outcome.loc['activity']['rewet']
    output['rewet_outcomes']['product_gwp_subtotal'] = outcome.loc['Product ton_co2_per_site']['rewet']
    output['rewet_outcomes']['gwp_total'] = outcome.loc['total']['rewet']

    #Populate carbon_savings section
    output['carbon_savings']['ghg_savings_total_per_year_per_site'] = output['base_outcomes']['gwp_total'] - output['rewet_outcomes']['gwp_total']
    output['carbon_savings']['ghg_savings_total_per_year_per_ha'] = output['carbon_savings']['ghg_savings_total_per_year_per_site']/output['site_data']['tot_area']
    output['carbon_savings']['ghg_savings_stock_per_year_per_site'] = float(outcome.loc['veg_ch4_gwp']['base']) + float(outcome.loc['veg_c02_gwp']['base']) - float(outcome.loc['veg_ch4_gwp']['rewet']) - float(outcome.loc['veg_c02_gwp']['rewet'])
    output['carbon_savings']['ghg_savings_stock_per_year_per_ha'] = output['carbon_savings']['ghg_savings_stock_per_year_per_site']/output['site_data']['tot_area']
    output['carbon_savings']['ghg_savings_flow_per_year_per_site'] = float(outcome.loc['tot_direct_n2o']['base']) + float(outcome.loc['tot_indirect_n2o']['base']) +float(outcome.loc['activity']['base']) - float(outcome.loc['tot_direct_n2o']['rewet']) - float(outcome.loc['tot_indirect_n2o']['rewet']) - float(outcome.loc['activity']['rewet'])
    output['carbon_savings']['ghg_savings_flow_per_year_per_ha'] = output['carbon_savings']['ghg_savings_flow_per_year_per_site']/output['site_data']['tot_area']
    output['carbon_savings']['ghg_savings_product_use_per_year_per_site'] = crop_use.loc['ton_co2_per_site']['Values']*(-1)
    output['carbon_savings']['ghg_savings_product_use_per_year_per_ha'] = crop_use.loc['ton_co2_per_ha']['Values']*(-1)
    
    output['carbon_savings']['carbon_stock_peat_soil_start_year_tco2_per_site'] = c_content.loc['c_stock_tco2_per_ha']['Values']*output['site_data']['tot_area']
    output['carbon_savings']['carbon_stock_peat_soil_start_year_ton_c_per_site'] = c_content.loc['c_stock_ton_per_ha']['Values']*output['site_data']['tot_area']
    output['carbon_savings']['carbon_stock_peat_soil_start_year_tco2_per_ha'] = c_content.loc['c_stock_tco2_per_ha']['Values']
    output['carbon_savings']['carbon_stock_peat_soil_start_year_ton_c_per_ha'] = c_content.loc['c_stock_ton_per_ha']['Values']

    output['carbon_savings']['time_til_peat_is_lost_base_scenario'] = outcome.loc['base_scenario']['creditable_year']
    output['carbon_savings']['time_til_peat_is_lost_rewet_scenario'] = outcome.loc['rewet_scenario']['creditable_year']
    
    
    with open(output_file, 'w') as outfile:
        print(json.dumps(output, indent = 5), file = outfile)
    
    return output

def set_run(inputs_dict, path_to_gest, output_file):
    dict_of_csvs = Load_csvs(path_to_gest)
    gest = dict_of_csvs['GEST_2_Static_Values.csv']
    data_tab = Create_Data_Tab(inputs_dict, gest)
    crop_use_tab = Create_crop_Use_Tab(inputs_dict, data_tab)
    c_content_tab = Create_C_Content_Soil_Tab(inputs_dict)
    sm_classes = Create_Soil_Moisture_Classes_Tab(inputs_dict)
    outcome = Create_Outcome_Tab(inputs_dict, data_tab, crop_use_tab, c_content_tab, gest)
    timeline = Create_Timeline_tab(inputs_dict, outcome, c_content_tab, gest)
    output = Create_Output_tab(output_file, inputs_dict, sm_classes, data_tab, outcome, c_content_tab, crop_use_tab)
    
def main():
    path_to_gest = ['.\\SET_Tool\\csv_files\\GEST_2_Static_Values.csv']
    SET_USR_INPT_FILE = '.\\inputs\\user_input_SET.json'
    SET_USR_OUTPT_FILE = '.\\outputs\\output_SET.json'
    
    input_dct = Create_Input_Dict()
    set_run(input_dct, path_to_gest, SET_USR_OUTPT_FILE)
    print("Done.")


if __name__ == "__main__":
    main()