//var DataFrame = dfjs.DataFrame;

/*
let df = new DataFrame([
    {c1: 1, c2: 2}, // <------- A row
    {c4: 3, c3: 4}
], ['c1', 'c2', 'c3', 'c4']);*/
//console.log(df);

//console.log(df.get('c1'));
//console.log(df.select('c3'));
//let cf = new DataFrame.fromCSV("../../SET_Tool/csv_files/GEST_2_Static_Values_mod.csv").then(df => df);
//console.log(cf);
/*
let df = new DataFrame.fromCSV("http://127.0.0.1:5000/gesttypescsv").then(df => df);
console.log(df.show(9));
console.log(df.select('CH4_n'));

let rw = df.select(9);
console.log(rw.get('CH4_n'))*/

//import { readCSV, DataFrame } from "danfojs"
var DataFrame = dfd.DataFrame;
var readCSV = dfd.readCSV;

/*
readCSV("http://127.0.0.1:5000/gesttypescsv")
    .then(
        df =>{
            df.head().print()
        }
    );*/

//let cv = readCSV("http://127.0.0.1:5000/gesttypescsv").then(df => df);

async function test_this(){
    let cv = await readCSV("http://127.0.0.1:5000/gesttypescsv");
    return cv;
}

let gv = test_this();

console.log(gv);
console.log(gv.then(gv.columns));


/*let df = new DataFrame();

console.log(df.index);*/

/*
function get_gest_types(){
    var DataFrame = dfd.DataFrame;
    var readCSV = dfd.readCSV;
    let cv = readCSV("http://127.0.0.1:5000/gesttypescsv")
        .then(function(df){
            return df;
        });
    console.log
}*/