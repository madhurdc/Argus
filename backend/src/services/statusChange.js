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
    for(let oldSub of data.subStatus){
        for(let newSub of payload.subStatus){
            if(oldSub.name === newSub.name && oldSub.status !== newSub.status){
                newAlerts.push({
                    type: 'COMPONENT_STATUS',
                    message: `${oldSub.name} changed from ${oldSub.status} to ${newSub.status}`
                })
            }
        }
    }
    
    const previousIds = new Set(data.activeIncidents.map(i => i.id));
    const currentIds = new Set(payload.activeIncidents.map(i => i.id));

    // Check for new incidents
    const newIncidents = payload.activeIncidents.filter(i => !previousIds.has(i.id));
    for(let incident of newIncidents){
        newAlerts.push({
            type: 'NEW_INCIDENT',
            message: `New incident - ${incident.name} (Impact: ${incident.impact})`
        });
    }

    // Check for resolved incidents
    const resolvedIncidents = data.activeIncidents.filter(i => !currentIds.has(i.id));
    for(let incident of resolvedIncidents){
        newAlerts.push({
            type: 'RESOLVED_INCIDENT',
            message: `Resolved - ${incident.name}`
        });
    }

    // Check for impact change of incidents
    for(let oldInc of data.activeIncidents){
        for(let newInc of payload.activeIncidents){
            if(oldInc.id === newInc.id && oldInc.impact !== newInc.impact) {
                newAlerts.push({
                    type: 'IMPACT_CHANGE',
                    message: `Impact of Incident - ${oldInc.name} changed from ${oldInc.impact} to ${newInc.impact}`
                })
            }
        }
    }
    
    return newAlerts;
}