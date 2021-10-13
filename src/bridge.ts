import { Rule } from "./rule";
import { UFWOperation } from "./enum/ufw-operation.enum";
import { exec } from "child_process";
import { join } from "path";

export class UFWRequest {
  private _operation: UFWOperation;
  public data: string;
  public returnJson: boolean = false;

  public get operation(): UFWOperation {
    return this._operation;
  }

  public set operation(op: UFWOperation) {
    this._operation = op;
    if (
      this.operation == UFWOperation.GetListening ||
      this.operation == UFWOperation.GetRules ||
      this.operation == UFWOperation.GetStatus
    )
      this.returnJson = true;
    else this.returnJson = false;
  }

  public pass(data: { [key: string]: any }): void {
    this.data = JSON.stringify(data);
  }
}

export function execute<T>(req: UFWRequest): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const data = `{"operation":${req.operation}, "data": ${req.data ?? '{}'}}`.replace(
      /"/g,
      '\\"'
    );
    console.log(data)
    exec(
      `python3 ${join(__dirname, "..", "python", "ufw-bridge.py")} ${data}`,
      (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }
        console.log(stdout);
        try {
          if (req.returnJson) resolve(JSON.parse(stdout) as unknown as T);
          else resolve(stdout as unknown as T);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
}
