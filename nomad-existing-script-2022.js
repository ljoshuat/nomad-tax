//This copies all the reminders and places inside a hidden text box to be picked up by the response email
function ExportReminders() {
    $("#all-reminders").text("");
    let aReminder = $("#reminders").find(".reminder-text");
    let data = $("#all-reminders").text();
    $(aReminder).each(function (i, el) {
      let reminderText = $(this).text();
      data += "<br/>• " + reminderText;
    });
  
    $("#all-reminders").text(data);
  }
  //On click of the last Next button, execute the Reminder function
  $("#reminder-next").on("click", function () {
    ExportReminders();
  });
  
  $("#all-reminders").attr("data-name", "ALL REMINDERS");
  
  //check if foreign address is checked
  $("#foreign-fields").css("display", "none");
  $(".foreign-address-check, .foreign-address-checkbox").on("click", function () {
    if ($("input.foreign-address-checkbox").is(":checked")) {
      //console.log("is checked");
      $("#Taxpayer-State").attr("tabindex", -1);
      $("#Taxpayer-Zip-Code").attr("tabindex", -1);
      $(".complete-text-error").removeClass("show");
      $("#Taxpayer-Zip-Code").css("pointer-events", "none");
      $("#Taxpayer-Zip-Code").val("");
      $("#Taxpayer-Zip-Code").addClass("disable");
      $("#Taxpayer-State").css("pointer-events", "none");
      $("#Taxpayer-State").val("");
      $("#Taxpayer-State").addClass("disable");
      $("#Taxpayer-State").attr("required", false);
      $("#foreign-fields").css("display", "flex");
      $("#Taxpayer-Country").attr("required", true);
      $("#Taxpayer-Country").val("");
      // $("#Taxpayer-Region").attr("required", true);
      $("#Taxpayer-Postal-Code").attr("required", true);
      $("#Taxpayer-Zip-Code").attr("required", false);
    } else {
      //console.log("is not checked");
      $("#Taxpayer-State").attr("tabindex", 0);
      $("#Taxpayer-Zip-Code").attr("tabindex", 0);
      $("#foreign-fields").css("display", "none");
      $("#Taxpayer-Zip-Code").css("pointer-events", "auto");
      $("#Taxpayer-Zip-Code").removeClass("disable");
      $("#Taxpayer-Zip-Code").attr("required", true);
      $("#Taxpayer-State").css("pointer-events", "auto");
      $("#Taxpayer-State").removeClass("disable");
      $("#Taxpayer-State").attr("required", true);
      $("#Taxpayer-Region").attr("required", false);
      $("#Taxpayer-Region").val("");
      $("#Taxpayer-Postal-Code").val("");
      $("#Taxpayer-Postal-Code").attr("required", false);
      $("#Taxpayer-Country").attr("required", false);
    }
  });
  
  //page load turn off conditional visibility in Webflow
  
  $(".other-states-condition").removeClass("show");
  
  $(".conditional-wrapper").removeClass("show");
  $(".ira-contribution.is--ira").removeClass("show");
  $(".foreign-bank-accounts.is--yes").removeClass("show");
  
  $(".survey-sec").css("display", "none");
  
  $(".button.pad").on("click", function () {
    $(".survey-sec").css("display", "block");
  });
  
  //dropdown option to just multiple select
  $("option").mousedown(function (e) {
    e.preventDefault();
    var originalScrollTop = $(this).parent().scrollTop();
    console.log(originalScrollTop);
    $(this).prop("selected", $(this).prop("selected") ? false : true);
    var self = this;
    $(this).parent().focus();
    setTimeout(function () {
      $(self).parent().scrollTop(originalScrollTop);
    }, 0);
  
    return false;
  });
  
  // CLONE A ROW
  function dependentCount() {
    let myDependentCount = $(".dependent-wrapper .dependent").length;
    if (myDependentCount > 0) {
      $(".remove-dependent").addClass("show");
    } else {
      $(".remove-dependent").removeClass("show");
    }
  }
  
  let myDependent = $(".hidden .dependent");
  
  $(".add-dependent").on("click", function () {
    let cloneDependent = myDependent.clone(true);
    let dependentNumber = $(".dependent-wrapper .dependent").length + 1;
  
    $(cloneDependent).appendTo(".dependent-wrapper");
    dependentNumber += 1;
    dependentCount();
    $("#dependent-first-name").attr(
      "data-name",
      "First Name Dependent_#" + dependentNumber
    );
    $("#dependent-last-name").attr(
      "data-name",
      "Last Name Dependent_#" + dependentNumber
    );
    $("#dependent-ssn").attr("data-name", "SSN Dependent_#" + dependentNumber);
    $("#Dependent-Relationship").attr(
      "data-name",
      "Dependent Relationship_#" + dependentNumber
    );
    $("#dependent-dob").attr("data-name", "DoB Dependent_#" + dependentNumber);
    $("#dependent-type").attr(
      "data-name",
      "Type of Dependent_#" + dependentNumber
    );
    $("#dependent-months-living-with-client").attr(
      "data-name",
      "Months Living with Client Dependent_#" + dependentNumber
    );
  
    $("#bullet-yes").attr(
      "name",
      "Did you receive Dependent Care Credit payments for this dependent_#" +
        dependentNumber
    );
  
    $("#bullet-no").attr(
      "name",
      "Did you receive Dependent Care Credit payments for this dependent_#" +
        dependentNumber
    );
  });
  
  //Remove the last clone
  $(".remove-dependent").on("click", function () {
    let dependentNumber = $(".dependent-wrapper .dependent").length;
  
    $(".dependent").last().remove(".dependent");
  
    dependentCount();
    $("#dependent-first-name").attr(
      "data-name",
      "First Name Dependent_#" + dependentNumber
    );
    $("#dependent-last-name").attr(
      "data-name",
      "Last Name Dependent_#" + dependentNumber
    );
    $("#dependent-ssn").attr("data-name", "SSN Dependent_#" + dependentNumber);
    $("#Dependent-Relationship").attr(
      "data-name",
      "Dependent Relationship_#" + dependentNumber
    );
    $("#dependent-dob").attr("data-name", "DoB Dependent_#" + dependentNumber);
    $("#dependent-type").attr(
      "data-name",
      "Type of Dependent_#" + dependentNumber
    );
    $("#dependent-months-living-with-client").attr(
      "data-name",
      "Months Living with Client Dependent_#" + dependentNumber
    );
  
    $("#bullet-yes").attr(
      "name",
      "Did you receive Dependent Care Credit payments for this dependent_#" +
        dependentNumber
    );
  
    $("#bullet-no").attr(
      "name",
      "Did you receive Dependent Care Credit payments for this dependent_#" +
        dependentNumber
    );
  });
  
  // CLONE A ROW for dependents not claiming anymore
  function dependentNotClaiming() {
    let myDependentCount = $(".is--dep-no-claiming .not-dep-claim").length;
    if (myDependentCount > 0) {
      $(".remove-not-claim-dependent").addClass("show");
    } else {
      $(".remove-not-claim-dependent").removeClass("show");
    }
  }
  
  let myNotClaimDependent = $(".hidden2 .dependent-not-claiming");
  
  $(".add-no-longer-claim").on("click", function () {
    let cloneDependent = myNotClaimDependent.clone(true);
    let dependentClaimNumber =
      $(".is--dep-no-claiming .not-dep-claim").length + 1;
  
    $(cloneDependent).appendTo(".not-claim-wrapper");
    dependentClaimNumber += 1;
    dependentNotClaiming();
    $("#not-claiming-dependent-name").attr(
      "data-name",
      "Dependent Not Claiming_#" + dependentClaimNumber
    );
  });
  
  //Remove the last clone
  $(".remove-not-claim-dependent").on("click", function () {
    let dependentClaimNumber = $(".is--dep-no-claiming .not-dep-claim").length;
  
    $(".dependent-not-claiming").last().remove(".dependent-not-claiming");
  
    dependentNotClaiming();
    $("#not-claiming-dependent-name").attr(
      "data-name",
      "Dependent Not Claiming_#" + dependentClaimNumber
    );
  });
  
  //Form Logic
  
  $(".no-spouse-wrapper").removeClass("show");
  
  $("#dependent-months-living-with-client").keyup(function () {
    if ($(this).val() > 12) {
      alert("No numbers above 12");
      $(this).val("");
    }
  });
  
  $("#dependent-dob, #spouse-dob").keyup(function () {
    let myFullYear = $(this).val();
    let myYear = $(this).val().substring(0, 4);
    let myMonth = $(this).val().substring(5, 7);
    let myDay = $(this).val().substring(8, 10);
  
    if (myYear > 2022) {
      alert("Not a valid year");
      $(this).val("");
    }
  });
  
  $(".radio-button-field-test").on("click", function () {
    let testExample = $('input[name="test"]:checked').val();
    if (testExample == "Could be a dependent") {
      $(".testing-block").removeClass("remove");
      $("#State").attr("required", true);
    } else {
      $(".testing-block").addClass("remove");
      $("#State").attr("required", false);
    }
  });
  
  $(".rb-resident-of-this-state").on("click", function () {
    let residentState = $(
      'input[name="Were-you-a-resident-of-this-state-all-year"]:checked'
    ).val();
    if (residentState == "No") {
      $(".other-states-condition.resident").addClass("show");
      $("#Other-States-Residence-In").attr("required", true);
    } else {
      $(".other-states-condition.resident").removeClass("show");
      $("#Other-States-Residence-In").attr("required", false);
      $("#Other-States-Residence-In").val("");
    }
  });
  
  $(".rb-spend-time-in-other-states").on("click", function () {
    let spendState = $('input[name="Spend-time-in-other-states"]:checked').val();
    if (spendState == "Yes") {
      $(".other-states-condition.spend-time").addClass("show");
      $("#Other-States-Spend-Time-In").attr("required", true);
    } else {
      $(".other-states-condition.spend-time").removeClass("show");
      $("#Other-States-Spend-Time-In").attr("required", false);
      $("#Other-States-Spend-Time-In").val("");
    }
  });
  
  $(".radio-button-field.is--banking-info").on("click", function () {
    let bankingInfo = $(
      'input[name="Do-you-want-to-have-your-refund-direct-deposited-or-your-balance-due-directly-withdrawn-from-your-account"]:checked'
    ).val();
    if (bankingInfo == "Yes") {
      $(".other-states-condition.is--banking-info").addClass("show");
      $("#Bank-Name").attr("required", false);
      $("#Routing-Number").attr("required", false);
      $("#Account-Number").attr("required", false);
      $('input[name="Bank-Account-Type"]').attr("required", false);
    } else {
      $(".other-states-condition.is--banking-info")
        .find("input:radio")
        .prop("checked", false);
      $(".other-states-condition.is--banking-info")
        .find('input[type="text"]')
        .val("");
  
      $(".other-states-condition.is--banking-info")
        .find(".w--redirected-checked")
        .removeClass("w--redirected-checked");
  
      $(".other-states-condition.is--banking-info").removeClass("show");
      $("#Bank-Name").attr("required", false);
      $("#Routing-Number").attr("required", false);
      $("#Account-Number").attr("required", false);
      $('input[name="Bank-Account-Type"]').attr("required", false);
    }
  });
  
  // $(".spouse-checkbox, .spouse-check").on("click", function () {
  //   let clearInputs = $(this).closest(".question-wrapper");
  //   $(clearInputs).find("input:radio").prop("checked", false);
  //   $(clearInputs).find('input[type="text"]').val("");
  //   $("#Spouse-Phone-Number").val("");
  //   $("#Spouse-Email").val("");
  //   $("#spouse-dob").val("");
  //   $("#Spouse-Occupation").val("");
  //   $("#Spouse-State").val("");
  
  //   $(clearInputs)
  //     .find(".w--redirected-checked")
  //     .removeClass("w--redirected-checked");
  //   $("input.spouse-address-checkbox").prop("checked", false);
  
  //   if ($("input.spouse-check").is(":checked")) {
  //     $(".no-spouse-wrapper").addClass("show");
  //     $("#Spouse-First-Name").attr("required", true);
  //     $("#Spouse-Last-Name").attr("required", true);
  //     $("#Claimed-as-a-dependent").attr("required", true);
  //     $("#Spouse-SSN").attr("required", true);
  //     $("#Spouse-Authentication-Number").attr("required", true);
  //     $("#Spouse-Email").attr("required", true);
  //     $("#Spouse-Phone-Number").attr("required", true);
  //     $("#spouse-dob").attr("required", true);
  //     $("#Spouse-Occupation").attr("required", true);
  //   } else {
  //     $(".no-spouse-wrapper").removeClass("show");
  //     $("#Spouse-First-Name").attr("required", false);
  //     $("#Spouse-Last-Name").attr("required", false);
  //     $("#Claimed-as-a-dependent").attr("required", false);
  //     $("#Spouse-SSN").attr("required", false);
  //     $("#Spouse-Authentication-Number").attr("required", false);
  //     $("#Spouse-Email").attr("required", false);
  //     $("#Spouse-Phone-Number").attr("required", false);
  //     $("#spouse-dob").attr("required", false);
  //     $("#Spouse-Occupation").attr("required", false);
  //   }
  // });
  $.fn.myForiegnFields = function () {
    $("#spouse-foreign-fields").css("display", "none");
    $("#Spouse-Zip-Code").css("pointer-events", "auto");
    $("#Spouse-Zip-Code").removeClass("disable");
    // $("#Spouse-Zip-Code").attr("required", true);
    $("#Spouse-State").css("pointer-events", "auto");
    $("#Spouse-State").removeClass("disable");
    // $("#Spouse-State").attr("required", true);
    // $("#Spouse-Region").attr("required", false);
    $("#Spouse-Region").val("");
    $("#Spouse-Postal-Code").val("");
    //$("#Spouse-Postal-Code").attr("required", false);
    //$("#Spouse-Country").attr("required", false);
  };
  
  //Clear Errors if unchecking boxes
  function clearErrorMessages() {
    let slideErrors = $(".slider-slide.w-slide.is--current").find(
      ".complete-text-error"
    );
    $(slideErrors).each(function () {
      $(this).removeClass("show");
    });
  }
  
  //Bank info is same as last year
  
  $(".bank-check, .sameBank-checkbox").on("click", function () {
    let clearBankinfo = $(".banking-info");
    $(clearBankinfo).find('input[type="text"]').val("");
    $(clearBankinfo).find("input:radio").prop("checked", false);
    $(clearBankinfo)
      .find(".w--redirected-checked")
      .removeClass("w--redirected-checked");
    if ($("input.bank-check").is(":checked")) {
      $(".banking-info :input").attr("disabled", "disabled");
      $(".bank-check.w-checkbox-input").removeAttr("disabled");
    } else {
      $(".banking-info :input").removeAttr("disabled");
  
      //set all conditional elements as disabled
      // $(".other-states-condition :input").attr("disabled", "disabled");
    }
  });
  
  //Spouse checkbox
  $(".spouse-checkbox, .spouse-check").on("click", function () {
    clearErrorMessages();
    let clearInputs = $(this).closest(".question-wrapper");
    $(clearInputs).find("input:radio").prop("checked", false);
    $(clearInputs).find('input[type="text"]').val("");
    $("#Spouse-Phone-Number").val("");
    $("#Spouse-Email").val("");
    $("#spouse-dob").val("");
    $("#Spouse-State").val("");
    $("#Spouse-Country").val("");
    $("#Spouse-has-a-foreign-address").prop("checked", false);
    $(".is--spouse *").css("pointer-events", "auto");
    $(".address-wrapper.is--spouse").removeClass("disabled");
  
    $(".no-spouse-wrapper").find(".other-states-condition").removeClass("show");
    $(clearInputs)
      .find(".w--redirected-checked")
      .removeClass("w--redirected-checked");
    $("input.spouse-address-checkbox").prop("checked", false);
  
    if ($("input.spouse-check").is(":checked")) {
      //run foreign fields function
      $.fn.myForiegnFields();
      $(".no-spouse-wrapper").addClass("show");
      $("#Spouse-First-Name").attr("required", true);
      $("#Spouse-Last-Name").attr("required", true);
      $("#Claimed-as-a-dependent").attr("required", true);
      //$("#Spouse-SSN").attr("required", true);
      $("#Spouse-Authentication-Number").attr("required", true);
      $("#Spouse-Email").attr("required", true);
      $("#Spouse-Phone-Number").attr("required", true);
      $("#spouse-dob").attr("required", true);
      $("#Spouse-Occupation").attr("required", true);
      $("#Spouse-Street-Address").attr("required", true);
      $("#Spouse-City").attr("required", true);
      $("#Spouse-State").attr("required", true);
      $("#Spouse-Zip-Code").attr("required", true);
      $('input[name="Spouse-SSN-or-ITIN-or-Neither"]').attr("required", true);
    } else {
      $(".no-spouse-wrapper").removeClass("show");
      $("#Spouse-First-Name").attr("required", false);
      $("#Spouse-Last-Name").attr("required", false);
      $("#Claimed-as-a-dependent").attr("required", false);
      $("#Spouse-SSN").attr("required", false);
      $("#Spouse-Authentication-Number").attr("required", false);
      $("#Spouse-Email").attr("required", false);
      $("#Spouse-Phone-Number").attr("required", false);
      $("#spouse-dob").attr("required", false);
      $("#Spouse-Occupation").attr("required", false);
      $("#Spouse-Street-Address").attr("required", false);
      $("#Spouse-City").attr("required", false);
      $("#Spouse-State").attr("required", false);
      $("#Spouse-Zip-Code").attr("required", false);
      $("#Spouse-Country").attr("required", false);
      $("#Spouse-Region").attr("required", false);
      $("#Spouse-Postal-Code").attr("required", false);
      $('input[name="Spouse-SSN-or-ITIN-or-Neither"]').attr("required", false);
    }
  });
  //This is the condition for "Does your spouse have a SSN, ITIN, or neither?""
  $(".spouse-numbers").on("click", function () {
    let spouseSsnItin = $(
      'input[name="Spouse-SSN-or-ITIN-or-Neither"]:checked'
    ).val();
    $("#spouse-numbers")
      .find(".complete-text-error")
      .each(function () {
        $(this).removeClass("show");
      });
  
    if (spouseSsnItin === "SSN") {
      $(".spouse-ssn").addClass("show");
      $(".spouse-itin").removeClass("show");
      //$(".spouse-auth-number").removeClass("show");
  
      //require field
      $("#Spouse-SSN").attr("required", true);
      $("#ITIN-Number").attr("required", false);
      //$("#Spouse-Authentication-Number").attr("required", false);
  
      //clear values
      //$("#Spouse-Authentication-Number").val("");
      $("#ITIN-Number").val("");
    } else if (spouseSsnItin === "ITIN") {
      $(".spouse-ssn").removeClass("show");
      $(".spouse-itin").addClass("show");
      //$(".spouse-auth-number").removeClass("show");
  
      //require field
      $("#Spouse-SSN").attr("required", false);
      $("#ITIN-Number").attr("required", true);
      //$("#Spouse-Authentication-Number").attr("required", false);
  
      //clear values
      $("#Spouse-SSN").val("");
      //$("#Spouse-Authentication-Number").val("");
    } else {
      $(".spouse-ssn").removeClass("show");
      $(".spouse-itin").removeClass("show");
      //$(".spouse-auth-number").addClass("show");
  
      //require field
      $("#Spouse-SSN").attr("required", false);
      $("#ITIN-Number").attr("required", false);
      //$("#Spouse-Authentication-Number").attr("required", true);
  
      //clear values
  
      $("#ITIN-Number").val("");
      $("#Spouse-SSN").val("");
    }
  });
  
  //spouse address w/ foreign condition
  //check if foreign address is checked
  $("#spouse-foreign-fields").css("display", "none");
  $(".spouse-foreign-address-check, .spouse-foreign-address-checkbox").on(
    "click",
    function () {
      if ($("input.spouse-foreign-address-checkbox").is(":checked")) {
        //console.log("is checked");
        $("#Spouse-State").attr("tabindex", -1);
        $("#Spouse-Zip-Code").attr("tabindex", -1);
        $("#spouse-foreign-fields .complete-text-error").removeClass("show");
        $("#Spouse-Zip-Code").css("pointer-events", "none");
        $("#Spouse-Zip-Code").val("");
        $("#Spouse-Zip-Code").addClass("disable");
        $("#Spouse-State").css("pointer-events", "none");
        $("#Spouse-State").val("");
        $("#Spouse-State").addClass("disable");
        $("#Spouse-State").attr("required", false);
        $("#spouse-foreign-fields").css("display", "flex");
        $("#Spouse-Country").attr("required", true);
        $("#Spouse-Country").val("");
        // $("#Spouse-Region").attr("required", true);
        $("#Spouse-Postal-Code").attr("required", true);
        $("#Spouse-Zip-Code").attr("required", false);
      } else {
        //console.log("is not checked");
        $("#Spouse-State").attr("tabindex", 0);
        $("#Spouse-Zip-Code").attr("tabindex", 0);
        $("#spouse-foreign-fields").css("display", "none");
        $("#Spouse-Zip-Code").css("pointer-events", "auto");
        $("#Spouse-Zip-Code").removeClass("disable");
        $("#Spouse-Zip-Code").attr("required", true);
        $("#Spouse-State").css("pointer-events", "auto");
        $("#Spouse-State").removeClass("disable");
        $("#Spouse-State").attr("required", true);
        $("#Spouse-Region").attr("required", false);
        $("#Spouse-Region").val("");
        $("#Spouse-Postal-Code").val("");
        $("#Spouse-Postal-Code").attr("required", false);
        $("#Spouse-Country").attr("required", false);
      }
    }
  );
  // //append Taxpayer address into Spouse address if the same
  // $("#Taxpayer-Street-Address").on("keyup change", function () {
  //   let taxpayerStreet = $(this).val();
  //   if ($("input.spouse-address-checkbox").is(":checked")) {
  //     $("#Spouse-Street-Address").val(taxpayerStreet);
  //   } else {
  //     $("#Spouse-Street-Address").val("");
  //   }
  // });
  
  // $("#Taxpayer-City").on("keyup change", function () {
  //   let taxpayerCity = $(this).val();
  //   if ($("input.spouse-address-checkbox").is(":checked")) {
  //     $("#Spouse-City").val(taxpayerCity);
  //   } else {
  //     $("#Spouse-City").val("");
  //   }
  // });
  
  // $("#Taxpayer-State").on("keyup change", function () {
  //   let taxpayerState = $(this).val();
  //   if ($("input.spouse-address-checkbox").is(":checked")) {
  //     $("#Spouse-State").val(taxpayerState);
  //   } else {
  //     $("#Spouse-State").val("");
  //   }
  // });
  
  // $("#Taxpayer-Zip-Code").on("keyup change", function () {
  //   let taxpayerZip = $(this).val();
  //   if ($("input.spouse-address-checkbox").is(":checked")) {
  //     $("#Spouse-Zip-Code").val(taxpayerZip);
  //   } else {
  //     $("#Spouse-Zip-Code").val("");
  //   }
  // });
  
  // $("#Taxpayer-Apartment-Number").on("keyup change", function () {
  //   let taxpayerApt = $(this).val();
  //   if ($("input.spouse-address-checkbox").is(":checked")) {
  //     $("#Spouse-Apartment-Number").val(taxpayerApt);
  //   } else {
  //     $("#Spouse-Apartment-Number").val("");
  //   }
  // });
  
  $(".spouse-address-checkbox, .spouse-same-address").on("click", function () {
    if ($("input.spouse-address-checkbox").is(":checked")) {
      // let taxpayerStreet = $("#Taxpayer-Street-Address").val();
      // let taxpayerCity = $("#Taxpayer-City").val();
      // let taxpayerState = $("#Taxpayer-State").val();
      // let taxpayerZip = $("#Taxpayer-Zip-Code").val();
      // let taxpayerApt = $("#Taxpayer-Apartment-Number").val();
      // let taxpayerCount = $("#Taxpayer-Country").val();
      // let taxpayerReg = $("#Taxpayer-Region").val();
  
      // $("#Spouse-Street-Address").val(taxpayerStreet);
      // $("#Spouse-City").val(taxpayerCity);
      // $("#Spouse-State").val(taxpayerState);
      // $("#Spouse-Zip-Code").val(taxpayerZip);
      // $("#Spouse-Apartment-Number").val(taxpayerApt);
      // $("#Spouse-Country").val(taxpayerCount);
      // $("#Spouse-Region").val(taxpayerReg);
      //run the myForiegnFields function
      $.fn.myForiegnFields();
      //loop through inputs and set value to empty
      $("#spouse-address-wrapper :input").each(function () {
        $(this).val("");
        $(this).attr("tabindex", -1);
      });
      $("#Spouse-has-a-foreign-address").prop("checked", false);
  
      $("#Spouse-Street-Address").attr("required", false);
      $("#Spouse-City").attr("required", false);
      $("#Spouse-State").attr("required", false);
      $("#Spouse-Zip-Code").attr("required", false);
      $(".address-wrapper.is--spouse").addClass("disabled");
      $("#Spouse-Street-Address").css("pointer-events", "none");
      $("#Spouse-State").css("pointer-events", "none");
      $("#Spouse-Zip-Code").css("pointer-events", "none");
      $(".spouse-foreign-address-check").addClass("disabled");
      $(".spouse-foreign-address-check").css("pointer-events", "none");
      $("#spouse-address-wrapper .complete-text-error").removeClass("show");
    } else {
      // $("#Spouse-Street-Address").val("");
      // $("#Spouse-City").val("");
      // $("#Spouse-State").val("");
      // $("#Spouse-Zip-Code").val("");
      // $("#Spouse-Apartment-Number").val("");
      // $("#Spouse-Country").val("");
      // $("#Spouse-Region").val("");
      $("#spouse-address-wrapper :input").each(function () {
        $(this).attr("tabindex", 0);
      });
      $(".address-wrapper.is--spouse").removeClass("disabled");
      $("#Spouse-Street-Address").css("pointer-events", "auto");
      $("#Spouse-State").css("pointer-events", "auto");
      $("#Spouse-Zip-Code").css("pointer-events", "auto");
      $(".spouse-foreign-address-check").removeClass("disabled");
      $(".spouse-foreign-address-check").css("pointer-events", "auto");
      $("#Spouse-Street-Address").attr("required", true);
      $("#Spouse-City").attr("required", true);
      $("#Spouse-State").attr("required", true);
      $("#Spouse-Zip-Code").attr("required", true);
    }
  });
  
  $(".irs-pin").on("click", function () {
    let irsPIN = $('input[name="IRS-Theft-Protection"]:checked').val();
    if (irsPIN == "Yes") {
      $(".other-states-condition.is--irs-identity").addClass("show");
    } else {
      let clearInputs = $(this).closest(".question-wrapper");
      $(clearInputs).find('input[type="text"]').val("");
      $(".other-states-condition.is--irs-identity").removeClass("show");
    }
  });
  
  //ESTIMATED TAX PAYMENTS
  $(".radio-button-field.is--tax-payments").on("click", function () {
    let taxPay = $(
      'input[name="Estimated-Tax-payments-during-the-tax-year"]:checked'
    ).val();
    if (taxPay == "Yes") {
      $(".other-states-condition.is--est-tax-payments").addClass("show");
    } else {
      $(".other-states-condition.is--est-tax-payments").removeClass("show");
      $(".flatpickr-input").val("");
      $(".other-states-condition.is--est-tax-payments input[type='text']").val(
        ""
      );
    }
  });
  
  $(".radio-button-field.is--foreign-tax-payments").on("click", function () {
    let taxPay = $(
      'input[name="Did-you-make-any-foreign-income-tax-payments"]:checked'
    ).val();
    if (taxPay == "Yes") {
      $(".other-states-condition.is--foreign-tax-payments").addClass("show");
      $(".is--foreign-tax-payments :input").each(function () {
        $(this).attr("required", true);
      });
    } else {
      $(".other-states-condition.is--foreign-tax-payments").removeClass("show");
      $(".flatpickr-input").val("");
      $(
        ".other-states-condition.is--foreign-tax-payments input[type='text']"
      ).val("");
      $(".other-states-condition.is--foreign-tax-payments :input").each(
        function () {
          $(this).attr("required", false);
          $(this).val("");
        }
      );
      $(".other-states-condition.is--foreign-tax-payments")
        .find(".complete-text-error")
        .each(function () {
          $(this).removeClass("show");
        });
    }
  });
  //change price number
  // function numberWithCommas(number) {
  //   var parts = number.toString().split(".");
  //   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   return parts.join(".");
  // }
  
  // $('input[data-filter="price"]').keyup(function () {
  //   //$(this).each(function () {
  //   var num = $(this).val();
  //   var commaNum = numberWithCommas(num);
  //   $(this).val("$" + commaNum);
  //   //});
  // });
  // $('input[data-filter="price"]').focusout(function () {
  //   // Create our number formatter.
  //   $(this).each(function () {
  //     const priceValue = $(this).val();
  //     if (priceValue === "$0.00") {
  //       $(priceValue).val("");
  //     }
  //     const formatter = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD"
  
  //       // These options are needed to round to whole numbers if that's what you want.
  //       //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //       //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  //     });
  //     $(this).val(formatter.format(priceValue));
  //   });
  // });
  
  // $('input[data-filter="price"]').focusout(function () {
  //   $(this).each(function () {
  //     let finalPrice = $(this).val();
  //     console.log(finalPrice);
  //     if (finalPrice.val().length === 0) {
  //       $(this).val("");
  //     }
  //   });
  // });
  
  ///////////////////Conditions/////////////////////////
  //Clear Checkboxes
  function clearCheckboxes() {
    $("input[type=checkbox]").each(function () {
      $(this).prop("checked", false);
    });
  }
  
  //make checkboxes Required
  function validateChoice() {
    var yes = $("input[id='Yes-selection']:checked").val();
    var value1 = $(
      "input[id='Obtained-A-Driver-S-License-In-Your-New-State-Of-Residence']:checked"
    ).val();
    var value2 = $(
      "input[id='Registered-Your-Car-In-Your-New-State-Of-Residence']:checked"
    ).val();
    var value3 = $(
      "input[id='Updated-Your-Bank-Account-Information-And-Credit-Card-Billing-Addresses']:checked"
    ).val();
    var value4 = $(
      "input[id='Registered-To-Vote-In-Your-New-State-Of-Residence']:checked"
    ).val();
    var value5 = $(
      "input[id='Changed-Your-Mailing-Address-With-USPS']:checked"
    ).val();
    var value6 = $(
      "input[id='Bought-Or-Rented-A-Place-To-Live-In-Your-New-State-Of-Residence']:checked"
    ).val();
  
    if (
      yes === "Yes" &&
      value1 !== "on" &&
      value2 !== "on" &&
      value3 !== "on" &&
      value4 !== "on" &&
      value5 !== "on" &&
      value6 !== "on"
    ) {
      $('input[name="Other"]').attr("required", true);
    } else {
      $('input[name="Other"]').attr("required", false);
    }
  }
  //make checkboxes for IRA
  function validateIraChoice() {
    var yes = $("input[name='Did-you-contribute-to-an-IRA']:checked").val();
    var value1 = $("input[id='Traditional-IRA']:checked").val();
    var value2 = $("input[id='Roth-IRA']:checked").val();
    var value3 = $("input[id='SEP-IRA']:checked").val();
  
    if (yes === "Yes" && value1 !== "on" && value2 !== "on" && value3 !== "on") {
      $("#ira-hidden").attr("required", true);
      console.log("validate");
    } else {
      $("#ira-hidden").attr("required", false);
      $("#error-ira").removeClass("show");
      console.log("Not validate");
    }
  }
  
  //If Other is checked, then make the textarea required
  $("#other-action-trigger").on("click", function () {
    var other = $("input[name='Other']:checked").val();
    if (other === "on") {
      $('textarea[id="Other-actions-to-change-your-residency"]').attr(
        "required",
        true
      );
    } else {
      $('textarea[id="Other-actions-to-change-your-residency"]').attr(
        "required",
        false
      );
      $('textarea[id="Other-actions-to-change-your-residency"]').val("");
      $("#other-actions").find(".complete-text-error").removeClass("show");
    }
  });
  
  //residence change
  $(".radio-button-field.is--residence-changed").on("click", function () {
    let answerCondition = $(
      'input[name="Has-your-state-residence-changed"]:checked'
    ).val();
  
    let multiSelect = $(".input-contain.is--grid").find(
      ".w-checkbox-input.w-checkbox-input--inputType-custom.check-box.w--redirected-checked"
    );
    let myCondition = $(this)
      .closest(".question-wrapper")
      .find(".conditional-wrapper")
      .eq(0);
    if (answerCondition == "Yes") {
      $(myCondition).addClass("show");
      $("#Taxpayer-state-of-residence").attr("required", true);
      $("#month-year").attr("required", true);
      $('input[name="Were-you-a-resident-of-this-state-all-year"]').attr(
        "required",
        true
      );
      $("#When-did-you-change-your-state-of-residence").attr("required", true);
    } else {
      let clearInputs = $(".conditional-wrapper").eq(0);
      $("#When-did-you-change-your-state-of-residence").attr("required", false);
      $(clearInputs).find("input:radio").prop("checked", false);
      $(clearInputs).find('input[type="text"]').val("");
      $(clearInputs).find("input").attr("required", false);
      $("#month-year").attr("required", false);
      $(multiSelect).removeClass("w--redirected-checked");
      clearCheckboxes(multiSelect);
      $("#Other-actions-to-change-your-residency").val("");
      //clear the invalid error
      $(".state-of-residence").find(".complete-text-error").removeClass("show");
  
      $(clearInputs)
        .find(".w--redirected-checked")
        .removeClass("w--redirected-checked");
      $(clearInputs)
        .find(
          ".conditional-wrapper.filing-changed, .other-states-condition.spend-time, .other-states-condition.resident"
        )
        .removeClass("show");
  
      $(myCondition).removeClass("show");
      $('input[name="When-did-you-change-your-state-of-residence"]').attr(
        "required",
        false
      );
      $("#month-year").val("");
      $("#Taxpayer-state-of-residence").val("");
      $("#Other-States-Residence-In").val("");
      $("#Other-States-Residence-In").attr("required", false);
  
      $("#Taxpayer-state-of-residence").attr("required", false);
      $("#Taxpayer-state-of-residence").removeClass("w--redirected-checked");
      $('input[name="Were-you-a-resident-of-this-state-all-year"]').attr(
        "required",
        false
      );
    }
  });
  
  // One or more foreign banks
  
  $(".radio-button-field.is--foreign-bank-account").on("click", function () {
    let foreignAccount = $(
      'input[name="Do-you-have-one-or-more-foreign-bank-accounts"]:checked'
    ).val();
  
    if (foreignAccount == "Yes") {
      $(".foreign-bank-accounts.is--yes").addClass("show");
      $('input[name="more-than-10000-in-your-foreign-bank-accounts"]').attr(
        "required",
        true
      );
    } else {
      let clearInputs = $(".foreign-bank-accounts.is--yes");
      $(clearInputs).find("input:radio").prop("checked", false);
  
      $(clearInputs)
        .find(".w--redirected-checked")
        .removeClass("w--redirected-checked");
  
      $(".foreign-bank-accounts.is--yes").removeClass("show");
      $('input[name="more-than-10000-in-your-foreign-bank-accounts"]').attr(
        "required",
        false
      );
    }
  });
  
  //filing status change
  $(".radio-button-field.is--filing-changed").on("click", function () {
    let answerCondition = $(
      'input[name="Has-your-filing-changed"]:checked'
    ).val();
    let myCondition = $(".conditional-wrapper.filing-changed");
  
    if (answerCondition == "Yes") {
      $(myCondition).addClass("show");
      $('input[name="Filing-Status"]').attr("required", true);
    } else {
      let clearInputs = $(".conditional-wrapper.filing-changed");
      $(clearInputs).find("input:radio").prop("checked", false);
      $(clearInputs).find('input[type="text"]').val("");
      $(clearInputs).find("input").attr("required", false);
      $(clearInputs)
        .find(".w--redirected-checked")
        .removeClass("w--redirected-checked");
  
      $(myCondition).removeClass("show");
      $('input[name="Filing-Status"]').attr("required", false);
    }
  });
  
  //Add Unclaimed Dependents
  $(".radio-button-field.is--not-claimed-dep").on("click", function () {
    let answerCondition = $(
      'input[name="Dependents-no-longer-claiming"]:checked'
    ).val();
    let myCondition = $(".other-states-condition.is--dep-no-claiming");
  
    if (answerCondition == "Yes") {
      $(myCondition).addClass("show");
    } else {
      let clearInputs = $(".not-claim-wrapper");
      $(clearInputs).find("input").val("");
  
      $(myCondition).removeClass("show");
    }
  });
  
  //address status change
  $(".radio-button-field.is--address-changed").on("click", function () {
    let answerCondition = $(
      'input[name="Has-your-address-changed"]:checked'
    ).val();
    let myCondition = $(".conditional-wrapper.address-change");
  
    if (answerCondition === "Yes") {
      $(myCondition).addClass("show");
      //$(myCondition).find("input").attr("required", true);
      //Turn on required for US Address
      $("#Taxpayer-Street-Address").attr("required", true);
      $("#Taxpayer-City").attr("required", true);
      $("#Taxpayer-State").attr("required", true);
      $("#Taxpayer-Zip-Code").attr("required", true);
      $("#Taxpayer-Email").attr("required", true);
      $("#Taxpayer-Mobile-Phone").attr("required", true);
      $("#Taxpayer-Zip-Code").removeClass("disable");
      $("#Taxpayer-State").removeClass("disable");
    } else {
      let clearInputs = $(".conditional-wrapper.address-change");
      $(clearInputs).find('input[type="text"]').val("");
      $("#Taxpayer-State").val("");
      $("#Taxpayer-Email").val("");
      $("#Taxpayer-Mobile-Phone").val("");
      $("#Taxpayer-Country").val("");
  
      $(clearInputs).find("input").attr("required", false);
      $(clearInputs).find(".w-select").attr("required", false);
      $(".foreign-address-checkbox").prop("checked", false);
      $(myCondition).removeClass("show");
      let myError = $(".conditional-wrapper.address-change").find(
        ".complete-text-error"
      );
      $(myError).each(function (index) {
        $(this).removeClass("show");
      });
      $("#foreign-fields").css("display", "none");
    }
  });
  
  $(".radio-button-field.is--stimulus-payments").on("click", function () {
    let stimulusPay = $(
      'input[name="Did-you-receive-a-stimulus-payment-in-2021"]:checked'
    ).val();
  
    if (stimulusPay == "Yes") {
      $(".stimulus-payment-condition.is--stimulus").addClass("show");
      $("#How-much-was-your-stimulus-payment").attr("required", true);
    } else {
      $(".stimulus-payment-condition.is--stimulus").removeClass("show");
      $("#How-much-was-your-stimulus-payment").attr("required", false);
      $(".stimulus-payment-condition").find('input[type="text"]').val("");
    }
  });
  
  $(".dependents-checkbox").on("click", function () {
    if ($("input.dependent-check").is(":checked")) {
      $(".dependent-wrapper").addClass("remove");
    } else {
      $(".dependent-wrapper").removeClass("remove");
    }
  });
  
  //Deductions IRA Contribution
  let tradIraAmount = $("#trad-amount");
  let rothIraAmount = $("#roth-amount");
  let sepIraAmount = $("#sep-amount");
  
  $(".ira-trigger").on("click", function () {
    let iraContribute = $(
      'input[name="Did-you-contribute-to-an-IRA"]:checked'
    ).val();
  
    if (iraContribute === "Yes") {
      $(".ira-contribution.is--ira").addClass("show");
      // $("#How-Much-Did-You-Contribute-to-Roth").attr("required", false);
      // $("#How-Much-Did-You-Contribute-to-SEP").attr("required", false);
      // $("#How-much-did-you-contribute-to-traditional").attr("required", false);
      // $("#Traditional-IRA").attr("required", true);
    } else {
      let clearInputs = $(".ira-contribution.is--ira");
      $(clearInputs).find("input:radio").prop("checked", false);
      $(clearInputs).find('input[type="text"]').val("");
      $(clearInputs)
        .find(".w--redirected-checked")
        .removeClass("w--redirected-checked");
  
      $(".ira-contribution.is--ira").removeClass("show");
      //force click to remove IRA amount
      $(tradIraAmount).detach().remove("#trad-wrapper");
      $("input[id='Traditional-IRA']").prop("checked", false);
      $(rothIraAmount).detach().remove("#roth-wrapper");
      $("input[id='Roth-IRA']").prop("checked", false);
      $(sepIraAmount).detach().remove("#sep-wrapper");
      $("input[id='SEP-IRA']").prop("checked", false);
      $(".ira-contribution.is--ira")
        .find(".complete-text-error")
        .removeClass("show");
      $(tradIraAmount).find(".complete-text-error").removeClass("show");
      $(rothIraAmount).find(".complete-text-error").removeClass("show");
      $(sepIraAmount).find(".complete-text-error").removeClass("show");
      //$(".is--ira").find(".complete-text-error").removeClass("show");
      //$("#error-ira").removeClass("show");
    }
  });
  //let cloneIRA = tradIraAmount.clone(true);
  $("#Traditional-IRA").on("click", function () {
    setTimeout(() => {
      let value = $("input[id='Traditional-IRA']:checked").val();
      if (value === "on") {
        $(tradIraAmount).detach().appendTo("#trad-wrapper");
      } else {
        $(tradIraAmount).detach().remove("#trad-wrapper");
        $(tradIraAmount).find('input[type="text"]').val("");
        $(tradIraAmount).find(".complete-text-error").removeClass("show");
      }
    }, 100);
  });
  
  // $(".is--ira").on("click", function () {
  //   $("#error-ira").removeClass("show");
  // });
  
  $("#Roth-IRA").on("click", function () {
    setTimeout(() => {
      let value = $("input[id='Roth-IRA']:checked").val();
      if (value === "on") {
        $(rothIraAmount).detach().appendTo("#roth-wrapper");
      } else {
        $(rothIraAmount).detach().remove("#roth-wrapper");
        $(rothIraAmount).find('input[type="text"]').val("");
        $(rothIraAmount).find(".complete-text-error").removeClass("show");
      }
    }, 100);
  });
  
  $("#SEP-IRA").on("click", function () {
    setTimeout(() => {
      let value = $("input[id='SEP-IRA']:checked").val();
      if (value === "on") {
        $(sepIraAmount).detach().appendTo("#sep-wrapper");
      } else {
        $(sepIraAmount).detach().remove("#sep-wrapper");
        $(sepIraAmount).find('input[type="text"]').val("");
        $(sepIraAmount).find("input:checkbox").prop("checked", false);
        $(sepIraAmount).find(".complete-text-error").removeClass("show");
      }
    }, 100);
  });
  
  $(".radio-button-field.is--wages").on("click", function () {
    let yesAnswer = $('input[name="Did-you-have-wages"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#wages-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText).clone().attr("id", "wages-clone").appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".radio-button-field.is--interest-income").on("click", function () {
    let yesAnswer = $('input[name="Interest-Income"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#interest-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText).clone().attr("id", "interest-clone").appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".radio-button-field.is--dividend-income").on("click", function () {
    let yesAnswer = $('input[name="Dividend-Income"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#dividend-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText).clone().attr("id", "dividend-clone").appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".radio-button-field.is--crypto").on("click", function () {
    let yesAnswer = $('input[name="Cryptocurrency"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#crypto-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText).clone().attr("id", "crypto-clone").appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".radio-button-field.is--ira").on("click", function () {
    let yesAnswer = $('input[name="Income-from-a-pension-or-IRA"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#ira-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText).clone().attr("id", "ira-clone").appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".radio-button-field.is--investment-income").on("click", function () {
    let yesAnswer = $('input[name="Investment-Income"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#investment-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "investment-clone")
        .appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".radio-button-field.is--gambling-income").on("click", function () {
    let yesAnswer = $('input[name="Gambling-winnings-losses"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#gambling-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText).clone().attr("id", "gambling-clone").appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  //Do you own a home
  $(".own-home-trigger").on("click", function () {
    let ownAhome = $('input[name="Do-you-own-a-home"]:checked').val();
    if (ownAhome == "Yes") {
      $(".other-states-condition.is--own-a-home").addClass("show");
      let clearInputs = $(".other-states-condition.is--own-a-home");
      $(clearInputs).find("input:radio").attr("required", true);
    } else {
      let clearInputs = $(".other-states-condition.is--own-a-home");
      $(clearInputs).find("input:radio").prop("checked", false);
      $(clearInputs).find("input:radio").attr("required", false);
      $(clearInputs).find('input[type="text"]').val("");
      $(clearInputs)
        .find(".w--redirected-checked")
        .removeClass("w--redirected-checked");
      let reminderText = $(".is--own-a-home").find(".reminder-text");
      $(reminderText).each(function () {
        $(this).removeClass("show");
      });
      $("#reminders").find("#mortgage-interest-clone").remove();
      $("#reminders").find("#prop-tax-clone").remove();
      $(".other-states-condition.is--own-a-home").removeClass("show");
    }
  });
  
  //Reminder Text to pay any mortgage
  
  $(".radio-button-field.pay-mortgage").on("click", function () {
    let yesAnswer = $(
      'input[name="Did-you-pay-any-mortgage-interest-over-the-past-year"]:checked'
    ).val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#mortgage-interest-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "mortgage-interest-clone")
        .appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  //Did you pay any student loan tuition during the year?
  $(".is--tuition").on("click", function () {
    let yesAnswer = $(
      'input[name="Did-you-pay-any-student-loan-tuition-during-the-year"]:checked'
    ).val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#student-tuition-reminder").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "student-tuition-reminder")
        .appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  //Did you pay any student loan interest during the year?
  $(".is--interest").on("click", function () {
    let yesAnswer = $(
      'input[name="Did-you-pay-any-student-loan-interest-during-the-year"]:checked'
    ).val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#student-interest-reminder").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "student-interest-reminder")
        .appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  //Home Office Reminder
  //Do you have a home office
  
  $(".is--home-office").on("click", function () {
    let yesAnswer = $('input[name="Do-you-have-a-home-office"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#home-office-reminder").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "home-office-reminder")
        .appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  //is--vehicle-for-work
  //Do you use your vehicle for work?
  
  $(".is--vehicle-for-work").on("click", function () {
    let yesAnswer = $(
      'input[name="Do-you-use-your-vehicle-for-work"]:checked'
    ).val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#vehicle-work-reminder").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "vehicle-work-reminder")
        .appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  //Reminder Text to pay any property tax
  
  $(".radio-button-field.prop-tax").on("click", function () {
    let yesAnswer = $(
      'input[name="Did-you-pay-any-property-tax-over-the-past-year"]:checked'
    ).val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#prop-tax-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText).clone().attr("id", "prop-tax-clone").appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".radio-button-field.is--misc-income").on("click", function () {
    let yesAnswer = $('input[name="Misc-Income"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#misc-clone").remove();
    $(".other-states-condition.is--misc-income")
      .find(".complete-text-error")
      .removeClass("show");
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText).clone().attr("id", "misc-clone").appendTo("#reminders");
      $(".is--misc-income").addClass("show");
      $("#Describe-the-source-of-your-misc-income").attr("required", true);
    } else {
      $(reminderText).removeClass("show");
      $(".is--misc-income").removeClass("show");
      $("#Describe-the-source-of-your-misc-income").val("");
      $("#Describe-the-source-of-your-misc-income").attr("required", false);
    }
  });
  
  $(".radio-button-field.is--unemployment-income").on("click", function () {
    let yesAnswer = $('input[name="Unemployment"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#unemployment-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "unemployment-clone")
        .appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".radio-button-field.is--business-income").on("click", function () {
    let yesAnswer = $('input[name="Business-income"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#business-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText).clone().attr("id", "business-clone").appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  //FEIE Condition
  $(".is--foreign-exclusion").on("click", function () {
    let yesAnswer = $(
      'input[name="Are-you-planning-to-claim-the-Foreign-Earned-Income-Exclusion"]:checked'
    ).val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#foreign-exclusion-reminder").remove();
    if (yesAnswer == "Yes") {
      $(".is--feie").addClass("show");
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "foreign-exclusion-reminder")
        .appendTo("#reminders");
      $('[data-FEIE-address="required"]').each(function () {
        $(this).attr("required", true);
      });
    } else {
      $(".is--feie").removeClass("show");
      $("#Foreign-FEIE-Street-Address").val("");
      $("#Foreign-FEIE-Apt-Number").val("");
      $("#Foreign-FEIE-City").val("");
      $("#Foreign-FEIE-Postal-Code").val("");
      $("#Foreign-FEIE-Country").val("");
      $("#Foreign-FEIE-Region").val("");
      $(reminderText).removeClass("show");
      $('[data-FEIE-address="required"]').each(function () {
        $(this).attr("required", false);
      });
      $(".is--feie")
        .find(".complete-text-error")
        .each(function () {
          $(this).removeClass("show");
        });
    }
  });
  
  //Charitable Contribution
  $(".is--charitable-contributions").on("click", function () {
    let yesAnswer = $(
      'input[name="Did-you-make-any-charitible-contributions"]:checked'
    ).val();
  
    if (yesAnswer === "Yes") {
      $(".is--charitable-contributions").addClass("show");
      $("#charitable-contributions").attr("required", true);
    } else {
      $(".is--charitable-contributions").removeClass("show");
      $("#charitable-contributions").val("");
      $("#charitable-contributions").attr("required", false);
    }
  });
  
  $(".radio-button-field.is--rental-income").on("click", function () {
    let yesAnswer = $('input[name="Rental-income"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#rental-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText).clone().attr("id", "rental-clone").appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".is--passthrough-income").on("click", function () {
    let yesAnswer = $('input[name="Passthrough-income"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#passthrough-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "passthrough-clone")
        .appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  //Do you have ownership in a foreign business?
  $(".is--foreign-ownership").on("click", function () {
    let yesAnswer = $('input[name="Owner-of-foreign-business"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#foreign-biz-ownership-clone").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "foreign-biz-ownership-clone")
        .appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  //Did you pay any student loan interest during the year?
  $(".is--student-loan").on("click", function () {
    let yesAnswer = $(
      'input[name="Did-you-pay-any-student-loan-interest"]:checked'
    ).val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#student-loan-reminder").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "student-loan-reminder")
        .appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".is--edu-expenses").on("click", function () {
    let yesAnswer = $(
      'input[name="Did-you-have-any-education-expenses"]:checked'
    ).val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#edu-expenses-reminder").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "edu-expenses-reminder")
        .appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".is--foreign-exclusion").on("click", function () {
    let yesAnswer = $(
      'input[name="Are-you-planning-to-claim-the-Foreign-Earned-Income-Exclusion"]:checked'
    ).val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#foreign-exclusion-reminder").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText)
        .clone()
        .attr("id", "foreign-exclusion-reminder")
        .appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".is--hsa").on("click", function () {
    let yesAnswer = $('input[name="Did-you-contribute-to-an-HSA"]:checked').val();
    let reminderText = $(this).closest(".input-contain").find(".reminder-text");
    $("#reminders").find("#hsa-reminder").remove();
    if (yesAnswer == "Yes") {
      $(reminderText).addClass("show");
      $(reminderText).clone().attr("id", "hsa-reminder").appendTo("#reminders");
    } else {
      $(reminderText).removeClass("show");
    }
  });
  
  $(".prev-button-trigger").click(function () {
    $(".prev-arrow").click();
    $("#right-side").scrollTop(0);
  });
  
  //Slider Animation
  
  let slideNumber = $(".slider-slide").length - 1;
  $(".total-number").text(slideNumber);
  
  function sliderAnimation() {
    let currentSlide = $(".w-slider-dot.w-active").index();
    let validationSlide = currentSlide;
  
    if (currentSlide == 0) {
      $(".prev-button-trigger").addClass("disabled-prev");
    } else {
      $(".prev-button-trigger").removeClass("disabled-prev");
    }
    $(".slide-number").text(currentSlide);
    let percent = (currentSlide / slideNumber) * 100;
    let percentRound = percent.toFixed(0);
    $(".form_percent").text(percentRound);
    $(".form_progress-fill").css("width", percentRound + "%");
    $(".slider-slide").eq(validationSlide).addClass("is--current");
    $(".slider-slide")
      .eq(validationSlide + 1)
      .removeClass("is--current");
    $(".slider-slide")
      .eq(validationSlide - 1)
      .removeClass("is--current");
  }
  
  $(".prev-button-trigger").click(function () {
    setTimeout(() => {
      sliderAnimation();
    }, 200);
    $("html, body").animate(
      {
        scrollTop: $("#survey").offset().top
      },
      400
    );
  });
  
  //slide validation
  //let invalidError = $(".hidden").find(".text-error");
  
  // $('.next-button-trigger.is--ira').on('click', function() {
  //   validateIraChoice();
  // });
  
  $(".next-button-trigger").on("click", function () {
    let valid = true;
    validateChoice();
    validateIraChoice();
    $(".is--current :input[required]").each(function () {
      if ($(this).is(":invalid")) {
        $(this)
          .closest(".input-contain")
          .find(".complete-text-error")
          .addClass("show");
        // let myclosestInput = $(this).closest(".input-contain");
        // let errorClone = $(invalidError).clone().appendTo(myclosestInput);
        // let myIndex = $(errorClone).index();
        // console.log(myIndex);
      } else {
        //$(this).closest(".input-contain").clone(invalidError).remove();
        $(this)
          .closest(".input-contain")
          .find(".complete-text-error")
          .removeClass("show");
      }
    });
  
    $(".is--current :input[required]").each(function () {
      if ($(this).is(":invalid") || !$(this).val()) valid = false;
    });
    if (!valid) alert("Please double check all required fields are complete!");
    else $(".form-next").click();
    setTimeout(() => {
      sliderAnimation();
    }, 300);
    $("html, body").animate(
      {
        scrollTop: $("#survey").offset().top
      },
      400
    );
  });
  
  //prevent enter key from submitting
  // $(window).keydown(function (event) {
  //   if (event.keyCode == 13) {
  //     event.preventDefault();
  //     return false;
  //   }
  // });
  $('[enter-key="yes"]').keydown(function (event) {
    if (event.keyCode == 13) {
      // e.preventDefault();
      event.returnValue = true;
    }
    //or...
    // if (e.which == 13) e.preventDefault();
  });
  
  // Used to format phone number
  function phoneFormatter() {
    $(".phone-field").on("input", function () {
      var number = $(this).val().replace(/[^\d]/g, "");
      if (number.length == 7) {
        number = number.replace(/(\d{3})(\d{4})/, "$1-$2");
      } else if (number.length == 10) {
        number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      }
      $(this).val(number);
    });
  }
  
  phoneFormatter();
  
  // dependents tool tip show
  
  $(".tooltip-wrapper-dependent").on("mouseenter mouseleave", function () {
    $(this).find(".tooltip-content-dependent").toggleClass("show");
  });
  
  $(".close-tip.is--dependent").on("mouseenter mouseleave", function () {
    $(this).find(".tooltip-content-dependent").toggleClass("show");
  });
  
  //tool tip body close
  
  $("body").click(function () {
    $(".tooltip-content").hide("swing");
  });
  
  //setting price formatting
  
  $('[data-filter="price"]').on("input", function (evt) {
    var self = $(this);
    self.val(self.val().replace(/[^0-9\.]/g, ""));
    if (
      (evt.which !== 46 || self.val().indexOf(".") !== -1) &&
      (evt.which < 48 || evt.which > 57)
    ) {
      evt.preventDefault();
    }
  });
  