import json
import requests

url = 'http://140.203.154.253:8016/web/session/authenticate'
headers = {'Content-Type': 'application/json'}
data = {
    'jsonrpc': '2.0',
    'params': {
        'db': 'project123',
        'login': 'link2yasar@gmail.com',
        'password': '1234'
    }
}

response = requests.post(url, headers=headers, json=data, stream=True)

if response.status_code == 200:
    print("Response Headers:")
    for header, value in response.headers.items():
        print(f"{header}: {value}")
    
    print("\nResponse Body:")
    print(response.text)
    
    # Get cookies from the response
    cookies = response.cookies
    
    print("\nCookies:")
    for cookie_name, cookie_value in cookies.items():
        print(f"{cookie_name}: {cookie_value}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)


# Set up the URL
url = 'http://140.203.154.253:8016/aspect/keywords/'

# Set up the headers
headers = {
    'Content-Type': 'application/json',
    #'Cookie': 'session_id='+str(cookie_value)
}

# Prepare the JSON payload
payload = {
    "jsonrpc": "2.0",
    "params": {}
}

# Send the GET request
response = requests.get(url, headers=headers, json=payload)

# Check if the request was successful
if response.status_code == 200:
    try:
        # Parse the JSON response
        data = response.json()
        print(json.dumps(data, indent=2))
    except ValueError:
        print("Invalid JSON response")
else:
    print(f"Request failed with status code {response.status_code}")
    print(response.text)

