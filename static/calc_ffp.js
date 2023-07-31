
// Equations set 1: INITIAL VALUE OF INVESTMENT

//Equation 01
function Final_Year_exponent(period_of_years){
    return period_of_years - 1;
}

//Equation 02
function Year_End(start_year, exponent_year){
    return start_year + exponent_year;
}

//Equation 03
function Real_Interest_Rate(nominal_interest_rate, inflation_rate){
    return nominal_interest_rate - inflation_rate;
}

//Equation 04
function Credits_Generated(period_of_years, hectares_restored, credits_per_hectare_per_year){
    return period_of_years*hectares_restored*credits_per_hectare_per_year;
}

//Equation 05
function Cost_Per_Credit(investment_amount, total_project_costs_undisc, credits_generated){
    return (investment_amount + total_project_costs_undisc)/credits_generated;
}

//Equation 06
function Beginning_Value(credits_generated, cost_per_credit){
    return credits_generated*cost_per_credit;
}

//Equation 07
function Ending_Value_Undiscounted(credits_generated, price_per_credit){
    return credits_generated*price_per_credit;
}

// Equation set 2: INVESTMENT COSTS

//Equation 08
function Carbon_Investment_Cost_Per_Payment(interest_rate, payments_per_year, period_of_years, investment_amount){
    let rate = interest_rate/payments_per_year;
    let n = payments_per_year*period_of_years;
    let x = rate*investment_amount;
    let y = (1-((1+rate)**(-n)));
    return x/y;
}

//Equation 09
function Carbon_Investment_Annual_Costs(carbon_investment_cost_per_payment, payments_per_year){
    return carbon_investment_cost_per_payment*payments_per_year;
}

//Equation 10
function Total_Investment_Costs(carbon_investment_annual_costs, period_of_years){
    return carbon_investment_annual_costs*period_of_years;
}

// Equation set 3: REGISTRY COSTS

//Equation 11
function Number_Of_Inspections(period_of_years, inspection_cycle_lenght){
    return Math.round(period_of_years/inspection_cycle_lenght);
}

//Equation 12 is included in equation 13 with the entry "inspection_conversion_fee" 

//Equation 13
function Registry_Cost_Recurring(validation_application_cost, validation_statement_cost, inspector_travel_cost, inspection_conversion_fee, number_of_inspections){
    return (validation_application_cost + validation_statement_cost + inspector_travel_cost + inspection_conversion_fee)* number_of_inspections;
}

//Equation 14
function Registry_Cost_Per_Credit(listing_cost, levy_cost, credit_generated){
    return (listing_cost + levy_cost) * credit_generated;
}

//Equation 15
function Registry_Cost_Credits_Above_Threshold(conversion_cost_above_threshold, credits_generated, minimum_threshold){
    let credits_above_threshold = credits_generated - minimum_threshold;
    if(credits_above_threshold <= 0){
        credits_above_threshold = 0;
    }
    return conversion_cost_above_threshold*credits_above_threshold;
}

//Equation 16
function Total_Registry_Costs(registry_costs_recurring, registry_cost_per_credit, registry_cost_above_threshold, registry_cost_opening_fee){
    return registry_costs_recurring + registry_cost_per_credit + registry_cost_above_threshold + registry_cost_opening_fee;
}

// Equation set 4: DISCOUNTING FUTURE VALUE OF INVESTMENT

//Equation 17
function Exponent_Factor_For_CARG(exponent_year){
    return 1/exponent_year;
}

//Equation 18
function Total_Project_Costs_Undiscounted(total_investment_costs, total_registry_costs){
    return total_investment_costs + total_registry_costs;
}
    
//Equation 19
function Ending_Value_Discounted(ending_value_undisc, real_interest_rate, exponent_year){
    return ending_value_undisc / ((1 + real_interest_rate) ** exponent_year);
}

//Equation 20
function Total_Project_Costs_Discounted(total_project_costs_undisc, real_interest_rate, exponent_year){
    return total_project_costs_undisc / ((1 + real_interest_rate) ** exponent_year);
}
    
// Equations set 5: PROFITABILITY INDICATORS

//Equation 21
function Rate_Of_Return(ending_value_disc, beginning_value){
    return ((ending_value_disc-beginning_value)/beginning_value)*100;
}

//Equation 22
function Compound_Annualised_Rate_Of_Growth(ending_value_undisc, beginning_value, CARG_exponent){
    return ((ending_value_undisc/beginning_value)**(CARG_exponent-1))*100;
}

//Equation 23
function Gross_Present_Value(ending_value_disc, beginning_value){
    return ending_value_disc - beginning_value;
}

//Equation 24
function Net_Present_Value(gross_present_value, total_project_costs_disc){
    return gross_present_value - total_project_costs_disc;
}
    
// Equations set 6: OUTCOME

//Equation 26
function Profit_Per_Credit(net_present_value, credits_generated){
    return net_present_value/credits_generated;
}

//Equation 27
function Profit_Per_Hectare_Per_Year(net_present_value, hectares_restored, period_of_years){
    return (net_present_value/hectares_restored)/period_of_years;
}

//Equation 25
function Profitable(profit_per_credit, profit_per_hectare_per_year, rate_of_return, CARG, gross_present_value, net_present_value){
    let profitable = 'No';
    if(profit_per_credit > 0 && profit_per_hectare_per_year > 0 && rate_of_return > 0 && CARG > 0 && gross_present_value > 0 && net_present_value > 0){
        profitable = 'Yes';
    }
    return profitable;
}

function Conditional_Executor(period_of_years, credits_per_hectares_per_year, hectares_restored, investment_amount, start_year, price_per_credit, investment_costs_included, registry_costs_included, credits_per_hectare_per_year, nominal_interest_rate, inflation_rate, registry_account_opening_fee, listing_cost, inspection_conversion_fee, conversion_cost_above_threshold, levy_cost, validation_application_cost, validation_statement_cost, inspector_travel_cost, inspection_cycle_lenght, minimum_threshold, interest_rate, payments_per_year){
        let exponent_year=Final_Year_exponent(period_of_years); // Eq.1
        let calendar_year_end=Year_End(start_year, exponent_year); // Eq.2
        let real_interest_rate=Real_Interest_Rate(nominal_interest_rate, inflation_rate); // Eq.3
        let credits_generated=Credits_Generated(period_of_years, hectares_restored,credits_per_hectare_per_year); // Eq.4
        let ending_value_undisc=Ending_Value_Undiscounted(credits_generated, price_per_credit); // Eq.7
        
        if(investment_costs_included){            
            let carbon_investment_cost_per_payment=Carbon_Investment_Cost_Per_Payment(interest_rate, payments_per_year, period_of_years, investment_amount); // Eq.8
            let carbon_investment_annual_costs=Carbon_Investment_Annual_Costs(carbon_investment_cost_per_payment, payments_per_year); // Eq.9
            let total_investment_costs=Total_Investment_Costs(carbon_investment_annual_costs, period_of_years); // Eq.10
        }else{
            let carbon_investment_cost_per_payment= None;
            let carbon_investment_annual_costs = None;
            let total_investment_costs = 0;
        }
        if(registry_costs_included){
            let number_of_inspections=Number_Of_Inspections(period_of_years, inspection_cycle_lenght); // Eq.11
            let registry_cost_recurring=Registry_Cost_Recurring(validation_application_cost, validation_statement_cost, inspector_travel_cost, inspection_conversion_fee, number_of_inspections); // Eq.13
            let registry_cost_per_credit=Registry_Cost_Per_Credit(listing_cost,levy_cost, credits_generated ); // Eq.14
            let registry_cost_credits_above_threshold=Registry_Cost_Credits_Above_Threshold(conversion_cost_above_threshold, credits_generated, minimum_threshold); // Eq. 15
            let total_registry_costs=Total_Registry_Costs(registry_cost_recurring, registry_cost_per_credit, registry_cost_credits_above_threshold, registry_account_opening_fee); // Eq. 16   
        }else{
            let number_of_inspections= None;
            let registry_cost_recurring= None;
            let registry_cost_per_credit=None;
            let registry_cost_credits_above_threshold=None;
            let total_registry_costs=0;
        }

        let total_project_costs_undisc=Total_Project_Costs_Undiscounted(total_investment_costs, total_registry_costs); // Eq. 18  
        let cost_per_credit=Cost_Per_Credit(investment_amount, total_project_costs_undisc, credits_generated);  // Eq.5  
        let beginning_value=Beginning_Value(credits_generated, cost_per_credit); // Eq.6
        let CARG_exponent=Exponent_Factor_For_CARG(exponent_year); // Eq.17
        let ending_value_disc=Ending_Value_Discounted(ending_value_undisc, real_interest_rate, exponent_year); // Eq.19
        let total_project_costs_disc=Total_Project_Costs_Discounted(total_project_costs_undisc, real_interest_rate, exponent_year); // Eq.20
        
        let rate_of_return=Rate_Of_Return(ending_value_disc, beginning_value); // Eq.21
        let CARG=Compound_Annualised_Rate_Of_Growth(ending_value_undisc, beginning_value, CARG_exponent); // Eq.22
        let gross_present_value=Gross_Present_Value(ending_value_disc, beginning_value); // Eq.23
        let net_present_value=Net_Present_Value(gross_present_value, total_project_costs_disc); //Eq.24
        
        let profit_per_credit=Profit_Per_Credit(net_present_value, credits_generated); // Eq. 26
        let profit_per_hectare_per_year=Profit_Per_Hectare_Per_Year(net_present_value, hectares_restored, period_of_years); // Eq. 27
        let profitable=Profitable( profit_per_credit,profit_per_hectare_per_year, rate_of_return, CARG, gross_present_value,net_present_value  ); // Eq.25
        
      
        let results_dict = {
        "exponent_year": exponent_year,
        "calendar_year_end": calendar_year_end,
        "real_interest_rate": real_interest_rate,
        "credits_generated": credits_generated,
        "cost_per_credit": cost_per_credit,
        "beginning_value": beginning_value,
        "ending_value_undisc": ending_value_undisc,
        "carbon_investment_cost_per_payment": carbon_investment_cost_per_payment,
        "carbon_investment_annual_costs": carbon_investment_annual_costs,
        "total_investment_costs": total_investment_costs,
        "number_of_inspections": number_of_inspections,
        "registry_cost_recurring": registry_cost_recurring,
        "registry_cost_per_credit": registry_cost_per_credit,
        "registry_cost_credits_above_threshold": registry_cost_credits_above_threshold,
        "total_registry_costs": total_registry_costs,
        "CARG_exponent": CARG_exponent,
        "total_project_costs_undisc": total_project_costs_undisc,
        "ending_value_discounted": ending_value_disc,
        "total_project_costs_disc": total_project_costs_disc,
        "rate_of_return": rate_of_return,
        "CARG": CARG,
        "gross_present_value": gross_present_value,
        "net_present_value": net_present_value,
        "profit_per_credit": profit_per_credit,
        "profit_per_hectare_per_year": profit_per_hectare_per_year,
        "profitable": profitable
        }        
    
        return results_dict
}

