// <copyright file="dice.mjs" company="alterNERDtive">
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

import { MODULE, DICE, ICONS } from "./const.mjs";

export class DiceConfig {
  static init() {
    DICE.forEach((die) => {
      DiceConfig.onDieChanged(die, game.settings.get(MODULE, die));
    });
  }

  static onDieChanged(die, state) {
    if (state) {
      let label;
      switch(die) {
        case "c":
          label = "MOREMANUALDICEROLLS.Coin"; break;
        case "f":
          label = "MOREMANUALDICEROLLS.Fate"; break;
      }
      CONFIG.Dice.fulfillment.dice[die] = { label: (label ? label : die), icon: `<i class="fa-solid fa-dice-${(ICONS[die] ? ICONS[die] : die)}"></i>`};
      CONFIG.Dice.fulfillment.dice = Object.fromEntries(
        Object.entries(CONFIG.Dice.fulfillment.dice).sort(([a], [b]) => {
          return Number(a.slice(1)) - Number(b.slice(1));
        })
      );
    }
    else {
      delete CONFIG.Dice.fulfillment.dice[die];
      let diceConfig = game.settings.get("core", "diceConfiguration");
      delete diceConfig[die];
      game.settings.set("core", "diceConfiguration", diceConfig);
    }
  }
}
