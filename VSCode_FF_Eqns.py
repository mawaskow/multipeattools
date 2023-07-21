# Equation 1
def Exponent_Year(period_of_years):
    exponent_year = period_of_years - 1
    return exponent_year

# Equation 2
def Calendar_Year_End(calendar_year_start, exponent_year):
    calendar_year_end = calendar_year_start + exponent_year
    return calendar_year_end

# Equation 3
def Real_Interest_Rate(nominal_interest_rate, inflation_rate):
    real_interest_rate = nominal_interest_rate - inflation_rate
    return real_interest_rate

# Equation 4
def Credits_Generated(period_of_years, hectares_restored, credits_per_hectare_per_year):
    credits_generated = period_of_years*hectares_restored*credits_per_hectare_per_year
    return credits_generated

# Equation 5
def Generation_Cost_per_Credit(investment_amount, total_project_costs, credits_generated):
    generation_cost_per_credit = (investment_amount + total_project_costs)/credits_generated
    return generation_cost_per_credit

# Equation 6
def Beginning_Value(credits_generated, generation_cost_per_credit):
    beginning_value = credits_generated*generation_cost_per_credit
    return beginning_value

# Equation 7
def Ending_Value_Undiscounted(credits_generated, price_per_credit):
    ending_value_undiscounted = credits_generated*price_per_credit
    return ending_value_undiscounted

# Equation 8
def Carbon_Investment_Cost_per_Payment(interest_rate, payments_per_year, period_of_years, investment_amount):
    rate = interest_rate/payments_per_year
    n = payments_per_year*period_of_years
    x = rate*investment_amount
    y = (1-((1+rate)**(-n)))
    carbon_investment_cost_per_payment = x/y
    return carbon_investment_cost_per_payment

# Equation 9
def Carbon_Investment_Annual_Costs(carbon_investment_cost_per_payment, payments_per_year):
    carbon_investment_annual_costs = carbon_investment_cost_per_payment*payments_per_year
    return carbon_investment_annual_costs

# Equation 10
def Total_Investment_Costs(carbon_investment_annual_costs, period_of_years):
    total_investment_costs = carbon_investment_annual_costs*period_of_years
    return total_investment_costs

# Equation 11
def Number_of_Inspections(period_of_years, years_per_inspection_cycle):
    number_of_inspections = period_of_years/years_per_inspection_cycle
    return number_of_inspections

# Equation 12



# Equation 13
def Recurring_Registry_Costs(validation_application_fee, validation_statement_fee, inspector_travel_fees, minimum_conversion_cost, number_of_inspections):
    recurring_registry_costs = (validation_application_fee + validation_statement_fee + inspector_travel_fees + minimum_conversion_cost)*number_of_inspections
    return recurring_registry_costs

# Equation 14
def Registry_Costs_On_All_Credits(credit_listing_cost, credit_levy_cost, credits_generated):
    registry_costs_on_all_credits = (credit_listing_cost + credit_levy_cost)*credits_generated
    return registry_costs_on_all_credits

# Equation 15
def Registry_Costs_On_Credits_Over_Min_Threshold(conversion_cost_per_credit_over_min_threshold, credits_generated, minimum_threshold):
    if credits_generated > minimum_threshold:
        registry_costs_on_credits_over_min_threshold = (conversion_cost_per_credit_over_min_threshold)*(credits_generated - minimum_threshold)
    else:
        registry_costs_on_credits_over_min_threshold = 0
    return registry_costs_on_credits_over_min_threshold

# Equation 16
def Total_Registry_Costs(recurring_registry_costs, registry_costs_on_all_credits, registry_costs_on_credits_over_min_threshold):
    total_registry_costs = recurring_registry_costs + registry_costs_on_all_credits + registry_costs_on_credits_over_min_threshold
    return total_registry_costs

# Equation 17
def Exponent_Factor_for_CARG(exponent_year):
    exponent_factor_for_CARG = 1/exponent_year
    return exponent_factor_for_CARG

# Equation 18
def Total_Project_Costs_Undiscounted(total_investment_costs, total_registry_costs):
    total_project_costs_undiscounted = total_investment_costs + total_registry_costs
    return total_project_costs_undiscounted

# Equation 19
def Ending_Value_Discounted(ending_value_undiscounted, real_interest_rate, exponent_year):
    x = (1+real_interest_rate)**(exponent_year)
    ending_value_discounted = ending_value_undiscounted/x
    return ending_value_discounted

# Equation 20
def Total_Project_Costs_Discounted(total_project_costs_undiscounted, real_interest_rate, exponent_year):
    x = (1+real_interest_rate)**(exponent_year)
    total_project_costs_discounted = total_project_costs_undiscounted/x
    return total_project_costs_discounted

# Equation 21
def Rate_of_Return(ending_value_discounted, beginning_value):
    rate_of_return = ((ending_value_discounted-beginning_value)/beginning_value)*100
    return rate_of_return

# Equation 22
def Compound_Annualised_Rate_of_Growth(ending_value_undiscounted, beginning_value, exponent_factor_of_CARG):
    compound_annualised_rate_of_growth = ((ending_value_undiscounted/beginning_value)**(exponent_factor_of_CARG-1))*100
    return compound_annualised_rate_of_growth

# Equation 23
def Gross_Present_Value(ending_value_discounted, beginning_value):
    gross_present_value = ending_value_discounted - beginning_value
    return gross_present_value

# Equation 24
def Net_Present_Value(gross_product_value, total_project_costs_discounted):
    net_present_value = gross_product_value - total_project_costs_discounted
    return net_present_value

# Equation 25
def Profitable(profit_per_credit, profit_per_hectare_per_year, rate_of_return, compound_annualised_rate_of_growth, gross_present_value, net_present_value):
    profitable = 'No'
    if profit_per_credit > 0 and profit_per_hectare_per_year > 0 and rate_of_return > 0 and compound_annualised_rate_of_growth > 0 and gross_present_value > 0 and net_present_value > 0:
        profitable = 'Yes'
    return profitable

# Equation 26
def Profit_per_Credit(net_present_value, credits_generated):
    profit_per_credit = net_present_value/credits_generated
    return profit_per_credit

# Equation 27
def Profit_per_Hectare_per_Year(net_present_value, hectares_restored, period_of_years):
    profit_per_hectare_per_year = (net_present_value/hectares_restored)/period_of_years
    return profit_per_hectare_per_year

# This function converts a python dictionary to a json file

import json

def Convert_to_Json(dic, filename):
    json.dumps(dic, indent = 1)
    with open(filename, "w") as outfile:
        print(json.dumps(dic, indent = 1), file = outfile)
    outfile.close()


# This function converts the user input data into a labeled dictionary

def UserData(data):
    user_data = {'num_yrs': None, 'cred_p_hect_p_yr': None, 'hect_restored': None, 
                 'invest_amt': None, 'start_yr': None, 'price_p_cred': None}
    for i in range(0, len(data)):
        user_data[list(user_data.keys())[i]] = data[i]

    #Save the user data to a separate json file
    Convert_to_Json(user_data, "outputs/user_input_data.json")
    
    return user_data

# This function creates a dictionary of the basic assumptions that the toolkit makes when user input is not given

def Create_Assumptions():
    assumptions = {'cred_p_hect_p_yr': 20, 'nom_int_rt': 0.0235, 'inflation_rt': 0.021,
                   'reg_acct_open_fee': 0, 'reg_listing_cost_p_credit': 0.05, 
                   'reg_conv_cost_fee_p_inspect': 100, 
                   'reg_conv_cost_p_cred_abv_min_thresh_of_credits': 0.05,
                   'reg_levy_cost_p_cred': 0.05,
                   'valid_and_verif_app_cost_p_inspect': 600,
                   'valid_and_verif_stmnt_cost_p_inspect': 800,
                   'valid_and_verif_inspectr_travel_cost_p_inspect': 500,
                   'inspect_cycle_len': 5,
                   'min_thresh_of_credits': 2000,
                   'interest_rt': 0.05, 'payments_p_yr': 12}

    #Save initial assumptions to json file
    Convert_to_Json(assumptions, "outputs/initial_assumptions.json")
    
    return assumptions

# This function takes a list of user input edits to the basic assumptions and changes the assumptions accordingly. The updates to the basic assumptions must take the form of a list where every item is either the new value for the assumption, or None.

def Edit_Assumptions(assumptions, assumption_updates):
    for i in range(0, len(assumptions)):
        if assumption_updates[i] != None:
            assumptions[list(assumptions.keys())[i]] = assumption_updates[i]

    #Save edited assumptions to a separate json file
    Convert_to_Json(assumptions, "outputs/final_assumptions.json")
    
    return assumptions

# This function prints the final output summary of the toolkit 

def Summary(simple_output):
    print('Credits generated by restored area: ', simple_output['cred_generated'] , '\n')
    print('Cost of generating each credit: ', simple_output['gen_cost_p_cred'] , '\n')
    print('Estimated credits per hectare per year: ',  simple_output['cred_p_hect_p_yr'], '\n')
    print('Selling each credit for: ',  simple_output['price_p_cred'], '\n')
    print('Is this selling price profitable? ', simple_output['profitable'], '\n')
    print('Profit per credit: ', simple_output['prof_p_cred'], '\n')
    print('Profit per hectare per year: ', simple_output['prof_p_hect_p_yr'] , '\n')
    print('Profit across project duration: ', simple_output['net_pres_val'])

# This is the main function of the toolkit. It applies all of the calculations to the given data and stores the results of the calculations in two dictionaries; a detailed dictionary for in-depth technical summaries, and a simple dictionary for the final output summary.

def Output(user_data, assumption_updates):
    #Convert user input data to dictionary and apply any user input updates to the assumptions
    user_data = UserData(user_data)
    basic_assumptions = Create_Assumptions()
    assumptions = Edit_Assumptions(basic_assumptions, assumption_updates)
    
    #Initialise output dictionaries for detailed and simple outputs
    detailed_output = {}
    simple_output = {}

    #Add user data and assumptions to detailed output dictionary
    for i in user_data.keys():
        detailed_output[i] = user_data[i]
    for i in assumptions.keys():
        detailed_output[i] = assumptions[i]
    
    #Save values from Equations 1-4
    detailed_output['exp_yr'] = Exponent_Year(detailed_output['num_yrs'])
    detailed_output['cal_yr_end'] = Calendar_Year_End(detailed_output['start_yr'], detailed_output['exp_yr'])
    detailed_output['real_interest_rt'] = Real_Interest_Rate(detailed_output['nom_int_rt'], detailed_output['inflation_rt'])
    detailed_output['cred_generated'] = Credits_Generated(detailed_output['num_yrs'], detailed_output['hect_restored'], detailed_output['cred_p_hect_p_yr'])

    #Save values from Equations 8-10
    detailed_output['c_invest_cost_p_paymt'] = Carbon_Investment_Cost_per_Payment(detailed_output['interest_rt'], detailed_output['payments_p_yr'], detailed_output['num_yrs'], detailed_output['invest_amt'])
    detailed_output['c_invest_ann_cost'] = Carbon_Investment_Annual_Costs(detailed_output['c_invest_cost_p_paymt'], detailed_output['payments_p_yr'])
    detailed_output['tot_invest_cost'] = Total_Investment_Costs(detailed_output['c_invest_ann_cost'], detailed_output['num_yrs'])

    #Save values from Equations 11-16
    detailed_output['num_inspect'] = Number_of_Inspections(detailed_output['num_yrs'], detailed_output['inspect_cycle_len'])
    detailed_output['recur_reg_cost'] = Recurring_Registry_Costs(detailed_output['valid_and_verif_app_cost_p_inspect'], detailed_output['valid_and_verif_stmnt_cost_p_inspect'], detailed_output['valid_and_verif_inspectr_travel_cost_p_inspect'], detailed_output['reg_conv_cost_fee_p_inspect'], detailed_output['num_inspect'])
    detailed_output['reg_conv_cost_all_cred'] = Registry_Costs_On_All_Credits(detailed_output['reg_listing_cost_p_credit'], detailed_output['reg_levy_cost_p_cred'], detailed_output['cred_generated'])
    detailed_output['reg_cost_cred_ovr_min_thresh'] = Registry_Costs_On_Credits_Over_Min_Threshold(detailed_output['reg_conv_cost_p_cred_abv_min_thresh_of_credits'], detailed_output['cred_generated'], detailed_output['min_thresh_of_credits'])
    detailed_output['tot_reg_cost'] = Total_Registry_Costs(detailed_output['recur_reg_cost'], detailed_output['reg_conv_cost_all_cred'], detailed_output['reg_cost_cred_ovr_min_thresh'])

    #Save values from Equations 17-18
    detailed_output['exp_fact_carg'] = Exponent_Factor_for_CARG(detailed_output['exp_yr'])
    detailed_output['tot_proj_cost_nodiscount'] = Total_Project_Costs_Undiscounted(detailed_output['tot_invest_cost'], detailed_output['tot_reg_cost'])

    #Save values from Equations 5-7
    detailed_output['gen_cost_p_cred'] = Generation_Cost_per_Credit(detailed_output['invest_amt'], detailed_output['tot_proj_cost_nodiscount'], detailed_output['cred_generated'])
    detailed_output['begin_val'] = Beginning_Value(detailed_output['cred_generated'], detailed_output['gen_cost_p_cred'])
    detailed_output['end_val_nodiscount'] = Ending_Value_Undiscounted(detailed_output['cred_generated'], detailed_output['price_p_cred'])

    #Save values from Equations 19-20
    detailed_output['end_val_discount'] = Ending_Value_Discounted(detailed_output['end_val_nodiscount'], detailed_output['real_interest_rt'], detailed_output['exp_yr'])
    detailed_output['tot_proj_cost_discount'] = Total_Project_Costs_Discounted(detailed_output['tot_proj_cost_nodiscount'], detailed_output['real_interest_rt'], detailed_output['exp_yr'])

    #Save values from Equations 21-24
    detailed_output['rate_return'] = Rate_of_Return(detailed_output['end_val_discount'], detailed_output['begin_val'])
    detailed_output['comp_ann_rate_growth'] = Compound_Annualised_Rate_of_Growth(detailed_output['end_val_nodiscount'], detailed_output['begin_val'], detailed_output['exp_fact_carg'])
    detailed_output['gross_pres_val'] = Gross_Present_Value(detailed_output['end_val_discount'], detailed_output['begin_val'])
    detailed_output['net_pres_val'] = Net_Present_Value(detailed_output['gross_pres_val'], detailed_output['tot_proj_cost_discount'])

    #Save values from Equations 25-27 as simple output
    simple_output['prof_p_cred'] = Profit_per_Credit(detailed_output['net_pres_val'], detailed_output['cred_generated'])
    simple_output['prof_p_hect_p_yr'] = Profit_per_Hectare_per_Year(detailed_output['net_pres_val'], detailed_output['hect_restored'], detailed_output['num_yrs'])
    simple_output['profitable'] = Profitable(simple_output['prof_p_cred'], simple_output['prof_p_hect_p_yr'], detailed_output['rate_return'], detailed_output['comp_ann_rate_growth'], detailed_output['gross_pres_val'], detailed_output['net_pres_val'])

    #Add net_pres_val, cred_generated, Cost of generation per credit, price_p_cred, and number of cred_p_hect_p_yr to simple output
    simple_output['net_pres_val'] = detailed_output['net_pres_val']
    simple_output['cred_generated'] = detailed_output['cred_generated']
    simple_output['gen_cost_p_cred'] = detailed_output['gen_cost_p_cred']
    simple_output['cred_p_hect_p_yr'] = detailed_output['cred_p_hect_p_yr']
    simple_output['price_p_cred'] = detailed_output['price_p_cred']

    #Print Final Summary
    Summary(simple_output)

    #Save the detailed output in a separate json file
    Convert_to_Json(detailed_output, "outputs/detailed_output.json")

    #Save the simple output in a separate json file
    Convert_to_Json(simple_output, "outputs/simple_output.json")

def Output_From_Json(user_input_json, assumption_json):
    with open(user_input_json, "r") as usrinp_json:
        usr_inp = json.load(usrinp_json)
    with open(assumption_json, "r") as assum_json:
        assum = json.load(assum_json)

    #Initialise output dictionaries for detailed and simple outputs
    detailed_output = {}
    
    #Save values from Equations 1-4
    detailed_output['exp_yr'] = Exponent_Year(usr_inp['num_yrs'])
    detailed_output['cal_yr_end'] = Calendar_Year_End(usr_inp['start_yr'], detailed_output['exp_yr'])
    detailed_output['real_interest_rt'] = Real_Interest_Rate(assum['nom_int_rt'], assum['inflation_rt'])
    detailed_output['cred_generated'] = Credits_Generated(usr_inp['num_yrs'], usr_inp['hect_restored'], usr_inp['cred_p_hect_p_yr'])

    #Save values from Equations 8-10
    detailed_output['c_invest_cost_p_paymt'] = Carbon_Investment_Cost_per_Payment(assum['interest_rt'], assum['payments_p_yr'], usr_inp['num_yrs'], usr_inp['invest_amt'])
    detailed_output['c_invest_ann_cost'] = Carbon_Investment_Annual_Costs(detailed_output['c_invest_cost_p_paymt'], assum['payments_p_yr'])
    detailed_output['tot_invest_cost'] = Total_Investment_Costs(detailed_output['c_invest_ann_cost'], usr_inp['num_yrs'])

    #Save values from Equations 11-16
    detailed_output['num_inspect'] = Number_of_Inspections(usr_inp['num_yrs'], assum['inspect_cycle_len'])
    detailed_output['recur_reg_cost'] = Recurring_Registry_Costs(assum['valid_and_verif_app_cost_p_inspect'], assum['valid_and_verif_stmnt_cost_p_inspect'], assum['valid_and_verif_inspectr_travel_cost_p_inspect'], assum['reg_conv_cost_fee_p_inspect'], detailed_output['num_inspect'])
    detailed_output['reg_conv_cost_all_cred'] = Registry_Costs_On_All_Credits(assum['reg_listing_cost_p_credit'], assum['reg_levy_cost_p_cred'], detailed_output['cred_generated'])
    detailed_output['reg_cost_cred_ovr_min_thresh'] = Registry_Costs_On_Credits_Over_Min_Threshold(assum['reg_conv_cost_p_cred_abv_min_thresh_of_credits'], detailed_output['cred_generated'], assum['min_thresh_of_credits'])
    detailed_output['tot_reg_cost'] = Total_Registry_Costs(detailed_output['recur_reg_cost'], detailed_output['reg_conv_cost_all_cred'], detailed_output['reg_cost_cred_ovr_min_thresh'])

    #Save values from Equations 17-18
    detailed_output['exp_fact_carg'] = Exponent_Factor_for_CARG(detailed_output['exp_yr'])
    detailed_output['tot_proj_cost_nodiscount'] = Total_Project_Costs_Undiscounted(detailed_output['tot_invest_cost'], detailed_output['tot_reg_cost'])

    #Save values from Equations 5-7
    detailed_output['gen_cost_p_cred'] = Generation_Cost_per_Credit(usr_inp['invest_amt'], detailed_output['tot_proj_cost_nodiscount'], detailed_output['cred_generated'])
    detailed_output['begin_val'] = Beginning_Value(detailed_output['cred_generated'], detailed_output['gen_cost_p_cred'])
    detailed_output['end_val_nodiscount'] = Ending_Value_Undiscounted(detailed_output['cred_generated'], usr_inp['price_p_cred'])

    #Save values from Equations 19-20
    detailed_output['end_val_discount'] = Ending_Value_Discounted(detailed_output['end_val_nodiscount'], detailed_output['real_interest_rt'], detailed_output['exp_yr'])
    detailed_output['tot_proj_cost_discount'] = Total_Project_Costs_Discounted(detailed_output['tot_proj_cost_nodiscount'], detailed_output['real_interest_rt'], detailed_output['exp_yr'])

    #Save values from Equations 21-24
    detailed_output['rate_return'] = Rate_of_Return(detailed_output['end_val_discount'], detailed_output['begin_val'])
    detailed_output['comp_ann_rate_growth'] = Compound_Annualised_Rate_of_Growth(detailed_output['end_val_nodiscount'], detailed_output['begin_val'], detailed_output['exp_fact_carg'])
    detailed_output['gross_pres_val'] = Gross_Present_Value(detailed_output['end_val_discount'], detailed_output['begin_val'])
    detailed_output['net_pres_val'] = Net_Present_Value(detailed_output['gross_pres_val'], detailed_output['tot_proj_cost_discount'])

    simple_output = {}

    #Save values from Equations 25-27 as simple output
    simple_output['prof_p_cred'] = Profit_per_Credit(detailed_output['net_pres_val'], detailed_output['cred_generated'])
    simple_output['prof_p_hect_p_yr'] = Profit_per_Hectare_per_Year(detailed_output['net_pres_val'], usr_inp['hect_restored'], usr_inp['num_yrs'])
    simple_output['profitable'] = Profitable(simple_output['prof_p_cred'], simple_output['prof_p_hect_p_yr'], detailed_output['rate_return'], detailed_output['comp_ann_rate_growth'], detailed_output['gross_pres_val'], detailed_output['net_pres_val'])

    #Add net_pres_val, cred_generated, Cost of generation per credit, price_p_cred, and number of cred_p_hect_p_yr to simple output
    simple_output['net_pres_val'] = detailed_output['net_pres_val']
    simple_output['cred_generated'] = detailed_output['cred_generated']
    simple_output['gen_cost_p_cred'] = detailed_output['gen_cost_p_cred']
    simple_output['cred_p_hect_p_yr'] = usr_inp['cred_p_hect_p_yr']
    simple_output['price_p_cred'] = usr_inp['price_p_cred']

    #Save the detailed output in a separate json file
    Convert_to_Json(detailed_output, "outputs/detailed_output.json")

    #Save the simple output in a separate json file
    Convert_to_Json(simple_output, "outputs/simple_output.json")

def main():
    #user = [50, 20, 1, 74700, 2023, 561]
    #assumption_updates = [None,None,None,None,None,None,None,None,None,None,None,None,None,None,None]
    #Output(user, assumption_updates)

    USER_INPUT_JSON = "./inputs/user_input_data.json"
    ASSUMPTIONS_JSON = "./inputs/final_assumptions.json"
    Output_From_Json(USER_INPUT_JSON,ASSUMPTIONS_JSON)

if __name__ == "__main__":
    main()
