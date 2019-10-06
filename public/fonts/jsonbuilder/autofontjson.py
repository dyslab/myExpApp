'''
    This is a Python3 App.

    Build a json file by codes automation. 
    
    usage: python3 autofontjson.py
'''
import json

_fontname = 'codropsicons'
_resultList = []

# Automated codes.
for index in range(0xe000, 0xe000 + 5):
    _tempCode = hex(index).replace('0x','&#x') + ';'
    _resultList += [{"name": "", "code": _tempCode, "fontclass": ""}]

# Write json file.
with open(_fontname + '.json', 'w') as fjson:
    json.dump(_resultList, fjson, ensure_ascii=False, indent=4)
    print(">>> File [" + _fontname + ".json] built ok.")
    fjson.close()