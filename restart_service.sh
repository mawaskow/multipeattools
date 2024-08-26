#!/bin/bash

# Terminate gunicorn process
pkill gunicorn

# Terminate multipeattools process
pkill multipeattools

# Reload systemctl daemon
sudo systemctl daemon-reload

# Enable multipeattools service
sudo systemctl enable multipeattools

# Start multipeattools service
sudo systemctl start multipeattools

# Start multipeattools service
systemctl status multipeattools
