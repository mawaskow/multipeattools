/* 
This script runs the SET tool. It reads the values in from the form entries,
filters the GEST options based on groundwater level input, runs the calculation,
and updates the outputs.
*/

var DataFrame = dfd.DataFrame;
// create GEST dataframe for calculations in lieu of reading from csv
function Make_GEST_df(){
    let data1 = [
        ["G1","Dry to moderately moist grassland","(2~), 2+, 2- ",NaN,NaN,NaN,NaN,"2+","2-",-0.01,24,31.44,16,31.5,8.574245455],
        ["G2","Moist grassland","3+, 3+/2+",NaN,NaN,NaN,"3+","2+",NaN,0.01,48,19.37,38,19.5,5.283027273],
        ["G3","Moist to very moist grassland","4+/3+",NaN,NaN,NaN,"3+",NaN,NaN,0.03,3,13.46,4,13.5,3.671809091],
        ["G3f","Periodically flooded grasslands","4~, 3~",NaN,NaN,"4+","3+","2+",NaN,-0.05,3,13.46,NaN,13,3.669409091],
        ["G3s","Moist to very moist grassland with shunt species","4+/3+, 3~, (3+, 3+/2+)",NaN,NaN,NaN,"3+","2+",NaN,0.75,7,13.46,NaN,14,3.693409091],
        ["G3m","Moist to very moist acidic Molinia meadows","4+/3+",NaN,NaN,NaN,"3+",NaN,NaN,4.85,6,6.45,NaN,11.5,1.904590909],
        ["G4","Very moist grassland","4+, 4~",NaN,NaN,"4+","3+",NaN,NaN,0.39,7,6.45,3,7,1.770790909],
        ["G4s","Very moist grassland with shunt species","4+",NaN,NaN,"4+",NaN,NaN,NaN,2.1,4,6.45,NaN,8.5,1.822090909],
        ["G5","Wet grassland","5+/4+",NaN,NaN,"4+",NaN,NaN,NaN,0.05,3,-3.89,5,-4,-1.059409091],
        ["G5s","Wet grassland with shunt species","5+, 5+/4+, (4~)",NaN,"5+","4+","3+",NaN,NaN,2.93,4,-3.89,NaN,-1,-0.973009091],
        ["A1","Dry to moderately moist arable land","2+, 2-",NaN,NaN,NaN,NaN,"2+","2-",0.08,11,41.69,10,42,11.3724],
        ["A2","Moist arable land","3+, 3+/2+",NaN,NaN,NaN,"3+","2+",NaN,0.17,6,23.44,4,23.5,6.397827273],
        ["U1","Moist bare peat","3~, 3+",NaN,NaN,NaN,"3+","2+",NaN,0.03,2,8.99,2,9,2.452718182],
        ["U2","Moist bog heath","3+",NaN,NaN,NaN,"3+",NaN,NaN,0.25,10,12.33,5,12.5,3.370227273],
        ["U3","Moist Reeds","3+, (3~)",NaN,NaN,NaN,"3+","2+",NaN,0.04,1,2.77,2,3,0.756654545],
        ["U6","Very moist bog heath","(5+/4+), 4+",NaN,NaN,"4+",NaN,NaN,NaN,0.92,6,4.67,5,5.5,1.301236364],
        ["U7","Very moist forbs and sedges","(5+/4+), 4+, (4+/3+)",NaN,NaN,"4+","3+",NaN,NaN,0.25,5,12.56,6,13,3.432954545],
        ["U8","Very moist Sphagnum lawn","(5+/4+), 4+",NaN,NaN,"4+",NaN,NaN,NaN,1.5,12,-4.3,11,-3,-1.127727273],
        ["U9","Very moist tall sedges","(5+/4+), 4~, 4+, (4+/3+)",NaN,NaN,"4+","3+",NaN,NaN,1.6,12,10.72,4,12.5,2.971636364],
        ["U10","Wet bare peat","5+/4+",NaN,NaN,"4+",NaN,NaN,NaN,0.22,3,1.34,3,1.5,0.372054545],
        ["U11","Wet meadows and forbs","5+",NaN,"5+",NaN,NaN,NaN,NaN,7.35,2,-3.89,NaN,3.5,-0.840409091],
        ["U12","Wet small sedges with mosses","5+ (4+)",NaN,"5+","4+",NaN,NaN,NaN,4.72,23,-1.99,15,2.5,-0.401127273],
        ["U13","Wet sphagnum lawn","5+, (5+/4+)",NaN,"5+","4+",NaN,NaN,NaN,5.25,6,-3.02,6,2,-0.666136364],
        ["U14","Wet tall reeds","(5~), 5+, (5+/4+)",NaN,"5+","4+",NaN,NaN,NaN,6.47,10,0.21,2,6.5,0.251372727],
        ["U15","Wet tall sedges","5~, 5+, (5+/4+)",NaN,"5+","4+",NaN,NaN,NaN,9.49,3,1.03,2,10.5,0.565609091],
        ["U16","Wet bog heath","6+/5+, 5+, (5+/4+)",NaN,"5+","4+",NaN,NaN,NaN,17.8,1,-0.01,7,18,0.531272727],
        ["U17","Very wet tall sedges and Typha","6+, 6+/5+","6+","5+",NaN,NaN,NaN,NaN,6.81,8,-1.08,8,5.5,-0.090245455],
        ["U18","Very wet Phragmites reeds","6+, (6+/5+, 5~)","6+","5+","4+",NaN,NaN,NaN,12.44,12,-12.38,8,0,-3.003163636],
        ["U19","Wet to very wet Sphagnum hollows","6+, (5+)","6+","5+",NaN,NaN,NaN,NaN,11.81,8,-4.58,8,7,-0.894790909],
        ["U20","Flooded tall reeds (> 20 cm above surface)","6+","6+",NaN,NaN,NaN,NaN,NaN,28.29,30,-32.74,6,-4.5,-8.080390909],
        ["S1","Dry to moderately moist grassland on peaty soils (Anmoor)","2-, 2+/2-, 2+",NaN,NaN,NaN,NaN,"2+","2-",-0.05,9,46.09,14,46,12.5685],
        ["S2","Dry to moderately moist arable land on peaty soils(Anmoor)","2+, 2-",NaN,NaN,NaN,NaN,"2+","2-",0.07,8,35.11,12,35,9.577554545],
        ["S3","Cropland (2+) flooded in summer (wet year)","3+",NaN,NaN,NaN,"3+",NaN,NaN,10.29,1,22.61,1,33,6.475063636],
        ["S4","Grassland (2+/3+) flooded in summer (wet year)","(5+), 5+/4+, (4+)",NaN,"5+","4+",NaN,NaN,NaN,26.02,7,-0.13,6,26,0.745145455],
        ["S5","Simulated harvest (Paludiculture)","(5+), 5+/4+",NaN,"5+","4+",NaN,NaN,NaN,3.08,3,11.46,3,14.5,3.217854545],
        ["S6","Wet tall reeds (dry year)","(5+/4+), 4~, 4+",NaN,NaN,"4+","3+",NaN,NaN,0.79,7,10.72,NaN,11.5,2.947336364],
        ["S7","Sphagnum lawn at former peat cut areas","5+, 5+/4+",NaN,"5+","4+",NaN,NaN,NaN,37.27,3,2.83,2,40,1.889918182],
        ["S8","Very wet reeds with lateral import of organic matter","6+, 6+/5+, (5~, 5+)","6+","5+","4+",NaN,NaN,NaN,42.27,18,2.39,18,44.5,1.919918182],
        ["S9","Ditches in low intensity grassland","6+","6+",NaN,NaN,NaN,NaN,NaN,3.17,3,"+/- 0",NaN,3,0.0951]
    ];
    let cols1 = ["Name","GEST","Soil Moisture Classes","smcd_6","smcd_5","smcd_4","smcd_3","smcd_2","smcd_l2","CH4_GWP","CH4_n","CO2_GWP","CO2_n","Total C-flux (GWP)","Total C-flux (ton C/ha)"];
    let df = new DataFrame(data1, {columns: cols1});
    return df;
}

////////////////////////////////////////////////
//// CREATE GEST DF ////////////////////////////
////////////////////////////////////////////////
let gest = Make_GEST_df();

////////////////////////////////////////////////
//// POPULATE GEST DROPDOWNS //////////////////////////
////////////////////////////////////////////////
$("#bs_veg_class option").remove();
let bs_el = document.getElementById("bs_veg_class");
let bs_gwl = parseFloat(document.getElementById("bs_med_gw_level_summer").value);
let bs_veg_num = Calc_Soil_Moisture_Classes(bs_gwl);
let vg_class_dct = {
    "6+": "smcd_6",
    "5+": "smcd_5",
    "4+": "smcd_4",
    "3+": "smcd_3",
    "2+": "smcd_2",
    "2-": "smcd_l2"
};
for(let i =0; i< gest.index.length; i++){
    if(gest.at(i, vg_class_dct[bs_veg_num]) == bs_veg_num){
        let bs_opt = document.createElement('option');
        bs_opt.value = gest.at(i,'Name');
        bs_opt.innerHTML = gest.at(i,'Name') + ": " + gest.at(i,'GEST');
        bs_el.appendChild(bs_opt);
    }
}
$("#rw_veg_class option").remove();
let rw_el = document.getElementById("rw_veg_class");
let rw_gwl = parseFloat(document.getElementById("rw_med_gw_level_summer").value);
let rw_veg_num = Calc_Soil_Moisture_Classes(rw_gwl);
for(let i =0; i< gest.index.length; i++){
    if(gest.at(i, vg_class_dct[rw_veg_num]) == rw_veg_num){
        let rw_opt = document.createElement('option');
        rw_opt.value = gest.at(i,'Name');
        rw_opt.innerHTML = gest.at(i,'Name') + ": " + gest.at(i,'GEST');
        rw_el.appendChild(rw_opt);
    }
}

////////////////////////////////////////////////
//// CREATE GWP GRAPH //////////////////////////
////////////////////////////////////////////////
const ctx = document.getElementById('gwp_graph');
let base_CH4 = parseFloat(document.getElementById("base_CH4").innerHTML);
let base_CO2 = parseFloat(document.getElementById("base_CO2").innerHTML);
let base_N2O_dir = parseFloat(document.getElementById("base_n2o_direct").innerHTML);
let base_N2O_ind = parseFloat(document.getElementById("base_n2o_indirect").innerHTML);
let base_activity = parseFloat(document.getElementById("base_activity_gwp_subtotal").innerHTML);
let rewet_CH4 = parseFloat(document.getElementById("rewet_CH4").innerHTML);
let rewet_CO2 = parseFloat(document.getElementById("rewet_CO2").innerHTML);
let rewet_N2O_dir = parseFloat(document.getElementById("rewet_n2o_direct").innerHTML);
let rewet_N2O_ind = parseFloat(document.getElementById("rewet_n2o_indirect").innerHTML);
let rewet_product = parseFloat(document.getElementById("rewet_product_gwp_subtotal").innerHTML);
let rewet_activity = parseFloat(document.getElementById("rewet_activity_gwp_subtotal").innerHTML);
const labels = ["Base Scenario", "After Rewetting"];
const data = {
labels: labels,
datasets: [
    {
    label: 'CH4',
    data: [base_CH4, rewet_CH4],
    backgroundColor: '#11833E',
    },
    {
    label: 'CO2',
    data: [base_CO2, rewet_CO2],
    backgroundColor: "#80CE77",
    },
    {
    label: 'N2O Direct',
    data: [base_N2O_dir, rewet_N2O_dir],
    backgroundColor: "#B39A3F",
    },
    {
    label: 'N2O Indirect',
    data: [base_N2O_ind, rewet_N2O_ind],
    backgroundColor: "#E4D08B",
    },
    {
    label: 'Products',
    data: [0, rewet_product],
    backgroundColor: "#4EECEF",
    },
    {
    label: 'Activity',
    data: [base_activity, rewet_activity],
    backgroundColor: "#B9B9B8",
    }
    ]
};
const config = {
    type: 'bar',
    data: data,
    options: {
        plugins: {
        title: {
            display: true,
            text: 'GWP Outcomes'
        },
        },
        responsive: true,
        scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
            title: {
                display: true,
                text: '(CO2-eq/year)'
            }
        }
        }
    }
    };
let gwp_chart = new Chart(ctx, config);
////////////////////////////////////////////////

///////////////////////////////////////////////
////////// CREATE TIMELINE GRAPH //////////////
///////////////////////////////////////////////
// title : Emissions Scenario
// y-axis: GHG emission (t CO2-eq /yr)
// x axis: years
// Datasets: Baseline, Rewetting, carbon savings total, ccredits sitename

///////////////////////////////////////////////

function Parse_SET_Input(){
    // reads inputs from form fields
    let inputs = {
        'gen_site_data': 
            {'site_name': document.getElementById("site_name").value,
            'tot_area': parseFloat(document.getElementById("tot_area").value), 
            'coords': document.getElementById("coords").value, 
            'elevation': parseFloat(document.getElementById("elevation").value), 
            'peat_type': document.getElementById("peat_type").value,
            'peat_thick': parseFloat(document.getElementById("peat_thick").value),
            'year_start': parseFloat(document.getElementById("year_start").value)
        }, 
        'base': 
            {'med_gw_level_summer': parseFloat(document.getElementById("bs_med_gw_level_summer").value),
            'veg_class': document.getElementById("bs_veg_class").value,
            'amount_manure': parseFloat(document.getElementById("bs_amount_manure").value),
            'amount_org_fert': parseFloat(document.getElementById("bs_amount_org_fert").value),
            'type_synth_fert': document.getElementById("bs_type_synth_fert").value,
            'amount_synth_fert': parseFloat(document.getElementById("bs_amount_synth_fert").value),
            'type_animals': document.getElementById("bs_type_animals").value,
            'avg_num_animals': parseFloat(document.getElementById("bs_avg_num_animals").value),
            'avg_num_days': parseFloat(document.getElementById("bs_avg_num_days").value),
            'crop_yield': parseFloat(document.getElementById("bs_crop_yield").value),
            'crop_resid': document.getElementById("bs_crop_resid").checked,
            'crop_name': document.getElementById("bs_crop_name").value,
            'diesel_per_site': parseFloat(document.getElementById("bs_diesel_per_site").value),
            'elec_per_site': parseFloat(document.getElementById("bs_elec_per_site").value)
        },
        'rewet': 
            {'med_gw_level_summer': parseFloat(document.getElementById("rw_med_gw_level_summer").value),
            'veg_class': document.getElementById("rw_veg_class").value,
            'amount_manure': parseFloat(document.getElementById("rw_amount_manure").value),
            'amount_org_fert': parseFloat(document.getElementById("rw_amount_org_fert").value),
            'type_synth_fert': document.getElementById("rw_type_synth_fert").value,
            'amount_synth_fert': parseFloat(document.getElementById("rw_amount_synth_fert").value),
            'type_animals': document.getElementById("rw_type_animals").value,
            'avg_num_animals': parseFloat(document.getElementById("rw_avg_num_animals").value),
            'avg_num_days': parseFloat(document.getElementById("rw_avg_num_days").value),
            'crop_yield': parseFloat(document.getElementById("rw_crop_yield").value),
            'crop_resid': document.getElementById("rw_crop_resid").checked,
            'crop_name': document.getElementById("rw_crop_name").value,
            'diesel_per_site': parseFloat(document.getElementById("rw_diesel_per_site").value),
            'elec_per_site': parseFloat(document.getElementById("rw_elec_per_site").value),
            'crop_use': document.getElementById("rw_crop_use").value
        }
        };
    
    if(inputs["base"]["veg_class"] == ""){
        bs_set_veg_select();
        inputs["base"]["veg_class"] = document.getElementById("bs_veg_class").value;
    }

    if(inputs["rewet"]["veg_class"] == ""){
        rw_set_veg_select();
        inputs["rewet"]["veg_class"] = document.getElementById("rw_veg_class").value;
    }

    return inputs;
}

function confirm_set_inputs(inputs){
    // validity checking
    if(!isNaN(inputs["gen_site_data"]["tot_area"])
        && !isNaN(inputs["base"]["med_gw_level_summer"])
        && !isNaN(inputs["rewet"]["med_gw_level_summer"])
        && inputs["base"]["veg_class"] != ""
        && inputs["rewet"]["veg_class"] != "")
        {return true;
    }else{
        return false;
    }
}

function Create_Data_Tab(user_input, gest){
    // creates the data tab, as seen in the original SET excel file

    //Initiate the Data dict
    let data = {'base': {}, 'rewet': {}};

    //Start populating the data dict with simple data
    data['base']['veg_class'] = user_input['base']['veg_class'];
    data['base']['type_animals'] = user_input['base']['type_animals'];
    data['base']['type_synth_fert'] = user_input['base']['type_synth_fert'];

    data['rewet']['veg_class'] = user_input['rewet']['veg_class'];
    data['rewet']['type_animals'] = user_input['rewet']['type_animals'];
    data['rewet']['type_synth_fert'] = user_input['rewet']['type_synth_fert'];

    //Calculate the Animal Emission Factor and Nitrogen Excretion per head per year
    if(data['base']['type_animals'] == 'No Animals'){
        data['base']['animal_ef'] = 0;
        data['base']['n_excretion'] = 0;
    }else if(data['base']['type_animals'] == 'Dairy Cattle'){
        data['base']['animal_ef'] = 0.02;
        data['base']['n_excretion'] = 130.1;
    }else if(data['base']['type_animals'] == 'Beef Cattle'){
        data['base']['animal_ef'] = 0.02;
        data['base']['n_excretion'] = 28.2;
    }else if(data['base']['type_animals'] == 'Sheep'){
        data['base']['animal_ef'] = 0.01;
        data['base']['n_excretion'] = 9.9;
    }else if(data['base']['type_animals'] == 'Goats'){
        data['base']['animal_ef'] = 0.01;
        data['base']['n_excretion'] = 7.4;
    }else if(data['base']['type_animals'] == 'Water Buffalo'){
        data['base']['animal_ef'] = 0.02;
        data['base']['n_excretion'] = 76.5;
    }

    if(data['rewet']['type_animals'] == data['base']['type_animals']){
        data['rewet']['animal_ef'] = data['base']['animal_ef'];
        data['rewet']['n_excretion'] = data['base']['n_excretion'];
    }else{
        data['rewet']['animal_ef'] = 0;
        data['rewet']['n_excretion'] = 0;
    }

    //Calculate Synthetic Fertilizer emission factor
    if(data['base']['type_synth_fert'] == 'Nitrate Based'){
        data['base']['fert_ef'] = 0.02;
    }else if(data['base']['type_synth_fert'] == 'Ammonium Based'){
        data['base']['fert_ef'] = 0.01;
    }else{
        //////////// IS THIS TRUE
        data['base']['fert_ef'] = 0;
    }
    if(data['rewet']['type_synth_fert'] == 'Nitrate Based'){
        data['rewet']['fert_ef'] = 0.02;
    }else if(data['rewet']['type_synth_fert'] == 'Ammonium Based'){
        data['rewet']['fert_ef'] = 0.01;
    }else{
        //////////// IS THIS TRUE
        data['rewet']['fert_ef'] = 0;
    }

    //Find Crop Residues number
    if(user_input['base']['crop_resid']){
        data['base']['crop_resid'] = 1;
    }else{
        data['base']['crop_resid'] = 2;
    }

    if(user_input['rewet']['crop_resid']){
        data['rewet']['crop_resid'] = 1;
    }else{
        data['rewet']['crop_resid'] = 2;
    }

    //Find Number of crop Name
    if(user_input['base']['crop_name'] == 'Cattail (Typha Sp.)'){
        data['base']['crop_name'] = 1;
    }else if(user_input['base']['crop_name'] == 'Reed (Phragmites Australis)'){
        data['base']['crop_name'] = 2;
    }else if(user_input['base']['crop_name'] == 'Peat Moss (Sphagnum Sp.) '){
        data['base']['crop_name'] = 3;
    }else if(user_input['base']['crop_name'] == 'Grasses like Reed Canary Grass'){
        data['base']['crop_name'] = 4;
    }else if(user_input['base']['crop_name'] == 'Alder (Alnus Sp.)'){
        data['base']['crop_name'] = 5;
    }else if(user_input['base']['crop_name'] == 'Other'){
        data['base']['crop_name'] = 6;
    }else{
        data['base']['crop_name'] = 0;
    }

    if(user_input['rewet']['crop_name'] == 'Cattail (Typha Sp.)'){
        data['rewet']['crop_name'] = 1;
    }else if(user_input['rewet']['crop_name'] == 'Reed (Phragmites Australis)'){
        data['rewet']['crop_name'] = 2;
    }else if(user_input['rewet']['crop_name'] == 'Peat Moss (Sphagnum Sp.) '){
        data['rewet']['crop_name'] = 3;
    }else if(user_input['rewet']['crop_name'] == 'Grasses like Reed Canary Grass'){
        data['rewet']['crop_name'] = 4;
    }else if(user_input['rewet']['crop_name'] == 'Alder (Alnus Sp.)'){
        data['rewet']['crop_name'] = 5;
    }else if(user_input['rewet']['crop_name'] == 'Other'){
        data['rewet']['crop_name'] = 6;
    }else{
        data['rewet']['crop_name'] = 0;
    }

    //Find Product Use Number
    if(user_input['rewet']['crop_use'] == 'Building Materials e.g insulation, taching, timber'){
        data['rewet']['crop_use'] = 1;
    }else if(user_input['rewet']['crop_use'] == 'Bedding Material'){
        data['rewet']['crop_use'] = 2;
    }else if(user_input['rewet']['crop_use'] == 'Food Application'){
        data['rewet']['crop_use'] = 3;
    }else if(user_input['rewet']['crop_use'] == 'Fodder/Feed Application'){
        data['rewet']['crop_use'] = 4;
    }else if(user_input['rewet']['crop_use'] == 'Energy Use: biogas, combustion, wood etc'){
        data['rewet']['crop_use'] = 5;
    }else if(user_input['rewet']['crop_use'] == 'Paper'){
        data['rewet']['crop_use'] = 6;
    }else if(user_input['rewet']['crop_use'] == 'Extraction of Ingredients/Building Blocks: proteins, fibres, cellulose etc'){
        data['rewet']['crop_use'] = 7;
    }else if(user_input['rewet']['crop_use'] == 'High Quality Substrate in Horticulture'){
        data['rewet']['crop_use'] = 8;
    }else if(user_input['rewet']['crop_use'] == 'Other Uses/Unknown'){
        data['rewet']['crop_use'] = 9;
    }else{
        data['rewet']['crop_use'] = 0;
    }

    //Perform Vegetation Class emission calculations
    let veg_num_base = data['base']['veg_class'];
    let veg_num_rewet = data['rewet']['veg_class'];
    
    for(let i =0; i< gest.index.length; i++){
        if(veg_num_base == gest.at(i,'Name')){
            data['base']['veg_ch4_gwp'] = gest.at(i,'CH4_GWP');
            data['base']['veg_c02_gwp'] = gest.at(i,'CO2_GWP');
            data['base']['veg_cflux_gwp'] = gest.at(i,'Total C-flux (GWP)');
        }
        if(veg_num_rewet == gest.at(i,'Name')){
            data['rewet']['veg_ch4_gwp'] = gest.at(i,'CH4_GWP');
            data['rewet']['veg_c02_gwp'] = gest.at(i,'CO2_GWP');
            data['rewet']['veg_cflux_gwp'] = gest.at(i,'Total C-flux (GWP)');
        }
    }
    return data;
}

function Create_crop_Use_Tab(user_input, data){
    // creates the crop use tab, as seen in the original SET excel file
    
    //Initialize crop_use dictionary
    let crop_use = {};

    //Populate the crop_use dictionary
    crop_use['crop_yield'] = user_input['rewet']['crop_yield'];

    if(data['rewet']['crop_use'] == 2 || data['rewet']['crop_use'] == 3 || data['rewet']['crop_use'] == 4 || data['rewet']['crop_use'] == 9){
        crop_use['product_weight'] = 0;
    }else{
        crop_use['product_weight'] = crop_use['crop_yield'];
    }
    crop_use['carbon_weight'] = crop_use['product_weight']*0.475;
    crop_use['ton_co2'] = crop_use['carbon_weight']*(44/12);
    crop_use['ton_co2_per_ha'] = crop_use['ton_co2']*(-1);
    crop_use['ton_co2_per_site'] = crop_use['ton_co2_per_ha']*user_input['gen_site_data']['tot_area'];

    return crop_use;
}

function Create_C_Content_Soil_Tab(user_input){
    // creates the c content soil tab, as seen in the original SET excel file

    //Initialize the C Content Soil dictionary
    let c_content = {};

    //Populate C Content dictionary
    c_content['peat_type'] = user_input['gen_site_data']['peat_type'];

    if(c_content['peat_type'] == 'Sphagnum'){
        c_content['c_content_per_cm_thick'] = 0.3496;
    }else if(c_content['peat_type'] == 'Herbaceous'){
        c_content['c_content_per_cm_thick'] = 0.5959;
    }else if(c_content['peat_type'] == 'Woody'){
        c_content['c_content_per_cm_thick'] = 0.54972;
    }else if(c_content['peat_type'] == 'Brown moss'){
        c_content['c_content_per_cm_thick'] = 0.84783;
    }else if(c_content['peat_type'] == 'Unknown'){
        c_content['c_content_per_cm_thick'] = 0.55224;
    }else if(c_content['peat_type'] == 'Humidified'){
        c_content['c_content_per_cm_thick'] = 0.91008;
    }else{
        c_content['c_content_per_cm_thick'] = 0.55224;
    }
    c_content['peat_thick'] = user_input['gen_site_data']['peat_thick'];
    c_content['c_stock_ton_per_ha'] = c_content['peat_thick']*c_content['c_content_per_cm_thick']*10;
    c_content['c_stock_tco2_per_ha'] = c_content['c_stock_ton_per_ha']*(44/12);

    return c_content;
}

function Create_Soil_Moisture_Classes_Tab(user_input){
    // creates the soil moisture classes tab, as seen in the original SET excel file

    //Initialize the Soil Moisture Classes dictionary
    let sm_classes = {'base': {}, 'rewet': {}};

    //Populate dictionary
    if(user_input['base']['med_gw_level_summer'] >= 0 && user_input['base']['med_gw_level_summer'] <= 140){
        sm_classes['base']['summer_moist_class_num'] = '6+';
        sm_classes['base']['summer_moist_class_name'] = 'Flooded (lower eulittoral)';
        sm_classes['base']['summer_moist_class'] = '6+ (Flooded (lower eulittoral))';
    }else if(user_input['base']['med_gw_level_summer'] >= -10 && user_input['base']['med_gw_level_summer'] < 0){
        sm_classes['base']['summer_moist_class_num'] = '5+';
        sm_classes['base']['summer_moist_class_name'] = 'Wet (upper eulittoral)';
        sm_classes['base']['summer_moist_class'] = '5+ (Wet (upper eulittoral))';
    }else if(user_input['base']['med_gw_level_summer'] >= -20 && user_input['base']['med_gw_level_summer'] < -10){
        sm_classes['base']['summer_moist_class_num'] = '4+';
        sm_classes['base']['summer_moist_class_name'] = 'Semi wet (very moist)';
        sm_classes['base']['summer_moist_class'] = '4+ (Semi wet (very moist))';
    }else if(user_input['base']['med_gw_level_summer'] >= -45 && user_input['base']['med_gw_level_summer'] < -20){
        sm_classes['base']['summer_moist_class_num'] = '3+';
        sm_classes['base']['summer_moist_class_name'] = 'Moist';
        sm_classes['base']['summer_moist_class'] = '3+ (Moist)';
    }else if(user_input['base']['med_gw_level_summer'] >= -85 && user_input['base']['med_gw_level_summer'] < -45){
        sm_classes['base']['summer_moist_class_num'] = '2+';
        sm_classes['base']['summer_moist_class_name'] = 'Moderate moist';
        sm_classes['base']['summer_moist_class'] = '2+ (Moderate moist)';
    }else if(user_input['base']['med_gw_level_summer'] < -85){
        sm_classes['base']['summer_moist_class_num'] = '2-';
        sm_classes['base']['summer_moist_class_name'] = 'Moderate dry';
        sm_classes['base']['summer_moist_class'] = '2- (Moderate dry)';
    }
    if(user_input['rewet']['med_gw_level_summer'] >= 0 && user_input['rewet']['med_gw_level_summer'] <= 140){
        sm_classes['rewet']['summer_moist_class_num'] = '6+';
        sm_classes['rewet']['summer_moist_class_name'] = 'Flooded (lower eulittoral)';
        sm_classes['rewet']['summer_moist_class'] = '6+ (Flooded (lower eulittoral))';
    }else if(user_input['rewet']['med_gw_level_summer'] >= -10 && user_input['rewet']['med_gw_level_summer'] < 0){
        sm_classes['rewet']['summer_moist_class_num'] = '5+';
        sm_classes['rewet']['summer_moist_class_name'] = 'Wet (upper eulittoral)';
        sm_classes['rewet']['summer_moist_class'] = '5+ (Wet (upper eulittoral))';
    }else if(user_input['rewet']['med_gw_level_summer'] >= -20 && user_input['rewet']['med_gw_level_summer'] < -10){
        sm_classes['rewet']['summer_moist_class_num'] = '4+';
        sm_classes['rewet']['summer_moist_class_name'] = 'Semi wet (very moist)';
        sm_classes['rewet']['summer_moist_class'] = '4+ (Semi wet (very moist))';
    }else if(user_input['rewet']['med_gw_level_summer'] >= -45 && user_input['rewet']['med_gw_level_summer'] < -20){
        sm_classes['rewet']['summer_moist_class_num'] = '3+';
        sm_classes['rewet']['summer_moist_class_name'] = 'Moist';
        sm_classes['rewet']['summer_moist_class'] = '3+ (Moist)';
    }else if(user_input['rewet']['med_gw_level_summer'] >= -85 && user_input['rewet']['med_gw_level_summer'] < -45){
        sm_classes['rewet']['summer_moist_class_num'] = '2+';
        sm_classes['rewet']['summer_moist_class_name'] = 'Moderate moist';
        sm_classes['rewet']['summer_moist_class'] = '2+ (Moderate moist)';
    }else if(user_input['rewet']['med_gw_level_summer'] < -85){
        sm_classes['rewet']['summer_moist_class_num'] = '2-';
        sm_classes['rewet']['summer_moist_class_name'] = 'Moderate dry';
        sm_classes['rewet']['summer_moist_class'] = '2- (Moderate dry)';
    }

    return sm_classes;
}
////////////////////////////////////////////////////
// Functions corresponding to calculations used in the N2O fertilizer tab

//Direct N2O emissions

function Manure_CO2Site_Base(manure_applied_base, tot_area){
    let EF=0.02;
    let N2O_CO2eq=265;
    let N2O_N=EF*manure_applied_base;
    let N2O_ha= N2O_N*(44/28);
    let N2O_site=N2O_ha*tot_area;
    let CO2_site_manure_base=N2O_site*N2O_CO2eq;

    return CO2_site_manure_base;
}

function Organic_Fert_CO2Site_Base(organic_applied_base,tot_area){
    let EF=0.02;
    let N2O_CO2eq=265;
    let N2O_N=EF*organic_applied_base;
    let N2O_ha= N2O_N*(44/28);
    let N2O_site=N2O_ha*tot_area;
    let CO2_site_organic_base=N2O_site*N2O_CO2eq;

    return CO2_site_organic_base;
}

function Grazing_CO2Site_Base(avg_n_animals_base, avg_days_base, n_excretion_value_b, EF_animal_b, tot_area){
    let N2O_CO2eq=265;
    let N_amount_base=(n_excretion_value_b*avg_n_animals_base*(avg_days_base/365)) / tot_area;
    let N2O_N=EF_animal_b*N_amount_base;
    let N2O_ha= N2O_N*(44/28);
    let N2O_site=N2O_ha*tot_area;
    let CO2_site_grazing_base=N2O_site*N2O_CO2eq;

    return [CO2_site_grazing_base, N_amount_base];
}

//////////////////// returning 2 objects

function Synth_CO2Site_Base(fert_applied_base, EF_fert_b, tot_area){
    let N2O_CO2eq=265;
    let N2O_N=EF_fert_b*fert_applied_base;
    let N2O_ha= N2O_N*(44/28);
    let N2O_site=N2O_ha*tot_area;
    let CO2_site_synth_fert_base=N2O_site*N2O_CO2eq;

    return CO2_site_synth_fert_base;
}

function Residue_Left_Input_Base(answer_b, crop_b){
    // List of all crop names
    let crops = ["Cattail (Typha Sp.)", "Reed (Phragmites Australis)", "Peat Moss (Sphagnum Sp.)", "Grasses like Reed Canary Grass", "Alder (Alnus Sp.)", "Other" ];
    let cropresidue_fraction_tot_yield_b = 0;

    if(answer_b && crops.includes(crop_b)){
        if(crop_b == "Cattail (Typha Sp.)"){
            cropresidue_fraction_tot_yield_b = 0.11627907;
        }else if(crop_b == "Reed (Phragmites Australis)"){
            cropresidue_fraction_tot_yield_b = 0.046511628;
        }else{
            cropresidue_fraction_tot_yield_b = 0.0;
        }
    }else{
        cropresidue_fraction_tot_yield_b = 0.0;
    }
    return cropresidue_fraction_tot_yield_b;
}

function crop_Residue_Base(cropresidue_fraction_tot_yield_b, crop_yield_base, tot_area){
    let nitrogen_content=0.015;
    let EF=0.02;
    let N2O_CO2eq=265;
    let amount_applied=cropresidue_fraction_tot_yield_b*crop_yield_base*1000*nitrogen_content;
    let N2O_N=EF*amount_applied;
    let N2O_ha= N2O_N*(44/28);
    let N2O_site=N2O_ha*tot_area;
    let CO2_site_cropres_base=N2O_site*N2O_CO2eq;

    return CO2_site_cropres_base;
}

function Basis_value_managed_soils(tot_area){
    let N2O_CO2eq=265;
    //Not sure why this value is 8
    let N2O_ha=8;
    let N2O_site=N2O_ha*tot_area;
    let CO2_site_managed_soil=N2O_site*N2O_CO2eq;

    return CO2_site_managed_soil;
}

function Total_Direct_N2Oemissions_Base(CO2_site_managed_soil, CO2_site_cropres_base, CO2_site_synth_fert_base, CO2_site_grazing_base, CO2_site_organic_base, CO2_site_manure_base ){
    let total_direct_N2Oemiss_base= (CO2_site_managed_soil + CO2_site_cropres_base + CO2_site_synth_fert_base + CO2_site_grazing_base + CO2_site_organic_base + CO2_site_manure_base)/1000;
    
    return total_direct_N2Oemiss_base;
}

//Indirect N2O Emissions

function Animal_Ammonia_Base(manure_applied_base, N_amount_base, tot_area, avg_animals, avg_days){
    let EF_ammonia=0.1035;
    let EF_N2O_N=0.01;
    let N2O_CO2eq=265;
    let ammonia_applied= manure_applied_base + ((N_amount_base*avg_animals*(avg_days/365))/tot_area);
    let volatilization_N= ammonia_applied*EF_ammonia;
    let N2O_N=EF_N2O_N*volatilization_N;
    let N2O_ha= N2O_N*(44/28);
    let N2O_site=N2O_ha*tot_area;
    let CO2_site_animal_amm_base=N2O_site*N2O_CO2eq;

    return CO2_site_animal_amm_base;
}

function Fert_Ammonia_Base(fert_applied_base, EF_ammonia_b, tot_area){
    let EF_N2O_N=0.01
    let N2O_CO2eq=265
    let EF=0;

    if(EF_ammonia_b == 0.02){
        EF = 0.015;
    }else{
        EF = 0.1;
    }
    let volatilization_N=fert_applied_base*EF;
    let N2O_N=EF_N2O_N*volatilization_N;
    let N2O_ha= N2O_N*(44/28);
    let N2O_site=N2O_ha*tot_area;
    let CO2_site_fert_amm_base=N2O_site*N2O_CO2eq;

    return CO2_site_fert_amm_base;
}

function N_Oxide_Base(manure_applied_base, fert_applied_base, N_amount_base, avg_animals, avg_days, tot_area){
    let EF_NOxide_ammonia=0.15;
    let EF_N2O_N=0.01;
    let N2O_CO2eq=265;
    let N=manure_applied_base + fert_applied_base + ((N_amount_base*avg_animals*(avg_days/365))/tot_area);
    let volatilization_N= EF_NOxide_ammonia*N;
    let N2O_N=EF_N2O_N*volatilization_N;
    let N2O_ha= N2O_N*(44/28);
    let N2O_site=N2O_ha*tot_area;
    let CO2_site_NOxide_base=N2O_site*N2O_CO2eq;

    return CO2_site_NOxide_base;
}

function Nitrate_Base(manure_applied_base, organic_applied_base, cropresidue_fraction_tot_yield_b, crop_yield, fert_applied_base, tot_area, rewet){
    let EF_nitrate_leaching=0.3;
    let EF_N2O_N_leached=0.025;
    let N2O_CO2eq=265;

    let applied_animal=manure_applied_base + organic_applied_base;
    let applied_remaining = 0;

    if(rewet){
        applied_remaining=organic_applied_base + (cropresidue_fraction_tot_yield_b*1000*crop_yield*0.015);
    }else{
        applied_remaining = organic_applied_base + cropresidue_fraction_tot_yield_b;
    }

    let nitrate_leached= (applied_animal +  fert_applied_base +  applied_remaining) * EF_nitrate_leaching;
    let N2O_N_leached= nitrate_leached * EF_N2O_N_leached;
    let N2O_ha= N2O_N_leached*(44/28);
    let N2O_site=N2O_ha*tot_area;
    let CO2_site_nitrate_base=N2O_site*N2O_CO2eq;

    return CO2_site_nitrate_base;
}

function Total_Indirect_N2Oemissions_Base( CO2_site_nitrate_base, CO2_site_NOxide_base, CO2_site_fert_amm_base, CO2_site_animal_amm_base){
    let tot_indirect_N2Oemiss_base=(CO2_site_nitrate_base + CO2_site_NOxide_base + CO2_site_fert_amm_base + CO2_site_animal_amm_base)/1000;
    
    return tot_indirect_N2Oemiss_base;
}

// end auxiliary functions
/////////////////////////////////////////////////////////

function Create_Outcome_Tab(user_input, data, crop_use, c_content, gest){
    // creates the outcome tab, as seen in the original SET excel file

    //Initialize the Soil Moisture Classes dictionary
    let outcome = {'base': {}, 'rewet': {}, 'creditable_year': {}};

    //Populate the base dictionary
    outcome['base']['veg_ch4_gwp'] = parseFloat(data['base']['veg_ch4_gwp'])*user_input['gen_site_data']['tot_area'];
    outcome['base']['veg_c02_gwp'] = parseFloat(data['base']['veg_c02_gwp'])*user_input['gen_site_data']['tot_area'];

    outcome['base']['tot_direct_n2o'] = Total_Direct_N2Oemissions_Base(Basis_value_managed_soils(user_input['gen_site_data']['tot_area']), 
                                                                            crop_Residue_Base(Residue_Left_Input_Base(user_input['base']['crop_resid'], user_input['base']['crop_name']), user_input['base']['crop_yield'], user_input['gen_site_data']['tot_area']), 
                                                                            Synth_CO2Site_Base(user_input['base']['amount_synth_fert'], data['base']['fert_ef'], user_input['gen_site_data']['tot_area']),
                                                                            Grazing_CO2Site_Base(user_input['base']['avg_num_animals'], user_input['base']['avg_num_days'], data['base']['n_excretion'], data['base']['animal_ef'], user_input['gen_site_data']['tot_area'])[0],
                                                                            Organic_Fert_CO2Site_Base(user_input['base']['amount_org_fert'], user_input['gen_site_data']['tot_area']),
                                                                            Manure_CO2Site_Base(user_input['base']['amount_manure'], user_input['gen_site_data']['tot_area']));

    outcome['base']['tot_indirect_n2o'] = Total_Indirect_N2Oemissions_Base(Nitrate_Base(user_input['base']['amount_manure'], user_input['base']['amount_org_fert'], Residue_Left_Input_Base(user_input['base']['crop_resid'], user_input['base']['crop_name']), user_input['base']['crop_yield'], user_input['base']['amount_synth_fert'], user_input['gen_site_data']['tot_area'], false), 
                                                                                 N_Oxide_Base(user_input['base']['amount_manure'], user_input['base']['amount_synth_fert'], data['base']['n_excretion'], user_input['base']['avg_num_animals'], user_input['base']['avg_num_days'], user_input['gen_site_data']['tot_area']), 
                                                                                 Fert_Ammonia_Base(user_input['base']['amount_synth_fert'], data['base']['fert_ef'], user_input['gen_site_data']['tot_area']), 
                                                                                 Animal_Ammonia_Base(user_input['base']['amount_manure'], data['base']['n_excretion'], user_input['gen_site_data']['tot_area'], user_input['base']['avg_num_animals'], user_input['base']['avg_num_days']));
                                                                             
    outcome['base']['activity'] = ((user_input['base']['diesel_per_site']*3.35)+(user_input['base']['elec_per_site']*0.581))/1000;
    outcome['base']['total'] = [parseFloat(outcome['base']['veg_ch4_gwp']), parseFloat(outcome['base']['veg_c02_gwp']), parseFloat(outcome['base']['tot_direct_n2o']), parseFloat(outcome['base']['tot_indirect_n2o']), parseFloat(outcome['base']['activity'])].reduce((a, b) => a + b, 0);
    
    //Populate the Rewetting dictionary
    outcome['rewet']['veg_ch4_gwp'] = parseFloat(data['rewet']['veg_ch4_gwp'])*user_input['gen_site_data']['tot_area'];
    outcome['rewet']['veg_c02_gwp'] = parseFloat(data['rewet']['veg_c02_gwp'])*user_input['gen_site_data']['tot_area'];

    outcome['rewet']['tot_direct_n2o'] = Total_Direct_N2Oemissions_Base(Basis_value_managed_soils(user_input['gen_site_data']['tot_area']), 
                                                                            crop_Residue_Base(Residue_Left_Input_Base(user_input['rewet']['crop_resid'], user_input['rewet']['crop_name']), user_input['rewet']['crop_yield'], user_input['gen_site_data']['tot_area']), 
                                                                            Synth_CO2Site_Base(user_input['rewet']['amount_synth_fert'], data['rewet']['fert_ef'], user_input['gen_site_data']['tot_area']),
                                                                            Grazing_CO2Site_Base(user_input['rewet']['avg_num_animals'], user_input['rewet']['avg_num_days'], data['rewet']['n_excretion'], data['rewet']['animal_ef'], user_input['gen_site_data']['tot_area'])[0],
                                                                            Organic_Fert_CO2Site_Base(user_input['rewet']['amount_org_fert'], user_input['gen_site_data']['tot_area']),
                                                                            Manure_CO2Site_Base(user_input['rewet']['amount_manure'], user_input['gen_site_data']['tot_area']));

    outcome['rewet']['tot_indirect_n2o'] = Total_Indirect_N2Oemissions_Base(Nitrate_Base(user_input['rewet']['amount_manure'], user_input['rewet']['amount_org_fert'], Residue_Left_Input_Base(user_input['rewet']['crop_resid'], user_input['rewet']['crop_name']), user_input['rewet']['crop_yield'], user_input['rewet']['amount_synth_fert'], user_input['gen_site_data']['tot_area'], true), 
                                                                                 N_Oxide_Base(user_input['rewet']['amount_manure'], user_input['rewet']['amount_synth_fert'], data['base']['n_excretion'], user_input['base']['avg_num_animals'], user_input['base']['avg_num_days'], user_input['gen_site_data']['tot_area']), 
                                                                                 Fert_Ammonia_Base(user_input['rewet']['amount_synth_fert'], data['rewet']['fert_ef'], user_input['gen_site_data']['tot_area']), 
                                                                                 Animal_Ammonia_Base(user_input['rewet']['amount_manure'], data['rewet']['n_excretion'], user_input['gen_site_data']['tot_area'], user_input['rewet']['avg_num_animals'], user_input['rewet']['avg_num_days']));
    
    outcome['rewet']['Product ton_co2_per_site'] = crop_use['ton_co2_per_site'];
    outcome['rewet']['activity'] = ((user_input['rewet']['diesel_per_site']*3.35)+(user_input['rewet']['elec_per_site']*0.581))/1000;
    outcome['rewet']['total'] = [parseFloat(outcome['rewet']['veg_ch4_gwp']), parseFloat(outcome['rewet']['veg_c02_gwp']), parseFloat(outcome['rewet']['tot_direct_n2o']), parseFloat(outcome['rewet']['tot_indirect_n2o']), parseFloat(outcome['rewet']['activity']), parseFloat(outcome['rewet']['Product ton_co2_per_site'])].reduce((a, b) => a + b, 0);

    //Populate creditable_year tab
    let veg_num_base = data['base']['veg_class'];
    let veg_num_rewet = data['rewet']['veg_class'];
    
    for(let i =0; i< gest.index.length; i++){
        if(veg_num_base == gest.at(i,'Name')){
            outcome['creditable_year']['base_scenario'] = parseFloat(c_content['c_stock_ton_per_ha'])/(parseFloat(gest.at(i,'Total C-flux (ton C/ha)')));
        }
        if(veg_num_rewet == gest.at(i,'Name')){
            if(parseFloat(c_content['c_stock_ton_per_ha'])/parseFloat(gest.at(i,'Total C-flux (ton C/ha)')) > 0){
                outcome['creditable_year']['rewet_scenario'] = parseFloat(c_content['c_stock_ton_per_ha'])/parseFloat(gest.at(i,'Total C-flux (ton C/ha)'));
            }else{
                outcome['creditable_year']['rewet_scenario'] = "Infinity";
            }
        }
    }
    return outcome;
}

////////////////
function Create_Timeline_tab(inputs, outcome, c_content, gest){
    /*
    Parameters: user input file address, outcome df, c content df, and gest csv
    Returns: timeline df
    Purpose: Create Timeline tab using information from the user input json, 
    GEST 2.0 csv, and the outcome and C content soil tabs.
    */
    //Open the json file and convert to dict
    //Initialize the Timeline dict
    let timeline = {};
    let list_colnames = ['base_emissions', 'base_GESTv2', 'rewet_emissions', 'rewet_GESTv2', 'carbon_savings_flow', 'carbon_savings_stock', 'carbon_savings_product', 'carbon_savings_total', 'base_GESTnr', 'c_sequestration_base', 'c_stock_soil_base', 'stock_savings_creditable', 'rewet_GESTnr', 'c_sequestration_rewet', 'c_credits_' + inputs['gen_site_data']['site_name']];
    for(let i=0; i < list_colnames.length; i++){
        timeline[list_colnames[i]] = {};
        for(let j=parseInt(inputs.gen_site_data.year_start); j < parseInt(inputs.gen_site_data.year_start)+50; j++){
            timeline[list_colnames[i]][j] = null;
        }
    }
    //Populate dict column by column
    for(let i = parseInt(inputs.gen_site_data.year_start); i<parseInt(inputs.gen_site_data.year_start)+50; i++){
        timeline['base_emissions'][i] = outcome['base']['total'];
        timeline['base_GESTv2'][i] = inputs['base']['veg_class'];
        timeline['rewet_emissions'][i] = outcome['rewet']['total'];
        timeline['rewet_GESTv2'][i] = inputs['rewet']['veg_class'];
        timeline['carbon_savings_flow'][i] = parseFloat(outcome['base']['tot_direct_n2o']) + parseFloat(outcome['base']['tot_indirect_n2o']) + parseFloat(outcome['base']['activity']) - parseFloat(outcome['rewet']['tot_direct_n2o']) - parseFloat(outcome['rewet']['tot_indirect_n2o']) - parseFloat(outcome['rewet']['activity']);
        timeline['carbon_savings_stock'][i] = parseFloat(outcome['base']['veg_ch4_gwp']) + parseFloat(outcome['base']['veg_c02_gwp']) - parseFloat(outcome['rewet']['veg_ch4_gwp']) - parseFloat(outcome['rewet']['veg_c02_gwp']);
        timeline['carbon_savings_product'][i] = (-1)*parseFloat(outcome['rewet']['Product ton_co2_per_site']);
        timeline['carbon_savings_total'][i] = [timeline['carbon_savings_flow'][i], timeline['carbon_savings_stock'][i], timeline['carbon_savings_product'][i]].reduce((a, b) => a + b, 0);
        timeline['base_GESTnr'][i] = timeline['base_GESTv2'][i];
        timeline['rewet_GESTnr'][i] = timeline['rewet_GESTv2'][i];

        for(let j=0; j<gest.index.length; j++){
            if(timeline['base_GESTnr'][i] == gest.at(j,'Name')){
                timeline['c_sequestration_base'][i] = parseFloat(gest.at(j,'Total C-flux (ton C/ha)'))*inputs['gen_site_data']['tot_area']*(-1);
            }
            if(timeline['rewet_GESTnr'][i] == gest.at(j,'Name')){
                timeline['c_sequestration_rewet'][i] = parseFloat(gest.at(j,'Total C-flux (ton C/ha)'))*inputs['gen_site_data']['tot_area']*(-1);
            }
        }
        if(i == parseInt(inputs.gen_site_data.year_start)){
            timeline['c_stock_soil_base'][i] = (c_content['c_stock_ton_per_ha']*inputs['gen_site_data']['tot_area']) + timeline['c_sequestration_base'][i];
        }else{
            timeline['c_stock_soil_base'][i] = timeline['c_stock_soil_base'][i-1] + timeline['c_sequestration_base'][i];
        }
        if(timeline['c_stock_soil_base'][i] > 0){
            timeline['stock_savings_creditable'][i] = 1;
        }else{
            timeline['stock_savings_creditable'][i] = 0;
        }
        if(timeline['stock_savings_creditable'][i] == 1){
            timeline['c_credits_' + inputs['gen_site_data']['site_name']][i] = timeline['carbon_savings_total'][i];
        }else{
            if(timeline['c_sequestration_rewet'][i] > 0){
                timeline['c_credits_' + inputs['gen_site_data']['site_name']][i] = timeline['carbon_savings_flow'][i] + timeline['carbon_savings_product'][i] + (timeline['c_sequestration_rewet'][i]*(44/12));
            }else{
                timeline['c_credits_' + inputs['gen_site_data']['site_name']][i] = timeline['carbon_savings_flow'][i] + timeline['carbon_savings_product'][i];
            }
        }
    }
    //Save the outcome tab in a pandas database
    return timeline;
}
////////////////////////////

function Create_Output_tab(user_input, sm_classes, data_tab, outcome, c_content, crop_use){
    // creates the output tab, as seen in the original SET excel file

    //Initialise Output dict
    let output = {'site_data': {}, 'base_outcomes': {}, 'rewet_outcomes': {}, 'carbon_savings': {}};

    //Populate the site_data section
    output['site_data']['site_name'] = user_input['gen_site_data']['site_name'];
    output['site_data']['coords'] = user_input['gen_site_data']['coords'];
    output['site_data']['tot_area'] = user_input['gen_site_data']['tot_area'];
    output['site_data']['peat_type'] = user_input['gen_site_data']['peat_type'];
    output['site_data']['peat_thick'] = user_input['gen_site_data']['peat_thick'];
    output['site_data']['year_start'] = user_input['gen_site_data']['year_start'];
    output['site_data']['sm_class_base'] = sm_classes['base']['summer_moist_class'];
    output['site_data']['sm_class_rewet'] = sm_classes['rewet']['summer_moist_class'];
    output['site_data']['base_veg_class'] = user_input['base']['veg_class'];
    output['site_data']['rewet_veg_class'] = user_input['rewet']['veg_class'];

    //Populate the base_outcomes section
    output['base_outcomes']['CH4'] = (parseFloat(data_tab['base']['veg_ch4_gwp'])*user_input['gen_site_data']['tot_area']);
    output['base_outcomes']['CO2'] = parseFloat(data_tab['base']['veg_c02_gwp'])*user_input['gen_site_data']['tot_area'];
    output['base_outcomes']['c_emission_gwp_subtotal'] = parseFloat(output['base_outcomes']['CH4']) + parseFloat(output['base_outcomes']['CO2']);

    output['base_outcomes']['n2o_direct'] = outcome['base']['tot_direct_n2o'];
    output['base_outcomes']['n2o_indirect'] = outcome['base']['tot_indirect_n2o'];
    output['base_outcomes']['n2o_emission_gwp_subtotal'] = parseFloat(output['base_outcomes']['n2o_direct']) + parseFloat(output['base_outcomes']['n2o_indirect']);

    output['base_outcomes']['activity_gwp_subtotal'] = outcome['base']['activity'];
    output['base_outcomes']['gwp_total'] = outcome['base']['total'];

    //Populate the rewet_outcomes section
    output['rewet_outcomes']['CH4'] = (parseFloat(data_tab['rewet']['veg_ch4_gwp'])*user_input['gen_site_data']['tot_area']);
    output['rewet_outcomes']['CO2'] = (parseFloat(data_tab['rewet']['veg_c02_gwp'])*user_input['gen_site_data']['tot_area']);
    output['rewet_outcomes']['c_emission_gwp_subtotal'] = parseFloat(output['rewet_outcomes']['CH4']) + parseFloat(output['rewet_outcomes']['CO2']);

    output['rewet_outcomes']['n2o_direct'] = outcome['rewet']['tot_direct_n2o'];
    output['rewet_outcomes']['n2o_indirect'] = outcome['rewet']['tot_indirect_n2o'];
    output['rewet_outcomes']['n2o_emission_gwp_subtotal'] = parseFloat(output['rewet_outcomes']['n2o_direct']) + parseFloat(output['rewet_outcomes']['n2o_indirect']);

    output['rewet_outcomes']['activity_gwp_subtotal'] = outcome['rewet']['activity'];
    output['rewet_outcomes']['product_gwp_subtotal'] = outcome['rewet']['Product ton_co2_per_site'];
    output['rewet_outcomes']['gwp_total'] = outcome['rewet']['total'];

    //Populate carbon_savings section
    output['carbon_savings']['ghg_savings_total_per_year_per_site'] = output['base_outcomes']['gwp_total'] - output['rewet_outcomes']['gwp_total'];
    output['carbon_savings']['ghg_savings_total_per_year_per_ha'] = output['carbon_savings']['ghg_savings_total_per_year_per_site']/output['site_data']['tot_area'];
    output['carbon_savings']['ghg_savings_stock_per_year_per_site'] = parseFloat(outcome['base']['veg_ch4_gwp']) + parseFloat(outcome['base']['veg_c02_gwp']) - parseFloat(outcome['rewet']['veg_ch4_gwp']) - parseFloat(outcome['rewet']['veg_c02_gwp']);
    output['carbon_savings']['ghg_savings_stock_per_year_per_ha'] = output['carbon_savings']['ghg_savings_stock_per_year_per_site']/output['site_data']['tot_area'];
    output['carbon_savings']['ghg_savings_flow_per_year_per_site'] = parseFloat(outcome['base']['tot_direct_n2o']) + parseFloat(outcome['base']['tot_indirect_n2o']) +parseFloat(outcome['base']['activity']) - parseFloat(outcome['rewet']['tot_direct_n2o']) - parseFloat(outcome['rewet']['tot_indirect_n2o']) - parseFloat(outcome['rewet']['activity']);
    output['carbon_savings']['ghg_savings_flow_per_year_per_ha'] = output['carbon_savings']['ghg_savings_flow_per_year_per_site']/output['site_data']['tot_area'];
    output['carbon_savings']['ghg_savings_product_use_per_year_per_site'] = crop_use['ton_co2_per_site']*(-1);
    output['carbon_savings']['ghg_savings_product_use_per_year_per_ha'] = crop_use['ton_co2_per_ha']*(-1);
    
    output['carbon_savings']['carbon_stock_peat_soil_start_year_tco2_per_site'] = c_content['c_stock_tco2_per_ha']*output['site_data']['tot_area'];
    output['carbon_savings']['carbon_stock_peat_soil_start_year_ton_c_per_site'] = c_content['c_stock_ton_per_ha']*output['site_data']['tot_area'];
    output['carbon_savings']['carbon_stock_peat_soil_start_year_tco2_per_ha'] = c_content['c_stock_tco2_per_ha'];
    output['carbon_savings']['carbon_stock_peat_soil_start_year_ton_c_per_ha'] = c_content['c_stock_ton_per_ha'];

    output['carbon_savings']['time_til_peat_is_lost_base_scenario'] = outcome['creditable_year']['base_scenario'];
    output['carbon_savings']['time_til_peat_is_lost_rewet_scenario'] = outcome['creditable_year']['rewet_scenario'];
    
    return output;
}

function update_set_results(results_dict){ 
    // update results
    let base_CH4= document.getElementById("base_CH4");
    let base_CO2= document.getElementById("base_CO2");
    let base_c_emission_gwp_subtotal= document.getElementById("base_c_emission_gwp_subtotal");
    let base_n2o_direct= document.getElementById("base_n2o_direct");
    let base_n2o_indirect= document.getElementById("base_n2o_indirect");
    let base_n2o_emission_gwp_subtotal= document.getElementById("base_n2o_emission_gwp_subtotal");
    let base_activity_gwp_subtotal= document.getElementById("base_activity_gwp_subtotal");
    let base_gwp_total= document.getElementById("base_gwp_total");
    let rewet_CH4= document.getElementById("rewet_CH4");
    let rewet_CO2= document.getElementById("rewet_CO2");
    let rewet_c_emission_gwp_subtotal= document.getElementById("rewet_c_emission_gwp_subtotal");
    let rewet_n2o_direct= document.getElementById("rewet_n2o_direct");
    let rewet_n2o_indirect= document.getElementById("rewet_n2o_indirect");
    let rewet_n2o_emission_gwp_subtotal= document.getElementById("rewet_n2o_emission_gwp_subtotal");
    let rewet_activity_gwp_subtotal= document.getElementById("rewet_activity_gwp_subtotal");
    let rewet_product_gwp_subtotal= document.getElementById("rewet_product_gwp_subtotal");
    let rewet_gwp_total= document.getElementById("rewet_gwp_total");
    let ghg_sav_tot_p_yr_p_site= document.getElementById("ghg_sav_tot_p_yr_p_site");
    let ghg_sav_tot_p_yr_p_ha= document.getElementById("ghg_sav_tot_p_yr_p_ha");
    let ghg_sav_tot_p_yr_p_ha2= document.getElementById("ghg_sav_tot_p_yr_p_ha2");
    let ghg_sav_stock_p_yr_p_site= document.getElementById("ghg_sav_stock_p_yr_p_site");
    let ghg_sav_stock_p_yr_p_ha= document.getElementById("ghg_sav_stock_p_yr_p_ha");
    let ghg_sav_flow_p_yr_p_site= document.getElementById("ghg_sav_flow_p_yr_p_site");
    let ghg_sav_flow_p_yr_p_ha= document.getElementById("ghg_sav_flow_p_yr_p_ha");
    let ghg_sav_pu_p_yr_p_site= document.getElementById("ghg_sav_pu_p_yr_p_site");
    let ghg_sav_pu_p_yr_p_ha= document.getElementById("ghg_sav_pu_p_yr_p_ha");
    let cs_tco2_p_site= document.getElementById("cs_tco2_p_site");
    let cs_ton_c_p_site= document.getElementById("cs_ton_c_p_site");
    let cs_tco2_p_ha= document.getElementById("cs_tco2_p_ha");
    let cs_ton_c_p_ha= document.getElementById("cs_ton_c_p_ha");
    let base_til_peat_loss= document.getElementById("base_til_peat_loss");
    let rewet_til_peat_loss= document.getElementById("rewet_til_peat_loss");

    base_CH4.innerHTML = parseFloat(results_dict["base_outcomes"]["CH4"]).toFixed(2);
    base_CO2.innerHTML = parseFloat(results_dict["base_outcomes"]["CO2"]).toFixed(2);
    base_c_emission_gwp_subtotal.innerHTML = parseFloat(results_dict["base_outcomes"]["c_emission_gwp_subtotal"]).toFixed(2);
    base_n2o_direct.innerHTML = parseFloat(results_dict["base_outcomes"]["n2o_direct"]).toFixed(2);
    base_n2o_indirect.innerHTML = parseFloat(results_dict["base_outcomes"]["n2o_indirect"]).toFixed(2);
    base_n2o_emission_gwp_subtotal.innerHTML = parseFloat(results_dict["base_outcomes"]["n2o_emission_gwp_subtotal"]).toFixed(2);
    base_activity_gwp_subtotal.innerHTML = parseFloat(results_dict["base_outcomes"]["activity_gwp_subtotal"]).toFixed(2);
    base_gwp_total.innerHTML = parseFloat(results_dict["base_outcomes"]["gwp_total"]).toFixed(2);
    rewet_CH4.innerHTML = parseFloat(results_dict["rewet_outcomes"]["CH4"]).toFixed(2);
    rewet_CO2.innerHTML = parseFloat(results_dict["rewet_outcomes"]["CO2"]).toFixed(2);
    rewet_c_emission_gwp_subtotal.innerHTML = parseFloat(results_dict["rewet_outcomes"]["c_emission_gwp_subtotal"]).toFixed(2);
    rewet_n2o_direct.innerHTML = parseFloat(results_dict["rewet_outcomes"]["n2o_direct"]).toFixed(2);
    rewet_n2o_indirect.innerHTML = parseFloat(results_dict["rewet_outcomes"]["n2o_indirect"]).toFixed(2);
    rewet_n2o_emission_gwp_subtotal.innerHTML = parseFloat(results_dict["rewet_outcomes"]["n2o_emission_gwp_subtotal"]).toFixed(2);
    rewet_activity_gwp_subtotal.innerHTML = parseFloat(results_dict["rewet_outcomes"]["activity_gwp_subtotal"]).toFixed(2);
    rewet_product_gwp_subtotal.innerHTML = parseFloat(results_dict["rewet_outcomes"]["product_gwp_subtotal"]).toFixed(2);
    rewet_gwp_total.innerHTML = parseFloat(results_dict["rewet_outcomes"]["gwp_total"]).toFixed(2);
    ghg_sav_tot_p_yr_p_site.innerHTML = parseFloat(results_dict["carbon_savings"]["ghg_savings_total_per_year_per_site"]).toFixed(2);
    ghg_sav_tot_p_yr_p_ha.innerHTML = parseFloat(results_dict["carbon_savings"]["ghg_savings_total_per_year_per_ha"]).toFixed(2);
    ghg_sav_tot_p_yr_p_ha2.innerHTML = parseFloat(results_dict["carbon_savings"]["ghg_savings_total_per_year_per_ha"]).toFixed(2);
    ghg_sav_stock_p_yr_p_site.innerHTML = parseFloat(results_dict["carbon_savings"]["ghg_savings_stock_per_year_per_site"]).toFixed(2);
    ghg_sav_stock_p_yr_p_ha.innerHTML = parseFloat(results_dict["carbon_savings"]["ghg_savings_stock_per_year_per_ha"]).toFixed(2);
    ghg_sav_flow_p_yr_p_site.innerHTML = parseFloat(results_dict["carbon_savings"]["ghg_savings_flow_per_year_per_site"]).toFixed(2);
    ghg_sav_flow_p_yr_p_ha.innerHTML = parseFloat(results_dict["carbon_savings"]["ghg_savings_flow_per_year_per_ha"]).toFixed(2);
    ghg_sav_pu_p_yr_p_site.innerHTML = parseFloat(results_dict["carbon_savings"]["ghg_savings_product_use_per_year_per_site"]).toFixed(2);
    ghg_sav_pu_p_yr_p_ha.innerHTML = parseFloat(results_dict["carbon_savings"]["ghg_savings_product_use_per_year_per_ha"]).toFixed(2);
    cs_tco2_p_site.innerHTML = parseFloat(results_dict["carbon_savings"]["carbon_stock_peat_soil_start_year_tco2_per_site"]).toFixed(2);
    cs_ton_c_p_site.innerHTML = parseFloat(results_dict["carbon_savings"]["carbon_stock_peat_soil_start_year_ton_c_per_site"]).toFixed(2);
    cs_tco2_p_ha.innerHTML = parseFloat(results_dict["carbon_savings"]["carbon_stock_peat_soil_start_year_tco2_per_ha"]).toFixed(2);
    cs_ton_c_p_ha.innerHTML = parseFloat(results_dict["carbon_savings"]["carbon_stock_peat_soil_start_year_ton_c_per_ha"]).toFixed(2);
    
    if(results_dict["carbon_savings"]["time_til_peat_is_lost_base_scenario"] != "Infinity"){
        base_til_peat_loss.innerHTML = parseFloat(results_dict["carbon_savings"]["time_til_peat_is_lost_base_scenario"]).toFixed(2);
    }
    if(results_dict["carbon_savings"]["time_til_peat_is_lost_rewet_scenario"] != "Infinity"){
        rewet_til_peat_loss.innerHTML = parseFloat(results_dict["carbon_savings"]["time_til_peat_is_lost_rewet_scenario"]).toFixed(2);
    }

}

function set_calculation(){
    // run set calculation
    let inputs = Parse_SET_Input();
    let proceed= confirm_set_inputs(inputs);
    if(proceed){
        let data_tab = Create_Data_Tab(inputs, gest);
        let crop_use_tab = Create_crop_Use_Tab(inputs, data_tab);
        let c_content_tab = Create_C_Content_Soil_Tab(inputs);
        let smc_tab = Create_Soil_Moisture_Classes_Tab(inputs);
        let outcome_tab = Create_Outcome_Tab(inputs, data_tab, crop_use_tab, c_content_tab, gest);
        let output_tab = Create_Output_tab(inputs, smc_tab, data_tab, outcome_tab, c_content_tab, crop_use_tab);
        update_set_results(output_tab);
        gwp_chart = update_gwp_chart(gwp_chart, output_tab);
        let timeline = Create_Timeline_tab(inputs, outcome_tab, c_content_tab, gest);
        //time_chart = make_timeline_chart(timeline);
    }
}

function Calc_Soil_Moisture_Classes(gwl){
    // for filtering the GEST types by groundwaterlevel

    //Initialize the Soil Moisture Classes dictionary
    let sm_class_num = "";

    //Populate dictionary
    if(gwl >= 0 && gwl <= 140){
        sm_class_num = '6+';
    }else if(gwl >= -10 && gwl < 0){
        sm_class_num = '5+';
    }else if(gwl >= -20 && gwl < -10){
        sm_class_num = '4+';
    }else if(gwl >= -45 && gwl < -20){
        sm_class_num = '3+';
    }else if(gwl >= -85 && gwl < -45){
        sm_class_num = '2+';
    }else if(gwl < -85){
        sm_class_num = '2-';
    }
    return sm_class_num;
}

function bs_set_veg_select(){
    // for filtering GEST types by groundwaterlevel
    $("#bs_veg_class option").remove();
    let el = document.getElementById("bs_veg_class");
    let gwl = parseFloat(document.getElementById("bs_med_gw_level_summer").value);
    let veg_num = Calc_Soil_Moisture_Classes(gwl);
    //console.log(veg_num);
    let class_dct = {
        "6+": "smcd_6",
        "5+": "smcd_5",
        "4+": "smcd_4",
        "3+": "smcd_3",
        "2+": "smcd_2",
        "2-": "smcd_l2"
    };
    for(let i =0; i< gest.index.length; i++){
        if(gest.at(i, class_dct[veg_num]) == veg_num){
            //console.log(gest.at(i,'Name'));
            let opt = document.createElement('option');
            opt.value = gest.at(i,'Name');
            opt.innerHTML = gest.at(i,'Name') + ": " + gest.at(i,'GEST');
            el.appendChild(opt);
        }
    }
}

function rw_set_veg_select(){
    // for filtering GEST types by groundwaterlevel
    $("#rw_veg_class option").remove();
    let el = document.getElementById("rw_veg_class");
    let gwl = parseFloat(document.getElementById("rw_med_gw_level_summer").value);
    let veg_num = Calc_Soil_Moisture_Classes(gwl);
    //console.log(veg_num);
    let class_dct = {
        "6+": "smcd_6",
        "5+": "smcd_5",
        "4+": "smcd_4",
        "3+": "smcd_3",
        "2+": "smcd_2",
        "2-": "smcd_l2"
    };
    for(let i =0; i< gest.index.length; i++){
        if(gest.at(i, class_dct[veg_num]) == veg_num){
            //console.log(gest.at(i,'Name'));
            let opt = document.createElement('option');
            opt.value = gest.at(i,'Name');
            opt.innerHTML = gest.at(i,'Name') + ": " + gest.at(i,'GEST');
            el.appendChild(opt);
        }
    }
}

// Export assumptions and results to CSV

$("#set_csv_btn").on('click', function(event){
    let rows = [
        ["Results"],
        ["Base CH4", document.getElementById("base_CH4").innerHTML],
        ["Base CO2", document.getElementById("base_CO2").innerHTML],
        ["Base Carbon Emission GWP Subtotal", document.getElementById("base_c_emission_gwp_subtotal").innerHTML],
        ["Base N2O Direct", document.getElementById("base_n2o_direct").innerHTML],
        ["Base N2O Indirect", document.getElementById("base_n2o_indirect").innerHTML],
        ["Base N2O Emission GWP Subtotal", document.getElementById("base_n2o_emission_gwp_subtotal").innerHTML],
        ["Base Activity GWP Subtotal", document.getElementById("base_activity_gwp_subtotal").innerHTML],
        ["Base GWP Total", document.getElementById("base_gwp_total").innerHTML],
        ["Rewet CH4", document.getElementById("rewet_CH4").innerHTML],
        ["Rewet CO2", document.getElementById("rewet_CO2").innerHTML],
        ["Rewet Carbon Emission GWP Subtotal", document.getElementById("rewet_c_emission_gwp_subtotal").innerHTML],
        ["Rewet N2O Direct", document.getElementById("rewet_n2o_direct").innerHTML],
        ["Rewet N2O Indirect", document.getElementById("rewet_n2o_indirect").innerHTML],
        ["Rewet N2O Emission GWP Subtotal", document.getElementById("rewet_n2o_emission_gwp_subtotal").innerHTML],
        ["Rewet Activity GWP Subtotal", document.getElementById("rewet_activity_gwp_subtotal").innerHTML],
        ["Rewet Product GWP Subtotal", document.getElementById("rewet_product_gwp_subtotal").innerHTML],
        ["Rewet GWP Total", document.getElementById("rewet_gwp_total").innerHTML],
        ["GHG Savings Total per Year per Site", document.getElementById("ghg_sav_tot_p_yr_p_site").innerHTML],
        ["GHG Savings Total per Year per Ha", document.getElementById("ghg_sav_tot_p_yr_p_ha").innerHTML],
        ["GHG Savings Stock per Year per Site", document.getElementById("ghg_sav_stock_p_yr_p_site").innerHTML],
        ["GHG Savings Stock per Year per Ha", document.getElementById("ghg_sav_stock_p_yr_p_ha").innerHTML],
        ["GHG Savings Flow per Year per Site", document.getElementById("ghg_sav_flow_p_yr_p_site").innerHTML],
        ["GHG Savings Flow per Year per Ha", document.getElementById("ghg_sav_flow_p_yr_p_ha").innerHTML],
        ["GHG Savings Product Use per Year per Site", document.getElementById("ghg_sav_pu_p_yr_p_site").innerHTML],
        ["GHG Savings Product Use per Year per Ha", document.getElementById("ghg_sav_pu_p_yr_p_ha").innerHTML],
        ["Carbon Stock TCO2 per Site", document.getElementById("cs_tco2_p_site").innerHTML],
        ["Carbon Stock Ton C per Site", document.getElementById("cs_ton_c_p_site").innerHTML],
        ["Carbon Stock TCO2 per Ha", document.getElementById("cs_tco2_p_ha").innerHTML],
        ["Carbon Stock Ton C per Ha", document.getElementById("cs_ton_c_p_ha").innerHTML],
        ["Base Years til Peat Lost", document.getElementById("base_til_peat_loss").innerHTML],
        ["Rewet Years til Peat Lost", document.getElementById("rewet_til_peat_loss").innerHTML],
        ["Inputs"],
        ["General Site Data"],
        ["Site Name", document.getElementById("site_name").value],
        ["Total Area", document.getElementById("tot_area").value],
        ["Coordinates", document.getElementById("coords").value],
        ["Elevation", document.getElementById("elevation").value],
        ["Peat Type", document.getElementById("peat_type").value],
        ["Peat Thickness", document.getElementById("peat_thick").value],
        ["Year Rewetting Starts", document.getElementById("year_start").value],
        ["Base"],
        ["Median Groundwater Level", document.getElementById("bs_med_gw_level_summer").value],
        ["Vegetation Class", document.getElementById("bs_veg_class").value],
        ["Amount Manure", document.getElementById("bs_amount_manure").value],
        ["Amount Organic Fertilizer", document.getElementById("bs_amount_org_fert").value],
        ["Type Synthetic Fertilizer", document.getElementById("bs_type_synth_fert").value],
        ["Amount Synthetic Fertilizer", document.getElementById("bs_amount_synth_fert").value],
        ["Type of Grazing Animals", document.getElementById("bs_type_animals").value],
        ["Number of Grazing Animals", document.getElementById("bs_avg_num_animals").value],
        ["Average Number of Grazing Days", document.getElementById("bs_avg_num_days").value],
        ["Crop Yield", document.getElementById("bs_crop_yield").value],
        ["Include Crop Residuals", document.getElementById("bs_crop_resid").checked],
        ["Crop Name", document.getElementById("bs_crop_name").value],
        ["Diesel per Site", document.getElementById("bs_diesel_per_site").value],
        ["Electricity per Site", document.getElementById("bs_elec_per_site").value],
        ["Rewet"],
        ["Median Groundwater Level", document.getElementById("rw_med_gw_level_summer").value],
        ["Vegetation Class", document.getElementById("rw_veg_class").value],
        ["Amount Manure", document.getElementById("rw_amount_manure").value],
        ["Amount Organic Fertilizer", document.getElementById("rw_amount_org_fert").value],
        ["Type Synthetic Fertilizer", document.getElementById("rw_type_synth_fert").value],
        ["Amount Synthetic Fertilizer", document.getElementById("rw_amount_synth_fert").value],
        ["Type of Grazing Animals", document.getElementById("rw_type_animals").value],
        ["Average Number of Grazing Animals", document.getElementById("rw_avg_num_animals").value],
        ["Average Number of Grazing Days", document.getElementById("rw_avg_num_days").value],
        ["Crop Yield", document.getElementById("rw_crop_yield").value],
        ["Include Crop Residuals", document.getElementById("rw_crop_resid").checked],
        ["Crop Name", document.getElementById("rw_crop_name").value],
        ["Diesel per Site", document.getElementById("rw_diesel_per_site").value],
        ["Electricity per Site", document.getElementById("rw_elec_per_site").value],
        ["Crop Use", document.getElementById("rw_crop_use").value]
    ];
    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
});

function update_gwp_chart(gwp_chart, output_tab){
    let base_CH4 = parseFloat(output_tab['base_outcomes']['CH4']);
    let base_CO2 = parseFloat(output_tab['base_outcomes']['CO2']);
    let base_N2O_dir = parseFloat(output_tab['base_outcomes']['n2o_direct']);
    let base_N2O_ind = parseFloat(output_tab['base_outcomes']['n2o_indirect']);
    let base_activity = parseFloat(output_tab['base_outcomes']['activity_gwp_subtotal']);
    let rewet_CH4 = parseFloat(output_tab['rewet_outcomes']['CH4']);
    let rewet_CO2 = parseFloat(output_tab['rewet_outcomes']['CO2']);
    let rewet_N2O_dir = parseFloat(output_tab['rewet_outcomes']['n2o_direct']);
    let rewet_N2O_ind = parseFloat(output_tab['rewet_outcomes']['n2o_indirect']);
    let rewet_product = parseFloat(output_tab['rewet_outcomes']['product_gwp_subtotal']);
    let rewet_activity = parseFloat(output_tab['rewet_outcomes']['activity_gwp_subtotal']);
    gwp_chart.data.datasets[0].data[0] = base_CH4;
    gwp_chart.data.datasets[1].data[0] = base_CO2;
    gwp_chart.data.datasets[2].data[0] = base_N2O_dir;
    gwp_chart.data.datasets[3].data[0] = base_N2O_ind;
    // skip gwp_chart.data.datasets[4].data[0] because base product stays 0
    gwp_chart.data.datasets[5].data[0] = base_activity;
    gwp_chart.data.datasets[0].data[1] = rewet_CH4;
    gwp_chart.data.datasets[1].data[1] = rewet_CO2;
    gwp_chart.data.datasets[2].data[1] = rewet_N2O_dir;
    gwp_chart.data.datasets[3].data[1] = rewet_N2O_ind;
    gwp_chart.data.datasets[4].data[1] = rewet_product;
    gwp_chart.data.datasets[5].data[1] = rewet_activity;
    gwp_chart.update();
    return gwp_chart;
}

function make_timeline_chart(timeline){
    const tml = document.getElementById('timeline_graph');
    let year_start = parseFloat(document.getElementById("year_start").value);
    let site_name = document.getElementById("site_name").value;
    let labels = [];
    for(let i= year_start; i < year_start+50; i++){
        labels.push(i);
    }
    let base_emis = [];
    let rewet_emis = [];
    let carbon_sav = [];
    let c_cred = [];
    for(let i= year_start; i < year_start+50; i++){
        base_emis.push(timeline['base_emissions'][i]);
        rewet_emis.push(timeline['rewet_emissions'][i]);
        carbon_sav.push(timeline['carbon_savings_total'][i]);
        c_cred.push(timeline['c_credits_' + site_name][i]);
    }
    let tml_data = {
        labels: labels,
        datasets: [
            {
                label: 'Base Emissions',
                data: base_emis,
                fill: false,
                borderColor: '#177521'
            },
            {
                label: 'Rewetted Emissions',
                data: rewet_emis,
                fill: false,
                borderColor: '#6abdd4'
            },
            {
                label: 'Carbon Savings Total',
                data: carbon_sav,
                fill: false,
                borderColor: '#87d676'
            },
            {
                label: 'Carbon Credits for '+ site_name,
                data: c_cred,
                fill: false,
                borderColor: '#d4b87b'
            }
        ]
    }
    let tml_config = {
        type: 'line',
        data: tml_data,
        options: {
            plugins: {
            title: {
                display: true,
                text: 'Emission Scenario'
            },
            },
            responsive: true,
            scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'GHG Emission (t CO2-eq/year)'
                }
            }
            }
        }
    };
    let time_graph = new Chart(tml, tml_config);
    return time_graph;
}