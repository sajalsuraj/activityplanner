import { useForm, useFieldArray, Controller } from "react-hook-form";
import useParticipantsStore from "../../../../hooks/useParticipantsStore";
import { useCallback } from "react";
import { debounce } from "../../../../helpers/Helper";

const ParticipantsListEntryForm = ({ participants, onFormSubmit }) => {
  const {
    control,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      participants: participants,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "participants",
  });

  const { updateParticipantName } = useParticipantsStore((state) => state);

  const debounceUpdateParticipantName = useCallback(
    debounce(
      (participant, inputValue) =>
        updateParticipantName(participant, inputValue),
      500
    ),
    []
  );

  const handleInputChange = (inputValue, participant) => {
    debounceUpdateParticipantName(participant, inputValue);
  };

  return (
    <div className="form">
      <p>No. of participants: {participants.length}</p>
      <form className="flex flex-col gap-10" onSubmit={onFormSubmit}>
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
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange(field.value, participant);
                    }}
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

        <div className="flex justify-center">
          <button disabled={!isValid} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParticipantsListEntryForm;
