
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
    let profitable = false;
    if(profit_per_credit > 0 && profit_per_hectare_per_year > 0 && rate_of_return > 0 && CARG > 0 && gross_present_value > 0 && net_present_value > 0){
        profitable = true;
    }
    return profitable;
}

function Conditional_Executor(period_of_years, credits_per_hectares_per_year, hectares_restored, investment_amount, start_year, price_per_credit, investment_costs_included, registry_costs_included, nominal_interest_rate, inflation_rate, registry_account_opening_fee, listing_cost, inspection_conversion_fee, conversion_cost_above_threshold, levy_cost, validation_application_cost, validation_statement_cost, inspector_travel_cost, inspection_cycle_lenght, minimum_threshold, interest_rate, payments_per_year){
        // Parse stringified inputs
        period_of_years = parseFloat(period_of_years);
        credits_per_hectares_per_year = parseFloat(credits_per_hectares_per_year);
        hectares_restored = parseFloat(hectares_restored);
        investment_amount = parseFloat(investment_amount);
        start_year = parseFloat(start_year);
        price_per_credit = parseFloat(price_per_credit);
        //investment_costs_included
        //registry_costs_included
        nominal_interest_rate = parseFloat(nominal_interest_rate);
        inflation_rate = parseFloat(inflation_rate);
        registry_account_opening_fee = parseFloat(registry_account_opening_fee);
        listing_cost = parseFloat(listing_cost);
        inspection_conversion_fee = parseFloat(inspection_conversion_fee);
        conversion_cost_above_threshold = parseFloat(conversion_cost_above_threshold);
        levy_cost = parseFloat(levy_cost);
        validation_application_cost = parseFloat(validation_application_cost);
        validation_statement_cost = parseFloat(validation_statement_cost);
        inspector_travel_cost = parseFloat(inspector_travel_cost );
        inspection_cycle_lenght = parseFloat(inspection_cycle_lenght);
        minimum_threshold = parseFloat(minimum_threshold);
        interest_rate = parseFloat(interest_rate);
        payments_per_year = parseFloat(payments_per_year);
    
        // Handle variables defined in conditionals
        let carbon_investment_cost_per_payment=0;
        let carbon_investment_annual_costs=0;
        let total_investment_costs=0;
        //
        let number_of_inspections=0;
        let registry_cost_recurring=0;
        let registry_cost_per_credit=0;
        let registry_cost_credits_above_threshold=0;
        let total_registry_costs=0;
        
        // start calculations
        let exponent_year=Final_Year_exponent(period_of_years); // Eq.1
        let calendar_year_end=Year_End(start_year, exponent_year); // Eq.2
        let real_interest_rate=Real_Interest_Rate(nominal_interest_rate, inflation_rate); // Eq.3
        let credits_generated=Credits_Generated(period_of_years, hectares_restored,credits_per_hectares_per_year); // Eq.4
        let ending_value_undisc=Ending_Value_Undiscounted(credits_generated, price_per_credit); // Eq.7
        
        if(investment_costs_included){            
            carbon_investment_cost_per_payment=Carbon_Investment_Cost_Per_Payment(interest_rate, payments_per_year, period_of_years, investment_amount); // Eq.8
            carbon_investment_annual_costs=Carbon_Investment_Annual_Costs(carbon_investment_cost_per_payment, payments_per_year); // Eq.9
            total_investment_costs=Total_Investment_Costs(carbon_investment_annual_costs, period_of_years); // Eq.10
        }

        if(registry_costs_included){
            number_of_inspections=Number_Of_Inspections(period_of_years, inspection_cycle_lenght); // Eq.11
            registry_cost_recurring=Registry_Cost_Recurring(validation_application_cost, validation_statement_cost, inspector_travel_cost, inspection_conversion_fee, number_of_inspections); // Eq.13
            registry_cost_per_credit=Registry_Cost_Per_Credit(listing_cost,levy_cost, credits_generated ); // Eq.14
            registry_cost_credits_above_threshold=Registry_Cost_Credits_Above_Threshold(conversion_cost_above_threshold, credits_generated, minimum_threshold); // Eq. 15
            total_registry_costs=Total_Registry_Costs(registry_cost_recurring, registry_cost_per_credit, registry_cost_credits_above_threshold, registry_account_opening_fee); // Eq. 16   
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

// new

function update_results(results_dict){
    // grab result p elements
    let is_prof= document.getElementById("is_prof");
    let prof_p_cred= document.getElementById("prof_p_cred");
    let prof_phpy= document.getElementById("prof_phpy");
    let np_val= document.getElementById("np_val");
    let cred_gen= document.getElementById("cred_gen");
    let cost_p_cred= document.getElementById("cost_p_cred");
    //
    if(results_dict["profitable"]){
        is_prof.innerHTML = "YES";
        is_prof.className = "badge rounded-pill text-bg-success";
    }else{
        is_prof.innerHTML = "NO";
        is_prof.className = "badge rounded-pill text-bg-danger";
    }

    prof_p_cred.innerHTML = parseFloat(results_dict["profit_per_credit"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    prof_phpy.innerHTML = parseFloat(results_dict["profit_per_hectare_per_year"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    np_val.innerHTML = parseFloat(results_dict["net_present_value"]).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    cred_gen.innerHTML = parseFloat(results_dict["credits_generated"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    cost_p_cred.innerHTML = parseFloat(results_dict["cost_per_credit"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function update_complete_results(results_dict){
    let exp_yr= document.getElementById("r_exp_yr");
    let cal_yr_end= document.getElementById("r_cal_yr_end");
    let real_int_rt= document.getElementById("r_real_int_rt");
    let cred_gen= document.getElementById("r_cred_gen");
    let cost_p_cred= document.getElementById("r_cost_p_cred");
    let beg_val= document.getElementById("r_beg_val");
    let end_val_undisc= document.getElementById("r_end_val_undisc");
    let end_val_disc= document.getElementById("r_end_val_disc");
    let net_pres_val= document.getElementById("r_net_pres_val");
    let gro_pres_val= document.getElementById("r_gro_pres_val");
    let tot_cost_undisc= document.getElementById("r_tot_cost_undisc");
    let tot_cost_disc= document.getElementById("r_tot_cost_disc");
    let carg= document.getElementById("r_carg");
    let carg_exp= document.getElementById("r_carg_exp");
    let prof_p_cred= document.getElementById("r_prof_p_cred");
    let prof_p_hect_p_yr= document.getElementById("r_prof_p_hect_p_yr");
    let rate_return= document.getElementById("r_rate_return");
    let c_cost_p_pay= document.getElementById("r_c_cost_p_pay");
    let c_ann_cost= document.getElementById("r_c_ann_cost");
    let tot_invest_cost= document.getElementById("r_tot_invest_cost");
    let num_inspect= document.getElementById("r_num_inspect");
    let reg_cost_rec= document.getElementById("r_reg_cost_rec");
    let reg_cost_p_cred= document.getElementById("r_reg_cost_p_cred");
    let reg_cost_abv_thr= document.getElementById("r_reg_cost_abv_thr");
    let tot_reg_cost= document.getElementById("r_tot_reg_cost");
    let prof= document.getElementById("r_prof");

    exp_yr.innerHTML = parseFloat(results_dict["exponent_year"]).toFixed(2);
    cal_yr_end.innerHTML = parseFloat(results_dict["calendar_year_end"]).toFixed(2);
    real_int_rt.innerHTML = parseFloat(results_dict["real_interest_rate"]).toFixed(2);
    cred_gen.innerHTML = parseFloat(results_dict["credits_generated"]).toFixed(2);
    cost_p_cred.innerHTML = parseFloat(results_dict["cost_per_credit"]).toFixed(2);
    beg_val.innerHTML = parseFloat(results_dict["beginning_value"]).toFixed(2);
    end_val_undisc.innerHTML = parseFloat(results_dict["ending_value_undisc"]).toFixed(2);
    end_val_disc.innerHTML = parseFloat(results_dict["ending_value_discounted"]).toFixed(2);
    net_pres_val.innerHTML = parseFloat(results_dict["net_present_value"]).toFixed().toLocaleString("en-US");
    gro_pres_val.innerHTML = parseFloat(results_dict["gross_present_value"]).toFixed(2);
    tot_cost_undisc.innerHTML = parseFloat(results_dict["total_project_costs_undisc"]).toFixed(2);
    tot_cost_disc.innerHTML = parseFloat(results_dict["total_project_costs_disc"]).toFixed(2);
    carg.innerHTML = parseFloat(results_dict["CARG"]).toFixed(2);
    carg_exp.innerHTML = parseFloat(results_dict["CARG_exponent"]).toFixed(2);
    prof_p_cred.innerHTML = parseFloat(results_dict["profit_per_credit"]).toFixed(2);
    prof_p_hect_p_yr.innerHTML = parseFloat(results_dict["profit_per_hectare_per_year"]).toFixed(2);
    rate_return.innerHTML = parseFloat(results_dict["rate_of_return"]).toFixed(2);
    c_cost_p_pay.innerHTML = parseFloat(results_dict["carbon_investment_cost_per_payment"]).toFixed(2);
    c_ann_cost.innerHTML = parseFloat(results_dict["carbon_investment_annual_costs"]).toFixed(2);
    tot_invest_cost.innerHTML = parseFloat(results_dict["total_investment_costs"]).toFixed(2);
    num_inspect.innerHTML = parseFloat(results_dict["number_of_inspections"]).toFixed(2);
    reg_cost_rec.innerHTML = parseFloat(results_dict["registry_cost_recurring"]).toFixed(2);
    reg_cost_p_cred.innerHTML = parseFloat(results_dict["registry_cost_per_credit"]).toFixed(2);
    reg_cost_abv_thr.innerHTML = parseFloat(results_dict["registry_cost_credits_above_threshold"]).toFixed(2);
    tot_reg_cost.innerHTML = parseFloat(results_dict["total_registry_costs"]).toFixed(2);

    if(results_dict["profitable"]){
        prof.innerHTML = "YES";
        prof.className = "badge rounded-pill text-bg-success";
    }else{
        prof.innerHTML = "NO";
        prof.className = "badge rounded-pill text-bg-danger";
    }

}

// MAIN

function ffp_calculation(){
    // initialize values from each form
    let num_yrs= document.getElementById("num_yrs").value;
    let cred_p_hect_p_yr= document.getElementById("cred_p_hect_p_yr").value;
    let hect_restored= document.getElementById("hect_restored").value;
    let invest_amt= document.getElementById("invest_amt").value;
    let start_yr= document.getElementById("start_yr").value;
    let price_p_cred= document.getElementById("price_p_cred").value;
    let invest_costs_inc= document.getElementById("invest_costs_inc").checked;
    let reg_costs_inc= document.getElementById("reg_costs_inc").checked;
    //
    let nom_int_rt= document.getElementById("nom_int_rt").value;
    let inflation_rt= document.getElementById("inflation_rt").value;
    let reg_acct_open_fee= document.getElementById("reg_acct_open_fee").value;
    let reg_listing_cost_p_credit= document.getElementById("reg_listing_cost_p_credit").value;
    let reg_conv_cost_fee_p_inspect= document.getElementById("reg_conv_cost_fee_p_inspect").value;
    let reg_conv_cost_p_cred_abv_min_thresh_of_credits= document.getElementById("reg_conv_cost_p_cred_abv_min_thresh_of_credits").value;
    let reg_levy_cost_p_cred= document.getElementById("reg_levy_cost_p_cred").value;
    let valid_and_verif_app_cost_p_inspect= document.getElementById("valid_and_verif_app_cost_p_inspect").value;
    let valid_and_verif_stmnt_cost_p_inspect= document.getElementById("valid_and_verif_stmnt_cost_p_inspect").value;
    let valid_and_verif_inspctr_travel_cost_p_inspect= document.getElementById("valid_and_verif_inspctr_travel_cost_p_inspect").value;
    let inspect_cycle_len= document.getElementById("inspect_cycle_len").value;
    let min_thresh_of_credits= document.getElementById("min_thresh_of_credits").value;
    let interest_rt= document.getElementById("interest_rt").value;
    let payments_p_yr= document.getElementById("payments_p_yr").value;

    // make sure the values are present
    if (num_yrs.length === 0 || 
        cred_p_hect_p_yr.length === 0 ||
        hect_restored.length === 0 ||
        invest_amt.length === 0 ||
        start_yr.length === 0 ||
        price_p_cred.length === 0 ||
        // except the checkboxes
        nom_int_rt.length === 0 ||
        inflation_rt.length === 0 ||
        reg_acct_open_fee.length === 0 ||
        reg_listing_cost_p_credit.length === 0 ||
        reg_conv_cost_fee_p_inspect.length === 0 ||
        reg_conv_cost_p_cred_abv_min_thresh_of_credits.length === 0 ||
        reg_levy_cost_p_cred.length === 0 ||
        valid_and_verif_app_cost_p_inspect.length === 0 ||
        valid_and_verif_stmnt_cost_p_inspect.length === 0 ||
        valid_and_verif_inspctr_travel_cost_p_inspect.length === 0 ||
        inspect_cycle_len.length === 0 ||
        min_thresh_of_credits.length === 0 ||
        interest_rt.length === 0 ||
        payments_p_yr.length === 0
        ){
            return;
        }
    
    let results_dict = Conditional_Executor(num_yrs, cred_p_hect_p_yr, hect_restored, invest_amt, start_yr, price_p_cred, invest_costs_inc, reg_costs_inc, nom_int_rt, inflation_rt, reg_acct_open_fee,  reg_listing_cost_p_credit, reg_conv_cost_fee_p_inspect, reg_conv_cost_p_cred_abv_min_thresh_of_credits, reg_levy_cost_p_cred,  valid_and_verif_app_cost_p_inspect, valid_and_verif_stmnt_cost_p_inspect, valid_and_verif_inspctr_travel_cost_p_inspect, inspect_cycle_len, min_thresh_of_credits, interest_rt, payments_p_yr);

    update_results(results_dict)
    update_complete_results(results_dict)
}