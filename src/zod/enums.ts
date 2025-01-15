import { z } from 'zod';

export const zFACTION = z.enum([
  'CRYOKNIGHT',
  'GUARDIAN',
  'HAMMERMAGE',
  'NONE',
]);

export const zELEMENT = z.enum([
  'ARBORAE',
  'CRYONAE',
  'INFERNAE',
  'NECROMAE',
  'TEMPESTAE',
  'IMPACT',
  'NONE',
]);

export const zGEARSLOT = z.enum([
  'HEAD',
  'NECK',
  'TORSO',
  'BACK',
  'HANDS',
  'SHIELD',
  'LEGS',
  'FEET',
]);

export const zBANKTYPE = z.enum([
  'BONES',
  'BUILDING',
  'CAPES',
  'EXPLOSIVES',
  'BAIT',
  'HIDES',
  'INGREDIENTS',
  'LEATHERS',
  'LUMBER',
  'MONUMENT',
  'ORE',
  'REAGENTS',
  'POTIONS',
  'QUARTERMASTER',
  'STONE',
  'TIMBER',
]);
