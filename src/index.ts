import { Rule } from "./rule";
import { execute, UFWRequest } from "./bridge";
import { UFWOperation } from "./enum/ufw-operation.enum";

export type Rules = { [key: number]: string };
export type Default = "allow" | "deny" | "reject";
export interface Status {
  status: "active" | "inactive";
  default: {
    incoming: Default;
    outgoing: Default;
    routed: Default;
  };
  rules: Rules;
}
export interface Listening {}

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

  return addRule(`allow ` + rule.buildUfwCommand());
}

/**
 *
 * @param {Rule} rule
 */
export async function deny(rule: Rule): Promise<void> {
  if (!(rule instanceof Rule)) throw new Error("invalid rule");

  return addRule(`deny ` + rule.buildUfwCommand());
}

/**
 *
 * @param {Rule} rule
 */
export async function limit(rule: Rule): Promise<void> {
  if (!(rule instanceof Rule)) throw new Error("invalid rule");

  return addRule(`limit ` + rule.buildUfwCommand());
}

/**
 *
 * @param {Rule} rule
 */
export async function reject(rule: Rule): Promise<void> {
  if (!(rule instanceof Rule)) throw new Error("invalid rule");

  return addRule(`reject ` + rule.buildUfwCommand());
}

export async function deleteRule(rule: Rule | number): Promise<void> {
  if (!(rule instanceof Rule) && !(typeof rule === "number"))
    throw new Error("invalid rule / id");

  const id: number | undefined = rule instanceof Rule ? rule.getId() : rule;

  if (!id) throw new Error("invalid id");

  const req = new UFWRequest();
  req.pass({ id });
  req.operation = UFWOperation.DeleteRule;

  return execute<void>(req);
}

export async function getRules(): Promise<Rules> {
  const req = new UFWRequest();
  req.operation = UFWOperation.GetRules;

  return execute<Rules>(req);
}

export async function setDefaults(
  incoming: Default,
  outgoing: Default,
  routed: Default
): Promise<void> {
  const req = new UFWRequest();
  req.operation = UFWOperation.SetDefault;
  req.pass({
    incoming,
    outgoing,
    routed,
  });

  return execute<void>(req);
}

export async function enable(): Promise<void> {
  const req = new UFWRequest();
  req.operation = UFWOperation.Enable;

  return execute<void>(req);
}

export async function disable(): Promise<void> {
  const req = new UFWRequest();
  req.operation = UFWOperation.Disable;

  return execute<void>(req);
}

export async function getListening(): Promise<Listening> {
  const req = new UFWRequest();
  req.operation = UFWOperation.GetListening;

  return;
}

export async function getStatus(): Promise<Status> {
  const req = new UFWRequest();
  req.operation = UFWOperation.GetStatus;

  return execute<Status>(req);
}

export async function reset(): Promise<void> {
  const req = new UFWRequest();
  req.operation = UFWOperation.Reset;

  return execute<void>(req);
}

export async function reload(): Promise<void> {
  const req = new UFWRequest();
  req.operation = UFWOperation.Reload;

  return execute<void>(req);
}

export { Rule } from "./rule";
export { Protocol } from "./enum/proto.enum";
