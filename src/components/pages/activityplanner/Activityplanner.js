import "./../../../styles/Flex.css";
import "./../../../styles/Global.css";
import List from "./components/List";
import useParticipantsStore from "../../../hooks/useParticipantsStore";
import { memo, useEffect, useState } from "react";

function Activityplanner() {
  const participants = useParticipantsStore((state) => state.participants);
  const [activities, setActivities] = useState([]);
  const [isActivityLoading, setIsActivityLoading] = useState(true);

  async function getActivity(url) {
    try {
      const activity = await fetch(url);
      const activityResponse = await activity.json();
      return activityResponse;
    } catch (e) {
      return new Error("Error while fetching activity");
    }
  }

  const checkIfDuplicateAvailable = (array, obj, keyToCheck) => {
    const availableObjIndex = array.findIndex(
      (itemObj) => itemObj[keyToCheck] === obj[keyToCheck]
    );
    if (availableObjIndex !== -1) {
      return true;
    }
    return false;
  };

  async function getActivities() {
    const activitiesData = [];

    function setActivities() {
      return getActivity(
        "https://www.boredapi.com/api/activity?participants=" +
          participants.length
      ).then((activity) => {
        const manipulatedActivityData = {
          name: activity.activity + " - $" + activity.price,
          idx: activity.key,
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

  useEffect(() => {
    getActivities().then((activities) => {
      setIsActivityLoading(false);
      setActivities(activities);
    });
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h4>Participants: </h4>
        {participants.length > 0 ? (
          <List listData={participants} />
        ) : (
          "No participants found"
        )}
      </div>
      <div>
        <h4>Activities: </h4>
        {isActivityLoading && (
          <div className="loading">Activities are loading, please wait...</div>
        )}
        {activities && !isActivityLoading && <List listData={activities} />}
      </div>
    </div>
  );
}

export default memo(Activityplanner);
