export interface Opportunity {
  id: number;
  title: string;
  shortDescription: string;
  deadline: string;
}

export interface ApplicationPayload {
  name: string;
  email: string;
  message?: string;
  opportunityId: number;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
}

export interface AdminApplication {
  id: number;
  name: string;
  email: string;
  message: string | null;
  timestamp: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  opportunity: {
    title: string;
  };
}
