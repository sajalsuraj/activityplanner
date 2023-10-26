import { create } from "zustand";
import { persist } from "zustand/middleware";

const participantsStore = (set) => ({
  participants: [],
  addParticipants: (participant) =>
    set((state) => ({ participants: [...state.participants, participant] })),
  updateParticipantName: (currentParticipant, updatedName) =>
    set((state) => {
      let updatedParticipants = state.participants.map((participant) =>
        currentParticipant.idx === participant.idx
          ? { ...currentParticipant, name: updatedName }
          : participant
      );
      return { participants: updatedParticipants };
    }),
  resetParticipants: () => set({ participants: [] }),
});

// Persisting the data even when the page gets refreshed
const useParticipantsStore = create(
  persist(participantsStore, { name: "participants" })
);

export default useParticipantsStore;
