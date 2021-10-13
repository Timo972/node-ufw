import { Rule } from "./rule";
import { UFWOperation } from "./enum/ufw-operation.enum";
import { exec } from "child_process";
import { join } from "path";

export class UFWRequest {
  public operation: UFWOperation;
  public data: string;

  public pass(data: { [key: string]: any }): void {
    this.data = JSON.stringify(data);
  }
}

export function execute<T>(req: UFWRequest): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const data = `{"operation":${req.operation}, "data": ${req.data}}`.replace(/"/g, '\\"')
    exec(
      `python3 ${join(
        __dirname,
        "..",
        "python",
        "ufw-bridge.py"
      )} ${data}`,
      (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(JSON.parse(stdout) as unknown as T);
      }
    );
  });
}
