import { Job, Organization } from '@prisma/client';

export type OrganizationWithJobs = Organization & { jobs: Job[] };
