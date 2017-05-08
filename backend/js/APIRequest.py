# import hmac
# import hashlib
# from datetime import datetime
# import requests
# import logging

# def derived_key(key, nonce, date=None):
#     print"this"
#     print date
#     hkey = '%s%s%s' % (nonce, date, key)
#     return hkey    
    
# #define things    
# url = "https://app.unifli.aero/api/missions/"
# date = datetime.utcnow().strftime("%Y%m%d%H%M%S")
# method = 'get'
# nonce = '92301kjsadln98123124'
# publicToken = ''
# privateToken = ''
# header1 = "user-agent: python-requests/2.13.0"
# header2 = "content-length: "


# #get key+nonce+date
# hkey = derived_key(privateToken, nonce, date)
# #include http method url date api key user agent content length 
# sign_parts = [method.upper(),url,date,publicToken,nonce,header1,header2]

# #join with \n
# sign_data = '\n'.join(sign_parts)

# #calc hmac
# sign = hmac.new(hkey, sign_data, hashlib.sha256)

# headers = {
#     'X-E38-Date': date,
#     'X-E38-Nonce': nonce,
#     'authorization': "Signature token="+ publicToken +"; signature=" + str(sign.hexdigest()) +'; headers=user-agent,content-length'
#     }

# response = requests.request('GET', url, headers=headers,timeout=30,verify=False)
# print (response.text)
def printme( ):
   print "This prints a passed string into this function"
   return