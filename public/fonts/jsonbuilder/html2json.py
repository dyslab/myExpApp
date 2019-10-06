'''
    This is a Python3 App.

    Build a json file from html file. 
    
    usage: python3 html2json.py
'''
from html.parser import HTMLParser
import json


class TestHTML2JSON(HTMLParser):
    _isName = False
    _isCode = False
    _isClass = False
    _tempName = ''
    _tempCode = ''
    _tempClass = ''
    _returnL = []

    def handle_starttag(self, tag, attrs):
        if (tag == 'div') and (('class', 'name') in attrs):
            self._isName = True
        if (tag == 'div') and (('class', 'code') in attrs):
            self._isCode = True
        if (tag == 'div') and (('class', 'fontclass') in attrs):
            self._isClass = True

    def handle_endtag(self, tag):
        self._isName = False
        self._isCode = False
        self._isClass = False

    def handle_data(self, data):
        if self._isName:
            # print("Name: ", data)
            self._tempName = data
        if self._isCode:
            # print("Code: ", data)
            self._tempCode = data
        if self._isClass:
            # print("Fontclass: ", data)
            self._tempClass = data
            self._returnL += [{"name": self._tempName, "code": self._tempCode, "fontclass": self._tempClass}]
    
    def get_result(self):
        return self._returnL


parser = TestHTML2JSON()

# Open html file.
with open('iconfont.html', 'r') as f:
    filedata = f.read()
    f.close()

# Parse html file.
parser.feed(filedata)
# print(json.dumps(parser.get_result(), ensure_ascii=False, indent=4))

# Write json file.
with open('iconfont.json', 'w') as fjson:
    json.dump(parser.get_result(), fjson, ensure_ascii=False, indent=4)
    print(">>> File [iconfont.json] built ok.")
    fjson.close()