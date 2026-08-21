-- Make date_of_birth nullable since not all students have a known birthday at registration
ALTER TABLE public.students ALTER COLUMN date_of_birth DROP NOT NULL;
