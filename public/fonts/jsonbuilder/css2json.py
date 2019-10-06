'''
    This is a Python3 App.

    Build a json file from css file. 
    
    usage: python3 css2json.py
'''
import json

_fontname = 'vicons'
_resultList = []

# Open css file.
with open(_fontname + '.css', 'r') as f:
    for fileline in f.readlines():
        if ':before' in fileline:
            _tempClass = fileline[0:fileline.find(':before')]
            _tempCode = fileline[fileline.find('\'\\')+1:fileline.find('\';')].replace('\\','&#x') + ';'
            _resultList += [{"name": _tempClass, "code": _tempCode, "fontclass": _tempClass}]
    f.close()

# Write json file.
with open(_fontname + '.json', 'w') as fjson:
    json.dump(_resultList, fjson, ensure_ascii=False, indent=4)
    print(">>> File [" + _fontname + ".json] built ok.")
    fjson.close()