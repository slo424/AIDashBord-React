import { useEffect, useState } from "react";
import "./dataOptionWidget.css";

type AiUsageDataProp = {
    // setIsLoading: any,
    setUsageData: any
};

function DataOptionWidgeComponent(aiUsageDataProp : AiUsageDataProp) {
    const [teamId, setTeamId] = useState(0)
    const [teamIdMin, setTeamIdMin] = useState(0);
    const[teamIdMax, setTeamIdMax] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const todayDate = new Date();
    const weekAgoDate = new Date();
    weekAgoDate.setDate(new Date().getDate()-7);
    const today = todayDate.toISOString().split('T')[0];
    const weekAgo = weekAgoDate.toISOString().split('T')[0];
    const[startDateStr, setStartDateStr] = useState(weekAgo);
    const[endDateStr, setEndDateStr] = useState(today);
    
    const generateRangeOptions = (start: number, end: number) => {
      const options = [];
      for (let i = start; i <= end; i++) {
        options.push({ value: i, label: i.toString() });
      }
      return options;
    };
    
    const options = generateRangeOptions(teamIdMin, teamIdMax);
    
    const onTeamIdChange = (event: { target: { value: any; }; }) => {
        setTeamId(event.target.value); // Update state on change
    };
    
    const onStartDateChange = (e: { target: { value: string | number | Date; }; }) => {
        const startDate = new Date(e.target.value);
        startDate.toISOString().split('T')[0];
        startDate.toISOString().split('T')[0];
        setStartDateStr(startDate.toISOString().split('T')[0]);
      };
    
    const onEndDateChange = (e: { target: { value: string | number | Date; }; }) => {
        const endDate = new Date(e.target.value);
        endDate.toISOString().split('T')[0];
        endDate.toISOString().split('T')[0];
        setEndDateStr(endDate.toISOString().split('T')[0]);
      };
    
    useEffect(() => {
        async function getAIStatsTeamIds() {
            fetch(`http://localhost:8080/api/usageTeams`)
                .then((res) => res.json())
                .then((data) => {
                    setTeamIdMin(data.idRange.split("-")[0]);
                    setTeamIdMax(data.idRange.split("-")[1]);
            })
        }
    
        getAIStatsTeamIds();
        
        return () => {
        }
    }, [])
    
      useEffect(() => {    
        async function getAIStatsDataByTeamIdAndDates(teamId : number, 
                                                    startDateStr : String, 
                                                    endDateStr : String
        ) {
          const requestBodyData = {
            startDateStr: startDateStr,
            endDateStr: endDateStr
          };
    
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Inform the server the body is JSON
            },
            body: JSON.stringify(requestBodyData), // Convert the body data to a JSON string
          };
            try {
                setIsLoading(true);
                await fetch(`http://localhost:8080/api/usage/` + teamId, requestOptions)
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data.topModels);
                        aiUsageDataProp.setUsageData(data);
                    })
            } catch(err) {
            } finally {
                setIsLoading(false);
            }
        }
    
        getAIStatsDataByTeamIdAndDates(teamId, startDateStr, endDateStr);
        
        return () => {
        // code want to run on unmount
        }
    }, [teamId, startDateStr, endDateStr])

    if (isLoading) {
        return <div>Loading...</div>; // Display a loading message or spinner
    } else {
        return (
            <div className="card">
                <span style={{margin: '10px'}}>
                    <span id="team-id-select-label"><label>Team ID: </label></span>
                    <select
                        id="team-id-select"
                        value={teamId}
                        onChange={onTeamIdChange}
                        aria-labelledby="team-id-select-label"
                    >
                        {/* default option */}
                        <option value="0" >
                            All
                        </option>
                        
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </span>
                <span style={{margin: '10px'}}>
                    <span id="start-date-label"><label htmlFor="startDate">Start Date:</label></span>
                    <input type="date" id="startDate" name="startDate" defaultValue={weekAgo} value={startDateStr}
                        onChange={onStartDateChange} aria-labelledby="start-date-label"></input>
                </span>
                <span style={{margin: '10px'}}>
                    <span id="end-date-label"><label htmlFor="endDate">End Date:</label></span>
                    <input type="date" id="endDate" name="endDate" defaultValue={today} value={endDateStr}
                        onChange={onEndDateChange} aria-labelledby="end-date-label"></input>
                </span>
            </div>
        )
    }
}

export default DataOptionWidgeComponent;
