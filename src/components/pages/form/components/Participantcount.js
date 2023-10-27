import { memo } from "react";
import { useForm } from "react-hook-form";

const ParticipantCountForm = ({ onFormSubmit }) => {
  const {
    register,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <div className="form">
      <form className="flex flex-col gap-10" onSubmit={onFormSubmit}>
        <div className="flex align-center justify-between">
          <label>No. of participants:</label>
          <div className="flex flex-col flex-1">
            <input
              type="number"
              placeholder="Enter a number"
              {...register("participantsCount", {
                max: {
                  value: 5,
                  message: "Max 5 participants are allowed",
                },
                required: {
                  value: true,
                  message: "required",
                },
                min: {
                  value: 1,
                  message: "Participants count should be greater than 0",
                },
              })}
            />
          </div>
        </div>

        {errors.participantsCount && (
          <span className="formError text-right">
            {errors?.participantsCount.message}
          </span>
        )}

        <div className="flex justify-center">
          <button disabled={!isValid} type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(ParticipantCountForm);
