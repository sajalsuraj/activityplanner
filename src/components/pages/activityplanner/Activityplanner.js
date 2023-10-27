import "./../../../styles/Flex.css";
import "./../../../styles/Global.css";
import List from "./components/List";
import useParticipantsStore from "../../../hooks/useParticipantsStore";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  API_BASE_URL,
  checkIfDuplicateAvailable,
  sortByPrice,
} from "../../../helpers/Helper";

function Activityplanner() {
  const navigate = useNavigate();
  const { participants, resetParticipants } = useParticipantsStore(
    (state) => state
  );
  const [activities, setActivities] = useState([]); // Activities list state
  const [isActivityLoading, setIsActivityLoading] = useState(false); // Loading state

  /**
   *
   * @param {*} url - API URL
   * @returns activities data response / Error response
   *
   * Function to call Activities API
   */
  async function getActivity(url) {
    try {
      const activity = await fetch(url);
      const activityResponse = await activity.json();
      return activityResponse;
    } catch (e) {
      return new Error("Error while fetching activity");
    }
  }

  /**
   * @returns a promise that eventually returns
   * list of activities
   */
  async function getActivities() {
    const activitiesData = []; //Stores activities that setActivities() returns

    /**
     *
     * @returns promise that returns activitiesData
     *
     * setActivities() is a recursive function that keeps
     * pushing unique activities to the activiesData array.
     * It terminates when it finds a duplicate activity
     * from the response or when the max limit
     * of 5 activities are stored in the array.
     */
    function setActivities() {
      //Calling Activity API here
      return getActivity(
        `${API_BASE_URL}?participants=${participants.length}`
      ).then((activity) => {
        /**
         * Creating single activity object,
         * by keeping List component props in mind
         */
        const manipulatedActivityData = {
          name: activity.activity + " - $" + activity.price,
          idx: activity.key,
          price: activity.price,
        };

        // If duplicate activity is found, terminate the process and return the final array
        if (
          checkIfDuplicateAvailable(
            activitiesData,
            manipulatedActivityData,
            "idx"
          )
        ) {
          return activitiesData;
        }

        if (activitiesData.length < 5) {
          activitiesData.push(manipulatedActivityData);
          return setActivities(); //Calling recursively
        }

        return activitiesData;
      });
    }

    await setActivities();
    return activitiesData; // Returning the list of activities when all the activities are stored
  }

  /**
   * Resetting the participants state here and
   * navigating to the home page
   */
  const handleResetButtonClick = () => {
    resetParticipants();
    navigate("/");
  };

  useEffect(() => {
    if (participants && participants.length > 0) {
      setIsActivityLoading(true); // Loading state activated
      getActivities().then((activities) => {
        setIsActivityLoading(false); // Loading disabled
        setActivities(sortByPrice(activities)); //Setting the final sorted list of activities
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex justify-between">
          <h4>Participants: </h4>{" "}
          <button
            type="button"
            onClick={() => handleResetButtonClick()}
            className="btn-cancel"
          >
            Reset Participants
          </button>
        </div>

        {/** Loading the list of participants */}
        {participants.length > 0 ? (
          <List listData={participants} />
        ) : (
          <div className="loading">No participants found</div>
        )}
      </div>
      <div>
        <h4>Activities: </h4>

        {/** Loading state */}
        {activities && isActivityLoading && (
          <div className="loading">Activities are loading, please wait...</div>
        )}

        {/** When activities are present, displaying the data */}
        {activities && !isActivityLoading && <List listData={activities} />}

        {/** When there are no activities */}
        {activities.length < 1 && !isActivityLoading && (
          <div className="loading">No activities found</div>
        )}
      </div>
    </div>
  );
}

export default memo(Activityplanner);
