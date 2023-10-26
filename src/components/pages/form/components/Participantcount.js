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
          <div className="flex flex-col">
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
              })}
            />
            {errors.participantsCount && (
              <span className="formError">
                {errors?.participantsCount.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button disabled={!isValid} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParticipantCountForm;
