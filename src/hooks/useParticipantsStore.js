import { create } from "zustand";
import { persist } from "zustand/middleware";

// Creating store to handle participants data
const participantsStore = (set) => ({
  participants: [],
  addParticipants: (participant) =>
    set((state) => ({ participants: [...state.participants, participant] })),
  updateParticipants: (updatedParticipantsData) =>
    set({ participants: updatedParticipantsData }),
  resetParticipants: () => set({ participants: [] }),
});

// Persisting the data even when the page gets refreshed
const useParticipantsStore = create(
  persist(participantsStore, { name: "participants" })
);

export default useParticipantsStore;
