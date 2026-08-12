export interface CreateSessionBody {
  scheduledAt: string;
  duration: number;
  location: string;
  message?: string;
  guestId: string;
  skillId: number;
}