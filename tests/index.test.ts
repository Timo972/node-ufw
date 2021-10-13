import assert from "assert";
import {
  Protocol,
  Rule,
  allow,
  deny,
  getRules,
  deleteRule,
  limit,
  reject,
} from "../src";

// TODO cover whole exposed api with tests
// TODO split up each describe into its own test suite (file)
describe("Rule", () => {
  it("create", () => {
    const rule = new Rule();
    assert.equal(true, rule instanceof Rule);
  });

  it("configure port", () => {
    const rule = new Rule().port(22);
    assert.equal(rule.getPort(), 22);
  });

  it("configure proto", () => {
    const rule = new Rule().proto(Protocol.TCP);
    assert.equal(rule.getProtocol(), Protocol.TCP);
  });

  it("configure from", () => {
    const rule = new Rule().from("192.168.178.1");
    assert.equal(rule.getFrom(), "192.168.178.1");
  });

  it("configure to", () => {
    const rule = new Rule().to("192.168.178.1");
    assert.equal(rule.getTo(), "192.168.178.1");
  });

  it("stringify to json", () => {
    const rule = new Rule()
      .proto(Protocol.TCP)
      .port(22)
      .from("192.168.178.1")
      .to("192.168.178.2");
    const json = rule.toJSON();
    assert.ok(json, "test not implemented yet");
  });

  it("build ufw command", () => {
    const rule = new Rule()
      .proto(Protocol.TCP)
      .port(22)
      .from("192.168.178.1")
      .to("192.168.178.2");
    const cmd = rule.buildUfwCommand();
    assert.ok(cmd, "test not implemented yet");
  });
});

describe("UFW API", () => {
  it("allow (used) / limit / reject / deny", async () => {
    const allowRule = new Rule()
      .proto(Protocol.UDP)
      .port(7788)
      .from("192.168.178.187");
    await allow(allowRule);
  });

  it("get rules", async () => {
    const rules = await getRules();
  });

  it("delete", async () => {});
});
