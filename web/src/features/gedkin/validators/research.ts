import {
  createGedkinResearchProjectSchema,
  updateGedkinResearchProjectSchema,
  createGedkinPublicationSchema,
  updateGedkinPublicationSchema,
  createGedkinResearcherSchema,
  updateGedkinResearcherSchema,
  createGedkinCitationSchema,
  updateGedkinCitationSchema,
  createGedkinTrendSchema,
  updateGedkinTrendSchema,
} from '@educi/types';

export const createResearchProjectSchema = createGedkinResearchProjectSchema;
export const updateResearchProjectSchema = updateGedkinResearchProjectSchema;

export const createPublicationSchema = createGedkinPublicationSchema;
export const updatePublicationSchema = updateGedkinPublicationSchema;

export const createResearcherSchema = createGedkinResearcherSchema;
export const updateResearcherSchema = updateGedkinResearcherSchema;

export const createCitationSchema = createGedkinCitationSchema;
export const updateCitationSchema = updateGedkinCitationSchema;

export const createTrendSchema = createGedkinTrendSchema;
export const updateTrendSchema = updateGedkinTrendSchema;
