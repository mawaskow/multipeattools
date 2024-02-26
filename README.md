# Peatland Policy Portal

## Directories:
### Inputs
For populating the FFP and SET tool forms/pages before JS invoked

Inlcudes both form inputs and results for each tool
### Mvenv
Virutal environment for gunicorn instance
### Static
Where scripts, styles and icons are stored
### Scripts
#### calc_ffp
Handles calculation using FFP tool on FFP page
#### calc_set
Handles calculation using SET tool on SET page
#### customFunctions
Accesses map layers by name or display quality
#### Identify
Map popup on click
#### Layers
Map layers list-- toggles visibility based on selection
#### Map
Connects to geoserver, selects layers, and creates map
#### Offcanv
Popup on side after map click-- displays policy information
#### Search
Search capabilities/ searchbar, currently not in use
#### toggle_display
Closing and opening divs based on buttons or icons

### Templates
All html templates for each page

base is the base html page.

### Miscellaneous
run.py starts flask instance

wsgi.py is for web deployment

modules.py is for some python modules for run.py

## To run:
Clone repository

Install dependencies

Open terminal and cd to directory

`powershell: $env:FLASK_APP = "run"`

`bash: export FLASK_APP=run`

`flask run`