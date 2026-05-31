import { agentSkills } from "@/data/mock-skills";

export function getSkillById(id: string) {
  return agentSkills.find((skill) => skill.id === id);
}

export function getStableSkills() {
  return agentSkills.filter((skill) => skill.status === "stable");
}
