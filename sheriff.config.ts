import {
  noDependencies,
  sameTag,
  type SheriffConfig,
} from "@softarc/sheriff-core";

export const config: SheriffConfig = {
  autoTagging: false,
  entryPoints: {
    agenda: "apps/agenda/src/main.ts",
  },

  modules: {
    "libs/<domain>/domain-logic": ["domain:<domain>", "type:domain-logic"],
    "libs/<domain>/data": ["domain:<domain>", "type:data"],
    "libs/<domain>/feature-<name>": ["domain:<domain>", "type:feature"],
    "libs/<domain>/ui-<name>": ["domain:<domain>", "type:ui"],
    "libs/<domain>/util-<name>": ["domain:<domain>", "type:util"],
    "libs/shared/<name>": ["domain:shared", "type:util"],
    "libs/platform/<name>": ["domain:shared", "type:platform"],
  },

  depRules: {
    root: "*",
    noTag: "noTag",

    "type:feature": [
      "type:ui",
      "type:data",
      "type:domain-logic",
      "type:util",
      "type:platform",
    ],
    "type:ui": ["type:domain-logic", "type:util", "type:platform"],
    "type:data": ["type:domain-logic", "type:util", "type:platform"],
    "type:domain-logic": ["type:util"],
    "type:platform": ["type:util"],
    "type:util": noDependencies,

    "domain:*": [sameTag, "domain:shared"],
  },
};
