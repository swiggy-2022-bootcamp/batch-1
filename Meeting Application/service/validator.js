function meetingTimeValidation(startTime, endTime){
    const dateFormat = "HH:mm";
    const [startHour, startMin] = startTime.split(':');
    const [endHour, endMin] = endTime.split(':');
    
    if(startTime.length != dateFormat.length)
        return "Enter Valid Start Date";
    if(startHour<0 || startHour>23)
        return "Enter Valid Start Date";
    if(startMin<0 || startMin>60)
        return "Enter Valid Start Date";


    if(endTime.length != dateFormat.length)
        return "Enter Valid End Date";
    if(endHour<0 || endHour>23)
        return "Enter Valid Start Date";
    if(endMin<0 || endMin>60)
        return "Enter Valid Start Date";
}

