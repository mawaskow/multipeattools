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
    user_data = {'Period of Years': None, 'Credits per Hectare per Year': None, 'Hectares Restored': None, 
                 'Investment Amount': None, 'Start Year': None, 'Price per Credit': None}
    for i in range(0, len(data)):
        user_data[list(user_data.keys())[i]] = data[i]

    #Save the user data to a separate json file
    Convert_to_Json(user_data, "user_input_data.json")
    
    return user_data

# This function creates a dictionary of the basic assumptions that the toolkit makes when user input is not given

def Create_Assumptions():
    assumptions = {'Credits per Hectare per Year': 20, 'Nominal Interest Rate': 0.0235, 'Inflation Rate': 0.021,
                   'Registry Account Opening Fee': 0, 'Registry Listing Cost per Credit': 0.05, 
                   'Registry Conversion Cost Fee per Inspection': 100, 
                   'Registry Conversion Cost per Credit above Minimum Threshold of Credits': 0.05,
                   'Registry Levy Cost per Credit': 0.05,
                   'Validation and Verification Application Cost per Inspection': 600,
                   'Validation and Verification Statement Cost per Inspection': 800,
                   'Validation and Verification Inspector Travel Costs per Inspection': 500,
                   'Inspection Cycle Length': 5,
                   'Minimum Threshold of Credits': 2000,
                   'Interest Rate': 0.05, 'Payments per Year': 12}

    #Save initial assumptions to json file
    Convert_to_Json(assumptions, "initial_assumptions.json")
    
    return assumptions

# This function takes a list of user input edits to the basic assumptions and changes the assumptions accordingly. The updates to the basic assumptions must take the form of a list where every item is either the new value for the assumption, or None.

def Edit_Assumptions(assumptions, assumption_updates):
    for i in range(0, len(assumptions)):
        if assumption_updates[i] != None:
            assumptions[list(assumptions.keys())[i]] = assumption_updates[i]

    #Save edited assumptions to a separate json file
    Convert_to_Json(assumptions, "final_assumptions.json")
    
    return assumptions

# This function prints the final output summary of the toolkit 

def Summary(simple_output):
    print('Credits generated by restored area: ', simple_output['Credits Generated'] , '\n')
    print('Cost of generating each credit: ', simple_output['Generation Cost per Credit'] , '\n')
    print('Estimated credits per hectare per year: ',  simple_output['Credits per Hectare per Year'], '\n')
    print('Selling each credit for: ',  simple_output['Price per Credit'], '\n')
    print('Is this selling price profitable? ', simple_output['Profitable'], '\n')
    print('Profit per credit: ', simple_output['Profit per Credit'], '\n')
    print('Profit per hectare per year: ', simple_output['Profit per Hectare per Year'] , '\n')
    print('Profit across project duration: ', simple_output['Net Present Value'])

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
    detailed_output['Exponent Year'] = Exponent_Year(detailed_output['Period of Years'])
    detailed_output['Calendar Year End'] = Calendar_Year_End(detailed_output['Start Year'], detailed_output['Exponent Year'])
    detailed_output['Real Interest Rate'] = Real_Interest_Rate(detailed_output['Nominal Interest Rate'], detailed_output['Inflation Rate'])
    detailed_output['Credits Generated'] = Credits_Generated(detailed_output['Period of Years'], detailed_output['Hectares Restored'], detailed_output['Credits per Hectare per Year'])

    #Save values from Equations 8-10
    detailed_output['Carbon Investment Cost per Payment'] = Carbon_Investment_Cost_per_Payment(detailed_output['Interest Rate'], detailed_output['Payments per Year'], detailed_output['Period of Years'], detailed_output['Investment Amount'])
    detailed_output['Carbon Investment Annual Costs'] = Carbon_Investment_Annual_Costs(detailed_output['Carbon Investment Cost per Payment'], detailed_output['Payments per Year'])
    detailed_output['Total Investment Costs'] = Total_Investment_Costs(detailed_output['Carbon Investment Annual Costs'], detailed_output['Period of Years'])

    #Save values from Equations 11-16
    detailed_output['Number of Inspections'] = Number_of_Inspections(detailed_output['Period of Years'], detailed_output['Inspection Cycle Length'])
    detailed_output['Recurring Registry Costs'] = Recurring_Registry_Costs(detailed_output['Validation and Verification Application Cost per Inspection'], detailed_output['Validation and Verification Statement Cost per Inspection'], detailed_output['Validation and Verification Inspector Travel Costs per Inspection'], detailed_output['Registry Conversion Cost Fee per Inspection'], detailed_output['Number of Inspections'])
    detailed_output['Registry Conversion Costs On All Credits'] = Registry_Costs_On_All_Credits(detailed_output['Registry Listing Cost per Credit'], detailed_output['Registry Levy Cost per Credit'], detailed_output['Credits Generated'])
    detailed_output['Registry Costs On Credits Over Minimum Threshold'] = Registry_Costs_On_Credits_Over_Min_Threshold(detailed_output['Registry Conversion Cost per Credit above Minimum Threshold of Credits'], detailed_output['Credits Generated'], detailed_output['Minimum Threshold of Credits'])
    detailed_output['Total Registry Costs'] = Total_Registry_Costs(detailed_output['Recurring Registry Costs'], detailed_output['Registry Conversion Costs On All Credits'], detailed_output['Registry Costs On Credits Over Minimum Threshold'])

    #Save values from Equations 17-18
    detailed_output['Exponent Factor for CARG'] = Exponent_Factor_for_CARG(detailed_output['Exponent Year'])
    detailed_output['Total Project Costs Undiscounted'] = Total_Project_Costs_Undiscounted(detailed_output['Total Investment Costs'], detailed_output['Total Registry Costs'])

    #Save values from Equations 5-7
    detailed_output['Generation Cost per Credit'] = Generation_Cost_per_Credit(detailed_output['Investment Amount'], detailed_output['Total Project Costs Undiscounted'], detailed_output['Credits Generated'])
    detailed_output['Beginning Value'] = Beginning_Value(detailed_output['Credits Generated'], detailed_output['Generation Cost per Credit'])
    detailed_output['Ending Value Undiscounted'] = Ending_Value_Undiscounted(detailed_output['Credits Generated'], detailed_output['Price per Credit'])

    #Save values from Equations 19-20
    detailed_output['Ending Value Discounted'] = Ending_Value_Discounted(detailed_output['Ending Value Undiscounted'], detailed_output['Real Interest Rate'], detailed_output['Exponent Year'])
    detailed_output['Total Project Costs Discounted'] = Total_Project_Costs_Discounted(detailed_output['Total Project Costs Undiscounted'], detailed_output['Real Interest Rate'], detailed_output['Exponent Year'])

    #Save values from Equations 21-24
    detailed_output['Rate of Return'] = Rate_of_Return(detailed_output['Ending Value Discounted'], detailed_output['Beginning Value'])
    detailed_output['Compound Annualised Rate of Growth'] = Compound_Annualised_Rate_of_Growth(detailed_output['Ending Value Undiscounted'], detailed_output['Beginning Value'], detailed_output['Exponent Factor for CARG'])
    detailed_output['Gross Present Value'] = Gross_Present_Value(detailed_output['Ending Value Discounted'], detailed_output['Beginning Value'])
    detailed_output['Net Present Value'] = Net_Present_Value(detailed_output['Gross Present Value'], detailed_output['Total Project Costs Discounted'])

    #Save values from Equations 25-27 as simple output
    simple_output['Profit per Credit'] = Profit_per_Credit(detailed_output['Net Present Value'], detailed_output['Credits Generated'])
    simple_output['Profit per Hectare per Year'] = Profit_per_Hectare_per_Year(detailed_output['Net Present Value'], detailed_output['Hectares Restored'], detailed_output['Period of Years'])
    simple_output['Profitable'] = Profitable(simple_output['Profit per Credit'], simple_output['Profit per Hectare per Year'], detailed_output['Rate of Return'], detailed_output['Compound Annualised Rate of Growth'], detailed_output['Gross Present Value'], detailed_output['Net Present Value'])

    #Add Net Present Value, Credits Generated, Cost of generation per credit, Price per Credit, and number of credits per hectare per year to simple output
    simple_output['Net Present Value'] = detailed_output['Net Present Value']
    simple_output['Credits Generated'] = detailed_output['Credits Generated']
    simple_output['Generation Cost per Credit'] = detailed_output['Generation Cost per Credit']
    simple_output['Credits per Hectare per Year'] = detailed_output['Credits per Hectare per Year']
    simple_output['Price per Credit'] = detailed_output['Price per Credit']

    #Print Final Summary
    Summary(simple_output)

    #Save the detailed output in a separate json file
    Convert_to_Json(detailed_output, "detailed_output.json")

    #Save the simple output in a separate json file
    Convert_to_Json(simple_output, "simple_output.json")

def main():
    user = [50, 20, 1, 74700, 2023, 561]
    assumption_updates = [None,None,None,None,None,None,None,None,None,None,None,None,None,None,None]

    Output(user, assumption_updates)

if __name__ == "__main__":
    main()
