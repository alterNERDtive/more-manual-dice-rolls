// <copyright file="settings.mjs" company="alterNERDtive">
// Copyright 2025 alterNERDtive.
//
// This file is part of the More Manual Dice Rolls Foundry module.
//
// The More Manual Dice Rolls Foundry module is free software: you can distribute
// it and/or modify it under the terms of the GNU General Public License as
// published by the Free Software Foundation, either version 3 of the License,
// or (at your option) any later version.
//
// The More Manual Dice Rolls Foundry module is distributed in the hope that it will
// be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along with
// the More Manual Dice Rolls Foundry module. If not, see
// &lt;https://www.gnu.org/licenses/&gt;.
// </copyright>

import { MODULE, DICE } from "./const.mjs";
import { DiceConfig } from "./dice.mjs";

export class ModuleSettings {
  static init() {
    game.settings.register(MODULE, "override", {
      name: "MOREMANUALDICEROLLS.OverrideName",
      hint: "MOREMANUALDICEROLLS.OverrideHint",
      scope: "user",
      config: true,
      type: Boolean,
      default: false,
      requiresReload: false,
      onChange: (state) => {
        CONFIG.Dice.fulfillment.defaultMethod = (state ? "manual" : "");
      }
    });

    DICE.forEach((die) => {
      game.settings.register(MODULE, die, {
        name: `MOREMANUALDICEROLLS.${die}Name`,
        hint: `MOREMANUALDICEROLLS.${die}Hint`,
        scope: "user",
        config: true,
        type: Boolean,
        default: false,
        requiresReload: false,
        onChange: (state) => { DiceConfig.onDieChanged(die, state) }
      });
    });
  }
}
