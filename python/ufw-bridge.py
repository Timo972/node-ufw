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
    GetListening = 5
    Enable = 6
    Disable = 7
    Reset = 8
    Reload = 9


def main():
    raw_data = ""
    for i in range(len(sys.argv)):
        if i < 1:
            continue
        raw_data += " " + sys.argv[i]

    args = json.loads(raw_data)
    opr = args['operation']
    data = args['data']

    if opr == 0:
        pyufw.add(data['command'])
    elif opr == 1:
        pyufw.delete(data['id'])
    elif opr == 2:
        pyufw.default(data['incoming'], data['outgoing'], data['routed'])
    elif opr == 3:
        print(json.dumps(pyufw.status()))
    elif opr == 4:
        print(json.dumps(pyufw.get_rules()))
    elif opr == 5:
        print(json.dumps(pyufw.show_listening()))
    elif opr == 6:
        pyufw.enable()
    elif opr == 7:
        pyufw.disable()
    elif opr == 8:
        pyufw.reset()
    elif opr == 9:
        pyufw.reload()


if __name__ == "__main__":
    main()
