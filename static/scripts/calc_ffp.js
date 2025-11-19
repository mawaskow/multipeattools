
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
    /*
    let exp_yr= document.getElementById("r_exp_yr");
    let cal_yr_end= document.getElementById("r_cal_yr_end");
    let real_int_rt= document.getElementById("r_real_int_rt");
    let beg_val= document.getElementById("r_beg_val");
    let end_val_undisc= document.getElementById("r_end_val_undisc");
    let end_val_disc= document.getElementById("r_end_val_disc");
    let tot_cost_undisc= document.getElementById("r_tot_cost_undisc");
    let tot_cost_disc= document.getElementById("r_tot_cost_disc");
    let carg_exp= document.getElementById("r_carg_exp");
    let c_cost_p_pay= document.getElementById("r_c_cost_p_pay");
    let c_ann_cost= document.getElementById("r_c_ann_cost");
    let tot_invest_cost= document.getElementById("r_tot_invest_cost");
    let num_inspect= document.getElementById("r_num_inspect");
    let reg_cost_rec= document.getElementById("r_reg_cost_rec");
    let reg_cost_p_cred= document.getElementById("r_reg_cost_p_cred");
    let reg_cost_abv_thr= document.getElementById("r_reg_cost_abv_thr");
    let tot_reg_cost= document.getElementById("r_tot_reg_cost");
    */
    let cred_gen= document.getElementById("r_cred_gen");
    let cost_p_cred= document.getElementById("r_cost_p_cred");
    let net_pres_val= document.getElementById("r_net_pres_val");
    let gro_pres_val= document.getElementById("r_gro_pres_val");
    let carg= document.getElementById("r_carg");
    let prof_p_cred= document.getElementById("r_prof_p_cred");
    let prof_p_hect_p_yr= document.getElementById("r_prof_p_hect_p_yr");
    let rate_return= document.getElementById("r_rate_return");
    let prof= document.getElementById("r_prof");

    /*
    exp_yr.innerHTML = parseFloat(results_dict["exponent_year"]).toFixed(2);
    cal_yr_end.innerHTML = parseFloat(results_dict["calendar_year_end"]).toFixed(2);
    real_int_rt.innerHTML = parseFloat(results_dict["real_interest_rate"]).toFixed(2);
    beg_val.innerHTML = parseFloat(results_dict["beginning_value"]).toFixed(2);
    end_val_undisc.innerHTML = parseFloat(results_dict["ending_value_undisc"]).toFixed(2);
    end_val_disc.innerHTML = parseFloat(results_dict["ending_value_discounted"]).toFixed(2);
    tot_cost_undisc.innerHTML = parseFloat(results_dict["total_project_costs_undisc"]).toFixed(2);
    tot_cost_disc.innerHTML = parseFloat(results_dict["total_project_costs_disc"]).toFixed(2);
    carg_exp.innerHTML = parseFloat(results_dict["CARG_exponent"]).toFixed(2);
    c_cost_p_pay.innerHTML = parseFloat(results_dict["carbon_investment_cost_per_payment"]).toFixed(2);
    c_ann_cost.innerHTML = parseFloat(results_dict["carbon_investment_annual_costs"]).toFixed(2);
    tot_invest_cost.innerHTML = parseFloat(results_dict["total_investment_costs"]).toFixed(2);
    num_inspect.innerHTML = parseFloat(results_dict["number_of_inspections"]).toFixed(2);
    reg_cost_rec.innerHTML = parseFloat(results_dict["registry_cost_recurring"]).toFixed(2);
    reg_cost_p_cred.innerHTML = parseFloat(results_dict["registry_cost_per_credit"]).toFixed(2);
    reg_cost_abv_thr.innerHTML = parseFloat(results_dict["registry_cost_credits_above_threshold"]).toFixed(2);
    tot_reg_cost.innerHTML = parseFloat(results_dict["total_registry_costs"]).toFixed(2);
    */

    cred_gen.innerHTML = parseFloat(results_dict["credits_generated"]).toFixed(2);
    cost_p_cred.innerHTML = parseFloat(results_dict["cost_per_credit"]).toFixed(2);
    net_pres_val.innerHTML = parseFloat(results_dict["net_present_value"]).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    gro_pres_val.innerHTML = parseFloat(results_dict["gross_present_value"]).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    carg.innerHTML = parseFloat(results_dict["CARG"]).toFixed(2);
    prof_p_cred.innerHTML = parseFloat(results_dict["profit_per_credit"]).toFixed(2);
    prof_p_hect_p_yr.innerHTML = parseFloat(results_dict["profit_per_hectare_per_year"]).toFixed(2);
    rate_return.innerHTML = parseFloat(results_dict["rate_of_return"]).toFixed(2);

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
    let fieldname = document.getElementById("fieldname").value;
        console.log(fieldname)


        console.log("--- MAIN FORM VALUES ---");
        console.log("Field Name:", fieldname);
        console.log("Number of Years:", num_yrs);
        console.log("Credits per Hectare per Year:", cred_p_hect_p_yr);
        console.log("Hectares Restored:", hect_restored);
        console.log("Investment Amount:", invest_amt);
        console.log("Start Year:", start_yr);
        console.log("Price per Credit:", price_p_cred);
        console.log("Investment Costs Included:", invest_costs_inc);
        console.log("Registry Costs Included:", reg_costs_inc);
    
        // CONSOLE LOGGING - Assumptions Values
        console.log("--- ASSUMPTIONS VALUES ---");
        console.log("Nominal Interest Rate:", nom_int_rt);
        console.log("Inflation Rate:", inflation_rt);
        console.log("Registry Account Opening Fee:", reg_acct_open_fee);
        console.log("Registry Listing Cost per Credit:", reg_listing_cost_p_credit);
        console.log("Registry Conversion Cost Fee per Inspection:", reg_conv_cost_fee_p_inspect);
        console.log("Registry Conversion Cost per Credit above Min Threshold:", reg_conv_cost_p_cred_abv_min_thresh_of_credits);
        console.log("Registry Levy Cost per Credit:", reg_levy_cost_p_cred);
        console.log("Validation & Verification App Cost per Inspection:", valid_and_verif_app_cost_p_inspect);
        console.log("Validation & Verification Statement Cost per Inspection:", valid_and_verif_stmnt_cost_p_inspect);
        console.log("Validation & Verification Inspector Travel Cost per Inspection:", valid_and_verif_inspctr_travel_cost_p_inspect);
        console.log("Inspection Cycle Length:", inspect_cycle_len);
        console.log("Minimum Threshold of Credits:", min_thresh_of_credits);
        console.log("Interest Rate:", interest_rt);
        console.log("Payments per Year:", payments_p_yr);
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
        payments_p_yr.length === 0 ||
        fieldname.length == 0
        ){
            return;
        }
    
    let results_dict = Conditional_Executor(num_yrs, cred_p_hect_p_yr, hect_restored, invest_amt, start_yr, price_p_cred, invest_costs_inc, reg_costs_inc, nom_int_rt, inflation_rt, reg_acct_open_fee,  reg_listing_cost_p_credit, reg_conv_cost_fee_p_inspect, reg_conv_cost_p_cred_abv_min_thresh_of_credits, reg_levy_cost_p_cred,  valid_and_verif_app_cost_p_inspect, valid_and_verif_stmnt_cost_p_inspect, valid_and_verif_inspctr_travel_cost_p_inspect, inspect_cycle_len, min_thresh_of_credits, interest_rt, payments_p_yr);

    update_results(results_dict)
    update_complete_results(results_dict)
}

// Export assumptions and results to CSV


$("#ffp_csv_btn").on('click', function(event){
    // Prevent any default button behavior
    event.preventDefault();
    
    try {
        // FIXED Helper function to safely get element value
        function getElementValue(id, defaultValue = '') {
            const element = document.getElementById(id);
            if (!element) {
                console.warn(`Element with ID '${id}' not found`);
                return defaultValue;
            }
            
            // Handle checkboxes first
            if (element.type === 'checkbox') {
                return element.checked;
            }
            
            // Handle form inputs (input, select, textarea) - these have .value
            if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
                return element.value || defaultValue;
            }
            
            // Handle display elements (p, div, span) - these use innerHTML
            if (element.innerHTML !== undefined) {
                return element.innerHTML.replace(/<[^>]*>/g, '').trim() || defaultValue;
            }
            
            return defaultValue;
        }

        // Helper function to safely parse numeric values
        function parseNumericValue(value) {
            if (typeof value === 'string') {
                // Remove commas and other formatting
                const cleaned = value.replace(/[,\s]/g, '');
                const parsed = parseFloat(cleaned);
                return isNaN(parsed) ? value : parsed;
            }
            return value;
        }

        // Test the function first
        console.log("=== TESTING getElementValue FUNCTION ===");
        console.log("num_yrs:", getElementValue("num_yrs"));
        console.log("fieldname:", getElementValue("fieldname"));
        console.log("start_yr:", getElementValue("start_yr"));
        console.log("invest_costs_inc:", getElementValue("invest_costs_inc"));
        console.log("r_cred_gen:", getElementValue("r_cred_gen"));

        let rows = [
            // Field Name at the top
            ["Field Name", getElementValue("fieldname")],
            [""], // Empty row for separation
            
            // Key Project Parameters Section
            ["Key Project Parameters"],
            ["Start Year", getElementValue("start_yr")],
            ["Project Duration (years)", getElementValue("num_yrs")],
            ["Avg. Credits/ha/annum", getElementValue("cred_p_hect_p_yr")],
            ["Hectares of Potential Restoration", getElementValue("hect_restored")],
            ["Investment / Financial Inputs (€)", getElementValue("invest_amt")],
            ["Selling Price of a Carbon Credit (€)", getElementValue("price_p_cred")],
            [""], // Empty row for separation
            
            // Results Section
            ["Results"],
            ["Credits Generated", getElementValue("r_cred_gen")],
            ["Cost per Credit", getElementValue("r_cost_p_cred")],
            ["Net Present Value", parseNumericValue(getElementValue("r_net_pres_val"))],
            ["Gross Present Value", parseNumericValue(getElementValue("r_gro_pres_val"))],
            ["CARG", getElementValue("r_carg")],
            ["Profit per Credit", getElementValue("r_prof_p_cred")],
            ["Profit per Hectare per Year", getElementValue("r_prof_p_hect_p_yr")],
            ["Rate of Return", getElementValue("r_rate_return")],
            ["Profitable", getElementValue("r_prof")],
            [""], // Empty row for separation
            
            // Arguments Section
            ["Arguments"],
            ["Number of Years", getElementValue("num_yrs")],
            ["Credits per Hectare per Year", getElementValue("cred_p_hect_p_yr")],
            ["Hectares for Restoration", getElementValue("hect_restored")],
            ["Investment Amount", getElementValue("invest_amt")],
            ["Start Year", getElementValue("start_yr")],
            ["Price per Credit", getElementValue("price_p_cred")],
            ["Investment Costs Included", getElementValue("invest_costs_inc")],
            ["Registration Costs Included", getElementValue("reg_costs_inc")],
            [""], // Empty row for separation
            
            // Assumptions Section
            ["Assumptions"],
            ["Nominal Interest Rate", getElementValue("nom_int_rt")],
            ["Inflation Rate", getElementValue("inflation_rt")],
            ["Registry Account Opening Fee", getElementValue("reg_acct_open_fee")],
            ["Registry Listing Cost per Credit", getElementValue("reg_listing_cost_p_credit")],
            ["Registry Conversion Cost Fee per Inspection", getElementValue("reg_conv_cost_fee_p_inspect")],
            ["Registry Conversion Cost per Credit above Minimum Threshold", getElementValue("reg_conv_cost_p_cred_abv_min_thresh_of_credits")],
            ["Registration Levy Cost per Credit", getElementValue("reg_levy_cost_p_cred")],
            ["Validation and Verification Application Cost per Inspection", getElementValue("valid_and_verif_app_cost_p_inspect")],
            ["Validation and Verification Statement Cost per Inspection", getElementValue("valid_and_verif_stmnt_cost_p_inspect")],
            ["Validation and Verification Inspector Travel Cost per Inspection", getElementValue("valid_and_verif_inspctr_travel_cost_p_inspect")],
            ["Inspection Cycle Length", getElementValue("inspect_cycle_len")],
            ["Minimum Threshold of Credits", getElementValue("min_thresh_of_credits")],
            ["Interest Rate", getElementValue("interest_rt")],
            ["Payments per Year", getElementValue("payments_p_yr")],
            [""], // Empty row
            
            // Export Information
            ["Export Information"],
            ["Export Date", new Date().toISOString()],
            ["Export Timestamp", Date.now()]
        ];

        console.log("=== SAMPLE CSV ROWS ===");
        console.log("First 20 rows:", rows.slice(0, 20));
        
        // Save CSV data to server
        saveCSVData(rows);
        
    } catch (error) {
        console.error('Error in CSV export:', error);
        showDialog('error', 'Export Error', 'An error occurred while preparing CSV data: ' + error.message);
    }
});

// Improved CSV save function with better error handling
function saveCSVData(rows) {
    // Validate input
    if (!rows || !Array.isArray(rows) || rows.length === 0) {
        showDialog('error', 'Invalid Data', 'No data available to export');
        return;
    }

    // Convert rows to properly escaped CSV format
    const csvContent = rows.map(row => {
        return row.map(cell => {
            // Convert cell to string and handle special characters
            let cellStr = String(cell);
            
            // If cell contains comma, newline, or quote, wrap in quotes and escape quotes
            if (cellStr.includes(',') || cellStr.includes('\n') || cellStr.includes('"')) {
                cellStr = '"' + cellStr.replace(/"/g, '""') + '"';
            }
            
            return cellStr;
        }).join(',');
    }).join('\r\n');

    console.log("Sending CSV Data:", csvContent);

    // Show loading state (optional)
    showDialog('info', 'Exporting...', 'Please wait while we save your data...');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        credentials: 'include',
        body: JSON.stringify({ 
            csvData: csvContent,
            timestamp: new Date().toISOString(),
            dataType: 'financial_forest_project'
        })
    };

    fetch('https://multipeat.insight-centre.org/save-csv', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json().then(data => ({ status: response.status, body: data }));
        })
        .then(({ status, body }) => {
            console.log("Response Status:", status);
            console.log("Server Response:", body);

            switch (status) {
                case 200:
                    showDialog('success', 'Export Successful', body.message || 'Your data has been saved successfully.');
                    break;
                case 401:
                    showDialog('warning', 'Authentication Required', body.error || 'Please log in to save data.');
                    break;
                case 400:
                    showDialog('error', 'Invalid Request', body.error || 'The request could not be processed.');
                    break;
                default:
                    showDialog('warning', 'Unexpected Response', body.error || 'An unexpected error occurred.');
            }
        })
        .catch(error => {
            console.error('Error saving CSV:', error);
            
            // Provide more specific error messages
            let errorMessage = 'Could not connect to the server.';
            if (error.name === 'TypeError') {
                errorMessage = 'Network error: Please check your connection and try again.';
            } else if (error.message.includes('HTTP error')) {
                errorMessage = 'Server error: ' + error.message;
            }
            
            showDialog('warning', 'Login Required to Save Data');
        });
}

// Enhanced retrieve function with better data processing
function retrieveCSVData() {
    console.log("Retrieving CSV Data...");

    fetch('https://multipeat.insight-centre.org/get-csv', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json().then(data => ({ status: response.status, body: data }));
    })
    .then(({ status, body }) => {
        console.log("Response Status:", status);
        console.log("Server Response:", body);

        switch (status) {
            case 200:
                if (body.csvData) {
                    showDialog('success', 'Data Retrieved', 'CSV data loaded successfully');
                    return processRetrievedCSV(body.csvData);
                } else {
                    showDialog('warning', 'No Data', 'No CSV data found in response');
                }
                break;
            case 401:
                showDialog('warning', 'Authentication Required', body.error || 'Please log in to access data.');
                break;
            case 404:
                showDialog('info', 'No Data Found', 'No saved CSV data found for this session');
                break;
            case 400:
                showDialog('error', 'Bad Request', body.error || 'Invalid request format');
                break;
            default:
                showDialog('warning', 'Unexpected Error', body.error || 'An unexpected error occurred');
        }
    })
    .catch(error => {
        console.error('Error retrieving CSV:', error);
        showDialog('error', 'Retrieval Failed', 'Could not retrieve data from server');
    });
}

// Process retrieved CSV data
function processRetrievedCSV(csvData) {
    try {
        const rows = csvData.split('\r\n')
            .filter(row => row.trim() !== '')
            .map(row => {
                // Simple CSV parsing (for more complex CSV, consider using a library)
                const cells = [];
                let current = '';
                let inQuotes = false;
                
                for (let i = 0; i < row.length; i++) {
                    const char = row[i];
                    
                    if (char === '"' && (i === 0 || row[i-1] === ',')) {
                        inQuotes = true;
                    } else if (char === '"' && inQuotes && (i === row.length - 1 || row[i+1] === ',')) {
                        inQuotes = false;
                    } else if (char === ',' && !inQuotes) {
                        cells.push(current);
                        current = '';
                    } else {
                        current += char;
                    }
                }
                cells.push(current);
                
                return cells;
            });

        console.log("Parsed CSV Rows:", rows);
        return rows;
        
    } catch (error) {
        console.error('Error parsing CSV data:', error);
        showDialog('error', 'Parse Error', 'Could not parse the retrieved CSV data');
        return null;
    }
}

// Enhanced dialog function with additional type support
function showDialog(type, title, message) {
    const dialogOverlay = document.getElementById('dialogOverlay');
    const dialogBox = document.getElementById('dialogBox');
    const dialogTitle = document.getElementById('dialogTitleText');
    const dialogContent = document.getElementById('dialogContent');
    const dialogIcon = document.getElementById('dialogIcon');
    const dialogClose = document.getElementById('dialogClose');
    const dialogOk = document.getElementById('dialogOk');
    
    // Fallback if dialog elements don't exist
    if (!dialogOverlay || !dialogBox || !dialogTitle || !dialogContent) {
        console.error('Dialog elements not found in DOM');
        alert(`${title}: ${message}`);
        return;
    }
    
    // Reset classes
    dialogBox.className = 'dialog-box';
    
    // Set content
    dialogTitle.textContent = title;
    dialogContent.textContent = message;
    
    // Set styles and icons based on type
    const iconMap = {
        'success': '✓',
        'error': '!',
        'warning': '⚠',
        'info': 'ℹ'
    };
    
    if (type && iconMap[type]) {
        dialogBox.classList.add(type);
        if (dialogIcon) {
            dialogIcon.textContent = iconMap[type];
        }
    }
    
    // Show dialog
    dialogOverlay.classList.add('show');
    
    // Enhanced event listeners with cleanup
    const closeDialog = () => {
        dialogOverlay.classList.remove('show');
        // Clean up event listeners
        if (dialogClose) dialogClose.onclick = null;
        if (dialogOk) dialogOk.onclick = null;
    };
    
    if (dialogClose) dialogClose.onclick = closeDialog;
    if (dialogOk) dialogOk.onclick = closeDialog;
    
    // Auto-close for info messages after 3 seconds
    if (type === 'info') {
        setTimeout(closeDialog, 3000);
    }
}
