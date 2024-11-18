function salesCounter(saleEndDates) {
    document.addEventListener('DOMContentLoaded', function () {
        var saleEndDate = saleEndDates;

        if (!saleEndDate || saleEndDate.trim() === '') {
            console.log('No sale end date provided.');
            return;
        }

        // Ensure saleEndDate is in a valid format. Let's try to parse it and set the time to 23:59:59 if it's just a date
        var countdownDate;
        if (saleEndDate.length === 10) {
            // e.g., '2024-11-09' (date-only format)
            countdownDate = new Date(saleEndDate + 'T23:59:59'); // Set to end of the day
        } else {
            countdownDate = new Date(saleEndDate); // If it includes time, use as-is
        }

        // Check if the date is valid
        if (isNaN(countdownDate)) {
            console.error('Invalid sale end date provided.');
            return;
        }

        console.log('Countdown Date:', countdownDate);

        // If the countdown date has already passed, show the "Sale has ended" message immediately
        if (countdownDate.getTime() < new Date().getTime()) {
            document.getElementById('countdown-timer').innerHTML = '';
            return;
        }

        var countdownFunction = setInterval(function () {
            var now = new Date().getTime();
            var remainingTime = countdownDate.getTime() - now;

            // Calculate the days, hours, minutes, and seconds
            var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            // Update the countdown display
            document.getElementById('countdown-timer').innerHTML =
                ' | ' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

            // If the countdown is finished, display "Sale has ended"
            if (remainingTime < 0) {
                clearInterval(countdownFunction);
                document.getElementById('countdown-timer').innerHTML = '';
            }
        }, 1000);
    });
}