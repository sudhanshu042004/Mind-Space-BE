import { z } from "zod";

export const JournalEntry = z.object({
  selfRating: z.number(),
  text: z.string()
});

export type JournalEntryType = z.infer<typeof JournalEntry>

export type MoodScoreType = {
  anxietyLevel: number,
  lowMoodLevel: number,
  contentmentLevel: number,
  frustrationLevel: number,
  excitementLevel: number,
}

