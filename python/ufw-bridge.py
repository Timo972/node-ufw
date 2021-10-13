import sys
import json

import pyufw

import enum
# Using enum class create enumerations

class Operation(enum.Enum):
    AddRule = 0
    DeleteRule = 1
    SetDefault = 2
    GetStatus = 3
    GetRules = 4
    GetListing = 5
    Enable = 6
    Disable = 7
    Reset = 8

def main():
    raw_data = ""
    for i in range(len(sys.argv)):
        if i < 1:
            continue
        raw_data += sys.argv[i]

    args = json.loads(raw_data)
    opr = args['operation']
    data = args['data']
    print(opr)
    print(data)
    
    if opr == Operation.AddRule:
        print("addRule")
    elif opr == Operation.DeleteRule:
        print("deleteRule")
    elif opr == Operation.GetRules:
        print("getRules")

    #print(json.dumps())
    print("done")

if __name__ == "__main__":
    main()