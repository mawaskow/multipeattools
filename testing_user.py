import http.client
import json

conn = http.client.HTTPConnection("aspect-erp.insight-centre.org", 8016)
payload = json.dumps({
  "jsonrpc": "2.0",
  "params": {
    "db": "aspect",
    "login": "waqas.shoukat@insight-centre.org",
    "password": "12345"
  }
})
headers = {
  'Content-Type': 'application/json',
  'Cookie': 'session_id=d0838325796a5191c9a782aa165748f03a0f827a'
}
conn.request("POST", "/web/session/authenticate", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))