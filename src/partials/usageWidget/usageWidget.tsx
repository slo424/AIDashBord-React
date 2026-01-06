import React, { useState } from "react";
import "./usageWidget.css";
import DataOptionWidgeComponent from "../dataOptionWidget/dataOptionWidget";

function UsageWidgeComponent() {

const [usageData, setUsageData ] = useState({
    teamId: 0,
    estimatedCostInCents: 0,
    message: "",
    period: "",
    tokensConsumed: 0,
    totalCalls: 0,
    topModels: ([])
});

        return (
            <>
            <DataOptionWidgeComponent setUsageData={setUsageData}></DataOptionWidgeComponent>
            {usageData.message != null && usageData.message.length == 0 && (
                <div style={{ display: "grid"}}>
                    <table id="stats">
                    <tbody>
                            <tr>
                                <th><span id="total-calls-label">Total Calls</span></th>
                                <td><span aria-labelledby="total-calls-label">{usageData.totalCalls}</span></td>
                            </tr>
                            <tr>
                                <th><span id="tokens-consumed-label">Tokens Consumed</span></th>
                                <td><span aria-labelledby="tokens-consumed-label">{usageData.tokensConsumed}</span></td>
                            </tr>
                            <tr>
                                <th><span id="estimated-cost-label">Estimated Cost</span></th>
                                <td><span aria-labelledby="estimated-cost-label">${(usageData.estimatedCostInCents / 100).toFixed(2)}</span></td>
                            </tr>
                            <tr>
                                <th><span id="top-models-label">Top Models</span></th>
                                <td><span aria-labelledby="top-models-label">
                                    <table id="aiModel">
                                        <tbody>
                                            {usageData.topModels.map((modelInfo, index) => (
                                            <tr key={index}> 
                                                <td><span aria-labelledby="model-info-label">{modelInfo}</span></td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </span></td>
                            </tr>
                            <tr>
                                <th><span id="period-label">Period</span></th>
                                <td><span aria-labelledby="period-label">{usageData.period}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {usageData.message != null && usageData.message.length > 0 && (
                <h2>{usageData.message}</h2>
            )}
            </>
        )
    // }
}

export default UsageWidgeComponent;
