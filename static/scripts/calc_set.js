var DataFrame = dfd.DataFrame;
var readCSV = dfd.readCSV;

let data1 = [
    ["G1","Dry to moderately moist grassland","(2~), 2+, 2- ",null,null,null,null,"2+",-2,-0.01,24,31.44,16,31.5,8.574245455],
    ["G2","Moist grassland","3+, 3+/2+",null,null,null,"3+","2+",null,0.01,48,19.37,38,19.5,5.283027273],
    ["G3","Moist to very moist grassland","4+/3+",null,null,null,"3+",null,null,0.03,3,13.46,4,13.5,3.671809091],
    ["G3f","Periodically flooded grasslands","4~, 3~",null,null,"4+","3+","2+",null,-0.05,3,13.46,null,13,3.669409091],
    ["G3s","Moist to very moist grassland with shunt  species","4+/3+, 3~, (3+, 3+/2+)",null,null,null,"3+","2+",null,0.75,7,13.46,null,14,3.693409091],
    ["G3m","Moist to very moist acidic Molinia meadows","4+/3+",null,null,null,"3+",null,null,4.85,6,6.45,null,11.5,1.904590909],
    ["G4","Very moist grassland","4+, 4~",null,null,"4+","3+",null,null,0.39,7,6.45,3,7,1.770790909],
    ["G4s","Very moist grassland with shunt species ","4+",null,null,"4+",null,null,null,2.1,4,6.45,null,8.5,1.822090909],
    ["G5","Wet grassland","5+/4+",null,null,"4+",null,null,null,0.05,3,-3.89,5,-4,-1.059409091],
    ["G5s","Wet grassland with shunt species","5+, 5+/4+, (4~)",null,"5+","4+","3+",null,null,2.93,4,-3.89,null,-1,-0.973009091],
    ["A1","Dry to moderately moist arable land","2+, 2-",null,null,null,null,"2+",-2,0.08,11,41.69,10,42,11.3724],
    ["A2","Moist arable land","3+, 3+/2+",null,null,null,"3+","2+",null,0.17,6,23.44,4,23.5,6.397827273],
    ["U1","Moist bare peat","3~, 3+",null,null,null,"3+","2+",null,0.03,2,8.99,2,9,2.452718182],
    ["U2","Moist bog heath","3+",null,null,null,"3+",null,null,0.25,10,12.33,5,12.5,3.370227273],
    ["U3","Moist Reeds","3+, (3~)",null,null,null,"3+","2+",null,0.04,1,2.77,2,3,0.756654545],
    ["U6","Very moist bog heath","(5+/4+), 4+",null,null,"4+",null,null,null,0.92,6,4.67,5,5.5,1.301236364],
    ["U7","Very moist forbs and sedges","(5+/4+), 4+, (4+/3+)",null,null,"4+","3+",null,null,0.25,5,12.56,6,13,3.432954545],
    ["U8","Very moist Sphagnum lawn","(5+/4+), 4+",null,null,"4+",null,null,null,1.5,12,-4.3,11,-3,-1.127727273],
    ["U9","Very moist tall sedges","(5+/4+), 4~, 4+, (4+/3+)",null,null,"4+","3+",null,null,1.6,12,10.72,4,12.5,2.971636364],
    ["U10","Wet bare peat","5+/4+",null,null,"4+",null,null,null,0.22,3,1.34,3,1.5,0.372054545],
    ["U11","Wet meadows and forbs","5+",null,"5+",null,null,null,null,7.35,2,-3.89,null,3.5,-0.840409091],
    ["U12","Wet small sedges with mosses","5+ (4+)",null,"5+","4+",null,null,null,4.72,23,-1.99,15,2.5,-0.401127273],
    ["U13","Wet sphagnum lawn","5+, (5+/4+)",null,"5+","4+",null,null,null,5.25,6,-3.02,6,2,-0.666136364],
    ["U14","Wet tall reeds","(5~), 5+, (5+/4+)",null,"5+","4+",null,null,null,6.47,10,0.21,2,6.5,0.251372727],
    ["U15","Wet tall sedges","5~, 5+, (5+/4+)",null,"5+","4+",null,null,null,9.49,3,1.03,2,10.5,0.565609091],
    ["U16","Wet bog heath","6+/5+, 5+, (5+/4+)",null,"5+","4+",null,null,null,17.8,1,-0.01,7,18,0.531272727],
    ["U17","Very wet tall sedges and Typha","6+, 6+/5+","6+","5+",null,null,null,null,6.81,8,-1.08,8,5.5,-0.090245455],
    ["U18","Very wet Phragmites reeds","6+, (6+/5+, 5~)","6+","5+","4+",null,null,null,12.44,12,-12.38,8,0,-3.003163636],
    ["U19","Wet to very wet Sphagnum hollows","6+, (5+)","6+","5+",null,null,null,null,11.81,8,-4.58,8,7,-0.894790909],
    ["U20","Flooded tall reeds (> 20 cm above surface)","6+","6+",null,null,null,null,null,28.29,30,-32.74,6,-4.5,-8.080390909],
    ["S1","Dry to moderately moist grassland on peaty soils (Anmoor)","2-, 2+/2-, 2+",null,null,null,null,"2+",-2,-0.05,9,46.09,14,46,12.5685],
    ["S2","Dry to moderately moist arable land on peaty soils(Anmoor)","2+, 2-",null,null,null,null,"2+",-2,0.07,8,35.11,12,35,9.577554545],
    ["S3","Cropland (2+) flooded in summer (wet year)","3+",null,null,null,"3+",null,null,10.29,1,22.61,1,33,6.475063636],
    ["S4","Grassland (2+/3+) flooded in summer (wet year) ","(5+), 5+/4+, (4+)",null,"5+","4+",null,null,null,26.02,7,-0.13,6,26,0.745145455],
    ["S5","Simulated harvest (Paludiculture)","(5+), 5+/4+",null,"5+","4+",null,null,null,3.08,3,11.46,3,14.5,3.217854545],
    ["S6","Wet tall reeds (dry year)","(5+/4+), 4~, 4+",null,null,"4+","3+",null,null,0.79,7,10.72,null,11.5,2.947336364],
    ["S7","Sphagnum lawn  at former peat cut areas","5+, 5+/4+",null,"5+","4+",null,null,null,37.27,3,2.83,2,40,1.889918182],
    ["S8","Very wet reeds with lateral import of organic matter","6+, 6+/5+, (5~, 5+)","6+","5+","4+",null,null,null,42.27,18,2.39,18,44.5,1.919918182],
    ["S9","Ditches in low intensity grassland","6+","6+",null,null,null,null,null,3.17,3,"+/- 0",null,3,0.0951]
];

//let cols1 = ["Name","GEST","Soil Moisture Classes","smcd_6","smcd_5","smcd_4","smcd_3","smcd_2","smcd_l2","CH4_GWP","CH4_n","CO2_GWP","CO2_n","Total C-flux (GWP)","Total C-flux (ton C/ha)"];

let df = new DataFrame(data1);
df=df.rename({0:"Name", 1:"GEST", 2:"Soil Moisture Classes", 3:"smcd_6", 4:"smcd_5", 5:"smcd_4", 6:"smcd_3", 7:"smcd_2", 8:"smcd_l2", 9:"CH4_GWP", 10:"CH4_n", 11:"CO2_GWP", 12:"CO2_n", 13:"Total C-flux (GWP)", 14:"Total C-flux (ton C/ha)" });
df.print();