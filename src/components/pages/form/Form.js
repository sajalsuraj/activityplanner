import { useState } from "react";
import "./Form.css";
import "./../../../styles/Flex.css";
import useParticipantsStore from "../../../hooks/useParticipantsStore";
import { useNavigate } from "react-router-dom";
import ParticipantCountForm from "./components/Participantcount";
import ParticipantsListEntryForm from "./components/Participantslistentry";

export default function Multistepform() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const { participants, addParticipants, resetParticipants } =
    useParticipantsStore((state) => state);

  const handleParticipantCountFormChange = (formEvent) => {
    formEvent.preventDefault();
    resetParticipants(); //Resetting participants array

    //Creating array of participant objects
    for (
      let i = 0;
      i < parseInt(formEvent.target.participantsCount.value);
      i++
    ) {
      addParticipants({ name: "", idx: i });
    }

    setPage(1); // Navigating to next form page
  };

  const handleParticipantsListEntryFormChange = (formEvent) => {
    formEvent.preventDefault();
    navigate("/activities");
  };

  return (
    <div className="formContainer flex justify-center">
      {page === 0 && (
        <ParticipantCountForm
          onFormSubmit={(event) => handleParticipantCountFormChange(event)}
        />
      )}
      {page === 1 && (
        <ParticipantsListEntryForm
          participants={participants}
          onFormSubmit={(event) => handleParticipantsListEntryFormChange(event)}
        />
      )}
    </div>
  );
}
