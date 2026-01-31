import { api, type TeamMember } from "./api-client";

export type { TeamMember };

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  return api.getTeam();
}
