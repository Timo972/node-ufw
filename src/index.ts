import { Rule } from "./rule";
import { execute, UFWRequest } from "./bridge";
import { UFWOperation } from "./enum/ufw-operation.enum";

export type Rules = { [key: number]: string };

async function addRule(command: string): Promise<void> {
  const req = new UFWRequest();
  req.pass({ command });
  req.operation = UFWOperation.AddRule;

  await execute(req);

  return;
}

/**
 *
 * @param {Rule} rule
 */
export async function allow(rule: Rule): Promise<void> {
  if (!(rule instanceof Rule)) throw new Error("invalid rule");

  await addRule(`allow` + rule.buildUfwCommand());

  return;
}

/**
 *
 * @param {Rule} rule
 */
export async function deny(rule: Rule): Promise<void> {
  if (!(rule instanceof Rule)) throw new Error("invalid rule");

  await addRule(`deny` + rule.buildUfwCommand());

  return;
}

/**
 *
 * @param {Rule} rule
 */
export async function limit(rule: Rule): Promise<void> {
  if (!(rule instanceof Rule)) throw new Error("invalid rule");

  await addRule(`limit` + rule.buildUfwCommand());

  return;
}

/**
 *
 * @param {Rule} rule
 */
export async function reject(rule: Rule): Promise<void> {
  if (!(rule instanceof Rule)) throw new Error("invalid rule");

  await addRule(`reject` + rule.buildUfwCommand());

  return;
}

export async function deleteRule(rule: Rule | number): Promise<void> {
  if (!(rule instanceof Rule) && !(typeof rule === "number"))
    throw new Error("invalid rule / id");

  const id: number | undefined = rule instanceof Rule ? rule.getId() : rule;

  if (!id) throw new Error("invalid id");

  const req = new UFWRequest();
  req.pass({ id });
  req.operation = UFWOperation.DeleteRule;

  await execute<string>(req);

  //return false;
}

export async function getRules(): Promise<Rules> {
  const req = new UFWRequest();
  req.operation = UFWOperation.GetRules;

  return execute<Rules>(req);
}

export { Rule, RuleConfig } from "./rule";
export { Protocol } from "./enum/proto.enum";
