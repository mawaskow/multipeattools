// This script was written by our intern Fiona Lefebvre.
//Equations set 1 : Yields

//Equation 1.1
function Crop_Sales(crop_yield, sales_price){
    /*
    Calculate the total sales from crop yield and sales price.
    
    Parameters:
    crop_yield (float): Crop yield per hectare in ton DS/ha.
    sales_price (float): Sales price per ton of dry matter in €/ton DS.
    
    Returns:
    float: Total sales from the crop in €/ha/yr.
    */
    return crop_yield * sales_price;
}

//Equation 1.2
function Carbon_Credit_Groundwater_Level(CO2_credit, price_C_credit){
    /*
    Calculate the carbon credit yield due to raising groundwater levels.
    
    Parameters:
    CO2_credit (float): Number of CO2 credit per hectare in CO2-credits/ha.
    price_C_credit (float): Net market price C-credit in €/ton CO2-eq.
    
    Returns:
    float: Total carbon credit yield due to raising groundwater level in €/ha/yr.
    */
    return CO2_credit * price_C_credit
}

//Equation 1.3
function Carbon_Credit_CO2_Sequestration(crop_yield, plant_in_building, price_C_credit){
    /*
    Calculate the carbon credit yield due to CO2 sequestration.
    
    Parameters:
    plant_in_building (float): Fraction of plant material (DM) that ends up in building material in % ds/ds.
    price_C_credit (float): Net market price C-credit in €/ton CO2-eq.
    
    Returns:
    float: Total carbon credit yield due to CO2 sequestration in €/ha/yr.
    */
    return crop_yield*1.8*price_C_credit*(plant_in_building/100)
}

//Equation 1.4
/*
For the moment, the carbon credit yield peat growth is not included in the model. But it can be added later if needed.
We don't have the exact formula for this yet. We know it is related to the carbon credits from peat growth, but the specific calculation is not defined.
If it is needed, don't forget to define the parameters and the formula, and to add it to the total gross cash yields function.
function carbon_credit_yield_peat_growth(price_C_credit,...){
    return something to define here
}
*/

//Equation 1.5
function Total_Gross_Cash_Yields(crop_sales, CAP_subsidy, Eco_scheme_yield, carbon_credit_groundwater_level, carbon_credit_CO2_sequestration){
    /*
    Calculate the total gross cash yields.
    
    Parameters:
    crop_sales (float): Total sales from crop yield in €/ha/yr.
    CAP_subsidy (float): CAP subsidy per hectare in €/ha/yr.
    Eco_scheme_yield (float): Eco scheme yield per hectare in €/ha/yr.
    carbon_credit_groundwater_level (float): Carbon credit yield due to raising groundwater levels in €/ha/yr.
    carbon_credit_CO2_sequestration (float): Carbon credit yield due to CO2 sequestration in €/ha/yr.
    
    Returns:
    float: Total gross cash yields in €/ha/yr.
    */
    return crop_sales+CAP_subsidy+ Eco_scheme_yield+ carbon_credit_groundwater_level+ carbon_credit_CO2_sequestration
}

//Equations set 2 : Allocated costs

//Equation 2.1
function Planting(planting_costs){
    /*
    Calculate the cost of planting per hectare. It depends of the planting type : sowing or planting cuttings.

    Parameters:
    planting_costs (float): Total planting costs in €/ha. For sowing, it is an investment during the first 2 years, for planting cuttings it is a one-time investment.

    Returns:
    float: Cost of planting per hectare in €/ha/yr.
    */
    return planting_costs/20
}

//Equation 2.2
function Total_Allocated_Costs(planting, fertilisation, crop_protection, pest_control, crop_insurance){
    /*
    Calculate the total allocated costs.
    
    Parameters:
    planting (float): Cost of planting per hectare in €/ha/yr.
    fertilisation (float): Cost of fertilisation per hectare in €/ha/yr.
    crop_protection (float): Cost of crop protection per hectare in €/ha/yr.
    pest_control (float): Cost of pest control per hectare in €/ha/yr.
    crop_insurance (float): Cost of insurance per hectare in €/ha/yr.
    
    Returns:
    float: Total allocated costs in €/ha/yr.
    */
    return planting+fertilisation+crop_protection+pest_control+crop_insurance
}


//Equations set 3 : Processing costs

//Equation 3.1
function Labour_Costs(crop_care, dike_and_ditch){
    /*
    Calculate the total labour costs (soil cultivation etc.)
    
    Parameters:
    crop_care (float): Labour costs for crop care, checking water level etc. per hectare in €/ha.
    dike_and_ditch (float): Labour costs for dike management and ditch maintenance per hectare in €/ha.
    
    Returns:
    float: Total labour costs in €/ha/yr.
    */
    return crop_care + dike_and_ditch
}

//Equation 3.2
function Depreciation_Devices(pumps, water_level_control, depreciation_period_investment_plot){
    /*
    Calculate the depreciation costs for devices.
    
    Parameters:
    pumps (float): Investment in pumps (incl. power supplu) per hectare in €/ha, over the depreciation period in years.
    water_level_control (float): Investment in water level control devices (gates, sludge boxes, etc.) per hectare in €/ha, over the depreciation period in years.
    depreciation_period_investment_plot (int): Depreciation period for investment in plot in years.
    
    Returns:
    float: Total depreciation costs for devices in €/ha/yr.
    */
    return (pumps + water_level_control) / depreciation_period_investment_plot
}

//Equation 3.3
function Maintenance_Devices(pumps, water_level_control, percentage_maintenance){
    /*
    Calculate the maintenance costs for devices.
    
    Parameters:
    pumps (float): Investment in pumps (incl. power supply) per hectare in €/ha.
    water_level_control (float): Investment in water level control devices (gates, sludge boxes, etc.) per hectare in €/ha.
    percentage_maintenance (float): Percentage of investment for maintenance in %.
    
    Returns:
    float: Total maintenance costs for devices in €/ha/yr.
    */
    return (pumps + water_level_control) * (percentage_maintenance / 100)
}

//Equation 3.4
function Total_Processing_Costs(labour_costs, depreciation_devices, maintenance_devices, harvesting_contract_work){
    /*
    Calculate the total processing costs.
    
    Parameters:
    labour_costs (float): Total labour costs in €/ha/yr.
    depreciation_devices (float): Total depreciation costs for devices in €/ha.
    maintenance_devices (float): Total maintenance costs for devices in €/ha.
    harvesting_contract_work (float): Harvesting contract work (inc. machines) per hectare in €/ha.
    
    Returns:
    float: Total processing costs in €/ha/yr.
    */
    return labour_costs+depreciation_devices+maintenance_devices+harvesting_contract_work
}

//Equations set 4 : Land and building

//Equation 4.1
function Depreciation_Construction_Plots(earthmoving, soil_supply, water_supply, water_drainage){
    /*
    Calculate the depreciation costs for construction of plots.
    
    Parameters:
    earthmoving (float): Investment in earthmoving per hectare in €/ha.
    soil_supply (float): Investment in soil supply per hectare in €/ha.
    water_supply (float): Investment in water supply per hectare in €/ha.
    water_drainage (float): Investment in water drainage per hectare in €/ha.
    
    Returns:
    float: Total depreciation costs for construction of plots in €/ha/yr.
    */
    return earthmoving + soil_supply + water_supply + water_drainage
}

//Equation 4.2
function Buildings_Paving_Maintenance(depreciation_construction_plots, percentage_maintenance_dikes_and_waterways){
    /*
    Calculate the maintenance costs for buildings and paving.
    
    Parameters:
    depreciation_construction_plots (float): Total depreciation costs for construction of plots in €/ha/yr.
    percentage_maintenance (float): Percentage of investment for maintenance of dikes and waterways in %.
    
    Returns:
    float: Total maintenance costs for buildings and paving in €/ha/yr.
    */
    return depreciation_construction_plots * (percentage_maintenance_dikes_and_waterways / 100)
}

//Equation 4.3
function Total_Land_And_Building_Costs(buildings_paving_maintenance){
    /*
    Calculate the total land and building costs. 
    For the moment, it is only the maintenance costs for buildings and paving. 
    But add the depreciation costs for construction of plots later if needed.
    
    Parameters:
    buildings_paving_maintenance (float): Total maintenance costs for buildings and paving in €/ha/yr.
    
    Returns:
    float: Total land and building costs in €/ha/yr.
    */
    return buildings_paving_maintenance
}

//Equations set 5 : Financing costs

//Equation 5.1
function Calculated_Interest_Rate_Subtotal(calculated_interest_investments, planting_cuttings, depreciation_devices){
    /*
    Calculate the subtotal for the calculated interest rate.
    
    Parameters:
    calculated_interest_investments (float): Calculated interest investments in %.
    planting_cuttings (float): Cost of planting cuttings in €/ha/yr.
    depreciation_devices (float): Depreciation costs for devices in €/ha/yr.
    
    Returns:
    float: Subtotal for the calculated interest rate in €/ha/yr.
    */
    return calculated_interest_investments*planting_cuttings + depreciation_devices*calculated_interest_investments
}

//Equation 5.2
function Total_Financing_Costs(calculated_interest_rate_subtotal, lease_land_rent_and_land_charges){
    /*
    Calculate the total financing costs.
    
    Parameters:
    calculated_interest_rate_subtotal (float): Subtotal for the calculated interest rate in €/ha/yr.
    lease_land_rent_and_land_charges (float): Lease/land rent and land charges in €/ha/yr.
    
    Returns:
    float: Total financing costs in €/ha/yr.
    */
    return calculated_interest_rate_subtotal + lease_land_rent_and_land_charges
}

//Equations set 6 : General costs

//Equation 6.1
function Electricity_Costs(electricity_irrigation, other_electricity){
    /*
    Calculate the total electricity costs.
    
    Parameters:
    electricity_irrigation (float): Electricity costs for irrigation and water level management in €/ha.
    other_electricity (float): Other electricity consumption costs in €/ha.
    
    Returns:
    float: Total electricity costs in €/ha/yr.
    */
    return electricity_irrigation + other_electricity
}

//Equation 6.2
function Total_General_Costs(electricity_costs, water_costs, other_costs){
    /*
    Calculate the total general costs.
    
    Parameters:
    electricity_costs (float): Total electricity costs in €/ha/yr.
    water_costs (float): Water costs in €/ha/yr.
    other_costs (float): Other costs in €/ha/yr.
    
    Returns:
    float: Total general costs in €/ha/yr.
    */
    return electricity_costs+water_costs+other_costs
}

//Equation 7 : Total costs per hectare
function Total_Costs_Per_Hectare(total_allocated_costs, total_processing_costs, total_land_and_building_costs, total_financing_costs, total_general_costs){
    /*
    Calculate the total costs per hectare.
    
    Parameters:
    total_allocated_costs (float): Total allocated costs in €/ha/yr.
    total_processing_costs (float): Total processing costs in €/ha/yr.
    total_land_and_building_costs (float): Total land and building costs in €/ha/yr.
    total_financing_costs (float): Total financing costs in €/ha/yr.
    total_general_costs (float): Total general costs in €/ha/yr.
    
    Returns:
    float: Total costs per hectare in €/ha/yr.
    */
    return total_allocated_costs+total_processing_costs+total_land_and_building_costs+total_financing_costs+total_general_costs
}

//Equation 8 : Total costs-CAP yield
function Total_Costs_Less_CAP_Yield(total_costs_per_hectare, CAP_subsidy){
    /*
    Calculate the total costs minus the CAP yield.
    
    Parameters:
    total_costs_per_hectare (float): Total costs per hectare in €/ha/yr.
    CAP_subsidy (float): CAP subsidy per hectare in €/ha/yr.
    
    Returns:
    float: Total costs minus the CAP yield in €/ha/yr.
    */
    return total_costs_per_hectare - CAP_subsidy
}

//Equation 9 : Total costs - CAP yield - CC yield
function Total_Costs_Less_CAP_Yield_CC_Yield(total_costs_less_CAP_yield, carbon_credit_groundwater_level, carbon_credit_CO2_sequestration){
    /*
    Calculate the total costs minus the CAP yield and carbon credit yield.
    
    Parameters:
    total_costs_less_CAP_yield (float): Total costs minus the CAP yield in €/ha/yr.
    carbon_credit_groundwater_level (float): Carbon credit yield due to raising groundwater levels in €/ha/yr.
    carbon_credit_CO2_sequestration (float): Carbon credit yield due to CO2 sequestration in €/ha/yr.
    
    Returns:
    float: Total costs minus the CAP yield and carbon credit yield in €/ha/yr.
    */
    return total_costs_less_CAP_yield - (carbon_credit_groundwater_level + carbon_credit_CO2_sequestration)
}

//Equation 10 : Net ton DS yield
function Net_Ton_DS_Yield(crop_yield){
    return crop_yield 
}

//Equation 11 : Cost price per net kg DS 
function Cost_Price_Per_Net_Ton_DS_Yield(total_costs_less_CAP_yield_CC_yield, net_ton_DS_yield){
    /*
    Calculate the cost price per net ton DS yield.
    
    Parameters:
    total_costs_less_CAP_yield_CC_yield (float): Total costs minus the CAP yield and carbon credit yield in €/ha/yr.
    net_ton_DS_yield (float): Net ton DS yield in ton DS/ha.
    
    Returns:
    float: Cost price per net kg DS yield in €/ton DS.
    */
    return total_costs_less_CAP_yield_CC_yield / net_ton_DS_yield
}

//Equation 12 : Real yield price per kg DS (cost price + margin)
function Real_Yield_Price_Per_Ton_DS(cost_price_per_net_ton_DS_yield, margin){
    /*
    Calculate the real yield price per ton DS.
    
    Parameters:
    cost_price_per_net_kg_DS_yield (float): Cost price per net ton DS yield in €/ton DS.
    margin (float): Margin in %.
    
    Returns:
    float: Real yield price per kg DS in €/ton DS.
    */
    return cost_price_per_net_ton_DS_yield * (1 + margin / 100)
}

//Equation 13 : Balance per hectare 1 (yield - allocated costs)
function Balance_Per_Hectare_1(total_gross_cash_yields, total_allocated_costs){
    /*
    Calculate the balance per hectare.
    
    Parameters:
    total_gross_cash_yields (float): Total gross cash yields in €/ha/yr.
    total_costs_less_CAP_yield_CC_yield (float): Total allocated costs in €/ha/yr.
    
    Returns:
    float: Balance per hectare in €/ha/yr.
    */
    return total_gross_cash_yields - total_allocated_costs
}

//Equation 14 : Balance per hectare 2 (yield - allocated costs - processing costs)
function Balance_Per_Hectare_2(total_gross_cash_yields, total_allocated_costs, total_processing_costs){
    /*
    Calculate the balance per hectare after processing costs.
    
    Parameters:
    total_gross_cash_yields (float): Total gross cash yields in €/ha/yr.
    total_allocated_costs (float): Total allocated costs in €/ha/yr.
    total_processing_costs (float): Total processing costs in €/ha/yr.
    
    Returns:
    float: Balance per hectare after processing costs in €/ha/yr.
    */
    return total_gross_cash_yields - total_allocated_costs - total_processing_costs
}

//Equation 15 : Balance per hectare 3 (yield - total costs)
function Balance_Per_Hectare_3(total_gross_cash_yields, total_costs_per_hectare){
    /*
    Calculate the balance per hectare after all costs.
    
    Parameters:
    total_gross_cash_yields (float): Total gross cash yields in €/ha/yr.
    total_costs_per_hectare (float): Total costs per hectare in €/ha/yr.
    
    Returns:
    float: Balance per hectare after all costs in €/ha/yr.
    */
    return total_gross_cash_yields - total_costs_per_hectare
}

//Conditional Executor
function Conditional_Executor(crop_yield, sales_price, CO2_credit, price_C_credit, plant_in_building, CAP_subsidy, Eco_scheme_yield,
    planting_costs, fertilisation, crop_protection, pest_control, crop_insurance, crop_care, dike_and_ditch, pumps, water_level_control, depreciation_period_investment_plot,
    percentage_maintenance, harvesting_contract_work, earthmoving, soil_supply, water_supply, water_drainage, percentage_maintenance_dikes_and_waterways, planting_cuttings, calculated_interest_investments,
    lease_land_rent_and_land_charges, electricity_irrigation, other_electricity, water_costs, other_costs, margin){
    crop_yield = parseFloat(crop_yield);
    sales_price = parseFloat(sales_price);
    CO2_credit = parseFloat(CO2_credit);
    price_C_credit = parseFloat(price_C_credit);
    plant_in_building = parseFloat(plant_in_building);
    CAP_subsidy = parseFloat(CAP_subsidy);
    Eco_scheme_yield = parseFloat(Eco_scheme_yield);
    planting_costs = parseFloat(planting_costs);
    fertilisation = parseFloat(fertilisation);
    crop_protection = parseFloat(crop_protection);
    pest_control = parseFloat(pest_control);
    crop_insurance = parseFloat(crop_insurance);
    crop_care = parseFloat(crop_care);
    dike_and_ditch = parseFloat(dike_and_ditch);
    pumps = parseFloat(pumps);
    water_level_control = parseFloat(water_level_control);
    depreciation_period_investment_plot = parseFloat(depreciation_period_investment_plot);
    percentage_maintenance = parseFloat(percentage_maintenance);
    harvesting_contract_work = parseFloat(harvesting_contract_work);
    earthmoving = parseFloat(earthmoving);
    soil_supply = parseFloat(soil_supply);
    water_supply = parseFloat(water_supply);
    water_drainage = parseFloat(water_supply);
    percentage_maintenance_dikes_and_waterways = parseFloat(percentage_maintenance_dikes_and_waterways);
    planting_cuttings = parseFloat(planting_cuttings);
    calculated_interest_investments = parseFloat(calculated_interest_investments);
    lease_land_rent_and_land_charges = parseFloat(lease_land_rent_and_land_charges);
    electricity_irrigation = parseFloat(electricity_irrigation);
    other_electricity = parseFloat(other_electricity);
    water_costs = parseFloat(water_costs);
    other_costs = parseFloat(other_costs);
    margin = parseFloat(margin);
    
    // start calculations
    let crop_sales=Crop_Sales(crop_yield, sales_price); // Eq.1.1
    let carbon_credit_groundwater_level=Carbon_Credit_Groundwater_Level(CO2_credit, price_C_credit); // Eq.1.2
    let carbon_credit_CO2_sequestration=Carbon_Credit_CO2_Sequestration(crop_yield, plant_in_building, price_C_credit); // Eq.1.3
    let total_gross_cash_yields=Total_Gross_Cash_Yields(crop_sales, CAP_subsidy, Eco_scheme_yield, carbon_credit_groundwater_level, carbon_credit_CO2_sequestration) // Eq.1.5

    let planting=Planting(planting_costs); // Eq. 2.1  
    let total_allocated_costs=Total_Allocated_Costs(planting, fertilisation, crop_protection, pest_control, crop_insurance); // Eq.2.2
    

    let labour_costs=Labour_Costs(crop_care, dike_and_ditch);  // Eq.3.1 
    let depreciation_devices=Depreciation_Devices(pumps, water_level_control, depreciation_period_investment_plot); // Eq.3.2
    let maintenance_devices=Maintenance_Devices(pumps, water_level_control, percentage_maintenance); // Eq.3.3
    let total_processing_costs=Total_Processing_Costs(labour_costs, depreciation_devices, maintenance_devices, harvesting_contract_work); // Eq.3.4
    
    let depreciation_construction_plots=Depreciation_Construction_Plots(earthmoving, soil_supply, water_supply, water_drainage); // Eq.4.1
    let buildings_paving_maintenance=Buildings_Paving_Maintenance(depreciation_construction_plots, percentage_maintenance_dikes_and_waterways); // Eq.4.2
    let total_land_and_building_costs=Total_Land_And_Building_Costs(buildings_paving_maintenance); // Eq.4.3

    let calculated_interest_rate_subtotal=Calculated_Interest_Rate_Subtotal(calculated_interest_investments, planting_cuttings, depreciation_devices); // Eq.5.1
    let total_financing_costs=Total_Financing_Costs(calculated_interest_rate_subtotal, lease_land_rent_and_land_charges); // Eq.5.2
    
    let electricity_costs=Electricity_Costs(electricity_irrigation, other_electricity); // Eq.6.1
    let total_general_costs=Total_General_Costs(electricity_costs, water_costs, other_costs); // Eq.6.2

    let total_costs_per_hectare=Total_Costs_Per_Hectare(total_allocated_costs, total_processing_costs, total_land_and_building_costs, total_financing_costs, total_general_costs); // Eq.7

    let total_costs_less_CAP_yield=Total_Costs_Less_CAP_Yield(total_costs_per_hectare, CAP_subsidy); // Eq.8
    
    let total_costs_less_CAP_yield_CC_yield=Total_Costs_Less_CAP_Yield_CC_Yield(total_costs_less_CAP_yield, carbon_credit_groundwater_level, carbon_credit_CO2_sequestration); // Eq.9
    
    let net_ton_DS_yield=Net_Ton_DS_Yield(crop_yield); // Eq.10

    let cost_price_per_net_ton_DS_yield=Cost_Price_Per_Net_Ton_DS_Yield(total_costs_less_CAP_yield_CC_yield, net_ton_DS_yield); // Eq.11

    let real_yield_price_per_ton_DS=Real_Yield_Price_Per_Ton_DS(cost_price_per_net_ton_DS_yield, margin); // Eq.12

    let balance_per_hectare_1=Balance_Per_Hectare_1(total_gross_cash_yields, total_allocated_costs); // Eq.13
    let balance_per_hectare_2=Balance_Per_Hectare_2(total_gross_cash_yields, total_allocated_costs, total_processing_costs); // Eq.14
    let balance_per_hectare_3=Balance_Per_Hectare_3(total_gross_cash_yields, total_costs_per_hectare); // Eq.15

    let results_dict = {
    "total_gross_cash_yields": total_gross_cash_yields,
    "total_allocated_costs": total_allocated_costs,
    "total_processing_costs": total_processing_costs,
    "total_land_and_building_costs": total_land_and_building_costs,
    "total_financing_costs": total_financing_costs,
    "total_general_costs": total_general_costs,
    "total_costs_per_hectare": total_costs_per_hectare,
    "total_costs_less_CAP_yield": total_costs_less_CAP_yield,
    "total_costs_less_CAP_yield_CC_yield": total_costs_less_CAP_yield_CC_yield,
    "cost_price_per_net_ton_DS_yield": cost_price_per_net_ton_DS_yield,
    "real_yield_price_per_ton_DS": real_yield_price_per_ton_DS,
    "balance_per_hectare_1": balance_per_hectare_1,
    "balance_per_hectare_2": balance_per_hectare_2,
    "balance_per_hectare_3": balance_per_hectare_3,
    //"profitable": profitable
    }        

    return results_dict
}

// Update results in the HTML
function update_results(results_dict){
    // grab result p elements
    let bal_hect_1= document.getElementById("bal_hect_1");
    let bal_hect_2= document.getElementById("bal_hect_2");
    let bal_hect_3= document.getElementById("bal_hect_3");
    let tot_cost_hect= document.getElementById("tot_cost_hect");
    let tot_gross_cs_yield= document.getElementById("tot_gross_cs_yield");

    bal_hect_1.innerHTML = parseFloat(results_dict["balance_per_hectare_1"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    bal_hect_2.innerHTML = parseFloat(results_dict["balance_per_hectare_2"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    bal_hect_3.innerHTML = parseFloat(results_dict["balance_per_hectare_3"]).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    tot_cost_hect.innerHTML = parseFloat(results_dict["total_costs_per_hectare"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    tot_gross_cs_yield.innerHTML = parseFloat(results_dict["total_gross_cash_yields"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

// Update results in the HTML
function update_detailed_results(results_dict){
    // grab result p elements
    let tot_gross_cs_yield_det=document.getElementById("tot_gross_cs_yield_det")
    let tot_allocated_costs_det= document.getElementById("tot_allocated_costs_det");
    let tot_processing_costs_det= document.getElementById("tot_processing_costs_det");
    let tot_land_buildings_costs_det= document.getElementById("tot_land_buildings_costs_det");
    let tot_financing_costs_det= document.getElementById("tot_financing_costs_det");
    let tot_general_costs_det= document.getElementById("tot_general_costs_det");
    let tot_cost_hect_det= document.getElementById("tot_cost_hect_det");
    let tot_less_CAPyield_det= document.getElementById("tot_less_CAPyield_det");
    let tot_less_CAPyield_CCyield_det= document.getElementById("tot_less_CAPyield_CCyield_det");
    let cost_net_ton_ds_det= document.getElementById("cost_net_ton_ds_det");
    let real_yield_price_det= document.getElementById("real_yield_price_det");
    let bal_hect_1_det= document.getElementById("bal_hect_1_det");
    let bal_hect_2_det= document.getElementById("bal_hect_2_det");
    let bal_hect_3_det= document.getElementById("bal_hect_3_det");

    tot_gross_cs_yield_det.innerHTML = parseFloat(results_dict["total_gross_cash_yields"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    tot_allocated_costs_det.innerHTML = parseFloat(results_dict["total_allocated_costs"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    tot_processing_costs_det.innerHTML = parseFloat(results_dict["total_processing_costs"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    tot_land_buildings_costs_det.innerHTML = parseFloat(results_dict["total_land_and_building_costs"]).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    tot_financing_costs_det.innerHTML = parseFloat(results_dict["total_financing_costs"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    tot_general_costs_det.innerHTML = parseFloat(results_dict["total_general_costs"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    tot_cost_hect_det.innerHTML = parseFloat(results_dict["total_costs_per_hectare"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    tot_less_CAPyield_det.innerHTML = parseFloat(results_dict["total_costs_less_CAP_yield"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    tot_less_CAPyield_CCyield_det.innerHTML = parseFloat(results_dict["total_costs_less_CAP_yield_CC_yield"]).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    cost_net_ton_ds_det.innerHTML = parseFloat(results_dict["cost_price_per_net_ton_DS_yield"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    real_yield_price_det.innerHTML = parseFloat(results_dict["real_yield_price_per_ton_DS"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    bal_hect_1_det.innerHTML = parseFloat(results_dict["balance_per_hectare_1"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    bal_hect_2_det.innerHTML = parseFloat(results_dict["balance_per_hectare_2"]).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    bal_hect_3_det.innerHTML = parseFloat(results_dict["balance_per_hectare_3"]).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
}

//MAIN
function balance_calculation(){
    // initialize values from each form
    let crop_yield= document.getElementById("crop_yield").value;
    let sales_price= document.getElementById("sales_price").value;
    let CO2_credit= document.getElementById("CO2_credit").value;
    let price_C_credit= document.getElementById("price_C_credit").value;
    let plant_in_building= document.getElementById("plant_in_building").value;
    let CAP_subsidy= document.getElementById("CAP_subsidy").value;
    let Eco_scheme_yield= document.getElementById("Eco_scheme_yield").value;
    //
    let type_planting = document.getElementById("type_planting").value;

    let planting_costs;
    if (type_planting === "Planting Cuttings") {
        planting_costs=document.getElementById("planting_costs").value;
    } else {
        planting_costs=2*document.getElementById("planting_costs").value; // for sowing, it is an investment during the first 2 years, so we set it to 0 for the calculations
    }
    let fertilisation= document.getElementById("fertilisation").value;
    let crop_protection= document.getElementById("crop_protection").value;
    let pest_control= document.getElementById("pest_control").value;
    let crop_insurance= document.getElementById("crop_insurance").value;
    //
    let crop_care= document.getElementById("crop_care").value;
    let dike_and_ditch= document.getElementById("dike_and_ditch").value;
    let pumps= document.getElementById("pumps").value;
    let water_level_control= document.getElementById("water_level_control").value;
    let depreciation_period_investment_plot= document.getElementById("depreciation_period_investment_plot").value;
    let percentage_maintenance= document.getElementById("percentage_maintenance").value;
    let harvesting_contract_work= document.getElementById("harvesting_contract_work").value;
    //
    let earthmoving= document.getElementById("earthmoving").value;
    let soil_supply= document.getElementById("soil_supply").value;
    let water_supply= document.getElementById("water_supply").value;
    let water_drainage= document.getElementById("water_supply").value;
    let percentage_maintenance_dikes_and_waterways= document.getElementById("percentage_maintenance_dikes_and_waterways").value;
    //
    let planting_cuttings;
    if (type_planting === "Planting Cuttings") {
        planting_cuttings=document.getElementById("planting_costs").value;
    } else {
        planting_cuttings="0"; // for sowing, it is an investment during the first 2 years, so we set it to 0 for the calculations
    }

    let calculated_interest_investments= document.getElementById("calculated_interest_investments").value;
    let lease_land_rent_and_land_charges= document.getElementById("lease_land_rent_and_land_charges").value;
    //
    let electricity_irrigation= document.getElementById("electricity_irrigation").value;
    let other_electricity= document.getElementById("other_electricity").value;
    let water_costs= document.getElementById("water_costs").value;
    let other_costs= document.getElementById("other_costs").value;
    //
    let margin= document.getElementById("margin").value;    

    // make sure the values are present
    if (crop_yield.length === 0 || 
        sales_price.length === 0 ||
        CO2_credit.length === 0 ||
        price_C_credit.length === 0 ||
        plant_in_building.length === 0 ||
        CAP_subsidy.length === 0 ||
        Eco_scheme_yield.length === 0 ||
        planting_costs.length === 0 ||
        fertilisation.length === 0 ||
        crop_protection.length === 0 ||
        pest_control.length === 0 ||
        crop_insurance.length === 0 ||
        crop_care.length === 0 ||
        dike_and_ditch.length === 0 ||
        pumps.length === 0 ||
        water_level_control.length === 0 ||
        depreciation_period_investment_plot.length === 0 ||
        percentage_maintenance.length === 0 ||
        harvesting_contract_work.length === 0 ||
        earthmoving.length === 0 ||
        soil_supply.length === 0 ||
        water_supply.length === 0 ||
        water_drainage.length === 0 ||
        percentage_maintenance_dikes_and_waterways.length === 0 ||
        planting_cuttings.length === 0 ||
        calculated_interest_investments.length === 0 ||
        lease_land_rent_and_land_charges.length === 0 ||
        electricity_irrigation.length === 0 ||
        other_electricity.length === 0 ||
        water_costs.length === 0 ||
        other_costs.length === 0 ||
        margin.length === 0
        ){
            return;
        }
    
    let results_dict = Conditional_Executor(crop_yield, sales_price, CO2_credit, price_C_credit, plant_in_building, CAP_subsidy, Eco_scheme_yield,
        planting_costs, fertilisation, crop_protection, pest_control, crop_insurance, crop_care, dike_and_ditch, pumps, water_level_control, depreciation_period_investment_plot,
        percentage_maintenance, harvesting_contract_work, earthmoving, soil_supply, water_supply, water_drainage, percentage_maintenance_dikes_and_waterways, planting_cuttings, calculated_interest_investments,
        lease_land_rent_and_land_charges, electricity_irrigation, other_electricity, water_costs, other_costs, margin);

    // Display the results
    update_results(results_dict)
    update_detailed_results(results_dict)
}