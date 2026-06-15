export function whatChanged(payload, data){
    const newAlerts = [];

    // Check if overall status changed
    if(data.mainStatus !== payload.mainStatus){
        newAlerts.push({
            type: 'MAIN_STATUS',
            message: `Overall status changed from ${data.mainStatus} to ${payload.mainStatus}`
        });
    }


    // Check if component status changed
    for(let i in data.subStatus){
        for(let j in payload.subStatus){
            if(data[i].name === payload[j].name && data[i].status != payload[j].status){
                newAlerts.push({
                    type: 'COMPONENT_STATUS',
                    message: `${data[i].name} changed from ${data[i].status} to ${payload[j].status}`
                })
            }
        }
    }
    
    const previousIds = new Set(
        data.activeIncidents.map(i => i.id)
    );
    const currentIds = new Set(
        payload.activeIncidents.map(i => i.id)
    );

    // Check for new incidents
    const newIncidents = currentIds.filter(i => !previousIds.has(i));
    if(newIncidents.length !== 0){
        for(let incident of newIncidents){
            newAlerts.push({
                type: 'NEW_INCIDENT',
                message: `New incident - ${incident.title} ${incident.impact}`
            });
        }
    }

    // Check for resolved incidents
    const resolvedIncidents = previousIds.filter(i => !currentIds.has(i));
    if(resolvedIncidents.length !== 0){
        for(let incident of resolvedIncidents){
            newAlerts.push({
                type: 'RESOLVED_INCIDENT',
                message: `Resolved - ${incident.title}`
            });
        }
    }

    // Check for impact change of incidents
    for(let i of data.activeIncidents){
        for(let j of payload.activeIncidents){
            if(i.id === j.id){
                if(i.impact !== j.impact)
                    newAlerts.push({
                        type: 'IMPACT_CHANGE',
                        message: `Impact of Incident - ${i.title} changed from ${i.impact} to ${j.impact}`
                    })
            }
        }
    }
    
    return newAlerts;
}