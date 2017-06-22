import hmac
import hashlib
from datetime import datetime
import requests
import logging
import sys
import httplib,urllib
import json 
from requests.packages.urllib3.exceptions import InsecureRequestWarning

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
def derived_key(key, nonce, date=None):
    print"this"
    print date
    hkey = '%s%s%s' % (nonce, date, key)
    return hkey    
    
#define things       
url = "https://app.unifli.aero/api/missions/d6f85c48-5b04-4600-acf2-2fa42526ba5c/processings/5bf99122-3c6f-4762-9f2c-d76155141d6b/chunked/"
date = datetime.utcnow().strftime("%Y%m%d%H%M%S")
method = 'post'
nonce = '92301kjsadln98123124'
publicToken = 'TYQ8R9w3BZJ25zvKQhbFfE3XwAj2YtQAyUaVcOI3hsvEMTIo7p6FQRB3viqAgXRB'
privateToken = 'RNTY5FYNZHDnm7hWn3Z7v7qHaK8lkp2YAmAXR7Irp29wsmV47PA1JtJXQ5KwOdh2'
header1 = "user-agent: "+sys.argv[1]
header2 = "content-length: "

#get key+nonce+date
hkey = derived_key(privateToken, nonce, date)
#include http method url date api key user agent content length 
sign_parts = [method.upper(),url,date,publicToken,nonce,header1,header2]

#join with \n
sign_data = '\n'.join(sign_parts)

#calc hmac
sign = hmac.new(hkey, sign_data, hashlib.sha256)
print  str(sign.hexdigest()) 

headers = {
    'X-E38-Date': date,
    'X-E38-Nonce': nonce,
    'authorization': "Signature token="+ publicToken +"; signature=" + str(sign.hexdigest()) +'; headers=user-agent,content-length'
    }
print headers
post_data = {'total_parts': '3','downloadable':'true','resource_type': 'JPEG Image'}
response = requests.post(url, data=post_data, headers=headers,timeout=50,verify=False)
print response.text

