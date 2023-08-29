var DataFrame = dfjs.DataFrame;
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

df = new DataFrame.fromCSV("http://127.0.0.1:5000/gesttypescsv").then(df => df);
console.log(df.listColumns);
console.log(df.getRow(1));

rw = df.get(9);
console.log(rw.get('CH4_n'))