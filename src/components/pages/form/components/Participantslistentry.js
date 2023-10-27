import { useForm, useFieldArray, Controller } from "react-hook-form";
import { memo, useState } from "react";

const ParticipantsListEntryForm = ({
  participants,
  onCancelForm,
  onFormSubmit,
}) => {
  const [clonedParticipants, setClonedParticipants] = useState(participants); //Cloning participants array to avoid mutation in original array
  const {
    control,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      participants: clonedParticipants,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "participants",
  });

  // To update the state of every name field
  const updateParticipantName = (currentParticipant, updatedName) => {
    setClonedParticipants((prevState) => {
      return prevState.map((participant) =>
        currentParticipant.idx === participant.idx
          ? { ...currentParticipant, name: updatedName }
          : participant
      );
    });
  };

  // Input change handler
  const handleInputChange = (inputValue, participant) => {
    updateParticipantName(participant, inputValue);
  };

  /** Rendering the dynamic form with participants name fields */
  return (
    <div className="form">
      <p>No. of participants: {clonedParticipants.length}</p>
      <form
        className="flex flex-col gap-10"
        onSubmit={(e) => onFormSubmit(e, clonedParticipants)}
      >
        {fields.map((participant, index) => {
          return (
            <div key={participant.idx}>
              <Controller
                name={`participants.${participant.idx}.name`}
                control={control}
                defaultValue={null}
                rules={{
                  required: { value: true, message: "required" },
                  maxLength: {
                    value: 20,
                    message: "Upto 20 characters allowed",
                  },
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Only characters and space allowed",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="participantName"
                    type="text"
                    placeholder={`Enter participant ${
                      participant.idx + 1
                    } name`}
                    onBlur={(e) => {
                      field.onChange(e);
                      handleInputChange(field.value, participant);
                    }}
                  />
                )}
              />
              {errors?.participants?.[participant.idx]?.name && (
                <span className="formError">
                  {errors?.participants?.[participant.idx]?.name.message}
                </span>
              )}
            </div>
          );
        })}

        <div className="flex justify-center gap-10">
          <button onClick={onCancelForm} className="btn-cancel" type="button">
            Cancel
          </button>
          <button className="btn-submit" disabled={!isValid} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(ParticipantsListEntryForm);
