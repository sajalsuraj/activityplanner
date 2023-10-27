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
  const [activities, setActivities] = useState([]);
  const [isActivityLoading, setIsActivityLoading] = useState(false);

  async function getActivity(url) {
    try {
      const activity = await fetch(url);
      const activityResponse = await activity.json();
      return activityResponse;
    } catch (e) {
      return new Error("Error while fetching activity");
    }
  }

  async function getActivities() {
    const activitiesData = [];

    function setActivities() {
      return getActivity(
        `${API_BASE_URL}?participants=${participants.length}`
      ).then((activity) => {
        const manipulatedActivityData = {
          name: activity.activity + " - $" + activity.price,
          idx: activity.key,
          price: activity.price,
        };

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
          return setActivities();
        }

        return activitiesData;
      });
    }

    await setActivities();
    return activitiesData;
  }

  const handleResetButtonClick = () => {
    resetParticipants();
    navigate("/");
  };

  useEffect(() => {
    if (participants && participants.length > 0) {
      setIsActivityLoading(true);
      getActivities().then((activities) => {
        setIsActivityLoading(false);
        setActivities(sortByPrice(activities));
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
        {participants.length > 0 ? (
          <List listData={participants} />
        ) : (
          <div className="loading">No participants found</div>
        )}
      </div>
      <div>
        <h4>Activities: </h4>
        {activities && isActivityLoading && (
          <div className="loading">Activities are loading, please wait...</div>
        )}
        {activities && !isActivityLoading && <List listData={activities} />}

        {activities.length < 1 && !isActivityLoading && (
          <div className="loading">No activities found</div>
        )}
      </div>
    </div>
  );
}

export default memo(Activityplanner);
