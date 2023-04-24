    // populate day select
    var daySelect = document.getElementById("day");
    for (var i = 1; i <= 31; i++) {
      var option = document.createElement("option");
      option.text = i;
      option.value = i;
      daySelect.add(option);
    }
    
    // populate month select
    var monthSelect = document.getElementById("month");
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (var i = 0; i < months.length; i++) {
      var option = document.createElement("option");
      option.text = months[i];
      option.value = i + 1;
      monthSelect.add(option);
    }