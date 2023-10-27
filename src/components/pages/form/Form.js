import { useEffect, useState } from "react";
import "./Form.css";
import "./../../../styles/Flex.css";
import useParticipantsStore from "../../../hooks/useParticipantsStore";
import { useNavigate } from "react-router-dom";
import ParticipantCountForm from "./components/Participantcount";
import ParticipantsListEntryForm from "./components/Participantslistentry";

function Multistepform() {
  const [page, setPage] = useState(0); // Handles state of form pages
  const navigate = useNavigate();

  const {
    participants,
    addParticipants,
    resetParticipants,
    updateParticipants,
  } = useParticipantsStore((state) => state);

  useEffect(() => {
    if (participants && participants.length > 0) {
      setPage(1); // If participants count available, display the form that takes the entry of participants
    } else {
      setPage(0); // Displays the form that takes the entry of participants count
    }
  }, [participants]);

  /* Handles the submission of participant count form */
  const handleParticipantCountFormChange = (formEvent) => {
    formEvent.preventDefault();
    resetParticipants(); //Resetting participants array

    //Creating array of participant objects
    for (
      let i = 0;
      i < parseInt(formEvent.target.participantsCount.value);
      i++
    ) {
      addParticipants({ name: "", idx: i }); // Adding participants state
    }

    setPage(1); // Navigating to next form page
  };

  /* Handles the submission of participant entry form */
  const handleParticipantsListEntryFormChange = (
    formEvent,
    participantsData
  ) => {
    formEvent.preventDefault();
    updateParticipants(participantsData); // Updating participants list state once all the fields are filled
    navigate("/activities"); // Navigating to activities page once the list is updated
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
          onCancelForm={() => resetParticipants()}
          onFormSubmit={(event, participantsData) =>
            handleParticipantsListEntryFormChange(event, participantsData)
          }
        />
      )}
    </div>
  );
}

export default Multistepform;
