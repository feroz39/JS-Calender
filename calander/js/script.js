$(document).ready(function(){

    var dateNow = new Date();
    var current_month = dateNow.getMonth();
    var year = dateNow.getFullYear();

    // set the content of div .
    $( "#calendar" ).append( calander(current_month, year) );

    $( ".prev_month" ).click(function() {
        current_month--;
        if (current_month == -1) {
            current_month = 11;
            year--;
        }
        $( "#calendar" ).animate({
            opacity: .7
            }, 200, function() {

                $( "#calendar" ).empty().append( calander(current_month, year) );

                $( "#calendar" ).animate({
                    opacity: 1
                    }, 200, function() {
                });
        });
    });

    $( ".next_month" ).click(function() {
        current_month++;
        if (current_month == 12) {
            current_month = 0;
            year++;
        }
        $( "#calendar" ).animate({
            opacity: .7
            }, 200, function() {

                $( "#calendar" ).empty().append( calander(current_month, year) );

                $( "#calendar" ).animate({
                    opacity: 1
                    }, 200, function() {
                });
        });
    });

    function calander(month){
        var htmlContent ="";
        var FebNumberOfDays ="";
        var counter = 1;
        var dateNow = new Date();

        var nextMonth = month+1; //+1; //Used to match up the current month with the correct start date.
        var prevMonth = month -1;
        var day = dateNow.getDate();
        var this_month = dateNow.getMonth();
        var this_year = dateNow.getFullYear();

        //Determing if February (28,or 29)  
        if (month == 1){
            if ( (year%100!=0) && (year%4==0) || (year%400==0)){
                FebNumberOfDays = 29;
            }else{
                FebNumberOfDays = 28;
            }
        }
        // names of months and week days.
        var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
        var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
        var dayPerMonth = ["31", ""+FebNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"]

        // days in previous month and next one , and day of week.
        var nextDate = new Date(nextMonth +' 1 ,'+year);
        var weekdays= nextDate.getDay();
        var weekdays2 = weekdays
        var numOfDays = dayPerMonth[month];

        // this leave a white space for days of pervious month.
        while (weekdays>0){
            htmlContent += "<td class='empty'></td>";
                weekdays--;
            }
            while (counter <= numOfDays){
            if (weekdays2 > 6){
                weekdays2 = 0;
                htmlContent += "</tr><tr>";
            }
            if (counter == day && month == this_month && year == this_year){
                htmlContent +="<td class='dayNow' title='This is Today'>"+counter+"</td>";
            }else{
                htmlContent +="<td class='monthNow'>"+counter+"</td>";    
            }
            weekdays2++;
            counter++;
        }
        $( ".year" ).empty().append( year );
        $( ".current_month" ).empty().append( monthNames[month] );
        var calendarBody ="<table class='table'><thead><tr class='dayNames'><th>Sun</th>  <th>Mon</th> <th>Tue</th>"+
        "<th>Wed</th> <th>Thu</th> <th>Fri</th> <th>Sat</th> </tr></thead>";
        calendarBody += "<tr>";
        calendarBody += htmlContent;
        calendarBody += "</tr></table>";

        return calendarBody;
    }
});