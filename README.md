# Peatland Policy Portal

This is the code repository for the EU LIFE Multi Peat project's [European Peatland Policy Portal](https://peatlandpolicyportal.eu/).

## Repository Content

- inputs
  - static data used in the FFP and SET tools
- mvenv
  - virtual environment for repository
- static
  - images
    - pictures used throughout the portal
  - scripts
    - JavaScript files to make pages and tools dynamic
  - additional auxiliary icons and images (mainly SVGs and logos)
  - style.css
- templates
  - HTML templates for all web pages
- [base directory]
  - run.py starts flask instance and manages site routes
  - wsgi.py is for web deployment
  - modules.py contains some python modules for run.py

## Local Use:

- Clone repository
- Install dependencies
- Open terminal and cd to directory
- `$env:FLASK_APP = "run"` if powershell or `export FLASK_APP=run` if bash
- `flask run`
