SECURE_PWD='P0stgr3sql'
#HOSTADR = 'localhost'
HOSTADR = '140.203.155.91'
DBNAME = 'geoapp'
USERNM = 'postgres'

########################## for key metric analyser
"""
Centralised configuration. Override anything with environment variables, e.g.

    export ODOO_BASE=https://aspect-erp.insight-centre.org
    export ODOO_DB=peatland_prod
    python app.py
"""

import os

ODOO_BASE = os.environ.get("ODOO_BASE", "https://aspect-erp.insight-centre.org").rstrip("/")
ODOO_DB = os.environ.get("ODOO_DB", "aspect")
DEFAULT_POLICY_ID = int(os.environ.get("DEFAULT_POLICY_ID", "1"))
REQUEST_TIMEOUT = int(os.environ.get("ODOO_TIMEOUT", "30"))