import json

# Equations set 1: INITIAL VALUE OF INVESTMENT

#Equation 01
def Final_Year_exponent(period_of_years): 
    exponent_year = period_of_years - 1
    return exponent_year

#Equation 02
def Year_End(start_year, exponent_year):
    calendar_year_end = start_year + exponent_year
    return calendar_year_end

#Equation 03
def Real_Interest_Rate(nominal_interest_rate, inflation_rate):
    real_interest_rate = nominal_interest_rate - inflation_rate
    return real_interest_rate

#Equation 04
def Credits_Generated(period_of_years, hectares_restored, credits_per_hectare_per_year):
    credits_generated = period_of_years*hectares_restored*credits_per_hectare_per_year
    return credits_generated

#Equation 05
def Cost_Per_Credit(investment_amount, total_project_costs_undisc, credits_generated):
    cost_per_credit=(investment_amount + total_project_costs_undisc)/credits_generated
    return cost_per_credit

#Equation 06
def Beginning_Value(credits_generated, cost_per_credit):
    beginning_value = credits_generated*cost_per_credit
    return beginning_value

#Equation 07
def Ending_Value_Undiscounted(credits_generated, price_per_credit):
    ending_value_undisc = credits_generated*price_per_credit
    return ending_value_undisc

# Equation set 2: INVESTMENT COSTS

#Equation 08
def Carbon_Investment_Cost_Per_Payment(interest_rate, payments_per_year, period_of_years, investment_amount):
    rate = interest_rate/payments_per_year
    n = payments_per_year*period_of_years
    x = rate*investment_amount
    y = (1-((1+rate)**(-n)))
    carbon_investment_cost_per_payment = x/y
    return carbon_investment_cost_per_payment

#Equation 09
def Carbon_Investment_Annual_Costs(carbon_investment_cost_per_payment, payments_per_year):
    carbon_investment_annual_costs = carbon_investment_cost_per_payment*payments_per_year
    return carbon_investment_annual_costs

#Equation 10
def Total_Investment_Costs(carbon_investment_annual_costs, period_of_years):
    total_investment_costs = carbon_investment_annual_costs*period_of_years
    return total_investment_costs

# Equation set 3: REGISTRY COSTS

#Equation 11
def Number_Of_Inspections(period_of_years, inspection_cycle_lenght):
    number_of_inspections = round(period_of_years/inspection_cycle_lenght)
    return number_of_inspections

#Equation 12 is included in equation 13 with the entry "inspection_conversion_fee" 


#Equation 13
def Registry_Cost_Recurring(validation_application_cost, validation_statement_cost, inspector_travel_cost, inspection_conversion_fee, number_of_inspections):
    registry_cost_recurring=(validation_application_cost + validation_statement_cost + inspector_travel_cost + inspection_conversion_fee)* number_of_inspections
    return registry_cost_recurring

#Equation 14
def Registry_Cost_Per_Credit(listing_cost, levy_cost, credit_generated):
    registry_cost_per_credit=(listing_cost + levy_cost) * credit_generated
    return registry_cost_per_credit

#Equation 15
def Registry_Cost_Credits_Above_Threshold(conversion_cost_above_threshold, credits_generated, minimum_threshold):
    credits_above_threshold = credits_generated - minimum_threshold
    registry_cost_credits_above_threshold = conversion_cost_above_threshold * (credits_above_threshold if credits_above_threshold  > 0 else 0)
    return registry_cost_credits_above_threshold


#Equation 16
def Total_Registry_Costs(registry_costs_recurring, registry_cost_per_credit, registry_cost_above_threshold, registry_cost_opening_fee):
    total_registry_costs = registry_costs_recurring + registry_cost_per_credit + registry_cost_above_threshold + registry_cost_opening_fee
    return total_registry_costs

# Equation set 4: DISCOUNTING FUTURE VALUE OF INVESTMENT

#Equation 17
def Exponent_Factor_For_CARG(exponent_year):
    CARG_exponent = 1/exponent_year
    return CARG_exponent

#Equation 18
def Total_Project_Costs_Undiscounted(total_investment_costs, total_registry_costs):
    total_project_costs_undisc = total_investment_costs + total_registry_costs
    return total_project_costs_undisc

#Equation 19
def Ending_Value_Discounted(ending_value_undisc, real_interest_rate, exponent_year):
    ending_value_disc= ending_value_undisc / ((1 + real_interest_rate) ** exponent_year)
    return ending_value_disc

#Equation 20
def Total_Project_Costs_Discounted(total_project_costs_undisc, real_interest_rate, exponent_year):
    total_project_costs_disc= total_project_costs_undisc / ((1 + real_interest_rate) ** exponent_year)
    return total_project_costs_disc

# Equations set 5: PROFITABILITY INDICATORS

#Equation 21
def Rate_Of_Return(ending_value_disc, beginning_value):
    rate_of_return = ((ending_value_disc-beginning_value)/beginning_value)*100
    return rate_of_return

#Equation 22
def Compound_Annualised_Rate_Of_Growth(ending_value_undisc, beginning_value, CARG_exponent):
    CARG = ((ending_value_undisc/beginning_value)**(CARG_exponent-1))*100
    return CARG

#Equation 23
def Gross_Present_Value(ending_value_disc, beginning_value):
    gross_present_value = ending_value_disc - beginning_value
    return gross_present_value

#Equation 24
def Net_Present_Value(gross_present_value, total_project_costs_disc):
    net_present_value = gross_present_value - total_project_costs_disc
    return net_present_value

# Equations set 6: OUTCOME

#Equation 26
def Profit_Per_Credit(net_present_value, credits_generated):
    profit_per_credit = net_present_value/credits_generated
    return profit_per_credit

#Equation 27
def Profit_Per_Hectare_Per_Year(net_present_value, hectares_restored, period_of_years):
    profit_per_hectare_per_year = (net_present_value/hectares_restored)/period_of_years
    return profit_per_hectare_per_year

#Equation 25
def Profitable(profit_per_credit, profit_per_hectare_per_year, rate_of_return, CARG, gross_present_value, net_present_value):
    profitable = False
    if profit_per_credit > 0 and profit_per_hectare_per_year > 0 and rate_of_return > 0 and CARG > 0 and gross_present_value > 0 and net_present_value > 0:
        profitable = True
    return profitable

# **User Inputs**

# The following code will create a json file where a dictionary maps variables to user input values. The initial dictionary has empty values, which will be filled in the context of the web tool. An integration between the web tool and the json file containing the user inputs will be realized using the flask web framework. 
def initialize_user_input_file():

    # Create a dictionary with empty values which comprises all the variables provided by the user. 
    data = {
        "Period of Years": 50,
        "Average Credit per Hectare per Year": 20,
        "Hectares Restored": 1,
        "Investment Amount": 74700,
        "Registry Costs Included": False,
        "Investment Financial Costs Included": False,
        "Start Year": 2023,
        "Price per Credit": 561
    }

    # Save the dictionary as a JSON file
    with open("user_data.json", "w") as file:
        json.dump(data, file)


# The json file is then brought back into Python code after that the user populated the areas. 
def load_user_input_file():
# Read the JSON file back into Python code after the user populated the areas.
    with open("user_data.json", "r") as file:
        user_filled_data = json.load(file)

    #User values are assigned to variables that will be used in the equations. 
    period_of_years = int(user_filled_data["Period of Years"])
    credits_per_hectares_per_year = int(user_filled_data["Average Credit per Hectare per Year"])
    hectares_restored = int(user_filled_data["Hectares Restored"])
    investment_amount = float(user_filled_data["Investment Amount"])
    registry_costs_included = user_filled_data["Registry Costs Included"]
    investment_costs_included = user_filled_data["Investment Financial Costs Included"]
    start_year = int(user_filled_data["Start Year"])
    price_per_credit = float(user_filled_data["Price per Credit"])

    user_list = [period_of_years, credits_per_hectares_per_year, hectares_restored, investment_amount, start_year, price_per_credit, investment_costs_included, registry_costs_included]
    return user_list

# **Model Assumptions**

# The following code creates another json file that collects all the model assumptions and relative values, which will be assigned to the specific parameters in the equations' functions. If the default values are kept, these will be assigned to the equations, otherwise amendended values will be used instead. If necessary, the json file with the assumptions values will be modified in the context of the web toolkit and the flask web framework will provide the integration between the json file and the python code. 
def initialize_assumptions_file():
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

    # Save the dictionary as a JSON file
    with open("assumptions_data.json", "w") as file:
        json.dump(assumptions, file)
   
def read_assumptions_file():
# Read the JSON file back into Python code.
    with open("assumptions_data.json", "r") as file:
        assumptions_data = json.load(file)

    # Assumptions values are assigned to the variables that will be used in the equations.
    nominal_interest_rate = float(assumptions_data['Nominal Interest Rate'])
    inflation_rate = float(assumptions_data['Inflation Rate'])
    registry_account_opening_fee = float(assumptions_data['Registry Account Opening Fee'])
    listing_cost = float(assumptions_data['Registry Listing Cost per Credit'])
    inspection_conversion_fee = float(assumptions_data['Registry Conversion Cost Fee per Inspection'])
    conversion_cost_above_threshold = float(assumptions_data['Registry Conversion Cost per Credit above Minimum Threshold of Credits'])
    levy_cost = float(assumptions_data['Registry Levy Cost per Credit'])
    validation_application_cost = float(assumptions_data['Validation and Verification Application Cost per Inspection'])
    validation_statement_cost = float(assumptions_data['Validation and Verification Statement Cost per Inspection'])
    inspector_travel_cost = float(assumptions_data['Validation and Verification Inspector Travel Costs per Inspection'])
    inspection_cycle_lenght = int(assumptions_data['Inspection Cycle Length'])
    minimum_threshold = int(assumptions_data['Minimum Threshold of Credits'])
    interest_rate = float(assumptions_data['Interest Rate'])
    payments_per_year = int(assumptions_data['Payments per Year'])

    assum_list = [nominal_interest_rate, inflation_rate, registry_account_opening_fee, listing_cost, inspection_conversion_fee, conversion_cost_above_threshold, levy_cost, validation_application_cost, validation_statement_cost, inspector_travel_cost, inspection_cycle_lenght, minimum_threshold, interest_rate, payments_per_year]
    return assum_list

# **Model Setup**

# Define a function to execute all the calculations while handling the conditions "registry costs included":"yes"/"no"
# and "investment costs included": "yes"/"no"

def Conditional_Executor(user_list, assum_list):
        [period_of_years, credits_per_hectares_per_year, hectares_restored, investment_amount, start_year, price_per_credit, investment_costs_included, registry_costs_included] = user_list
        [nominal_interest_rate, inflation_rate, registry_account_opening_fee, listing_cost, inspection_conversion_fee, conversion_cost_above_threshold, levy_cost, validation_application_cost, validation_statement_cost, inspector_travel_cost, inspection_cycle_lenght, minimum_threshold, interest_rate, payments_per_year] = assum_list
        
        exponent_year=Final_Year_exponent(period_of_years) # Eq.1
        calendar_year_end=Year_End(start_year, exponent_year) # Eq.2
        real_interest_rate=Real_Interest_Rate(nominal_interest_rate, inflation_rate) # Eq.3
        credits_generated=Credits_Generated(period_of_years, hectares_restored,credits_per_hectares_per_year) # Eq.4
        ending_value_undisc=Ending_Value_Undiscounted(credits_generated, price_per_credit) # Eq.7
        
        if investment_costs_included:
            
            carbon_investment_cost_per_payment=Carbon_Investment_Cost_Per_Payment(interest_rate, payments_per_year, period_of_years, investment_amount) # Eq.8
            carbon_investment_annual_costs=Carbon_Investment_Annual_Costs(carbon_investment_cost_per_payment, payments_per_year) # Eq.9
            total_investment_costs=Total_Investment_Costs(carbon_investment_annual_costs, period_of_years) # Eq.10
        else:
            carbon_investment_cost_per_payment= None
            carbon_investment_annual_costs = None
            total_investment_costs = 0
        
        if registry_costs_included:
            
            number_of_inspections=Number_Of_Inspections(period_of_years, inspection_cycle_lenght) # Eq.11
            registry_cost_recurring=Registry_Cost_Recurring(validation_application_cost, validation_statement_cost, inspector_travel_cost, inspection_conversion_fee, number_of_inspections) # Eq.13
            registry_cost_per_credit=Registry_Cost_Per_Credit(listing_cost,levy_cost, credits_generated ) # Eq.14
            registry_cost_credits_above_threshold=Registry_Cost_Credits_Above_Threshold(conversion_cost_above_threshold, credits_generated, minimum_threshold) # Eq. 15
            total_registry_costs=Total_Registry_Costs(registry_cost_recurring, registry_cost_per_credit, registry_cost_credits_above_threshold, registry_account_opening_fee) # Eq. 16   
        else:
            number_of_inspections= None
            registry_cost_recurring= None
            registry_cost_per_credit=None
            registry_cost_credits_above_threshold=None
            total_registry_costs=0
            
        total_project_costs_undisc=Total_Project_Costs_Undiscounted(total_investment_costs, total_registry_costs) # Eq. 18  
        cost_per_credit=Cost_Per_Credit(investment_amount, total_project_costs_undisc, credits_generated)  # Eq.5  
        beginning_value=Beginning_Value(credits_generated, cost_per_credit) # Eq.6
        CARG_exponent=Exponent_Factor_For_CARG(exponent_year) # Eq.17
        ending_value_disc=Ending_Value_Discounted(ending_value_undisc, real_interest_rate, exponent_year) # Eq.19
        total_project_costs_disc=Total_Project_Costs_Discounted(total_project_costs_undisc, real_interest_rate, exponent_year) # Eq.20
        
        rate_of_return=Rate_Of_Return(ending_value_disc, beginning_value) # Eq.21
        CARG=Compound_Annualised_Rate_Of_Growth(ending_value_undisc, beginning_value, CARG_exponent) # Eq.22
        gross_present_value=Gross_Present_Value(ending_value_disc, beginning_value) # Eq.23
        net_present_value=Net_Present_Value(gross_present_value, total_project_costs_disc) #Eq.24
        
        profit_per_credit=Profit_Per_Credit(net_present_value, credits_generated) # Eq. 26
        profit_per_hectare_per_year=Profit_Per_Hectare_Per_Year(net_present_value, hectares_restored, period_of_years) # Eq. 27
        profitable=Profitable( profit_per_credit,profit_per_hectare_per_year, rate_of_return, CARG, gross_present_value,net_present_value  ) # Eq.25
        
      
        results_dict = {
        "exponent_year": exponent_year,
        "calendar_year_end": calendar_year_end,
        "real_interest_rate": real_interest_rate,
        "credits_generated": credits_generated,
        "cost_per_credit": round(cost_per_credit,2),
        "beginning_value": round(beginning_value,2),
        "ending_value_undisc": round(float(ending_value_undisc),2),
        "carbon_investment_cost_per_payment": carbon_investment_cost_per_payment,
        "carbon_investment_annual_costs": carbon_investment_annual_costs,
        "total_investment_costs": total_investment_costs,
        "number_of_inspections": number_of_inspections,
        "registry_cost_recurring": registry_cost_recurring,
        "registry_cost_per_credit": registry_cost_per_credit,
        "registry_cost_credits_above_threshold": registry_cost_credits_above_threshold,
        "total_registry_costs": total_registry_costs,
        "CARG_exponent": CARG_exponent,
        "total_project_costs_undisc": round(total_project_costs_undisc,2),
        "ending_value_discounted": round(float(ending_value_disc),2),
        "total_project_costs_disc": round(total_project_costs_disc,2),
        "rate_of_return": round(rate_of_return,2),
        "CARG": CARG,
        "gross_present_value": round(gross_present_value,2),
        "net_present_value": round(net_present_value,2),
        "profit_per_credit": round(profit_per_credit,2),
        "profit_per_hectare_per_year": round(profit_per_hectare_per_year,2),
        "profitable": profitable
         }        
    
        return results_dict
    
        

# **Model Output**

# Call the conditional_executor function with the specified conditions
#registry_costs_included = "yes"  # Replace with "yes" or "no" accordingly
#investment_costs_included = "yes"  # Replace with "yes" or "no" accordingly

def main():
    initialize_user_input_file()
    user_list = load_user_input_file()
    initialize_assumptions_file()
    assum_list = read_assumptions_file()
    results = Conditional_Executor(user_list, assum_list)

    # Print all the dictionary values
    for key, value in results.items():
        print(key, ":", value)

if __name__ == "__main__":
    main()