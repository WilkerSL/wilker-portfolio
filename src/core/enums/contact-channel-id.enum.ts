export const ContactChannelId = {
  Email: "email",
  LinkedIn: "linkedin",
  GitHub: "github",
} as const;

export type ContactChannelId = (typeof ContactChannelId)[keyof typeof ContactChannelId];
