window.NMRIH2 = {
 "meta": {
  "game": "No More Room in Hell 2",
  "appid": 292000,
  "engine": "UE5.6 (Torn Banner 'Mangle.4')",
  "note": "Names/paths extracted from unencrypted paks. Numeric stats require a .usmap mappings file (see README).",
  "counts": {
   "skills": 66,
   "skillEffects": 133,
   "firearmsAndSets": 106,
   "melee": 36,
   "consumables": 19,
   "permanents": 19,
   "attachments": 19,
   "recipes": 39,
   "stims": 20,
   "attributesTables": 181,
   "ai": 52,
   "challengeTasks": 17,
   "activityCards": 10,
   "lootCollections": 22
  }
 },
 "hasStats": true,
 "statsInfo": {
  "filesDecoder": "CUE4Parse 1.2.2 + foreign UE5.6.1 usmap (NewMoon/Mixtape)",
  "filesNote": "Weapon, melee, throwable, item and zombie numbers are read directly from the game's UCurveTable data assets.",
  "skillsNote": "Skill effects and Expert unlock levels are community-sourced from the Fandom wiki (CC-BY-SA) — their magnitudes live in Blueprint effects a foreign usmap cannot decode.",
  "wikiAttribution": "No More Room in Hell 2 Wiki on Fandom (CC-BY-SA). https://no-more-room-in-hell-two.fandom.com/wiki/Skills",
  "withStats": 47,
  "wikiSkills": 44,
  "withImages": 117
 },
 "sections": {
  "skills": [
   {
    "id": "SD_Athlete",
    "name": "Athlete",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Increased stamina",
     "Expert effect": "Greatly increased stamina",
     "Expert unlock": "Level 72"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Athlete.png"
   },
   {
    "id": "SD_AdrenalineRush",
    "name": "Adrenaline Rush",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "At critical health, consume less stamina",
     "Expert effect": "...much less stamina",
     "Expert unlock": "Level 4"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_AdrenalineRush.png"
   },
   {
    "id": "SD_SpreadTheLove",
    "name": "Spread The Love",
    "category": "General",
    "hasUltimate": true
   },
   {
    "id": "SD_Caravan",
    "name": "Caravan",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Carry more weight, but reduced stamina & health",
     "Expert effect": "carry much more",
     "Expert unlock": "Level 54"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Caravan.png"
   },
   {
    "id": "SD_Sniper_IronChamber",
    "name": "Sniper Iron Chamber",
    "category": "Sniper",
    "hasUltimate": true,
    "stats": {
     "Effect": "Heavy rifles increased damage",
     "Expert effect": "vastly more",
     "Expert unlock": "Level 44"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Sniper_IronChamber.png"
   },
   {
    "id": "SD_Hitman",
    "name": "Hitman",
    "category": "General",
    "hasUltimate": true,
    "img": "img/skill_SD_Hitman.png"
   },
   {
    "id": "SD_Shotgun_LongRange",
    "name": "Shotgun Long Range",
    "category": "Shotgun",
    "hasUltimate": true,
    "img": "img/skill_SD_Shotgun_LongRange.png"
   },
   {
    "id": "SD_Doorbreaker",
    "name": "Doorbreaker",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Kicks deal more damage to doors/barricades",
     "Expert effect": "much more",
     "Expert unlock": "Level 46"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Doorbreaker.png"
   },
   {
    "id": "SD_Shotgun_Overkill",
    "name": "Shotgun Overkill",
    "category": "Shotgun",
    "hasUltimate": true,
    "stats": {
     "Effect": "Shotguns fire more pellets",
     "Expert effect": "a lot more",
     "Expert unlock": "Level 96"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Shotgun_Overkill.png"
   },
   {
    "id": "SD_Handgun_SteadyMovement",
    "name": "Handgun Steady Movement",
    "category": "Handgun",
    "hasUltimate": true
   },
   {
    "id": "SD_Scavenger",
    "name": "Scavenger",
    "category": "Utility",
    "hasUltimate": true,
    "stats": {
     "Effect": "Increased ammo from pickups",
     "Expert effect": "greatly increased",
     "Expert unlock": "Level 8"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Scavenger.png"
   },
   {
    "id": "SD_QuickReload_RifleAndSMG",
    "name": "Quick Reload Rifle And SMG",
    "category": "Rifle",
    "hasUltimate": true,
    "img": "img/skill_SD_QuickReload_RifleAndSMG.png"
   },
   {
    "id": "SD_MarathonRunner",
    "name": "Marathon Runner",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Running consumes less stamina",
     "Expert effect": "consumes no stamina",
     "Expert unlock": "Level 18"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_MarathonRunner.png"
   },
   {
    "id": "SD_QuickReload_Shotgun",
    "name": "Quick Reload Shotgun",
    "category": "Shotgun",
    "hasUltimate": true,
    "img": "img/skill_SD_QuickReload_Shotgun.png"
   },
   {
    "id": "SD_Mule",
    "name": "Mule",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Increased backpack weight capacity",
     "Expert effect": "greatly increased",
     "Expert unlock": "Level 92"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Mule.png"
   },
   {
    "id": "SD_QuietSteps",
    "name": "Quiet Steps",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Reduced movement noise",
     "Expert effect": "greatly reduced",
     "Expert unlock": "Level 36"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_QuietSteps.png"
   },
   {
    "id": "SD_LongerBattery",
    "name": "Longer Battery",
    "category": "Utility",
    "hasUltimate": true,
    "stats": {
     "Effect": "Greater flashlight battery lifespan",
     "Expert effect": "maximized",
     "Expert unlock": "Level 20"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_LongerBattery.png"
   },
   {
    "id": "SD_Foreman",
    "name": "Foreman",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Kicks deal damage to zombies",
     "Expert effect": "significant damage",
     "Expert unlock": "Level 50"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Foreman.png"
   },
   {
    "id": "SD_WildSlash",
    "name": "Wild Slash",
    "category": "General",
    "hasUltimate": true
   },
   {
    "id": "SD_Butcher",
    "name": "Butcher",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Easier to dismember zombies",
     "Expert effect": "dismember with great ease",
     "Expert unlock": "Level 56"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Butcher.png"
   },
   {
    "id": "SD_Juggler",
    "name": "Juggler",
    "category": "General",
    "hasUltimate": true
   },
   {
    "id": "SD_SkilledMedic",
    "name": "Skilled Medic",
    "category": "Support/Medical",
    "hasUltimate": true,
    "stats": {
     "Effect": "Heal self & others more",
     "Expert effect": "much more",
     "Expert unlock": "Level 88"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_SkilledMedic.png"
   },
   {
    "id": "SD_FaterRevive",
    "name": "Fater Revive",
    "category": "Support/Medical",
    "hasUltimate": true,
    "stats": {
     "Effect": "Revive others faster",
     "Expert effect": "much faster",
     "Expert unlock": "Level 6"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_FaterRevive.png"
   },
   {
    "id": "SD_1hMelee_Hitman",
    "name": "1h Melee Hitman",
    "category": "Melee",
    "hasUltimate": true,
    "stats": {
     "Effect": "1H melee more stamina but more damage",
     "Expert effect": "greatly increased 1H dmg",
     "Expert unlock": "Level 24"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_1hMelee_Hitman.png"
   },
   {
    "id": "SD_OneForOne",
    "name": "One For One",
    "category": "General",
    "hasUltimate": true,
    "img": "img/skill_SD_OneForOne.png"
   },
   {
    "id": "SD_Rifle_Hellfire",
    "name": "Rifle Hellfire",
    "category": "Rifle",
    "hasUltimate": true,
    "stats": {
     "Effect": "Increased hip-fire accuracy w/ rifles",
     "Expert effect": "greatly increased",
     "Expert unlock": "Level 84"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Rifle_Hellfire.png"
   },
   {
    "id": "SD_Grenadier",
    "name": "Grenadier",
    "category": "Throwable",
    "hasUltimate": true,
    "stats": {
     "Effect": "Throwables reduced weight",
     "Expert effect": "greatly reduced",
     "Expert unlock": "Level 10"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Grenadier.png"
   },
   {
    "id": "SD_LuckyPathogen",
    "name": "Lucky Pathogen",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Take less damage while infected",
     "Expert effect": "much less",
     "Expert unlock": "Level 42"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_LuckyPathogen.png"
   },
   {
    "id": "SD_HeavyShoves",
    "name": "Heavy Shoves",
    "category": "Melee",
    "hasUltimate": true,
    "stats": {
     "Effect": "Shoving deals damage",
     "Expert effect": "heavy damage",
     "Expert unlock": "Level 64"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_HeavyShoves.png"
   },
   {
    "id": "SD_Antibodies",
    "name": "Antibodies",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Less likely to be infected by zombies",
     "Expert effect": "Much less likely",
     "Expert unlock": "Level 74"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Antibodies.png"
   },
   {
    "id": "SD_SMG_Winged",
    "name": "SMG Winged",
    "category": "SMG",
    "hasUltimate": true,
    "stats": {
     "Effect": "SMGs increased range",
     "Expert effect": "greatly increased",
     "Expert unlock": "Level 27"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_SMG_Winged.png"
   },
   {
    "id": "SD_DevilsPact",
    "name": "Devils Pact",
    "category": "General",
    "hasUltimate": true
   },
   {
    "id": "SD_QuickReload_Handgun",
    "name": "Quick Reload Handgun",
    "category": "Handgun",
    "hasUltimate": true,
    "img": "img/skill_SD_QuickReload_Handgun.png"
   },
   {
    "id": "SD_CrowdControl",
    "name": "Crowd Control",
    "category": "General",
    "hasUltimate": true
   },
   {
    "id": "SD_2hMelee_HardBlow",
    "name": "2h Melee Hard Blow",
    "category": "Melee",
    "hasUltimate": true,
    "stats": {
     "Effect": "More stagger from 2H melee",
     "Expert effect": "significant stagger",
     "Expert unlock": "Level 40"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_2hMelee_HardBlow.png"
   },
   {
    "id": "SD_Frontliner",
    "name": "Frontliner",
    "category": "General",
    "hasUltimate": true,
    "img": "img/skill_SD_Frontliner.png"
   },
   {
    "id": "SD_TeddyBear",
    "name": "Teddy Bear",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Blunt more stability dmg but less direct",
     "Expert effect": "significantly more stability",
     "Expert unlock": "Level 66"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_TeddyBear.png"
   },
   {
    "id": "SD_Shotgun_Icarus",
    "name": "Shotgun Icarus",
    "category": "Shotgun",
    "hasUltimate": true,
    "stats": {
     "Effect": "Increased shotgun range",
     "Expert effect": "greatly increased",
     "Expert unlock": "Level 14"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Shotgun_Icarus.png"
   },
   {
    "id": "SD_Grab_EfficientHoldout",
    "name": "Grab Efficient Holdout",
    "category": "Survival",
    "hasUltimate": true
   },
   {
    "id": "SD_Shover",
    "name": "Shover",
    "category": "Melee",
    "hasUltimate": true
   },
   {
    "id": "SD_OutdoorChampion",
    "name": "Outdoor Champion",
    "category": "General",
    "hasUltimate": true,
    "img": "img/skill_SD_OutdoorChampion.png"
   },
   {
    "id": "SD_Handgun_QuickAim",
    "name": "Handgun Quick Aim",
    "category": "Handgun",
    "hasUltimate": true
   },
   {
    "id": "SD_ResidentGeneTherapy",
    "name": "Resident Gene Therapy",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Heal when using pills",
     "Expert effect": "heal w/ pills AND gene therapy",
     "Expert unlock": "Level 38"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_ResidentGeneTherapy.png"
   },
   {
    "id": "SD_SupplyStack",
    "name": "Supply Stack",
    "category": "General",
    "hasUltimate": true,
    "img": "img/skill_SD_SupplyStack.png"
   },
   {
    "id": "SD_Handgun_Headblown",
    "name": "Handgun Headblown",
    "category": "Handgun",
    "hasUltimate": true,
    "stats": {
     "Effect": "Handguns increased headshot damage",
     "Expert effect": "greatly increased",
     "Expert unlock": "Level 12"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Handgun_Headblown.png"
   },
   {
    "id": "SD_ThickSkin",
    "name": "Thick Skin",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Increased max health",
     "Expert effect": "significantly increased",
     "Expert unlock": "Level 48"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_ThickSkin.png"
   },
   {
    "id": "SD_Averaging",
    "name": "Averaging",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Headshots deal less, body shots more",
     "Expert effect": "body shots greatly more",
     "Expert unlock": "Level 62"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Averaging.png"
   },
   {
    "id": "SD_Wicked",
    "name": "Wicked",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Handguns more limb damage",
     "Expert effect": "much more",
     "Expert unlock": "Level 49"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Wicked.png"
   },
   {
    "id": "SD_MoreAmmo",
    "name": "More Ammo",
    "category": "Utility",
    "hasUltimate": true
   },
   {
    "id": "SD_Shotgun_TightShot",
    "name": "Shotgun Tight Shot",
    "category": "Shotgun",
    "hasUltimate": true,
    "stats": {
     "Effect": "Shotgun pellets reduced spread",
     "Expert effect": "greatly reduced",
     "Expert unlock": "Level 68"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Shotgun_TightShot.png"
   },
   {
    "id": "SD_Sniper_PenetratingShot",
    "name": "Sniper Penetrating Shot",
    "category": "Sniper",
    "hasUltimate": true,
    "stats": {
     "Effect": "Heavy rifles penetrate more",
     "Expert effect": "many more",
     "Expert unlock": "Level 60"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Sniper_PenetratingShot.png"
   },
   {
    "id": "SD_2hMelee_HeavyAttackRush",
    "name": "2h Melee Heavy Attack Rush",
    "category": "Melee",
    "hasUltimate": true,
    "stats": {
     "Effect": "2H heavy melee use less stamina",
     "Expert effect": "much less",
     "Expert unlock": "Level 2"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_2hMelee_HeavyAttackRush.png"
   },
   {
    "id": "SD_Headhunter",
    "name": "Headhunter",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Increased melee headshot damage",
     "Expert effect": "greatly increased",
     "Expert unlock": "Level 80"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Headhunter.png"
   },
   {
    "id": "SD_ScalesofJustice",
    "name": "Scalesof Justice",
    "category": "General",
    "hasUltimate": true
   },
   {
    "id": "SD_Rifle_ReducedRecoil_Crouch",
    "name": "Rifle Reduced Recoil Crouch",
    "category": "Rifle",
    "hasUltimate": true,
    "stats": {
     "Effect": "Rifle recoil reduced",
     "Expert effect": "greatly reduced while crouching",
     "Expert unlock": "Level 76"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Rifle_ReducedRecoil_Crouch.png"
   },
   {
    "id": "SD_Handgun_SteadyHand",
    "name": "Handgun Steady Hand",
    "category": "Handgun",
    "hasUltimate": true,
    "stats": {
     "Effect": "Handgun spread reduced",
     "Expert effect": "greatly reduced",
     "Expert unlock": "Level 49"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Handgun_SteadyHand.png"
   },
   {
    "id": "SD_Sniper_StableShot",
    "name": "Sniper Stable Shot",
    "category": "Sniper",
    "hasUltimate": true
   },
   {
    "id": "SD_SMG_ReducedRecoil",
    "name": "SMG Reduced Recoil",
    "category": "SMG",
    "hasUltimate": true,
    "stats": {
     "Effect": "SMGs reduced recoil",
     "Expert effect": "greatly reduced",
     "Expert unlock": "Level 31"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_SMG_ReducedRecoil.png"
   },
   {
    "id": "SD_Rifle_Mohawk",
    "name": "Rifle Mohawk",
    "category": "Rifle",
    "hasUltimate": true,
    "stats": {
     "Effect": "Rifles penetrate more targets",
     "Expert effect": "many more",
     "Expert unlock": "Level 22"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Rifle_Mohawk.png"
   },
   {
    "id": "SD_LuckyLooter",
    "name": "Lucky Looter",
    "category": "Utility",
    "hasUltimate": false
   },
   {
    "id": "SD_Guts",
    "name": "Guts",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Recover faster from out-of-stamina",
     "Expert effect": "much faster",
     "Expert unlock": "Level 34"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Guts.png"
   },
   {
    "id": "SD_LighterHealing",
    "name": "Lighter Healing",
    "category": "Support/Medical",
    "hasUltimate": true,
    "stats": {
     "Effect": "Medical items reduced weight",
     "Expert effect": "greatly reduced",
     "Expert unlock": "Level 52"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_LighterHealing.png"
   },
   {
    "id": "SD_Deprived",
    "name": "Deprived",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Max weight reduced but more health & stamina",
     "Expert effect": "greatly reduced weight",
     "Expert unlock": "Level 58"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Deprived.png"
   },
   {
    "id": "SD_Limbo",
    "name": "Limbo",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Survive longer when down",
     "Expert effect": "greater endurance when down",
     "Expert unlock": "Level 16"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Limbo.png"
   },
   {
    "id": "SD_Builder",
    "name": "Builder",
    "category": "Utility",
    "hasUltimate": true,
    "stats": {
     "Effect": "Utility items reduced weight",
     "Expert effect": "greatly reduced",
     "Expert unlock": "Level 71"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_Builder.png"
   },
   {
    "id": "SD_SturdyBody",
    "name": "Sturdy Body",
    "category": "General",
    "hasUltimate": true,
    "stats": {
     "Effect": "Reduced damage from attacks",
     "Expert effect": "greatly reduced",
     "Expert unlock": "Level 100"
    },
    "statSource": "fandom",
    "img": "img/skill_SD_SturdyBody.png"
   }
  ],
  "firearms": [
   {
    "id": "AES_Winchester_1873",
    "name": "Winchester 1873",
    "raw": "AES_Winchester_1873",
    "caliber": ".357 Magnum",
    "statsExpected": true,
    "stats": {
     "Damage": "24",
     "Headshot Damage": "100",
     "Limb Damage": "20",
     "Stability Damage": "20",
     "Ammo Capacity": "13",
     "Rate Of Fire": "0",
     "Max Penetrations": "2",
     "Range": "10000",
     "Max Spread Degrees": "20"
    },
    "allStats": {
     "Ammo Capacity": "13",
     "Ammo Chamberable": "1",
     "Cooldown": "1",
     "Crouching Spread Multiplier": "0.7",
     "Damage": "24",
     "Damage Falloff Per Penetration": "0",
     "Generic Damage Force": "1300",
     "Headshot Damage": "100",
     "Initial ADS Spread": "2.5",
     "Iron Recoil Strength": "0.8",
     "Limb Damage": "20",
     "Max Penetrations": "2",
     "Max Spread Degrees": "20",
     "Moving Spread Multiplier": "1.05",
     "Per Shot Spread Increase": "2",
     "Range": "10000",
     "Rate Of Fire": "0",
     "Recoil Decay Full Percent": "0.8",
     "Recoil Decay Percent": "1",
     "Recoil Decay Roll Over Correction Count": "2",
     "Recoil Decay Time": "1.25",
     "Recoil Limit Pitch": "6",
     "Recoil Limit Roll Max": "0",
     "Recoil Limit Roll Min": "0",
     "Recoil Limit Yaw Max": "0.5",
     "Recoil Limit Yaw Min": "0.2",
     "Recoil Pitch": "2",
     "Recoil Pitch First Shot": "1.5",
     "Recoil Roll Max": "0",
     "Recoil Roll Min": "0",
     "Recoil Yaw First Shot": "0.1",
     "Recoil Yaw Max": "0.4",
     "Recoil Yaw Min": "0.2",
     "Spread Decay Delay": "0.6",
     "Spread Decay Rate": "1",
     "Spread Direction Degrees": "5",
     "Spread Gain Time": "0.1",
     "Stability Damage": "20",
     "Stability Falloff Per Penetration": "0",
     "Targeting Spread Multiplier": "0.1"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 1,
       "body": 3
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 1,
       "body": 5
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 2,
       "body": 5
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 2,
       "body": 6
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 3,
       "body": 13
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 6,
       "body": 25
      }
     ],
     "onetap": "One shot to the head drops anything up to a Runner"
    },
    "img": "img/AES_Winchester_1873.png",
    "ammoIcon": "img/ammo_357Mag.png"
   },
   {
    "id": "AES_1911",
    "name": "1911",
    "raw": "AES_1911",
    "caliber": ".45 ACP",
    "statsExpected": true,
    "stats": {
     "Damage": "20",
     "Headshot Damage": "100",
     "Limb Damage": "20",
     "Stability Damage": "25",
     "Ammo Capacity": "7",
     "Rate Of Fire": "0.02",
     "Range": "4000",
     "Max Spread Degrees": "18"
    },
    "allStats": {
     "Ammo Capacity": "7",
     "Ammo Chamberable": "1",
     "Cooldown": "0",
     "Crouching Spread Multiplier": "0.5",
     "Damage": "20",
     "Damage Falloff Per Penetration": "0",
     "Generic Damage Force": "1000",
     "Headshot Damage": "100",
     "Initial ADS Spread": "7",
     "Iron Recoil Strength": "0.8",
     "Limb Damage": "20",
     "Max Spread Degrees": "18",
     "Moving Spread Multiplier": "1.05",
     "Per Shot Spread Increase": "1.3",
     "Range": "4000",
     "Rate Of Fire": "0.02",
     "Recoil Decay Delay": "0",
     "Recoil Decay Roll Over Correction Count": "0",
     "Recoil Decay Roll Over Correction Percent": "0",
     "Recoil Decay Time": "1",
     "Recoil Limit Pitch": "6",
     "Recoil Limit Roll Max": "5",
     "Recoil Limit Roll Min": "0.5",
     "Recoil Limit Yaw Max": "0.4",
     "Recoil Limit Yaw Min": "0.2",
     "Recoil Pitch": "1.25",
     "Recoil Pitch First Shot": "2.5",
     "Recoil Roll Max": "0",
     "Recoil Roll Min": "0",
     "Recoil Yaw First Shot": "0.3",
     "Recoil Yaw Max": "0.3",
     "Recoil Yaw Min": "0.15",
     "Spread Decay Delay": "0",
     "Spread Decay Rate": "1.5",
     "Spread Direction Degrees": "9",
     "Stability Damage": "25",
     "Stability Falloff Per Penetration": "0",
     "Targeting Spread Multiplier": "0.1"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 1,
       "body": 4
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 1,
       "body": 5
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 2,
       "body": 6
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 2,
       "body": 7
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 3,
       "body": 15
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 6,
       "body": 30
      }
     ],
     "onetap": "One shot to the head drops anything up to a Runner"
    },
    "img": "img/AES_1911.png",
    "ammoIcon": "img/ammo_45ACP.png"
   },
   {
    "id": "AES_590A1",
    "name": "590A1",
    "raw": "AES_590A1",
    "caliber": "12 Gauge",
    "statsExpected": true,
    "stats": {
     "Damage": "17",
     "Headshot Damage": "20",
     "Bullets Per Shot": "10",
     "Limb Damage": "15",
     "Stability Damage": "10",
     "Max Penetrations": "1",
     "Range": "3000",
     "Max Spread Degrees": "25"
    },
    "allStats": {
     "Bullets Per Shot": "10",
     "Cooldown": "0.8",
     "Crouching Spread Multiplier": "0.6",
     "Damage": "17",
     "Damage Falloff Per Penetration": "0.8",
     "Generic Damage Force": "4000",
     "Headshot Damage": "20",
     "Initial ADS Spread": "2",
     "Iron Recoil Strength": "0.75",
     "Limb Damage": "15",
     "Max Penetrations": "1",
     "Max Spread Degrees": "25",
     "Moving Spread Multiplier": "1.1",
     "Pellet Spread Degrees": "2.15",
     "Per Shot Spread Increase": "6",
     "Range": "3000",
     "Recoil Decay Delay": "1",
     "Recoil Decay Full Percent": "0.2",
     "Recoil Decay Percent": "0.2",
     "Recoil Decay Pitch Over Correction Percent": "2",
     "Recoil Decay Roll Over Correction Count": "2",
     "Recoil Decay Time": "1.25",
     "Recoil Limit Pitch": "10",
     "Recoil Limit Yaw Max": "5",
     "Recoil Limit Yaw Min": "2",
     "Recoil Pitch": "4.5",
     "Recoil Pitch First Shot": "5",
     "Recoil Yaw First Shot": "0.4",
     "Recoil Yaw Max": "0.3",
     "Recoil Yaw Min": "0.3",
     "Spread Decay Rate": "0.6",
     "Spread Direction Degrees": "3.5",
     "Stability Damage": "10",
     "Stability Falloff Per Penetration": "0.05",
     "Targeting Spread Multiplier": "0.3"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child → Walker Prime",
       "hp": "30–130",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 2,
       "body": 2
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 3,
       "body": 4
      }
     ],
     "note": "Full blast: 10 pellets × 17 = 170 dmg (200 head), all pellets on target",
     "onetap": "One shot to the head drops anything up to a Walker Prime"
    },
    "img": "img/AES_590A1.png",
    "ammoIcon": "img/ammo_12gaShells.png"
   },
   {
    "id": "AES_870",
    "name": "870",
    "raw": "AES_870",
    "statsExpected": true
   },
   {
    "id": "AES_AP85",
    "name": "AP85",
    "raw": "AES_AP85",
    "statsExpected": true
   },
   {
    "id": "AES_BauerPrecision",
    "name": "Bauer Precision",
    "raw": "AES_BauerPrecision",
    "statsExpected": true,
    "stats": {
     "Damage": "50",
     "Headshot Damage": "100",
     "Limb Damage": "30",
     "Stability Damage": "40",
     "Ammo Capacity": "10",
     "Rate Of Fire": "0.033",
     "Max Penetrations": "1",
     "Max Spread Degrees": "3"
    },
    "allStats": {
     "Ammo Capacity": "10",
     "Ammo Chamberable": "1",
     "Damage": "50",
     "Headshot Damage": "100",
     "Limb Damage": "30",
     "Max Burst Count": "3",
     "Max Penetrations": "1",
     "Max Spread Degrees": "3",
     "Moving Spread Multiplier": "1.1",
     "Per Shot Spread Increase": "0.4",
     "Rate Of Fire": "0.033",
     "Recoil Limit Pitch": "5",
     "Recoil Limit Roll Max": "1",
     "Recoil Limit Roll Min": "1",
     "Recoil Pitch": "0.3",
     "Recoil Pitch First Shot": "1.2",
     "Recoil Roll Max": "1.5",
     "Recoil Roll Min": "1.5",
     "Spread Degrees": "2",
     "Stability Damage": "40"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler → Runner",
       "hp": "70–100",
       "head": 1,
       "body": 2
      },
      {
       "label": "Runner Prime / Walker Prime",
       "hp": "120–130",
       "head": 2,
       "body": 3
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 3,
       "body": 6
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 6,
       "body": 12
      }
     ],
     "onetap": "One shot to the head drops anything up to a Runner"
    }
   },
   {
    "id": "AES_Bull",
    "name": "Bull",
    "raw": "AES_Bull",
    "statsExpected": true
   },
   {
    "id": "AES_CoachGun",
    "name": "Coach Gun",
    "raw": "AES_CoachGun",
    "caliber": "12 Gauge",
    "statsExpected": true,
    "ammoIcon": "img/ammo_12gaShells.png"
   },
   {
    "id": "AES_CX8",
    "name": "CX8",
    "raw": "AES_CX8",
    "statsExpected": true
   },
   {
    "id": "AES_DT11",
    "name": "DT11",
    "raw": "AES_DT11",
    "statsExpected": true,
    "stats": {
     "Damage": "17",
     "Headshot Damage": "20",
     "Bullets Per Shot": "10",
     "Limb Damage": "15",
     "Stability Damage": "15",
     "Ammo Capacity": "2",
     "Rate Of Fire": "0.2",
     "Max Penetrations": "1",
     "Range": "3000",
     "Max Spread Degrees": "15"
    },
    "allStats": {
     "Ammo Capacity": "2",
     "Bullets Per Shot": "10",
     "Cooldown": "0",
     "Crouching Spread Multiplier": "0.6",
     "Damage": "17",
     "Damage Falloff Per Penetration": "0.8",
     "Generic Damage Force": "4000",
     "Headshot Damage": "20",
     "Initial ADS Spread": "3",
     "Iron Recoil Strength": "0.8",
     "Limb Damage": "15",
     "Max Penetrations": "1",
     "Max Spread Degrees": "15",
     "Moving Spread Multiplier": "1.2",
     "Pellet Spread Degrees": "2",
     "Per Shot Spread Increase": "2",
     "Range": "3000",
     "Rate Of Fire": "0.2",
     "Recoil Decay Delay": "0",
     "Recoil Decay Full Percent": "0.6",
     "Recoil Decay Percent": "0.6",
     "Recoil Decay Pitch Over Correction Percent": "1",
     "Recoil Decay Roll Over Correction Count": "2",
     "Recoil Decay Time": "1.25",
     "Recoil Limit Pitch": "12",
     "Recoil Limit Yaw Max": "2",
     "Recoil Limit Yaw Min": "2",
     "Recoil Pitch": "6",
     "Recoil Pitch First Shot": "5",
     "Recoil Yaw First Shot": "1",
     "Recoil Yaw Max": "0.3",
     "Recoil Yaw Min": "0.3",
     "Spread Decay Rate": "0.75",
     "Spread Direction Degrees": "4",
     "Stability Damage": "15",
     "Stability Falloff Per Penetration": "0.05",
     "Targeting Spread Multiplier": "0.4"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child → Walker Prime",
       "hp": "30–130",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 2,
       "body": 2
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 3,
       "body": 4
      }
     ],
     "note": "Full blast: 10 pellets × 17 = 170 dmg (200 head), all pellets on target",
     "onetap": "One shot to the head drops anything up to a Walker Prime"
    },
    "img": "img/AES_DT11.png"
   },
   {
    "id": "AES_Eder17",
    "name": "Eder17",
    "raw": "AES_Eder17",
    "statsExpected": true
   },
   {
    "id": "AES_FAL",
    "name": "FAL",
    "raw": "AES_FAL",
    "statsExpected": true
   },
   {
    "id": "AES_Gruber922",
    "name": "Gruber922",
    "raw": "AES_Gruber922",
    "statsExpected": true,
    "stats": {
     "Damage": "12",
     "Headshot Damage": "35",
     "Limb Damage": "8",
     "Stability Damage": "10",
     "Ammo Capacity": "25",
     "Rate Of Fire": "0.04",
     "Max Penetrations": "0",
     "Range": "5000",
     "Max Spread Degrees": "10"
    },
    "allStats": {
     "Ammo Capacity": "25",
     "Ammo Chamberable": "1",
     "Cooldown": "0",
     "Crouching Spread Multiplier": "0.5",
     "Damage": "12",
     "Generic Damage Force": "500",
     "Headshot Damage": "35",
     "Initial ADS Spread": "4.5",
     "Limb Damage": "8",
     "Max Penetrations": "0",
     "Max Spread Degrees": "10",
     "Moving Spread Multiplier": "1.05",
     "Per Shot Spread Increase": "0.2",
     "Range": "5000",
     "Rate Of Fire": "0.04",
     "Recoil Decay Delay": "0",
     "Recoil Decay Full Percent": "1",
     "Recoil Decay Percent": "1",
     "Recoil Decay Roll Over Correction Count": "0.5",
     "Recoil Decay Time": "0.5",
     "Recoil Limit Pitch": "4",
     "Recoil Limit Roll Max": "1.5",
     "Recoil Limit Roll Min": "1.5",
     "Recoil Limit Yaw Max": "0",
     "Recoil Limit Yaw Min": "0",
     "Recoil Pitch": "0.2",
     "Recoil Pitch First Shot": "0.2",
     "Recoil Roll Max": "1.5",
     "Recoil Roll Min": "1.5",
     "Recoil Yaw Max": "0",
     "Recoil Yaw Min": "0",
     "Spread Decay Delay": "0",
     "Spread Decay Rate": "1.5",
     "Spread Direction Degrees": "5",
     "Spread Gain Time": "0.1",
     "Stability Damage": "10",
     "Targeting Spread Multiplier": "0.15"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 3
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 6
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 3,
       "body": 9
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 4,
       "body": 10
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 4,
       "body": 11
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 9,
       "body": 25
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 18,
       "body": 50
      }
     ],
     "onetap": "One shot to the head drops anything up to a Child"
    },
    "img": "img/AES_Gruber922.png"
   },
   {
    "id": "AES_GruberMkVII",
    "name": "Gruber Mk VII",
    "raw": "AES_GruberMkVII",
    "statsExpected": true,
    "stats": {
     "Damage": "12",
     "Headshot Damage": "35",
     "Limb Damage": "8",
     "Stability Damage": "10",
     "Ammo Capacity": "10",
     "Rate Of Fire": "0.02",
     "Range": "4500",
     "Max Spread Degrees": "12"
    },
    "allStats": {
     "Ammo Capacity": "10",
     "Ammo Chamberable": "1",
     "Crouching Spread Multiplier": "0.5",
     "Damage": "12",
     "Damage Falloff Per Penetration": "0",
     "Headshot Damage": "35",
     "Initial ADS Spread": "9",
     "Iron Recoil Strength": "0.8",
     "Limb Damage": "8",
     "Max Spread Degrees": "12",
     "Moving Spread Multiplier": "1.15",
     "Per Shot Spread Increase": "0.5",
     "Range": "4500",
     "Rate Of Fire": "0.02",
     "Recoil Decay Delay": "0.2",
     "Recoil Decay Roll Over Correction Count": "0",
     "Recoil Decay Roll Over Correction Percent": "0",
     "Recoil Decay Time": "0.5",
     "Recoil Limit Pitch": "6",
     "Recoil Limit Roll Max": "5",
     "Recoil Limit Roll Min": "0.5",
     "Recoil Limit Yaw Max": "0.4",
     "Recoil Limit Yaw Min": "0.2",
     "Recoil Pitch": "0.5",
     "Recoil Pitch First Shot": "0.5",
     "Recoil Roll Max": "0",
     "Recoil Roll Min": "0",
     "Recoil Yaw First Shot": "0.04",
     "Recoil Yaw Max": "0",
     "Recoil Yaw Min": "0",
     "Spread Decay Delay": "0",
     "Spread Decay Rate": "1",
     "Spread Direction Degrees": "8",
     "Stability Damage": "10",
     "Stability Falloff Per Penetration": "0",
     "Targeting Spread Multiplier": "0.15"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 3
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 6
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 3,
       "body": 9
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 4,
       "body": 10
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 4,
       "body": 11
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 9,
       "body": 25
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 18,
       "body": 50
      }
     ],
     "onetap": "One shot to the head drops anything up to a Child"
    },
    "img": "img/AES_GruberMkVII.png"
   },
   {
    "id": "AES_GruberRanch",
    "name": "Gruber Ranch",
    "raw": "AES_GruberRanch",
    "statsExpected": true,
    "stats": {
     "Damage": "20",
     "Headshot Damage": "130",
     "Limb Damage": "15",
     "Stability Damage": "25",
     "Ammo Capacity": "10",
     "Rate Of Fire": "0.05",
     "Max Penetrations": "2",
     "Range": "10000",
     "Max Spread Degrees": "12"
    },
    "allStats": {
     "Ammo Capacity": "10",
     "Ammo Chamberable": "1",
     "Cooldown": "0",
     "Crouching Spread Multiplier": "0.5",
     "Damage": "20",
     "Damage Falloff Per Penetration": "0.5",
     "Generic Damage Force": "1750",
     "Headshot Damage": "130",
     "Initial ADS Spread": "2",
     "Limb Damage": "15",
     "Max Penetrations": "2",
     "Max Spread Degrees": "12",
     "Moving Spread Multiplier": "1.1",
     "Per Shot Spread Increase": "1.5",
     "Range": "10000",
     "Rate Of Fire": "0.05",
     "Recoil Decay Delay": "0.15",
     "Recoil Decay Full Percent": "1",
     "Recoil Decay Percent": "0.8",
     "Recoil Decay Roll Over Correction Count": "0.1",
     "Recoil Decay Time": "0.15",
     "Recoil Limit Pitch": "6",
     "Recoil Limit Roll Max": "1.5",
     "Recoil Limit Roll Min": "1.5",
     "Recoil Limit Yaw Max": "0.3",
     "Recoil Limit Yaw Min": "0",
     "Recoil Pitch": "0.3",
     "Recoil Pitch First Shot": "1",
     "Recoil Roll Max": "0.75",
     "Recoil Roll Min": "0.75",
     "Recoil Yaw Max": "0.2",
     "Recoil Yaw Min": "0.1",
     "Sound Range": "5000",
     "Sound Stimuli Effectiveness": "5000",
     "Spread Decay Delay": "0",
     "Spread Decay Rate": "1.6",
     "Spread Direction Degrees": "3.5",
     "Spread Gain Time": "0.1",
     "Stability Damage": "25",
     "Stability Falloff Per Penetration": "0.5",
     "Targeting Spread Multiplier": "0.15"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 1,
       "body": 4
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 1,
       "body": 5
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 1,
       "body": 6
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 1,
       "body": 7
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 3,
       "body": 15
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 5,
       "body": 30
      }
     ],
     "onetap": "One shot to the head drops anything up to a Walker Prime"
    },
    "img": "img/AES_GruberRanch.png"
   },
   {
    "id": "AES_Hunter85",
    "name": "Hunter85",
    "raw": "AES_Hunter85",
    "caliber": ".308 Win",
    "statsExpected": true,
    "stats": {
     "Damage": "35",
     "Headshot Damage": "150",
     "Limb Damage": "50",
     "Stability Damage": "80",
     "Ammo Capacity": "5",
     "Rate Of Fire": "1.5",
     "Max Penetrations": "3",
     "Max Spread Degrees": "14"
    },
    "allStats": {
     "Ammo Capacity": "5",
     "Ammo Chamberable": "1",
     "Cooldown": "1.1",
     "Crouching Spread Multiplier": "0.5",
     "Damage": "35",
     "Damage Falloff Per Penetration": "0.3",
     "Generic Damage Force": "2500",
     "Headshot Damage": "150",
     "Initial ADS Spread": "1.5",
     "Limb Damage": "50",
     "Max Penetrations": "3",
     "Max Spread Degrees": "14",
     "Moving Spread Multiplier": "1.2",
     "Per Shot Spread Increase": "2.5",
     "Rate Of Fire": "1.5",
     "Recoil Decay Full Percent": "1",
     "Recoil Decay Percent": "0.75",
     "Recoil Decay Roll Over Correction Count": "2",
     "Recoil Decay Time": "1",
     "Recoil Limit Pitch": "8",
     "Recoil Limit Roll Max": "1",
     "Recoil Limit Roll Min": "0.5",
     "Recoil Limit Yaw Max": "0",
     "Recoil Limit Yaw Min": "0",
     "Recoil Pitch": "5",
     "Recoil Pitch First Shot": "4",
     "Recoil Roll Max": "1",
     "Recoil Roll Min": "0.5",
     "Recoil Yaw Max": "0",
     "Recoil Yaw Min": "0",
     "Spread Decay Delay": "0.5",
     "Spread Decay Rate": "1",
     "Spread Direction Degrees": "4",
     "Spread Gain Time": "0.1",
     "Stability Damage": "80",
     "Stability Falloff Per Penetration": "0.3",
     "Targeting Spread Multiplier": "0.1"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 1,
       "body": 2
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 1,
       "body": 3
      },
      {
       "label": "Runner Prime / Walker Prime",
       "hp": "120–130",
       "head": 1,
       "body": 4
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 2,
       "body": 9
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 4,
       "body": 18
      }
     ],
     "onetap": "One shot to the head drops anything up to a Walker Prime"
    },
    "img": "img/AES_Hunter85.png",
    "ammoIcon": "img/ammo_308Win.png"
   },
   {
    "id": "AES_LeeEnfield",
    "name": "Lee Enfield",
    "raw": "AES_LeeEnfield",
    "statsExpected": true
   },
   {
    "id": "AES_M1014",
    "name": "M1014",
    "raw": "AES_M1014",
    "statsExpected": true
   },
   {
    "id": "AES_M14",
    "name": "M14",
    "raw": "AES_M14",
    "caliber": ".308 Win",
    "statsExpected": true,
    "stats": {
     "Damage": "35",
     "Headshot Damage": "150",
     "Limb Damage": "50",
     "Stability Damage": "50",
     "Ammo Capacity": "20",
     "Rate Of Fire": "0.05",
     "Max Penetrations": "3",
     "Range": "10000",
     "Max Spread Degrees": "25"
    },
    "allStats": {
     "Ammo Capacity": "20",
     "Ammo Chamberable": "1",
     "Crouching Spread Multiplier": "0.5",
     "Damage": "35",
     "Damage Falloff Per Penetration": "0.3",
     "Generic Damage Force": "2500",
     "Headshot Damage": "150",
     "Initial ADS Spread": "1.5",
     "Limb Damage": "50",
     "Max Penetrations": "3",
     "Max Spread Degrees": "25",
     "Moving Spread Multiplier": "1.3",
     "Per Shot Spread Increase": "4",
     "Range": "10000",
     "Rate Of Fire": "0.05",
     "Recoil Decay Delay": "0.15",
     "Recoil Decay Full Percent": "0.7",
     "Recoil Decay Percent": "0.7",
     "Recoil Decay Time": "0.3",
     "Recoil Limit Pitch": "6",
     "Recoil Limit Roll Max": "1",
     "Recoil Limit Roll Min": "1",
     "Recoil Limit Yaw Max": "0.65",
     "Recoil Limit Yaw Min": "0.4",
     "Recoil Pitch": "0.5",
     "Recoil Pitch First Shot": "1.2",
     "Recoil Roll Max": "1.5",
     "Recoil Roll Min": "1.5",
     "Recoil Yaw Max": "0.3",
     "Recoil Yaw Min": "0.2",
     "Spread Decay Delay": "0.1",
     "Spread Decay Rate": "0.9",
     "Spread Direction Degrees": "4",
     "Spread Gain Time": "0.1",
     "Stability Damage": "50",
     "Stability Falloff Per Penetration": "0.3",
     "Targeting Spread Multiplier": "0.15"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 1,
       "body": 2
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 1,
       "body": 3
      },
      {
       "label": "Runner Prime / Walker Prime",
       "hp": "120–130",
       "head": 1,
       "body": 4
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 2,
       "body": 9
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 4,
       "body": 18
      }
     ],
     "onetap": "One shot to the head drops anything up to a Walker Prime"
    },
    "img": "img/AES_M14.png",
    "ammoIcon": "img/ammo_308Win.png"
   },
   {
    "id": "AES_M16A4",
    "name": "M16A4",
    "raw": "AES_M16A4",
    "statsExpected": true,
    "img": "img/AES_M16A4.png"
   },
   {
    "id": "AES_M1Garand",
    "name": "M1Garand",
    "raw": "AES_M1Garand",
    "statsExpected": true,
    "img": "img/AES_M1Garand.png"
   },
   {
    "id": "AES_M7",
    "name": "M7",
    "raw": "AES_M7",
    "caliber": "6.8x51mm",
    "statsExpected": true,
    "stats": {
     "Damage": "40",
     "Headshot Damage": "150",
     "Limb Damage": "20",
     "Stability Damage": "25",
     "Ammo Capacity": "20",
     "Rate Of Fire": "0.05",
     "Max Penetrations": "3",
     "Range": "10000",
     "Max Spread Degrees": "20"
    },
    "allStats": {
     "Ammo Capacity": "20",
     "Ammo Chamberable": "1",
     "Cooldown": "0",
     "Crouching Spread Multiplier": "0.5",
     "Damage": "40",
     "Damage Falloff Per Penetration": "0.15",
     "Generic Damage Force": "2200",
     "Headshot Damage": "150",
     "Initial ADS Spread": "3.5",
     "Iron Recoil Strength": "0.7",
     "Limb Damage": "20",
     "Max Burst Count": "3",
     "Max Penetrations": "3",
     "Max Spread Degrees": "20",
     "Moving Spread Multiplier": "0.9",
     "Per Shot Spread Increase": "0.5",
     "Range": "10000",
     "Rate Of Fire": "0.05",
     "Recoil Decay Delay": "0",
     "Recoil Decay Full Percent": "0.2",
     "Recoil Decay Percent": "0.4",
     "Recoil Decay Time": "0.65",
     "Recoil Limit Pitch": "12",
     "Recoil Limit Roll Max": "1",
     "Recoil Limit Roll Min": "1",
     "Recoil Limit Yaw Max": "0.5",
     "Recoil Limit Yaw Min": "0.1",
     "Recoil Pitch": "0.25",
     "Recoil Pitch First Shot": "0.5",
     "Recoil Roll Max": "0",
     "Recoil Roll Min": "0",
     "Recoil Yaw Max": "0.4",
     "Recoil Yaw Min": "0.1",
     "Spread Decay Delay": "0",
     "Spread Decay Rate": "1.1",
     "Spread Direction Degrees": "5",
     "Spread Gain Time": "0.1",
     "Stability Damage": "25",
     "Targeting Spread Multiplier": "0.2"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 1,
       "body": 2
      },
      {
       "label": "Walker → Runner Prime",
       "hp": "100–120",
       "head": 1,
       "body": 3
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 1,
       "body": 4
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 2,
       "body": 8
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 4,
       "body": 15
      }
     ],
     "onetap": "One shot to the head drops anything up to a Walker Prime"
    },
    "img": "img/AES_M7.png",
    "ammoIcon": "img/ammo_68x51mm.png"
   },
   {
    "id": "AES_M9A1",
    "name": "M9A1",
    "raw": "AES_M9A1",
    "caliber": "9mm",
    "statsExpected": true,
    "stats": {
     "Damage": "15",
     "Headshot Damage": "50",
     "Limb Damage": "20",
     "Stability Damage": "20",
     "Ammo Capacity": "15",
     "Rate Of Fire": "0.02",
     "Range": "4500",
     "Max Spread Degrees": "13"
    },
    "allStats": {
     "Ammo Capacity": "15",
     "Ammo Chamberable": "1",
     "Cooldown": "0",
     "Crouching Spread Multiplier": "0.5",
     "Damage": "15",
     "Damage Falloff Per Penetration": "0",
     "Generic Damage Force": "850",
     "Headshot Damage": "50",
     "Initial ADS Spread": "7",
     "Iron Recoil Strength": "0.8",
     "Limb Damage": "20",
     "Max Spread Degrees": "13",
     "Moving Spread Multiplier": "1.3",
     "Per Shot Spread Increase": "0.4",
     "Range": "4500",
     "Rate Of Fire": "0.02",
     "Recoil Decay Roll Over Correction Count": "0",
     "Recoil Decay Roll Over Correction Percent": "0",
     "Recoil Decay Time": "0.8",
     "Recoil Limit Pitch": "6",
     "Recoil Limit Roll Max": "5",
     "Recoil Limit Roll Min": "0.5",
     "Recoil Limit Yaw Max": "0.5",
     "Recoil Limit Yaw Min": "0.2",
     "Recoil Pitch": "0.75",
     "Recoil Pitch First Shot": "1.5",
     "Recoil Roll Max": "0",
     "Recoil Roll Min": "0",
     "Recoil Yaw Max": "0.3",
     "Recoil Yaw Min": "0.15",
     "Spread Decay Delay": "0",
     "Spread Decay Rate": "1.6",
     "Spread Direction Degrees": "7.5",
     "Stability Damage": "20",
     "Stability Falloff Per Penetration": "0",
     "Targeting Spread Multiplier": "0.15"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 5
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 2,
       "body": 7
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 3,
       "body": 8
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 3,
       "body": 9
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 6,
       "body": 20
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 12,
       "body": 40
      }
     ],
     "onetap": "One shot to the head drops anything up to a Child"
    },
    "img": "img/AES_M9A1.png",
    "ammoIcon": "img/ammo_9mm.png"
   },
   {
    "id": "AES_Martial",
    "name": "Martial",
    "raw": "AES_Martial",
    "statsExpected": true
   },
   {
    "id": "AES_MC15",
    "name": "MC15",
    "raw": "AES_MC15",
    "caliber": "5.56mm",
    "statsExpected": true,
    "stats": {
     "Damage": "20",
     "Headshot Damage": "130",
     "Limb Damage": "15",
     "Stability Damage": "25",
     "Ammo Capacity": "30",
     "Rate Of Fire": "0.05",
     "Max Penetrations": "2",
     "Range": "10000",
     "Max Spread Degrees": "15"
    },
    "allStats": {
     "Ammo Capacity": "30",
     "Ammo Chamberable": "1",
     "Cooldown": "0",
     "Crouching Spread Multiplier": "0.4",
     "Damage": "20",
     "Damage Falloff Per Penetration": "0.3",
     "Generic Damage Force": "1750",
     "Headshot Damage": "130",
     "Initial ADS Spread": "2",
     "Limb Damage": "15",
     "Max Penetrations": "2",
     "Max Spread Degrees": "15",
     "Moving Spread Multiplier": "1.1",
     "Per Shot Spread Increase": "1.1",
     "Range": "10000",
     "Rate Of Fire": "0.05",
     "Recoil Decay Delay": "0",
     "Recoil Decay Full Percent": "0.85",
     "Recoil Decay Percent": "1",
     "Recoil Decay Roll Over Correction Count": "0",
     "Recoil Decay Time": "0.15",
     "Recoil Limit Pitch": "8",
     "Recoil Limit Roll Max": "0",
     "Recoil Limit Roll Min": "0",
     "Recoil Limit Yaw Max": "0.6",
     "Recoil Limit Yaw Min": "0.4",
     "Recoil Pitch": "0.3",
     "Recoil Pitch First Shot": "0.5",
     "Recoil Roll Max": "0",
     "Recoil Roll Min": "0",
     "Recoil Yaw Max": "0.2",
     "Recoil Yaw Min": "0",
     "Spread Decay Delay": "0",
     "Spread Decay Rate": "1.9",
     "Spread Direction Degrees": "4.5",
     "Spread Gain Time": "0.1",
     "Stability Damage": "25",
     "Stability Falloff Per Penetration": "0.3",
     "Targeting Spread Multiplier": "0.1"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 1,
       "body": 4
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 1,
       "body": 5
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 1,
       "body": 6
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 1,
       "body": 7
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 3,
       "body": 15
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 5,
       "body": 30
      }
     ],
     "onetap": "One shot to the head drops anything up to a Walker Prime"
    },
    "img": "img/AES_MC15.png",
    "ammoIcon": "img/ammo_556NATO.png"
   },
   {
    "id": "AES_Mk18",
    "name": "Mk18",
    "raw": "AES_Mk18",
    "statsExpected": true,
    "img": "img/AES_Mk18.png"
   },
   {
    "id": "AES_Model13",
    "name": "Model13",
    "raw": "AES_Model13",
    "caliber": ".357 Magnum",
    "statsExpected": true,
    "stats": {
     "Damage": "24",
     "Headshot Damage": "100",
     "Limb Damage": "20",
     "Stability Damage": "20",
     "Ammo Capacity": "6",
     "Rate Of Fire": "1",
     "Max Penetrations": "2",
     "Range": "5000",
     "Max Spread Degrees": "22"
    },
    "allStats": {
     "Ammo Capacity": "6",
     "Ammo Chamberable": "0",
     "Cooldown": "0.7",
     "Crouching Spread Multiplier": "0.5",
     "Damage": "24",
     "Damage Falloff Per Penetration": "0.5",
     "Generic Damage Force": "1200",
     "Headshot Damage": "100",
     "Initial ADS Spread": "5",
     "Iron Recoil Strength": "0.8",
     "Limb Damage": "20",
     "Max Penetrations": "2",
     "Max Spread Degrees": "22",
     "Moving Spread Multiplier": "1.15",
     "Per Shot Spread Increase": "3",
     "Range": "5000",
     "Rate Of Fire": "1",
     "Recoil Decay Full Percent": "0.5",
     "Recoil Decay Percent": "0.3",
     "Recoil Decay Roll Over Correction Count": "2",
     "Recoil Decay Time": "1.5",
     "Recoil Limit Pitch": "10",
     "Recoil Limit Roll Max": "5",
     "Recoil Limit Roll Min": "0.5",
     "Recoil Limit Yaw Max": "0.5",
     "Recoil Limit Yaw Min": "0.2",
     "Recoil Pitch": "3",
     "Recoil Pitch First Shot": "3.3",
     "Recoil Roll Max": "0",
     "Recoil Roll Min": "0",
     "Recoil Yaw Max": "0.3",
     "Recoil Yaw Min": "0.15",
     "Spread Decay Delay": "0",
     "Spread Decay Rate": "1",
     "Spread Direction Degrees": "8.5",
     "Stability Damage": "20",
     "Stability Falloff Per Penetration": "0.5",
     "Targeting Spread Multiplier": "0.15"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 1,
       "body": 3
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 1,
       "body": 5
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 2,
       "body": 5
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 2,
       "body": 6
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 3,
       "body": 13
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 6,
       "body": 25
      }
     ],
     "onetap": "One shot to the head drops anything up to a Runner"
    },
    "img": "img/AES_Model13.png",
    "ammoIcon": "img/ammo_357Mag.png"
   },
   {
    "id": "AES_MP5",
    "name": "MP5",
    "raw": "AES_MP5",
    "caliber": "9mm",
    "statsExpected": true,
    "stats": {
     "Damage": "15",
     "Headshot Damage": "70",
     "Limb Damage": "15",
     "Stability Damage": "20",
     "Ammo Capacity": "30",
     "Rate Of Fire": "0.066",
     "Range": "5000",
     "Max Spread Degrees": "30"
    },
    "allStats": {
     "Ammo Capacity": "30",
     "Ammo Chamberable": "1",
     "Cooldown": "0",
     "Crouching Spread Multiplier": "0.4",
     "Damage": "15",
     "Damage Falloff Per Penetration": "15",
     "Headshot Damage": "70",
     "Initial ADS Spread": "2",
     "Limb Damage": "15",
     "Max Burst Count": "3",
     "Max Spread Degrees": "30",
     "Moving Spread Multiplier": "1",
     "Per Shot Spread Increase": "0.4",
     "Range": "5000",
     "Rate Of Fire": "0.066",
     "Recoil Decay Full Percent": "0.8",
     "Recoil Decay Percent": "0.8",
     "Recoil Decay Roll Over Correction Count": "2",
     "Recoil Decay Time": "0.2",
     "Recoil Limit Pitch": "10",
     "Recoil Limit Roll Max": "0",
     "Recoil Limit Roll Min": "0",
     "Recoil Limit Yaw Max": "0.5",
     "Recoil Limit Yaw Min": "0.5",
     "Recoil Pitch": "0.3",
     "Recoil Pitch First Shot": "0.15",
     "Recoil Roll Max": "0",
     "Recoil Roll Min": "0",
     "Recoil Yaw Max": "0.25",
     "Recoil Yaw Min": "0",
     "Spread Decay Delay": "0",
     "Spread Decay Rate": "1",
     "Spread Direction Degrees": "6",
     "Spread Gain Time": "0.1",
     "Stability Damage": "20",
     "Stability Falloff Per Penetration": "10"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 1,
       "body": 5
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 2,
       "body": 7
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 2,
       "body": 8
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 2,
       "body": 9
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 5,
       "body": 20
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 9,
       "body": 40
      }
     ],
     "onetap": "One shot to the head drops anything up to a Shambler"
    },
    "img": "img/AES_MP5.png",
    "ammoIcon": "img/ammo_9mm.png"
   },
   {
    "id": "AES_MP5A4_Old",
    "name": "MP5A4 Old",
    "raw": "AES_MP5A4_Old",
    "statsExpected": true
   },
   {
    "id": "AES_P350",
    "name": "P350",
    "raw": "AES_P350",
    "statsExpected": true
   },
   {
    "id": "AES_RX12",
    "name": "RX12",
    "raw": "AES_RX12",
    "statsExpected": true,
    "stats": {
     "Damage": "17",
     "Headshot Damage": "20",
     "Bullets Per Shot": "10",
     "Limb Damage": "15",
     "Stability Damage": "10",
     "Ammo Capacity": "6",
     "Rate Of Fire": "0.05",
     "Max Penetrations": "1",
     "Range": "3000",
     "Max Spread Degrees": "25"
    },
    "allStats": {
     "Ammo Capacity": "6",
     "Bullets Per Shot": "10",
     "Cooldown": "0",
     "Crouching Spread Multiplier": "0.6",
     "Damage": "17",
     "Damage Falloff Per Penetration": "0.8",
     "Generic Damage Force": "4000",
     "Headshot Damage": "20",
     "Initial ADS Spread": "2.5",
     "Iron Recoil Strength": "0.8",
     "Limb Damage": "15",
     "Max Penetrations": "1",
     "Max Spread Degrees": "25",
     "Moving Spread Multiplier": "1.1",
     "Pellet Spread Degrees": "3",
     "Per Shot Spread Increase": "4",
     "Range": "3000",
     "Rate Of Fire": "0.05",
     "Recoil Decay Delay": "0",
     "Recoil Decay Full Percent": "0.2",
     "Recoil Decay Percent": "0.2",
     "Recoil Decay Roll Over Correction Count": "2",
     "Recoil Decay Time": "1.25",
     "Recoil Limit Pitch": "15",
     "Recoil Limit Yaw Max": "5",
     "Recoil Limit Yaw Min": "3",
     "Recoil Pitch": "5",
     "Recoil Pitch First Shot": "5.2",
     "Recoil Yaw First Shot": "1",
     "Recoil Yaw Max": "0.5",
     "Recoil Yaw Min": "0.5",
     "Spread Decay Rate": "0.8",
     "Spread Direction Degrees": "3",
     "Stability Damage": "10",
     "Stability Falloff Per Penetration": "0.05",
     "Targeting Spread Multiplier": "0.5"
    },
    "statSource": "files",
    "zmath": {
     "title": "Shots to drop",
     "rows": [
      {
       "label": "Child → Walker Prime",
       "hp": "30–130",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 2,
       "body": 2
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 3,
       "body": 4
      }
     ],
     "note": "Full blast: 10 pellets × 17 = 170 dmg (200 head), all pellets on target",
     "onetap": "One shot to the head drops anything up to a Walker Prime"
    },
    "img": "img/AES_RX12.png"
   },
   {
    "id": "AES_686",
    "name": "686",
    "raw": "AES_686",
    "statsExpected": true
   },
   {
    "id": "AES_SKS",
    "name": "SKS",
    "raw": "AES_SKS",
    "statsExpected": true
   }
  ],
  "melee": [
   {
    "id": "BP_HockeyStick",
    "name": "Hockey Stick",
    "rarity": "Common",
    "statsExpected": true,
    "stats": {
     "Damage": "15",
     "Headshot Damage": "25",
     "Limb Damage": "1",
     "Strong Attack Damage": "20",
     "Heavy Attack Damage": "30",
     "Throw Damage": "40",
     "Stability Damage": "25",
     "Range": "255",
     "Quick Attack Stamina Cost": "10"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1.1",
     "Damage": "15",
     "Generic Damage Force": "700",
     "Headshot Damage": "25",
     "Heavy Attack Damage": "30",
     "Heavy Attack Head Shot Damage": "35",
     "Heavy Attack Limb Damage": "1",
     "Heavy Attack Play Rate": "1.1",
     "Heavy Attack Stability Damage": "40",
     "Heavy Attack Stamina Cost": "15",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "5000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "1",
     "Quick Attack Stamina Cost": "10",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "255",
     "Secondary Hit Damage Multiplier": "0.5",
     "Secondary Hit Limb Damage Multiplier": "0.2",
     "Secondary Hit Stability Damage Multiplier": "0.7",
     "Stability Damage": "25",
     "Strong Attack Damage": "20",
     "Strong Attack Headshot Damage": "30",
     "Strong Attack Limb Damage": "1",
     "Strong Attack Stability Damage": "35",
     "Strong Attack Stamina Cost": "13",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "1200",
     "Tertiary Hit Damage Multiplier": "0.3",
     "Tertiary Hit Limb Damage Multiplier": "0",
     "Tertiary Hit Stability Damage Multiplier": "0.5",
     "Throw Damage": "40",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "100",
     "Throw Stamina Cost": "20"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 3
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 3,
       "body": 4
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 4,
       "body": 4
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 4,
       "body": 5
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 9,
       "body": 10
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 18,
       "body": 20
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_HockeyStick.png"
   },
   {
    "id": "BP_KnifeSmall",
    "name": "Knife Small",
    "rarity": "Common",
    "statsExpected": true,
    "stats": {
     "Damage": "15",
     "Headshot Damage": "25",
     "Limb Damage": "20",
     "Strong Attack Damage": "18",
     "Heavy Attack Damage": "25",
     "Throw Damage": "35",
     "Stability Damage": "5",
     "Range": "160",
     "Quick Attack Stamina Cost": "5"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1.2",
     "Damage": "15",
     "Generic Damage Force": "700",
     "Headshot Damage": "25",
     "Heavy Attack Damage": "25",
     "Heavy Attack Head Shot Damage": "40",
     "Heavy Attack Limb Damage": "30",
     "Heavy Attack Play Rate": "1.2",
     "Heavy Attack Stability Damage": "20",
     "Heavy Attack Stamina Cost": "13",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "1000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "20",
     "Quick Attack Stamina Cost": "5",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "160",
     "Secondary Hit Damage Multiplier": "0.7",
     "Secondary Hit Limb Damage Multiplier": "0.7",
     "Secondary Hit Stability Damage Multiplier": "0",
     "Stability Damage": "5",
     "Strong Attack Damage": "18",
     "Strong Attack Headshot Damage": "38",
     "Strong Attack Limb Damage": "30",
     "Strong Attack Stability Damage": "10",
     "Strong Attack Stamina Cost": "7",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "800",
     "Tertiary Hit Damage Multiplier": "0.5",
     "Tertiary Hit Limb Damage Multiplier": "0.5",
     "Tertiary Hit Stability Damage Multiplier": "0",
     "Throw Damage": "35",
     "Throw Limb Damage": "50",
     "Throw Stability Damage": "20",
     "Throw Stamina Cost": "10"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 3
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 3,
       "body": 4
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 3,
       "body": 5
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 4,
       "body": 6
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 8,
       "body": 12
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 15,
       "body": 24
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_KnifeSmall.png"
   },
   {
    "id": "BP_Mallet",
    "name": "Mallet",
    "rarity": "Common",
    "statsExpected": true,
    "stats": {
     "Damage": "10",
     "Headshot Damage": "20",
     "Limb Damage": "1",
     "Strong Attack Damage": "13",
     "Heavy Attack Damage": "15",
     "Throw Damage": "25",
     "Stability Damage": "25",
     "Range": "160",
     "Quick Attack Stamina Cost": "7"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1.2",
     "Damage": "10",
     "Generic Damage Force": "1000",
     "Headshot Damage": "20",
     "Heavy Attack Damage": "15",
     "Heavy Attack Head Shot Damage": "30",
     "Heavy Attack Limb Damage": "1",
     "Heavy Attack Play Rate": "1.1",
     "Heavy Attack Stability Damage": "45",
     "Heavy Attack Stamina Cost": "13",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "1500",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "1",
     "Quick Attack Stamina Cost": "7",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "160",
     "Secondary Hit Damage Multiplier": "0.5",
     "Secondary Hit Limb Damage Multiplier": "0.2",
     "Secondary Hit Stability Damage Multiplier": "0.7",
     "Stability Damage": "25",
     "Strong Attack Damage": "13",
     "Strong Attack Headshot Damage": "25",
     "Strong Attack Limb Damage": "1",
     "Strong Attack Stability Damage": "35",
     "Strong Attack Stamina Cost": "10",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "1300",
     "Tertiary Hit Damage Multiplier": "0.3",
     "Tertiary Hit Limb Damage Multiplier": "0",
     "Tertiary Hit Stability Damage Multiplier": "0.5",
     "Throw Damage": "25",
     "Throw Limb Damage": "1",
     "Throw Stability Damage": "60",
     "Throw Stamina Cost": "10"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 3,
       "body": 5
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 4,
       "body": 7
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 4,
       "body": 8
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 5,
       "body": 9
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 10,
       "body": 20
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 20,
       "body": 40
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_Mallet.png"
   },
   {
    "id": "BP_Pipe",
    "name": "Pipe",
    "rarity": "Common",
    "statsExpected": true,
    "stats": {
     "Damage": "20",
     "Headshot Damage": "30",
     "Limb Damage": "1",
     "Strong Attack Damage": "25",
     "Heavy Attack Damage": "33",
     "Throw Damage": "40",
     "Stability Damage": "35",
     "Range": "225",
     "Quick Attack Stamina Cost": "10"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1",
     "Damage": "20",
     "Generic Damage Force": "1600",
     "Headshot Damage": "30",
     "Heavy Attack Damage": "33",
     "Heavy Attack Head Shot Damage": "40",
     "Heavy Attack Limb Damage": "1",
     "Heavy Attack Play Rate": "1",
     "Heavy Attack Stability Damage": "55",
     "Heavy Attack Stamina Cost": "15",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "8000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "1",
     "Quick Attack Stamina Cost": "10",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "225",
     "Secondary Hit Damage Multiplier": "0.5",
     "Secondary Hit Limb Damage Multiplier": "0.2",
     "Secondary Hit Stability Damage Multiplier": "0.7",
     "Stability Damage": "35",
     "Strong Attack Damage": "25",
     "Strong Attack Headshot Damage": "35",
     "Strong Attack Limb Damage": "1",
     "Strong Attack Stability Damage": "45",
     "Strong Attack Stamina Cost": "13",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "2200",
     "Tertiary Hit Damage Multiplier": "0.3",
     "Tertiary Hit Limb Damage Multiplier": "0",
     "Tertiary Hit Stability Damage Multiplier": "0.5",
     "Throw Damage": "40",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "100",
     "Throw Stamina Cost": "20"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 3
      },
      {
       "label": "Walker → Runner Prime",
       "hp": "100–120",
       "head": 3,
       "body": 4
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 4,
       "body": 4
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 8,
       "body": 10
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 15,
       "body": 19
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_Pipe.png"
   },
   {
    "id": "BP_PipeSmall",
    "name": "Pipe Small",
    "rarity": "Common",
    "statsExpected": true,
    "stats": {
     "Damage": "13",
     "Headshot Damage": "20",
     "Limb Damage": "1",
     "Strong Attack Damage": "15",
     "Heavy Attack Damage": "20",
     "Throw Damage": "25",
     "Stability Damage": "25",
     "Range": "180",
     "Quick Attack Stamina Cost": "7"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1.1",
     "Damage": "13",
     "Generic Damage Force": "1300",
     "Headshot Damage": "20",
     "Heavy Attack Damage": "20",
     "Heavy Attack Head Shot Damage": "35",
     "Heavy Attack Limb Damage": "1",
     "Heavy Attack Play Rate": "1",
     "Heavy Attack Stability Damage": "50",
     "Heavy Attack Stamina Cost": "13",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "3000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "1",
     "Quick Attack Stamina Cost": "7",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "180",
     "Secondary Hit Damage Multiplier": "0.5",
     "Secondary Hit Limb Damage Multiplier": "0.2",
     "Secondary Hit Stability Damage Multiplier": "0.7",
     "Stability Damage": "25",
     "Strong Attack Damage": "15",
     "Strong Attack Headshot Damage": "30",
     "Strong Attack Limb Damage": "1",
     "Strong Attack Stability Damage": "50",
     "Strong Attack Stamina Cost": "10",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "1500",
     "Tertiary Hit Damage Multiplier": "0.3",
     "Tertiary Hit Limb Damage Multiplier": "0",
     "Tertiary Hit Stability Damage Multiplier": "0.5",
     "Throw Damage": "25",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "60",
     "Throw Stamina Cost": "10"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 4
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 3,
       "body": 5
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 4,
       "body": 6
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 4,
       "body": 7
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 9,
       "body": 15
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 18,
       "body": 30
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_PipeSmall.png"
   },
   {
    "id": "BP_Rebar",
    "name": "Rebar",
    "rarity": "Common",
    "statsExpected": true,
    "stats": {
     "Damage": "15",
     "Headshot Damage": "30",
     "Limb Damage": "1",
     "Strong Attack Damage": "20",
     "Heavy Attack Damage": "30",
     "Throw Damage": "40",
     "Stability Damage": "35",
     "Range": "210",
     "Quick Attack Stamina Cost": "10"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1.05",
     "Damage": "15",
     "Generic Damage Force": "1000",
     "Headshot Damage": "30",
     "Heavy Attack Damage": "30",
     "Heavy Attack Head Shot Damage": "40",
     "Heavy Attack Limb Damage": "1",
     "Heavy Attack Play Rate": "1.15",
     "Heavy Attack Stability Damage": "55",
     "Heavy Attack Stamina Cost": "18",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "5000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "1",
     "Quick Attack Stamina Cost": "10",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "210",
     "Secondary Hit Damage Multiplier": "0.5",
     "Secondary Hit Limb Damage Multiplier": "0.2",
     "Secondary Hit Stability Damage Multiplier": "0.7",
     "Stability Damage": "35",
     "Strong Attack Damage": "20",
     "Strong Attack Headshot Damage": "35",
     "Strong Attack Limb Damage": "1",
     "Strong Attack Stability Damage": "45",
     "Strong Attack Stamina Cost": "13",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "1500",
     "Tertiary Hit Damage Multiplier": "0.3",
     "Tertiary Hit Limb Damage Multiplier": "0",
     "Tertiary Hit Stability Damage Multiplier": "0.5",
     "Throw Damage": "40",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "100",
     "Throw Stamina Cost": "20"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 3
      },
      {
       "label": "Walker → Runner Prime",
       "hp": "100–120",
       "head": 3,
       "body": 4
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 4,
       "body": 5
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 8,
       "body": 10
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 15,
       "body": 20
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_Rebar.png"
   },
   {
    "id": "BP_TireIron",
    "name": "Tire Iron",
    "rarity": "Common",
    "statsExpected": true,
    "stats": {
     "Damage": "13",
     "Headshot Damage": "25",
     "Limb Damage": "1",
     "Strong Attack Damage": "15",
     "Heavy Attack Damage": "20",
     "Throw Damage": "25",
     "Stability Damage": "25",
     "Range": "175",
     "Quick Attack Stamina Cost": "5"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1.1",
     "Damage": "13",
     "Generic Damage Force": "1600",
     "Headshot Damage": "25",
     "Heavy Attack Damage": "20",
     "Heavy Attack Head Shot Damage": "35",
     "Heavy Attack Limb Damage": "1",
     "Heavy Attack Play Rate": "1.1",
     "Heavy Attack Stability Damage": "45",
     "Heavy Attack Stamina Cost": "13",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "3500",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "1",
     "Quick Attack Stamina Cost": "5",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "175",
     "Secondary Hit Damage Multiplier": "0.5",
     "Secondary Hit Limb Damage Multiplier": "0.2",
     "Secondary Hit Stability Damage Multiplier": "0.7",
     "Stability Damage": "25",
     "Strong Attack Damage": "15",
     "Strong Attack Headshot Damage": "30",
     "Strong Attack Limb Damage": "1",
     "Strong Attack Stability Damage": "45",
     "Strong Attack Stamina Cost": "7",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "1400",
     "Tertiary Hit Damage Multiplier": "0.3",
     "Tertiary Hit Limb Damage Multiplier": "0",
     "Tertiary Hit Stability Damage Multiplier": "0.5",
     "Throw Damage": "25",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "60",
     "Throw Stamina Cost": "10"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 4
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 3,
       "body": 5
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 4,
       "body": 6
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 4,
       "body": 7
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 9,
       "body": 15
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 18,
       "body": 30
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_TireIron.png"
   },
   {
    "id": "BP_WrenchLarge",
    "name": "Wrench Large",
    "rarity": "Common",
    "statsExpected": true,
    "stats": {
     "Damage": "25",
     "Headshot Damage": "35",
     "Limb Damage": "1",
     "Strong Attack Damage": "35",
     "Heavy Attack Damage": "40",
     "Throw Damage": "40",
     "Stability Damage": "45",
     "Range": "230",
     "Quick Attack Stamina Cost": "10"
    },
    "allStats": {
     "Attack And Combo Play Rate": "0.9",
     "Damage": "25",
     "Generic Damage Force": "1500",
     "Headshot Damage": "35",
     "Heavy Attack Damage": "40",
     "Heavy Attack Head Shot Damage": "60",
     "Heavy Attack Limb Damage": "1",
     "Heavy Attack Play Rate": "0.9",
     "Heavy Attack Stability Damage": "65",
     "Heavy Attack Stamina Cost": "15",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "8000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "1",
     "Quick Attack Stamina Cost": "10",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "230",
     "Secondary Hit Damage Multiplier": "0.5",
     "Secondary Hit Limb Damage Multiplier": "0.2",
     "Secondary Hit Stability Damage Multiplier": "0.7",
     "Stability Damage": "45",
     "Strong Attack Damage": "35",
     "Strong Attack Headshot Damage": "50",
     "Strong Attack Limb Damage": "1",
     "Strong Attack Stability Damage": "55",
     "Strong Attack Stamina Cost": "13",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "2000",
     "Tertiary Hit Damage Multiplierurve": "0.3",
     "Tertiary Hit Limb Damage Multiplier": "0",
     "Tertiary Hit Stability Damage Multiplier": "0.5",
     "Throw Damage": "40",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "100",
     "Throw Stamina Cost": "20"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 2
      },
      {
       "label": "Walker → Runner Prime",
       "hp": "100–120",
       "head": 2,
       "body": 3
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 3,
       "body": 4
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 5,
       "body": 8
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 10,
       "body": 15
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_WrenchLarge.png"
   },
   {
    "id": "BP_WrenchSmall",
    "name": "Wrench Small",
    "rarity": "Common",
    "statsExpected": true,
    "stats": {
     "Damage": "10",
     "Headshot Damage": "20",
     "Limb Damage": "1",
     "Strong Attack Damage": "13",
     "Heavy Attack Damage": "15",
     "Throw Damage": "25",
     "Stability Damage": "25",
     "Range": "160",
     "Quick Attack Stamina Cost": "7"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1.2",
     "Damage": "10",
     "Generic Damage Force": "800",
     "Headshot Damage": "20",
     "Heavy Attack Damage": "15",
     "Heavy Attack Head Shot Damage": "30",
     "Heavy Attack Limb Damage": "1",
     "Heavy Attack Play Rate": "1.1",
     "Heavy Attack Stability Damage": "45",
     "Heavy Attack Stamina Cost": "13",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "1000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "0",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "1",
     "Quick Attack Stamina Cost": "7",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "160",
     "Secondary Hit Damage Multiplier": "0.3",
     "Secondary Hit Stability Damage Multiplier": "0.7",
     "Stability Damage": "25",
     "Strong Attack Damage": "13",
     "Strong Attack Headshot Damage": "25",
     "Strong Attack Limb Damage": "1",
     "Strong Attack Stability Damage": "35",
     "Strong Attack Stamina Cost": "10",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "700",
     "Tertiary Hit Damage Multiplier": "0.5",
     "Tertiary Hit Stability Damage Multiplier": "0.5",
     "Throw Damage": "25",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "60",
     "Throw Stamina Cost": "10"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 3,
       "body": 5
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 4,
       "body": 7
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 4,
       "body": 8
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 5,
       "body": 9
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 10,
       "body": 20
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 20,
       "body": 40
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_WrenchSmall.png"
   },
   {
    "id": "BP_BaseballBat",
    "name": "Baseball Bat",
    "rarity": "Uncommon",
    "statsExpected": true,
    "stats": {
     "Damage": "20",
     "Headshot Damage": "25",
     "Limb Damage": "1",
     "Strong Attack Damage": "25",
     "Heavy Attack Damage": "33",
     "Throw Damage": "40",
     "Stability Damage": "20",
     "Range": "210",
     "Quick Attack Stamina Cost": "10"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1",
     "Damage": "20",
     "Generic Damage Force": "2000",
     "Headshot Damage": "25",
     "Heavy Attack Damage": "33",
     "Heavy Attack Head Shot Damage": "50",
     "Heavy Attack Limb Damage": "1",
     "Heavy Attack Play Rate": "1.2",
     "Heavy Attack Stability Damage": "100",
     "Heavy Attack Stamina Cost": "15",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "6000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "1",
     "Quick Attack Stamina Cost": "10",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "210",
     "Secondary Hit Damage Multiplier": "0.5",
     "Secondary Hit Limb Damage Multiplier": "0.2",
     "Secondary Hit Stability Damage Multiplier": "0.7",
     "Stability Damage": "20",
     "Strong Attack Damage": "25",
     "Strong Attack Headshot Damage": "35",
     "Strong Attack Limb Damage": "1",
     "Strong Attack Stability Damage": "40",
     "Strong Attack Stamina Cost": "13",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "2500",
     "Tertiary Hit Damage Multiplier": "0.25",
     "Tertiary Hit Limb Damage Multiplier": "0",
     "Tertiary Hit Stability Damage Multiplier": "0.5",
     "Throw Damage": "40",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "100",
     "Throw Stamina Cost": "20",
     "World Shove Damage": "30"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 3
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 2,
       "body": 4
      },
      {
       "label": "Runner Prime / Walker Prime",
       "hp": "120–130",
       "head": 3,
       "body": 4
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 6,
       "body": 10
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 12,
       "body": 19
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_BaseballBat.png"
   },
   {
    "id": "BP_ClawHammer",
    "name": "Claw Hammer",
    "rarity": "Uncommon",
    "statsExpected": true,
    "stats": {
     "Damage": "15",
     "Headshot Damage": "30",
     "Limb Damage": "1",
     "Strong Attack Damage": "20",
     "Heavy Attack Damage": "25",
     "Throw Damage": "25",
     "Stability Damage": "40",
     "Range": "170",
     "Quick Attack Stamina Cost": "5"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1.2",
     "Damage": "15",
     "Generic Damage Force": "1300",
     "Headshot Damage": "30",
     "Heavy Attack Damage": "25",
     "Heavy Attack Head Shot Damage": "45",
     "Heavy Attack Limb Damage": "1",
     "Heavy Attack Play Rate": "1.2",
     "Heavy Attack Stability Damage": "60",
     "Heavy Attack Stamina Cost": "13",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "3000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "1",
     "Quick Attack Stamina Cost": "5",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "170",
     "Secondary Hit Damage Multiplier": "0.5",
     "Secondary Hit Limb Damage Multiplier": "0.2",
     "Secondary Hit Stability Damage Multiplier": "0.7",
     "Stability Damage": "40",
     "Strong Attack Damage": "20",
     "Strong Attack Headshot Damage": "35",
     "Strong Attack Limb Damage": "1",
     "Strong Attack Stability Damage": "55",
     "Strong Attack Stamina Cost": "7",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "1500",
     "Tertiary Hit Damage Multiplier": "0.3",
     "Tertiary Hit Limb Damage Multiplier": "0",
     "Tertiary Hit Stability Damage Multiplier": "0.5",
     "Throw Damage": "25",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "50",
     "Throw Stamina Cost": "10"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 3
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 3,
       "body": 4
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 3,
       "body": 5
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 3,
       "body": 6
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 7,
       "body": 12
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 14,
       "body": 24
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_ClawHammer.png"
   },
   {
    "id": "BP_Cleaver",
    "name": "Cleaver",
    "rarity": "Uncommon",
    "statsExpected": true,
    "stats": {
     "Damage": "15",
     "Headshot Damage": "28",
     "Limb Damage": "20",
     "Strong Attack Damage": "17",
     "Heavy Attack Damage": "25",
     "Throw Damage": "35",
     "Stability Damage": "5",
     "Range": "165",
     "Quick Attack Stamina Cost": "5"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1",
     "Damage": "15",
     "Generic Damage Force": "700",
     "Headshot Damage": "28",
     "Heavy Attack Damage": "25",
     "Heavy Attack Head Shot Damage": "50",
     "Heavy Attack Limb Damage": "40",
     "Heavy Attack Play Rate": "1.05",
     "Heavy Attack Stability Damage": "20",
     "Heavy Attack Stamina Cost": "13",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "1000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "20",
     "Quick Attack Stamina Cost": "5",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "165",
     "Secondary Hit Damage Multiplier": "0.7",
     "Secondary Hit Limb Damage Multiplier": "0.7",
     "Secondary Hit Stability Damage Multiplier": "0.5",
     "Stability Damage": "5",
     "Strong Attack Damage": "17",
     "Strong Attack Headshot Damage": "38",
     "Strong Attack Limb Damage": "30",
     "Strong Attack Stability Damage": "10",
     "Strong Attack Stamina Cost": "7",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "800",
     "Tertiary Hit Damage Multiplier": "0.5",
     "Tertiary Hit Limb Damage Multiplier": "0.5",
     "Tertiary Hit Stability Damage Multiplier": "0",
     "Throw Damage": "35",
     "Throw Limb Damage": "50",
     "Throw Stability Damage": "20",
     "Throw Stamina Cost": "10"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 3
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 2,
       "body": 4
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 3,
       "body": 5
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 3,
       "body": 6
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 6,
       "body": 12
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 12,
       "body": 24
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_Cleaver.png"
   },
   {
    "id": "BP_Crowbar",
    "name": "Crowbar",
    "rarity": "Uncommon",
    "statsExpected": true,
    "stats": {
     "Damage": "15",
     "Headshot Damage": "30",
     "Limb Damage": "1",
     "Strong Attack Damage": "20",
     "Heavy Attack Damage": "25",
     "Throw Damage": "25",
     "Stability Damage": "40",
     "Range": "185",
     "Quick Attack Stamina Cost": "5"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1.1",
     "Damage": "15",
     "Generic Damage Force": "1300",
     "Headshot Damage": "30",
     "Heavy Attack Damage": "25",
     "Heavy Attack Head Shot Damage": "45",
     "Heavy Attack Limb Damage": "1",
     "Heavy Attack Play Rate": "1",
     "Heavy Attack Stability Damage": "60",
     "Heavy Attack Stamina Cost": "13",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "5000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "1",
     "Quick Attack Stamina Cost": "5",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "185",
     "Secondary Hit Damage Multiplier": "0.5",
     "Secondary Hit Limb Damage Multiplier": "0.2",
     "Secondary Hit Stability Damage Multiplier": "0.7",
     "Stability Damage": "40",
     "Strong Attack Damage": "20",
     "Strong Attack Headshot Damage": "35",
     "Strong Attack Limb Damage": "1",
     "Strong Attack Stability Damage": "60",
     "Strong Attack Stamina Cost": "7",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "1400",
     "Tertiary Hit Damage Multiplier": "0.3",
     "Tertiary Hit Limb Damage Multiplier": "0",
     "Tertiary Hit Stability Damage Multiplier": "0.5",
     "Throw Damage": "25",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "60",
     "Throw Stamina Cost": "10"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 2
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 3
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 3,
       "body": 4
      },
      {
       "label": "Runner Prime",
       "hp": "120",
       "head": 3,
       "body": 5
      },
      {
       "label": "Walker Prime",
       "hp": "130",
       "head": 3,
       "body": 6
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 7,
       "body": 12
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 14,
       "body": 24
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_Crowbar.png"
   },
   {
    "id": "BP_FireAxe",
    "name": "Fire Axe",
    "rarity": "Uncommon",
    "statsExpected": true,
    "stats": {
     "Damage": "35",
     "Headshot Damage": "60",
     "Limb Damage": "60",
     "Strong Attack Damage": "50",
     "Heavy Attack Damage": "65",
     "Throw Damage": "75",
     "Stability Damage": "10",
     "Range": "210",
     "Quick Attack Stamina Cost": "10"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1",
     "Damage": "35",
     "Generic Damage Force": "1700",
     "Headshot Damage": "60",
     "Heavy Attack Damage": "65",
     "Heavy Attack Head Shot Damage": "100",
     "Heavy Attack Limb Damage": "100",
     "Heavy Attack Play Rate": "1",
     "Heavy Attack Stability Damage": "20",
     "Heavy Attack Stamina Cost": "13",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "3000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "60",
     "Quick Attack Stamina Cost": "10",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "210",
     "Secondary Hit Damage Multiplier": "0.7",
     "Secondary Hit Limb Damage Multiplier": "0.7",
     "Secondary Hit Stability Damage Multiplier": "0.5",
     "Stability Damage": "10",
     "Strong Attack Damage": "50",
     "Strong Attack Headshot Damage": "80",
     "Strong Attack Limb Damage": "80",
     "Strong Attack Stability Damage": "20",
     "Strong Attack Stamina Cost": "13",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "2400",
     "Tertiary Hit Damage Multiplier": "0.5",
     "Tertiary Hit Limb Damage Multiplier": "0.5",
     "Tertiary Hit Stability Damage Multiplier": "0.3",
     "Throw Damage": "75",
     "Throw Limb Damage": "100",
     "Throw Stability Damage": "100",
     "Throw Stamina Cost": "20"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler → Runner",
       "hp": "70–100",
       "head": 1,
       "body": 2
      },
      {
       "label": "Runner Prime / Walker Prime",
       "hp": "120–130",
       "head": 2,
       "body": 2
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 3,
       "body": 5
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 6,
       "body": 10
      }
     ],
     "onetap": "One swing to the head drops anything up to a Runner"
    },
    "img": "img/BP_FireAxe.png"
   },
   {
    "id": "BP_HatchetWoodsman",
    "name": "Hatchet Woodsman",
    "rarity": "Uncommon",
    "statsExpected": true,
    "stats": {
     "Damage": "20",
     "Headshot Damage": "35",
     "Limb Damage": "40",
     "Strong Attack Damage": "25",
     "Heavy Attack Damage": "34",
     "Throw Damage": "50",
     "Stability Damage": "5",
     "Range": "175",
     "Quick Attack Stamina Cost": "5"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1",
     "Damage": "20",
     "Generic Damage Force": "1300",
     "Headshot Damage": "35",
     "Heavy Attack Damage": "34",
     "Heavy Attack Head Shot Damage": "55",
     "Heavy Attack Limb Damage": "60",
     "Heavy Attack Play Rate": "1.15",
     "Heavy Attack Stability Damage": "20",
     "Heavy Attack Stamina Cost": "13",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "1700",
     "Heavy Shove Damage Force": "1500",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "40",
     "Quick Attack Stamina Cost": "5",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "175",
     "Secondary Hit Damage Multiplier": "0.7",
     "Secondary Hit Limb Damage Multiplier": "0.7",
     "Secondary Hit Stability Damage Multiplier": "0.5",
     "Shove Damage Force": "1000",
     "Stability Damage": "5",
     "Strong Attack Damage": "25",
     "Strong Attack Headshot Damage": "45",
     "Strong Attack Limb Damage": "60",
     "Strong Attack Stability Damage": "10",
     "Strong Attack Stamina Cost": "7",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "1500",
     "Tertiary Hit Damage Multiplier": "0.5",
     "Tertiary Hit Limb Damage Multiplier": "0.5",
     "Tertiary Hit Stability Damage Multiplier": "0.3",
     "Throw Damage": "50",
     "Throw Limb Damage": "50",
     "Throw Stability Damage": "20",
     "Throw Stamina Cost": "10"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler → Runner",
       "hp": "70–100",
       "head": 2,
       "body": 3
      },
      {
       "label": "Runner Prime / Walker Prime",
       "hp": "120–130",
       "head": 3,
       "body": 4
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 6,
       "body": 9
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 11,
       "body": 18
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_HatchetWoodsman.png"
   },
   {
    "id": "BP_Machete",
    "name": "Machete",
    "rarity": "Uncommon",
    "statsExpected": true,
    "stats": {
     "Damage": "20",
     "Headshot Damage": "35",
     "Limb Damage": "40",
     "Strong Attack Damage": "25",
     "Heavy Attack Damage": "34",
     "Throw Damage": "35",
     "Stability Damage": "5",
     "Range": "190",
     "Quick Attack Stamina Cost": "5"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1.15",
     "Damage": "20",
     "Generic Damage Force": "1400",
     "Headshot Damage": "35",
     "Heavy Attack Damage": "34",
     "Heavy Attack Head Shot Damage": "55",
     "Heavy Attack Limb Damage": "60",
     "Heavy Attack Play Rate": "1",
     "Heavy Attack Stability Damage": "20",
     "Heavy Attack Stamina Cost": "13",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "2000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "40",
     "Quick Attack Stamina Cost": "5",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "190",
     "Secondary Hit Damage Multiplier": "0.7",
     "Secondary Hit Limb Damage Multiplier": "0.7",
     "Secondary Hit Stability Damage Multiplier": "0.5",
     "Stability Damage": "5",
     "Strong Attack Damage": "25",
     "Strong Attack Headshot Damage": "45",
     "Strong Attack Limb Damage": "40",
     "Strong Attack Stability Damage": "10",
     "Strong Attack Stamina Cost": "7",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "1600",
     "Tertiary Hit Damage Multiplier": "0.5",
     "Tertiary Hit Limb Damage Multiplier": "0.5",
     "Tertiary Hit Stability Damage Multiplier": "0.3",
     "Throw Damage": "35",
     "Throw Limb Damage": "50",
     "Throw Stability Damage": "20",
     "Throw Stamina Cost": "10"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler → Runner",
       "hp": "70–100",
       "head": 2,
       "body": 3
      },
      {
       "label": "Runner Prime / Walker Prime",
       "hp": "120–130",
       "head": 3,
       "body": 4
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 6,
       "body": 9
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 11,
       "body": 18
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_Machete.png"
   },
   {
    "id": "BP_Sledge",
    "name": "Sledge",
    "rarity": "Uncommon",
    "statsExpected": true,
    "stats": {
     "Damage": "30",
     "Headshot Damage": "50",
     "Limb Damage": "1",
     "Strong Attack Damage": "35",
     "Heavy Attack Damage": "50",
     "Throw Damage": "40",
     "Stability Damage": "65",
     "Range": "230",
     "Quick Attack Stamina Cost": "10"
    },
    "allStats": {
     "Attack And Combo Play Rate": "0.8",
     "Damage": "30",
     "Generic Damage Force": "1700",
     "Headshot Damage": "50",
     "Heavy Attack Damage": "50",
     "Heavy Attack Head Shot Damage": "100",
     "Heavy Attack Limb Damage": "1",
     "Heavy Attack Play Rate": "1",
     "Heavy Attack Stability Damage": "100",
     "Heavy Attack Stamina Cost": "15",
     "Heavy Attack Stamina Cost Per Hit": "3",
     "Heavy Damage Force": "8000",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "1",
     "Quick Attack Stamina Cost": "10",
     "Quick Attack Stamina Cost Per Hit": "3",
     "Range": "230",
     "Secondary Hit Damage Multiplier": "0.5",
     "Secondary Hit Limb Damage Multiplier": "0.2",
     "Secondary Hit Stability Damage Multiplier": "0.7",
     "Stability Damage": "65",
     "Strong Attack Damage": "35",
     "Strong Attack Headshot Damage": "65",
     "Strong Attack Limb Damage": "1",
     "Strong Attack Stability Damage": "75",
     "Strong Attack Stamina Cost": "13",
     "Strong Attack Stamina Cost Per Hit": "3",
     "Strong Damage Force": "2400",
     "Tertiary Hit Damage Multiplier": "0.3",
     "Tertiary Hit Limb Damage Multiplier": "0",
     "Tertiary Hit Stability Damage Multiplier": "0.5",
     "Throw Damage": "40",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "100",
     "Throw Stamina Cost": "20"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler → Runner",
       "hp": "70–100",
       "head": 1,
       "body": 2
      },
      {
       "label": "Runner Prime / Walker Prime",
       "hp": "120–130",
       "head": 2,
       "body": 3
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 3,
       "body": 6
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 6,
       "body": 12
      }
     ],
     "onetap": "One swing to the head drops anything up to a Runner"
    },
    "img": "img/BP_Sledge.png"
   },
   {
    "id": "BP_TreeTrimmer",
    "name": "Tree Trimmer",
    "rarity": "Uncommon",
    "statsExpected": true,
    "stats": {
     "Damage": "20",
     "Headshot Damage": "35",
     "Limb Damage": "30",
     "Strong Attack Damage": "30",
     "Heavy Attack Damage": "35",
     "Throw Damage": "35",
     "Stability Damage": "5",
     "Range": "250",
     "Quick Attack Stamina Cost": "10"
    },
    "allStats": {
     "Attack And Combo Play Rate": "1",
     "Damage": "20",
     "Generic Damage Force": "1600",
     "Headshot Damage": "35",
     "Heavy Attack Damage": "35",
     "Heavy Attack Head Shot Damage": "65",
     "Heavy Attack Limb Damage": "60",
     "Heavy Attack Play Rate": "1.1",
     "Heavy Attack Stability Damage": "20",
     "Heavy Attack Stamina Cost": "15",
     "Heavy Attack Stamina Cost Per Hit": "5",
     "Heavy Damage Force": "2100",
     "Initial Hit Damage Multiplier": "1",
     "Initial Hit Limb Damage Multiplier": "1",
     "Initial Hit Stability Damage Multiplier": "1",
     "Limb Damage": "30",
     "Quick Attack Stamina Cost": "10",
     "Quick Attack Stamina Cost Per Hit": "5",
     "Range": "250",
     "Secondary Hit Damage Multiplier": "0.7",
     "Secondary Hit Limb Damage Multiplier": "0.7",
     "Secondary Hit Stability Damage Multiplier": "0.5",
     "Stability Damage": "5",
     "Strong Attack Damage": "30",
     "Strong Attack Headshot Damage": "50",
     "Strong Attack Limb Damage": "40",
     "Strong Attack Stability Damage": "10",
     "Strong Attack Stamina Cost": "13",
     "Strong Attack Stamina Cost Per Hit": "5",
     "Strong Damage Force": "2000",
     "Tertiary Hit Damage Multiplier": "0.5",
     "Tertiary Hit Limb Damage Multiplier": "0.5",
     "Tertiary Hit Stability Damage Multiplier": "0.3",
     "Throw Damage": "35",
     "Throw Limb Damage": "100",
     "Throw Stability Damage": "100",
     "Throw Stamina Cost": "20"
    },
    "statSource": "files",
    "zmath": {
     "title": "Heavy swings to drop",
     "rows": [
      {
       "label": "Child",
       "hp": "30",
       "head": 1,
       "body": 1
      },
      {
       "label": "Shambler",
       "hp": "70",
       "head": 2,
       "body": 2
      },
      {
       "label": "Walker / Runner",
       "hp": "100",
       "head": 2,
       "body": 3
      },
      {
       "label": "Runner Prime / Walker Prime",
       "hp": "120–130",
       "head": 2,
       "body": 4
      },
      {
       "label": "Shambler Prime",
       "hp": "300",
       "head": 5,
       "body": 9
      },
      {
       "label": "Mutated",
       "hp": "600",
       "head": 10,
       "body": 18
      }
     ],
     "onetap": "One swing to the head drops anything up to a Child"
    },
    "img": "img/BP_TreeTrimmer.png"
   }
  ],
  "throwables": [
   {
    "id": "AES_DirectionalMine",
    "name": "Directional Mine",
    "raw": "AES_DirectionalMine",
    "statsExpected": true
   },
   {
    "id": "AES_IED",
    "name": "IED",
    "raw": "AES_IED",
    "statsExpected": true,
    "img": "img/AES_IED.png"
   },
   {
    "id": "AES_ProximityExplosive",
    "name": "Proximity Explosive",
    "raw": "AES_ProximityExplosive",
    "statsExpected": true,
    "img": "img/AES_ProximityExplosive.png"
   },
   {
    "id": "AES_Dynamite",
    "name": "Dynamite",
    "raw": "AES_Dynamite",
    "statsExpected": true
   },
   {
    "id": "AES_Grenade_M67",
    "name": "Grenade M67",
    "raw": "AES_Grenade_M67",
    "statsExpected": true,
    "stats": {
     "Throw Damage": "10",
     "Ammo Capacity": "1",
     "Cooldown": "0.5"
    },
    "allStats": {
     "Ammo Capacity": "1",
     "Cooldown": "0.5",
     "Throw Damage": "10",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "20",
     "Throw Stamina Cost": "5"
    },
    "statSource": "files",
    "img": "img/AES_Grenade_M67.png"
   },
   {
    "id": "AES_Molotov",
    "name": "Molotov",
    "raw": "AES_Molotov",
    "statsExpected": true,
    "stats": {
     "Damage": "5",
     "Throw Damage": "10",
     "Head Shot Damage": "0",
     "Stability Damage": "5",
     "Limb Damage": "0",
     "Ammo Capacity": "1",
     "Cooldown": "0.5"
    },
    "allStats": {
     "Ammo Capacity": "1",
     "Cooldown": "0.5",
     "Damage": "5",
     "Damage Multiplier": "1",
     "Head Shot Damage": "0",
     "Limb Damage": "0",
     "Limb Damage Modifier": "1",
     "Stability Damage": "5",
     "Stability Damage Modifier": "1",
     "Throw Damage": "10",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "20",
     "Throw Stamina Cost": "5"
    },
    "statSource": "files",
    "img": "img/AES_Molotov.png"
   },
   {
    "id": "AES_Pipebomb",
    "name": "Pipebomb",
    "raw": "AES_Pipebomb",
    "statsExpected": true,
    "stats": {
     "Throw Damage": "10",
     "Ammo Capacity": "1",
     "Cooldown": "0.5"
    },
    "allStats": {
     "Ammo Capacity": "1",
     "Cooldown": "0.5",
     "Throw Damage": "10",
     "Throw Limb Damage": "0",
     "Throw Stability Damage": "20",
     "Throw Stamina Cost": "5"
    },
    "statSource": "files",
    "img": "img/AES_Pipebomb.png"
   }
  ],
  "consumables": [
   {
    "id": "ID_Consumable_Adrenaline",
    "name": "Adrenaline",
    "raw": "ID_Consumable_Adrenaline"
   },
   {
    "id": "ID_Consumable_Bandage",
    "name": "Bandage",
    "raw": "ID_Consumable_Bandage",
    "img": "img/ID_Consumable_Bandage.png"
   },
   {
    "id": "ID_Consumable_C4Explosive",
    "name": "C4Explosive",
    "raw": "ID_Consumable_C4Explosive"
   },
   {
    "id": "ID_Consumable_ClaymoreMine",
    "name": "Claymore Mine",
    "raw": "ID_Consumable_ClaymoreMine"
   },
   {
    "id": "ID_Consumable_Dynamite",
    "name": "Dynamite",
    "raw": "ID_Consumable_Dynamite"
   },
   {
    "id": "ID_Consumable_EMPCharge",
    "name": "EMP Charge",
    "raw": "ID_Consumable_EMPCharge"
   },
   {
    "id": "ID_Consumable_Firecrackers",
    "name": "Firecrackers",
    "raw": "ID_Consumable_Firecrackers"
   },
   {
    "id": "ID_Consumable_GeneTherapy",
    "name": "Gene Therapy",
    "raw": "ID_Consumable_GeneTherapy",
    "img": "img/ID_Consumable_GeneTherapy.png"
   },
   {
    "id": "ID_Consumable_Glowstick",
    "name": "Glowstick",
    "raw": "ID_Consumable_Glowstick"
   },
   {
    "id": "ID_Consumable_Grenade_ANM14",
    "name": "Grenade ANM14",
    "raw": "ID_Consumable_Grenade_ANM14"
   },
   {
    "id": "ID_Consumable_Grenade_Flashbang",
    "name": "Grenade Flashbang",
    "raw": "ID_Consumable_Grenade_Flashbang"
   },
   {
    "id": "ID_Consumable_Grenade_M34WP",
    "name": "Grenade M34WP",
    "raw": "ID_Consumable_Grenade_M34WP"
   },
   {
    "id": "ID_Consumable_Grenade_M67",
    "name": "Grenade M67",
    "raw": "ID_Consumable_Grenade_M67",
    "img": "img/ID_Consumable_Grenade_M67.png"
   },
   {
    "id": "ID_Consumable_LockpickingKit",
    "name": "Lockpicking Kit",
    "raw": "ID_Consumable_LockpickingKit"
   },
   {
    "id": "ID_Consumable_MassCasualtyKit",
    "name": "Mass Casualty Kit",
    "raw": "ID_Consumable_MassCasualtyKit"
   },
   {
    "id": "ID_Consumable_Medkit",
    "name": "Medkit",
    "raw": "ID_Consumable_Medkit",
    "img": "img/ID_Consumable_Medkit.png"
   },
   {
    "id": "ID_Consumable_PhalanxPills",
    "name": "Phalanx Pills",
    "raw": "ID_Consumable_PhalanxPills",
    "img": "img/ID_Consumable_PhalanxPills.png"
   },
   {
    "id": "ID_Consumable_ScentMaskingSpray",
    "name": "Scent Masking Spray",
    "raw": "ID_Consumable_ScentMaskingSpray"
   },
   {
    "id": "ID_Consumable_StimPack",
    "name": "Stim Pack",
    "raw": "ID_Consumable_StimPack"
   }
  ],
  "gear": [
   {
    "id": "ID_Permanent_ASP",
    "name": "ASP",
    "raw": "ID_Permanent_ASP"
   },
   {
    "id": "ID_Permanent_CamelPack",
    "name": "Camel Pack",
    "raw": "ID_Permanent_CamelPack"
   },
   {
    "id": "ID_Permanent_DropHolster",
    "name": "Drop Holster",
    "raw": "ID_Permanent_DropHolster"
   },
   {
    "id": "ID_Permanent_DualMagClamp",
    "name": "Dual Mag Clamp",
    "raw": "ID_Permanent_DualMagClamp"
   },
   {
    "id": "ID_Permanent_GasMask",
    "name": "Gas Mask",
    "raw": "ID_Permanent_GasMask"
   },
   {
    "id": "ID_Permanent_GunLight_Large",
    "name": "Gun Light Large",
    "raw": "ID_Permanent_GunLight_Large"
   },
   {
    "id": "ID_Permanent_GunLight_Small",
    "name": "Gun Light Small",
    "raw": "ID_Permanent_GunLight_Small"
   },
   {
    "id": "ID_Permanent_HTGPS",
    "name": "HTGPS",
    "raw": "ID_Permanent_HTGPS"
   },
   {
    "id": "ID_Permanent_LaserSight",
    "name": "Laser Sight",
    "raw": "ID_Permanent_LaserSight"
   },
   {
    "id": "ID_Permanent_LongGunGPS",
    "name": "Long Gun GPS",
    "raw": "ID_Permanent_LongGunGPS"
   },
   {
    "id": "ID_Permanent_MagDisplay",
    "name": "Mag Display",
    "raw": "ID_Permanent_MagDisplay"
   },
   {
    "id": "ID_Permanent_MagLite",
    "name": "Mag Lite",
    "raw": "ID_Permanent_MagLite",
    "img": "img/ID_Permanent_MagLite.png"
   },
   {
    "id": "ID_Permanent_MedicalSmartwatch",
    "name": "Medical Smartwatch",
    "raw": "ID_Permanent_MedicalSmartwatch"
   },
   {
    "id": "ID_Permanent_NVG",
    "name": "NVG",
    "raw": "ID_Permanent_NVG"
   },
   {
    "id": "ID_Permanent_ShoulderMountedLight",
    "name": "Shoulder Mounted Light",
    "raw": "ID_Permanent_ShoulderMountedLight"
   },
   {
    "id": "ID_Permanent_Suppressor_Large",
    "name": "Suppressor Large",
    "raw": "ID_Permanent_Suppressor_Large"
   },
   {
    "id": "ID_Permanent_Suppressor_Small",
    "name": "Suppressor Small",
    "raw": "ID_Permanent_Suppressor_Small"
   },
   {
    "id": "ID_Permanent_ThermalGoggles",
    "name": "Thermal Goggles",
    "raw": "ID_Permanent_ThermalGoggles"
   },
   {
    "id": "ID_Permanent_ThrowablesBandolier",
    "name": "Throwables Bandolier",
    "raw": "ID_Permanent_ThrowablesBandolier"
   }
  ],
  "attachments": [
   {
    "id": "IA_MZL_L_Brake_01A",
    "name": "MZL L Brake 01A",
    "raw": "IA_MZL_L_Brake_01A",
    "img": "img/IA_MZL_L_Brake_01A.png"
   },
   {
    "id": "IA_MZL_L_Compensator",
    "name": "MZL L Compensator",
    "raw": "IA_MZL_L_Compensator",
    "img": "img/IA_MZL_L_Compensator.png"
   },
   {
    "id": "IA_MZL_L_ShotgunChoke_01A",
    "name": "MZL L Shotgun Choke 01A",
    "raw": "IA_MZL_L_ShotgunChoke_01A",
    "img": "img/IA_MZL_L_ShotgunChoke_01A.png"
   },
   {
    "id": "IA_MZL_L_Suppressor",
    "name": "MZL L Suppressor",
    "raw": "IA_MZL_L_Suppressor",
    "img": "img/IA_MZL_L_Suppressor.png"
   },
   {
    "id": "IA_MZL_S_Brake_01A",
    "name": "MZL S Brake 01A",
    "raw": "IA_MZL_S_Brake_01A",
    "img": "img/IA_MZL_S_Brake_01A.png"
   },
   {
    "id": "IA_MZL_S_Compensator",
    "name": "MZL S Compensator",
    "raw": "IA_MZL_S_Compensator",
    "img": "img/IA_MZL_S_Compensator.png"
   },
   {
    "id": "IA_MZL_S_Suppressor",
    "name": "MZL S Suppressor",
    "raw": "IA_MZL_S_Suppressor",
    "img": "img/IA_MZL_S_Suppressor.png"
   },
   {
    "id": "IA_RAIL_L_Laser",
    "name": "RAIL L Laser",
    "raw": "IA_RAIL_L_Laser",
    "img": "img/IA_RAIL_L_Laser.png"
   },
   {
    "id": "IA_RAIL_L_Light",
    "name": "RAIL L Light",
    "raw": "IA_RAIL_L_Light",
    "img": "img/IA_RAIL_L_Light.png"
   },
   {
    "id": "IA_RAIL_MP5_Light",
    "name": "RAIL MP5 Light",
    "raw": "IA_RAIL_MP5_Light"
   },
   {
    "id": "IA_RAIL_S_Laser",
    "name": "RAIL S Laser",
    "raw": "IA_RAIL_S_Laser",
    "img": "img/IA_RAIL_S_Laser.png"
   },
   {
    "id": "IA_RAIL_S_Light",
    "name": "RAIL S Light",
    "raw": "IA_RAIL_S_Light",
    "img": "img/IA_RAIL_S_Light.png"
   },
   {
    "id": "IA_SIGHT_ACOG",
    "name": "SIGHT ACOG",
    "raw": "IA_SIGHT_ACOG",
    "img": "img/IA_SIGHT_ACOG.png"
   },
   {
    "id": "IA_SIGHT_BUIS",
    "name": "SIGHT BUIS",
    "raw": "IA_SIGHT_BUIS",
    "img": "img/IA_SIGHT_BUIS.png"
   },
   {
    "id": "IA_SIGHT_CarryHandle",
    "name": "SIGHT Carry Handle",
    "raw": "IA_SIGHT_CarryHandle"
   },
   {
    "id": "IA_SIGHT_GhostRing",
    "name": "SIGHT Ghost Ring",
    "raw": "IA_SIGHT_GhostRing",
    "img": "img/IA_SIGHT_GhostRing.png"
   },
   {
    "id": "IA_SIGHT_Holo",
    "name": "SIGHT Holo",
    "raw": "IA_SIGHT_Holo",
    "img": "img/IA_SIGHT_Holo.png"
   },
   {
    "id": "IA_SIGHT_HoloSmall",
    "name": "SIGHT Holo Small",
    "raw": "IA_SIGHT_HoloSmall",
    "img": "img/IA_SIGHT_HoloSmall.png"
   },
   {
    "id": "IA_SIGHT_Scope",
    "name": "SIGHT Scope",
    "raw": "IA_SIGHT_Scope",
    "img": "img/IA_SIGHT_Scope.png"
   }
  ],
  "recipes": [
   {
    "id": "ID_Recipe_Barricade_Electrified",
    "name": "Barricade Electrified",
    "category": "Barricades"
   },
   {
    "id": "ID_Recipe_Barricade_Explosive",
    "name": "Barricade Explosive",
    "category": "Barricades"
   },
   {
    "id": "ID_Recipe_Barricade_Incendiary",
    "name": "Barricade Incendiary",
    "category": "Barricades"
   },
   {
    "id": "ID_Recipe_Barricade_Reinforced",
    "name": "Barricade Reinforced",
    "category": "Barricades"
   },
   {
    "id": "ID_Recipe_Barricade_ShotgunAmmo",
    "name": "Barricade Shotgun Ammo",
    "category": "Barricades"
   },
   {
    "id": "ID_Recipe_Barricade_Spiked",
    "name": "Barricade Spiked",
    "category": "Barricades"
   },
   {
    "id": "ID_Recipe_Barricade_Wooden",
    "name": "Barricade Wooden",
    "category": "Barricades"
   },
   {
    "id": "ID_Recipe_AntibioticBandage",
    "name": "Antibiotic Bandage",
    "category": "Medical"
   },
   {
    "id": "ID_Recipe_AntibioticSyringe",
    "name": "Antibiotic Syringe",
    "category": "Medical"
   },
   {
    "id": "ID_Recipe_Bandage",
    "name": "Bandage",
    "category": "Medical"
   },
   {
    "id": "ID_Recipe_CauterizedDisinfectant",
    "name": "Cauterized Disinfectant",
    "category": "Medical"
   },
   {
    "id": "ID_Recipe_DirtyHeal",
    "name": "Dirty Heal",
    "category": "Medical"
   },
   {
    "id": "ID_Recipe_HydrogenPeroxide",
    "name": "Hydrogen Peroxide",
    "category": "Medical"
   },
   {
    "id": "ID_Recipe_Salve",
    "name": "Salve",
    "category": "Medical"
   },
   {
    "id": "ID_Recipe_Splint",
    "name": "Splint",
    "category": "Medical"
   },
   {
    "id": "ID_Recipe_Stimulants",
    "name": "Stimulants",
    "category": "Medical"
   },
   {
    "id": "ID_Recipe_Tourniquet",
    "name": "Tourniquet",
    "category": "Medical"
   },
   {
    "id": "ID_Recipe_BloodBomb",
    "name": "Blood Bomb",
    "category": "Throwables"
   },
   {
    "id": "ID_Recipe_BloodLure",
    "name": "Blood Lure",
    "category": "Throwables"
   },
   {
    "id": "ID_Recipe_EMP",
    "name": "EMP",
    "category": "Throwables"
   },
   {
    "id": "ID_Recipe_ImprovisedFlashbang",
    "name": "Improvised Flashbang",
    "category": "Throwables"
   },
   {
    "id": "ID_Recipe_ImprovisedTearGas",
    "name": "Improvised Tear Gas",
    "category": "Throwables"
   },
   {
    "id": "ID_Recipe_Molotov",
    "name": "Molotov",
    "category": "Throwables"
   },
   {
    "id": "ID_Recipe_MustardGas",
    "name": "Mustard Gas",
    "category": "Throwables"
   },
   {
    "id": "ID_Recipe_Pipebomb",
    "name": "Pipebomb",
    "category": "Throwables"
   },
   {
    "id": "ID_Recipe_RomanCocktail",
    "name": "Roman Cocktail",
    "category": "Throwables"
   },
   {
    "id": "ID_Recipe_BasicTripwire",
    "name": "Basic Tripwire",
    "category": "Traps"
   },
   {
    "id": "ID_Recipe_BuckshotTripwire",
    "name": "Buckshot Tripwire",
    "category": "Traps"
   },
   {
    "id": "ID_Recipe_ChemicalFireTrap",
    "name": "Chemical Fire Trap",
    "category": "Traps"
   },
   {
    "id": "ID_Recipe_DirectionalMine",
    "name": "Directional Mine",
    "category": "Traps"
   },
   {
    "id": "ID_Recipe_ElectrifiedChainlink",
    "name": "Electrified Chainlink",
    "category": "Traps"
   },
   {
    "id": "ID_Recipe_ElectrifiedTripwire",
    "name": "Electrified Tripwire",
    "category": "Traps"
   },
   {
    "id": "ID_Recipe_IED",
    "name": "IED",
    "category": "Traps"
   },
   {
    "id": "ID_Recipe_NoiseMakerFlasher",
    "name": "Noise Maker Flasher",
    "category": "Traps"
   },
   {
    "id": "ID_Recipe_SmokeTripwire",
    "name": "Smoke Tripwire",
    "category": "Traps"
   },
   {
    "id": "ID_Recipe_SoundTripwire",
    "name": "Sound Tripwire",
    "category": "Traps"
   },
   {
    "id": "ID_Recipe_SpikedTripwire",
    "name": "Spiked Tripwire",
    "category": "Traps"
   },
   {
    "id": "ID_Recipe_WallmountedBuckshot",
    "name": "Wallmounted Buckshot",
    "category": "Traps"
   },
   {
    "id": "ID_Recipe_WallmountedExplosive",
    "name": "Wallmounted Explosive",
    "category": "Traps"
   }
  ],
  "zombies": [
   {
    "id": "Zomb_Adult_MUT",
    "name": "Adult Mutated",
    "raw": "Zomb_Adult_MUT",
    "category": "Adult",
    "stats": {
     "Max Health": "600",
     "Movement Speed": "400",
     "Melee Damage Basic": "30",
     "Melee Damage Heavy": "50",
     "Combat Range": "200",
     "Infection Chance": "0.1",
     "Attack Cooldown Basic": "0.5"
    },
    "allStats": {
     "Struggle Drain": "10",
     "Incoming Damagemodifier": "1",
     "Max Health": "600",
     "Movement Speed": "400",
     "Electricity Damage Resistance": "0",
     "Fire Damage Resistance": "0",
     "Poison Cloud Damage Resistance": "0",
     "Resistance": "0",
     "Bladed Damage Resistance": "0",
     "Bladed Stability Resistance": "0",
     "Blunt Damage Resistance": "0",
     "Blunt Stability Resistance": "0",
     "Explosive Damage Resistance": "0",
     "Explosive Stability Damage Resistance": "0",
     "Gun Shot Resistance": "0",
     "Gun Shot Stability Resistance": "0",
     "Head Bladed Damage Resistance": "0",
     "Head Bladed Stability Resistance": "0",
     "Head Blunt Damage Resistance": "0",
     "Head Blunt Stability Resistance": "0",
     "Head Gun Shot Resistance": "0",
     "Head Resistance": "0",
     "Head Stability Resistance": "0",
     "Stability Resistance": "0",
     "Resistance Head Gun Shot Stability Resistance": "0",
     "Water Damage Resistance": "0",
     "Ability Cooldown Variance Dodge": "0",
     "Ability Cooldown Variance Grab": "0",
     "Ability Cooldown Variance Taunt": "0",
     "Ability Cooldown Dodge": "5",
     "Ability Cooldown Grab": "5",
     "Ability Cooldown Taunt": "15",
     "Attack Cooldown Variance Basic": "0",
     "Attack Cooldown Variance Heavy": "0.25",
     "Attack Cooldown Variance Lunge": "0.25",
     "Attack Cooldown Basic": "0.5",
     "Attack Cooldown Global": "0.5",
     "Attack Cooldown Heavy": "5.25",
     "Attack Cooldown Lunge": "2.75",
     "Combat Range": "200",
     "Grab Chance": "0.3",
     "Grab Periodic Damage": "30",
     "Grab Range": "140",
     "Idle Wander Radius": "1000",
     "Infection Chance": "0.1",
     "Initial Cooldown Basic": "0",
     "Initial Cooldown Dodge": "5",
     "Initial Cooldown Grab": "3",
     "Initial Cooldown Heavy": "3",
     "Initial Cooldown Lunge": "0",
     "Initial Cooldown Taunt": "10",
     "Melee Activation Range Basic": "200",
     "Melee Activation Range Heavy": "200",
     "Melee Activation Range Lunge": "550",
     "Melee Damage Basic": "30",
     "Melee Damage Heavy": "50",
     "Melee Damage Lunge": "60",
     "Melee Min Activation Range Lunge": "350",
     "Melee Range Basic": "200",
     "Melee Range Heavy": "200",
     "Melee Range Lunge": "200",
     "Melee Stability Damage Basic": "60",
     "Melee Stability Damage Heavy": "100",
     "Melee Stability Damage Lunge": "100"
    },
    "statSource": "files"
   },
   {
    "id": "Zomb_Adult_RNR",
    "name": "Adult Runner",
    "raw": "Zomb_Adult_RNR",
    "category": "Adult",
    "stats": {
     "Max Health": "100",
     "Movement Speed": "400",
     "Melee Damage Basic": "20",
     "Melee Damage Heavy": "10",
     "Combat Range": "165",
     "Infection Chance": "1",
     "Attack Cooldown Basic": "0.5"
    },
    "allStats": {
     "Struggle Drain": "10",
     "Incoming Damagemodifier": "1",
     "Max Health": "100",
     "Movement Speed": "400",
     "Electricity Damage Resistance": "0",
     "Fire Damage Resistance": "0",
     "Poison Cloud Damage Resistance": "0",
     "Resistance": "0",
     "Bladed Damage Resistance": "0",
     "Bladed Stability Resistance": "0",
     "Blunt Damage Resistance": "0",
     "Blunt Stability Resistance": "0",
     "Explosive Damage Resistance": "0",
     "Explosive Stability Damage Resistance": "0",
     "Gun Shot Resistance": "0",
     "Gun Shot Stability Resistance": "0",
     "Head Bladed Damage Resistance": "0",
     "Head Bladed Stability Resistance": "0",
     "Head Blunt Damage Resistance": "0",
     "Head Blunt Stability Resistance": "0",
     "Head Gun Shot Resistance": "0",
     "Head Resistance": "0",
     "Head Stability Resistance": "0",
     "Stability Resistance": "0",
     "Resistance Head Gun Shot Stability Resistance": "0",
     "Water Damage Resistance": "0",
     "Ability Cooldown Variance Dodge": "0",
     "Ability Cooldown Variance Grab": "0",
     "Ability Cooldown Variance Taunt": "0",
     "Ability Cooldown Dodge": "5",
     "Ability Cooldown Grab": "5",
     "Ability Cooldown Taunt": "15",
     "Attack Cooldown Variance Basic": "0",
     "Attack Cooldown Variance Heavy": "0.25",
     "Attack Cooldown Variance Lunge": "0.25",
     "Attack Cooldown Basic": "0.5",
     "Attack Cooldown Global": "0.5",
     "Attack Cooldown Heavy": "5.25",
     "Attack Cooldown Lunge": "5",
     "Combat Range": "165",
     "Grab Chance": "0.3",
     "Grab Periodic Damage": "10",
     "Grab Range": "140",
     "Idle Wander Radius": "1000",
     "Infection Chance": "1",
     "Initial Cooldown Basic": "0",
     "Initial Cooldown Dodge": "5",
     "Initial Cooldown Grab": "3",
     "Initial Cooldown Heavy": "3",
     "Initial Cooldown Lunge": "0",
     "Initial Cooldown Taunt": "10",
     "Melee Activation Range Basic": "150",
     "Melee Activation Range Basic Long": "225",
     "Melee Activation Range Heavy": "200",
     "Melee Activation Range Lunge": "550",
     "Melee Damage Basic": "20",
     "Melee Damage Heavy": "10",
     "Melee Damage Lunge": "20",
     "Melee Max Warping Range Basic": "75",
     "Melee Max Warping Range Basic Long": "150",
     "Melee Min Activation Range Lunge": "400",
     "Melee Range Basic": "130",
     "Melee Range Heavy": "225",
     "Melee Range Lunge": "175",
     "Melee Stability Damage Basic": "60",
     "Melee Stability Damage Heavy": "60",
     "Melee Stability Damage Lunge": "100"
    },
    "statSource": "files"
   },
   {
    "id": "Zomb_Adult_RNR_Prime",
    "name": "Adult Runner (Prime)",
    "raw": "Zomb_Adult_RNR_Prime",
    "category": "Prime",
    "stats": {
     "Max Health": "120",
     "Melee Damage Basic": "25",
     "Melee Damage Heavy": "12"
    },
    "allStats": {
     "Max Health": "120",
     "Melee Damage Basic": "25",
     "Melee Damage Heavy": "12",
     "Melee Damage Lunge": "25",
     "Melee Stability Damage Basic": "72",
     "Melee Stability Damage Heavy": "72",
     "Melee Stability Damage Lunge": "120"
    },
    "statSource": "files"
   },
   {
    "id": "Zomb_Adult_SHA",
    "name": "Adult Shambler",
    "raw": "Zomb_Adult_SHA",
    "category": "Adult",
    "stats": {
     "Max Health": "70",
     "Movement Speed": "78",
     "Melee Damage Basic": "10",
     "Melee Damage Heavy": "15",
     "Combat Range": "120",
     "Infection Chance": "1",
     "Attack Cooldown Basic": "2.75"
    },
    "allStats": {
     "Struggle Drain": "10",
     "Incoming Damagemodifier": "1",
     "Max Health": "70",
     "Movement Speed": "78",
     "Electricity Damage Resistance": "0",
     "Fire Damage Resistance": "0",
     "Poison Cloud Damage Resistance": "0",
     "Bladed Damage Resistance": "0",
     "Bladed Stability Resistance": "0",
     "Blunt Damage Resistance": "0",
     "Blunt Stability Resistance": "0",
     "Explosive Damage Resistance": "0",
     "Explosive Stability Damage Resistance": "0",
     "Gun Shot Resistance": "0",
     "Gun Shot Stability Resistance": "0",
     "Head Bladed Damage Resistance": "0",
     "Head Bladed Stability Resistance": "0",
     "Head Blunt Damage Resistance": "0",
     "Head Blunt Stability Resistance": "0",
     "Head Gun Shot Resistance": "0",
     "Head Resistance": "0",
     "Head Stability Resistance": "0",
     "Stability Resistance": "0",
     "Resistance Head Gun Shot Stability Resistance": "0",
     "Water Damage Resistance": "0",
     "Ability Cooldown Variance Dodge": "0",
     "Ability Cooldown Variance Grab": "0",
     "Ability Cooldown Variance Shriek": "0.75",
     "Ability Cooldown Variance Taunt": "0",
     "Ability Cooldown Dodge": "5",
     "Ability Cooldown Grab": "5",
     "Ability Cooldown Shriek": "9999",
     "Ability Cooldown Taunt": "15",
     "Attack Cooldown Variance Basic": "0.25",
     "Attack Cooldown Variance Heavy": "0.25",
     "Attack Cooldown Variance Lunge": "0.25",
     "Attack Cooldown Basic": "2.75",
     "Attack Cooldown Global": "0.5",
     "Attack Cooldown Heavy": "5.25",
     "Attack Cooldown Lunge": "2.75",
     "Combat Range": "120",
     "Grab Chance": "0.8",
     "Grab Periodic Damage": "3",
     "Grab Range": "160",
     "Idle Wander Radius": "1000",
     "Infection Chance": "1",
     "Initial Cooldown Basic": "0",
     "Initial Cooldown Dodge": "5",
     "Initial Cooldown Grab": "3",
     "Initial Cooldown Heavy": "3",
     "Initial Cooldown Lunge": "0",
     "Initial Cooldown Shriek": "0",
     "Initial Cooldown Taunt": "10",
     "Melee Activation Range Basic": "128",
     "Melee Activation Range Heavy": "128",
     "Melee Activation Range Lunge": "300",
     "Melee Damage Basic": "10",
     "Melee Damage Heavy": "15",
     "Melee Damage Lunge": "40",
     "Melee Range Basic": "150",
     "Melee Range Heavy": "150",
     "Melee Range Lunge": "150",
     "Melee Stability Damage Basic": "40",
     "Melee Stability Damage Heavy": "60",
     "Melee Stability Damage Lunge": "100"
    },
    "statSource": "files"
   },
   {
    "id": "Zomb_Adult_SHA_Prime",
    "name": "Adult Shambler (Prime)",
    "raw": "Zomb_Adult_SHA_Prime",
    "category": "Prime",
    "stats": {
     "Max Health": "300",
     "Melee Damage Basic": "40",
     "Melee Damage Heavy": "70"
    },
    "allStats": {
     "Max Health": "300",
     "Melee Damage Basic": "40",
     "Melee Damage Heavy": "70"
    },
    "statSource": "files"
   },
   {
    "id": "Zomb_Adult_WLK",
    "name": "Adult Walker",
    "raw": "Zomb_Adult_WLK",
    "category": "Adult",
    "stats": {
     "Max Health": "100",
     "Movement Speed": "100",
     "Melee Damage Basic": "20",
     "Melee Damage Heavy": "20",
     "Combat Range": "165",
     "Infection Chance": "1",
     "Grab Bite Damage": "10",
     "Attack Cooldown Basic": "1"
    },
    "allStats": {
     "Struggle Drain": "10",
     "Incoming Damagemodifier": "1",
     "Max Health": "100",
     "Movement Speed": "100",
     "Electricity Damage Resistance": "0",
     "Fire Damage Resistance": "0",
     "Poison Cloud Damage Resistance": "0",
     "Resistance": "0",
     "Bladed Damage Resistance": "0",
     "Bladed Stability Resistance": "0",
     "Blunt Damage Resistance": "0",
     "Blunt Stability Resistance": "0",
     "Explosive Damage Resistance": "0",
     "Explosive Stability Damage Resistance": "0",
     "Gun Shot Resistance": "0",
     "Gun Shot Stability Resistance": "0",
     "Head Bladed Damage Resistance": "0",
     "Head Blunt Damage Resistance": "0",
     "Head Blunt Stability Resistance": "0",
     "Head Gun Shot Resistance": "0",
     "Head Resistance": "0",
     "Head Stability Resistance": "0",
     "Stability Resistance": "0",
     "Resistance Head Gun Shot Stability Resistance": "0",
     "Water Damage Resistance": "0",
     "Ability Cooldown Variance Dodge": "0",
     "Ability Cooldown Variance Grab": "0",
     "Ability Cooldown Variance Taunt": "0",
     "Ability Cooldown Dodge": "5",
     "Ability Cooldown Grab": "5",
     "Ability Cooldown Taunt": "3",
     "Attack Cooldown Variance Basic": "0.25",
     "Attack Cooldown Variance Heavy": "0.25",
     "Attack Cooldown Variance Lunge": "0.25",
     "Attack Cooldown Basic": "1",
     "Attack Cooldown Global": "0.5",
     "Attack Cooldown Heavy": "2",
     "Attack Cooldown Lunge": "2.75",
     "Combat Range": "165",
     "Grab Activation Range": "400",
     "Grab Bite Damage": "10",
     "Grab Periodic Damage": "7",
     "Grab Trigger Range": "80",
     "Idle Wander Radius": "1000",
     "Infection Chance": "1",
     "Initial Cooldown Basic": "0",
     "Initial Cooldown Dodge": "5",
     "Initial Cooldown Grab": "1",
     "Initial Cooldown Heavy": "3",
     "Initial Cooldown Lunge": "2",
     "Initial Cooldown Taunt": "10",
     "Melee Activation Range Basic": "85",
     "Melee Activation Range Basic Long": "200",
     "Melee Activation Range Heavy": "200",
     "Melee Activation Range Lunge": "450",
     "Melee Damage Basic": "20",
     "Melee Damage Heavy": "20",
     "Melee Damage Lunge": "20",
     "Melee Max Warping Range Basic": "75",
     "Melee Max Warping Range Basic Long": "150",
     "Melee Min Activation Range Basic Long": "85",
     "Melee Min Activation Range Lunge": "400",
     "Melee Range Basic": "150",
     "Melee Range Heavy": "150",
     "Melee Range Lunge": "150",
     "Melee Stability Damage Basic": "40",
     "Melee Stability Damage Heavy": "60",
     "Melee Stability Damage Lunge": "100"
    },
    "statSource": "files"
   },
   {
    "id": "Zomb_Adult_WLK_Prime",
    "name": "Adult Walker (Prime)",
    "raw": "Zomb_Adult_WLK_Prime",
    "category": "Prime",
    "stats": {
     "Max Health": "130",
     "Melee Damage Basic": "25",
     "Melee Damage Heavy": "25"
    },
    "allStats": {
     "Max Health": "130",
     "Melee Damage Basic": "25",
     "Melee Damage Heavy": "25",
     "Melee Damage Lunge": "25",
     "Melee Stability Damage Basic": "80",
     "Melee Stability Damage Heavy": "80",
     "Melee Stability Damage Lunge": "100"
    },
    "statSource": "files"
   },
   {
    "id": "Zomb_Child_RNR",
    "name": "Child Runner",
    "raw": "Zomb_Child_RNR",
    "category": "Child",
    "stats": {
     "Max Health": "30",
     "Movement Speed": "100",
     "Melee Damage Basic": "10",
     "Melee Damage Heavy": "10",
     "Combat Range": "100",
     "Infection Chance": "0",
     "Attack Cooldown Basic": "2.75"
    },
    "allStats": {
     "Struggle Drain": "4",
     "Incoming Damagemodifier": "1",
     "Max Health": "30",
     "Movement Speed": "100",
     "Electricity Damage Resistance": "0",
     "Fire Damage Resistance": "0",
     "Poison Cloud Damage Resistance": "0",
     "Resistance": "0",
     "Bladed Damage Resistance": "0",
     "Bladed Stability Resistance": "0",
     "Blunt Damage Resistance": "0",
     "Blunt Stability Resistance": "0",
     "Explosive Damage Resistance": "0",
     "Explosive Stability Damage Resistance": "0",
     "Gun Shot Resistance": "0",
     "Gun Shot Stability Resistance": "0",
     "Head Bladed Damage Resistance": "0",
     "Head Bladed Stability Resistance": "0",
     "Head Blunt Damage Resistance": "0",
     "Head Blunt Stability Resistance": "0",
     "Head Gun Shot Resistance": "0",
     "Head Resistance": "0",
     "Head Stability Resistance": "0",
     "Stability Resistance": "0",
     "Resistance Head Gun Shot Stability Resistance": "0",
     "Water Damage Resistance": "0",
     "Ability Cooldown Variance Dodge": "5",
     "Ability Cooldown Variance Grab": "0",
     "Ability Cooldown Variance Taunt": "0",
     "Ability Cooldown Dodge": "5",
     "Ability Cooldown Grab": "5",
     "Ability Cooldown Taunt": "15",
     "Attack Cooldown Variance Basic": "0.25",
     "Attack Cooldown Variance Heavy": "0.25",
     "Attack Cooldown Variance Lunge": "0.25",
     "Attack Cooldown Basic": "2.75",
     "Attack Cooldown Global": "0.5",
     "Attack Cooldown Heavy": "5.25",
     "Attack Cooldown Lunge": "2.75",
     "Combat Range": "100",
     "Grab Chance": "0",
     "Grab Periodic Damage": "7",
     "Grab Range": "100",
     "Infection Chance": "0",
     "Initial Cooldown Basic": "0",
     "Initial Cooldown Dodge": "5",
     "Initial Cooldown Grab": "3",
     "Initial Cooldown Heavy": "3",
     "Initial Cooldown Lunge": "0",
     "Initial Cooldown Taunt": "10",
     "Melee Activation Range Basic": "80",
     "Melee Activation Range Heavy": "80",
     "Melee Activation Range Lunge": "300",
     "Melee Damage Basic": "10",
     "Melee Damage Heavy": "10",
     "Melee Damage Lunge": "40",
     "Melee Range Basic": "100",
     "Melee Range Heavy": "100",
     "Melee Range Lunge": "200",
     "Melee Stability Damage Basic": "5",
     "Melee Stability Damage Heavy": "10",
     "Melee Stability Damage Lunge": "15"
    },
    "statSource": "files"
   },
   {
    "id": "Zomb_Child_SHA",
    "name": "Child Shambler",
    "raw": "Zomb_Child_SHA",
    "category": "Child",
    "stats": {
     "Max Health": "30",
     "Movement Speed": "78",
     "Melee Damage Basic": "10",
     "Melee Damage Heavy": "10",
     "Combat Range": "100",
     "Infection Chance": "0",
     "Attack Cooldown Basic": "2.75"
    },
    "allStats": {
     "Struggle Drain": "4",
     "Incoming Damagemodifier": "1",
     "Max Health": "30",
     "Movement Speed": "78",
     "Electricity Damage Resistance": "0",
     "Fire Damage Resistance": "0",
     "Poison Cloud Damage Resistance": "0",
     "Resistance": "0",
     "Bladed Damage Resistance": "0",
     "Bladed Stability Resistance": "0",
     "Blunt Damage Resistance": "0",
     "Blunt Stability Resistance": "0",
     "Explosive Damage Resistance": "0",
     "Explosive Stability Damage Resistance": "0",
     "Gun Shot Resistance": "0",
     "Gun Shot Stability Resistance": "0",
     "Head Bladed Damage Resistance": "0",
     "Head Bladed Stability Resistance": "0",
     "Head Blunt Damage Resistance": "0",
     "Head Blunt Stability Resistance": "0",
     "Head Gun Shot Resistance": "0",
     "Head Resistance": "0",
     "Head Stability Resistance": "0",
     "Stability Resistance": "0",
     "Resistance Head Gun Shot Stability Resistance": "0",
     "Water Damage Resistance": "0",
     "Ability Cooldown Variance Dodge": "5",
     "Ability Cooldown Variance Grab": "0",
     "Ability Cooldown Variance Taunt": "0",
     "Ability Cooldown Dodge": "5",
     "Ability Cooldown Grab": "5",
     "Ability Cooldown Taunt": "15",
     "Attack Cooldown Variance Basic": "0.25",
     "Attack Cooldown Variance Heavy": "0.25",
     "Attack Cooldown Variance Lunge": "0.25",
     "Attack Cooldown Basic": "2.75",
     "Attack Cooldown Global": "0.5",
     "Attack Cooldown Heavy": "5.25",
     "Attack Cooldown Lunge": "2.75",
     "Combat Range": "100",
     "Grab Chance": "0",
     "Grab Periodic Damage": "7",
     "Grab Range": "160",
     "Infection Chance": "0",
     "Initial Cooldown Basic": "0",
     "Initial Cooldown Dodge": "5",
     "Initial Cooldown Grab": "3",
     "Initial Cooldown Heavy": "3",
     "Initial Cooldown Lunge": "0",
     "Initial Cooldown Taunt": "10",
     "Melee Activation Range Basic": "80",
     "Melee Activation Range Heavy": "80",
     "Melee Activation Range Lunge": "300",
     "Melee Damage Basic": "10",
     "Melee Damage Heavy": "10",
     "Melee Damage Lunge": "40",
     "Melee Range Basic": "100",
     "Melee Range Heavy": "100",
     "Melee Range Lunge": "200",
     "Melee Stability Damage Basic": "5",
     "Melee Stability Damage Heavy": "10",
     "Melee Stability Damage Lunge": "15"
    },
    "statSource": "files"
   },
   {
    "id": "Zomb_Child_WLK",
    "name": "Child Walker",
    "raw": "Zomb_Child_WLK",
    "category": "Child",
    "stats": {
     "Max Health": "30",
     "Movement Speed": "50",
     "Melee Damage Basic": "10",
     "Melee Damage Heavy": "10",
     "Combat Range": "100",
     "Infection Chance": "0",
     "Attack Cooldown Basic": "2.75"
    },
    "allStats": {
     "Struggle Drain": "4",
     "Incoming Damagemodifier": "1",
     "Max Health": "30",
     "Movement Speed": "50",
     "Electricity Damage Resistance": "0",
     "Fire Damage Resistance": "0",
     "Poison Cloud Damage Resistance": "0",
     "Resistance": "0",
     "Bladed Damage Resistance": "0",
     "Bladed Stability Resistance": "0",
     "Blunt Damage Resistance": "0",
     "Blunt Stability Resistance": "0",
     "Explosive Damage Resistance": "0",
     "Explosive Stability Damage Resistance": "0",
     "Gun Shot Resistance": "0",
     "Gun Shot Stability Resistance": "0",
     "Head Bladed Damage Resistance": "0",
     "Head Bladed Stability Resistance": "0",
     "Head Blunt Damage Resistance": "0",
     "Head Blunt Stability Resistance": "0",
     "Head Gun Shot Resistance": "0",
     "Head Resistance": "0",
     "Head Stability Resistance": "0",
     "Stability Resistance": "0",
     "Resistance Head Gun Shot Stability Resistance": "0",
     "Water Damage Resistance": "0",
     "Ability Cooldown Variance Dodge": "5",
     "Ability Cooldown Variance Grab": "0",
     "Ability Cooldown Variance Taunt": "0",
     "Ability Cooldown Dodge": "5",
     "Ability Cooldown Grab": "5",
     "Ability Cooldown Taunt": "15",
     "Attack Cooldown Variance Basic": "0.25",
     "Attack Cooldown Variance Heavy": "0.25",
     "Attack Cooldown Variance Lunge": "0.25",
     "Attack Cooldown Basic": "2.75",
     "Attack Cooldown Global": "0.5",
     "Attack Cooldown Heavy": "5.25",
     "Attack Cooldown Lunge": "2.75",
     "Combat Range": "100",
     "Grab Chance": "0",
     "Grab Periodic Damage": "7",
     "Grab Range": "100",
     "Infection Chance": "0",
     "Initial Cooldown Basic": "0",
     "Initial Cooldown Dodge": "5",
     "Initial Cooldown Grab": "3",
     "Initial Cooldown Heavy": "3",
     "Initial Cooldown Lunge": "0",
     "Initial Cooldown Taunt": "10",
     "Melee Activation Range Basic": "80",
     "Melee Activation Range Heavy": "80",
     "Melee Activation Range Lunge": "300",
     "Melee Damage Basic": "10",
     "Melee Damage Heavy": "10",
     "Melee Damage Lunge": "40",
     "Melee Range Basic": "100",
     "Melee Range Heavy": "100",
     "Melee Range Lunge": "200",
     "Melee Stability Damage Basic": "5",
     "Melee Stability Damage Heavy": "10",
     "Melee Stability Damage Lunge": "15"
    },
    "statSource": "files"
   }
  ],
  "challenges": [
   {
    "id": "ChallengeTask_Barricades",
    "name": "Challenge Task Barricades",
    "raw": "ChallengeTask_Barricades"
   },
   {
    "id": "ChallengeTask_DeployItems",
    "name": "Challenge Task Deploy Items",
    "raw": "ChallengeTask_DeployItems"
   },
   {
    "id": "ChallengeTask_Dismemberments",
    "name": "Challenge Task Dismemberments",
    "raw": "ChallengeTask_Dismemberments"
   },
   {
    "id": "ChallengeTask_Extractions",
    "name": "Challenge Task Extractions",
    "raw": "ChallengeTask_Extractions"
   },
   {
    "id": "ChallengeTask_GatherSupplies",
    "name": "Challenge Task Gather Supplies",
    "raw": "ChallengeTask_GatherSupplies"
   },
   {
    "id": "ChallengeTask_Headshots",
    "name": "Challenge Task Headshots",
    "raw": "ChallengeTask_Headshots"
   },
   {
    "id": "ChallengeTask_Kicks",
    "name": "Challenge Task Kicks",
    "raw": "ChallengeTask_Kicks"
   },
   {
    "id": "ChallengeTask_Kill_Zombies",
    "name": "Challenge Task Kill Zombies",
    "raw": "ChallengeTask_Kill_Zombies"
   },
   {
    "id": "ChallengeTask_Kills_Explosive",
    "name": "Challenge Task Kills Explosive",
    "raw": "ChallengeTask_Kills_Explosive"
   },
   {
    "id": "ChallengeTask_Kills_Melee_Bladed",
    "name": "Challenge Task Kills Melee Bladed",
    "raw": "ChallengeTask_Kills_Melee_Bladed"
   },
   {
    "id": "ChallengeTask_Kills_Melee_Blunt",
    "name": "Challenge Task Kills Melee Blunt",
    "raw": "ChallengeTask_Kills_Melee_Blunt"
   },
   {
    "id": "ChallengeTask_Kills_Pistol",
    "name": "Challenge Task Kills Pistol",
    "raw": "ChallengeTask_Kills_Pistol"
   },
   {
    "id": "ChallengeTask_Kills_Rifle",
    "name": "Challenge Task Kills Rifle",
    "raw": "ChallengeTask_Kills_Rifle"
   },
   {
    "id": "ChallengeTask_Kills_Shotgun",
    "name": "Challenge Task Kills Shotgun",
    "raw": "ChallengeTask_Kills_Shotgun"
   },
   {
    "id": "ChallengeTask_Kills_Thrown",
    "name": "Challenge Task Kills Thrown",
    "raw": "ChallengeTask_Kills_Thrown"
   },
   {
    "id": "ChallengeTask_ObjectiveCompletions",
    "name": "Challenge Task Objective Completions",
    "raw": "ChallengeTask_ObjectiveCompletions"
   },
   {
    "id": "ChallengeTask_Shoves",
    "name": "Challenge Task Shoves",
    "raw": "ChallengeTask_Shoves"
   }
  ]
 },
 "flavor": [
  "img/flavor/Broadway.jpg",
  "img/flavor/Bunker.jpg",
  "img/flavor/Flooded.jpg",
  "img/flavor/Hospital.jpg",
  "img/flavor/Lighthouse.jpg",
  "img/flavor/NOTLD.jpg",
  "img/flavor/Pottsville.jpg",
  "img/flavor/PowerPlant.jpg",
  "img/flavor/Waldo.jpg"
 ]
};
