// $("#partner-telephone").keypress(function (e) {
//   var regex = new RegExp("^[ds]+$");
//   var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
//   if (regex.test(str)) {
//     return true;
//   } else {
//     e.preventDefault();
//     alert("Please Enter Alphabate");
//     return false;
//   }
// });

//disable Tab key on entire page
// document.onkeydown = function (t) {
//   if (t.which == 9) {
//     return false;
//   }
// };

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
  
  //EIN Number formatting
  
  $(".ein").keyup(function () {
    var val = this.value.replace(/\D/g, "");
    val = val.replace(/^(\d{2})/, "$1-");
    val = val.replace(/-(\d{7}).*/, "-$1");
    //val = val.replace(/(\d)-(\d{4}).*/, "$1-$2");
    this.value = val;
  });
  
  //Foreign Officer checkbox
  $(".ssn-check").each(function () {
    $(this).on("click", function () {
      let closestSSN = $(this).closest(".input-contain").find("#partner-ssn");
      if (
        $(this).closest(".input-contain").find("input.ssn-check").is(":checked")
      ) {
        $(closestSSN).val("");
        $(closestSSN).css("pointer-events", "none");
        $(closestSSN).attr("required", false);
        $(closestSSN).attr("tabindex", -1);
        $(this)
          .closest(".input-contain")
          .find(".complete-text-error")
          .removeClass("show");
      } else {
        $(closestSSN).css("pointer-events", "auto");
        $(closestSSN).attr("required", true);
        $(closestSSN).attr("tabindex", 0);
      }
    });
  });
  
  //if foreign address is checked. Make conditional required below
  
  $(".state").change(function () {
    var choice = this.value;
    //alert(choice);
    if (choice === "In a foreign country") {
      $(".foreign-address-formed").addClass("show");
      $(".foreign-address-formed :input").attr("required", true);
    } else {
      $(".foreign-address-formed").removeClass("show");
      $(".foreign-address-formed :input").attr("required", false);
      $(".foreign-address-formed .complete-text-error").removeClass("show");
    }
  });
  
  //Do you have a DBA?
  // $("input[data-name='conditional-yes']").on("click", function () {
  //   $(".other-states-condition.dba").addClass("show");
  // });
  
  $(".dba-trigger").on("click", function () {
    let myDBA = $('input[name="Do-you-have-a-DBA"]:checked').val();
    if (myDBA === "Yes") {
      $(".other-states-condition.dba").addClass("show");
      let clearInputs = $(".other-states-condition.dba");
      $(clearInputs).find("input").attr("required", true);
      $(clearInputs).find("input").attr("tabindex", 0);
      $(".dba :input").removeAttr("disabled");
    } else {
      let clearInputs = $(".other-states-condition.dba");
      $(clearInputs).find("input").attr("tabindex", -1);
      $(clearInputs).find("input:radio").prop("checked", false);
      $(clearInputs).find("input").attr("required", false);
      $(clearInputs).find('input[type="text"]').val("");
      $(".dba :input").attr("disabled", "disabled");
      $(clearInputs)
        .find(".w--redirected-checked")
        .removeClass("w--redirected-checked");
  
      $(".other-states-condition.dba").removeClass("show");
      $(clearInputs).find(".complete-text-error").removeClass("show");
    }
  });
  
  //ein trigger
  $(".ein-trigger").on("click", function () {
    let myEIN = $('input[name="Do-you-have-a-EIN"]:checked').val();
    if (myEIN === "Yes") {
      $(".other-states-condition.my-ein").addClass("show");
      let clearInputs = $(".other-states-condition.my-ein");
      $(clearInputs).find("input").attr("required", true);
      $(".my-ein :input").removeAttr("disabled");
    } else {
      let clearInputs = $(".other-states-condition.my-ein");
      $(clearInputs).find("input:radio").prop("checked", false);
      $(".my-ein :input").attr("disabled", "disabled");
      $(clearInputs).find("input").attr("required", false);
      $(clearInputs).find('input[type="text"]').val("");
      $(clearInputs)
        .find(".w--redirected-checked")
        .removeClass("w--redirected-checked");
  
      $(".other-states-condition.my-ein").removeClass("show");
      $(clearInputs).find(".complete-text-error").removeClass("show");
    }
  });
  
  // $("input[data-name='conditional-yes']").on("click", function () {
  //   let myConditionYes = $(this)
  //     .closest(".input-contain")
  //     .find(".other-states-condition");
  //   $(myConditionYes).addClass("show");
  //   $(myConditionYes).find("input[make-req='yes']").attr("required", true);
  // });
  
  // $("input[data-name='conditional-no']").on("click", function () {
  //   let myConditionNo = $(this)
  //     .closest(".input-contain")
  //     .find(".other-states-condition");
  //   $(myConditionNo).removeClass("show");
  //   $(myConditionNo).find("input[make-req='yes']").attr("required", false);
  // });
  //Do-you-have-a-DBA
  
  //page load turn off conditional visibility in Webflow
  
  $(".other-states-condition").removeClass("show");
  $(".ira-contribution.is--ira").removeClass("show");
  $(".foreign-bank-accounts.is--yes").removeClass("show");
  $(".stimulus-payment-condition.is--stimulus").removeClass("show");
  $(".complete-text-error").removeClass("show");
  
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
  
  // CLONE A ROW For Partner
  function dependentCount() {
    let myDependentCount = $(".dependent-wrapper .dependent").length;
    if (myDependentCount > 0) {
      $(".remove-dependent").addClass("show");
    } else {
      $(".remove-dependent").removeClass("show");
    }
  }
  //assign dependent form to a variable
  let myDependent = $(".hidden .dependent");
  
  $(".add-dependent").on("click", function () {
    let cloneDependent = myDependent.clone(true);
    let dependentNumber = $(".dependent-wrapper .dependent").length + 1;
  
    $(cloneDependent).appendTo(".dependent-wrapper");
    dependentNumber += 1;
    dependentCount();
    $("#partner-first-name").attr(
      "data-name",
      "First Name Partner_#" + dependentNumber
    );
    $("#partner-last-name").attr(
      "data-name",
      "Last Name Partner_#" + dependentNumber
    );
    $("#partner-ssn").attr("data-name", "SSN Partner_#" + dependentNumber);
    $("#partner-telephone").attr(
      "data-name",
      "Telephone Partner_#" + dependentNumber
    );
    $("#partner-is-foreign").attr(
      "data-name",
      "Foreign Partner_#" + dependentNumber
    );
    $("#partner-email").attr("data-name", "Email Partner_#" + dependentNumber);
    $("#partner-percentage").attr(
      "data-name",
      "Percentage Partner_#" + dependentNumber
    );
    $("#Partner-Street-Address").attr(
      "data-name",
      "Address Line 1 Partner_#" + dependentNumber
    );
    $("#Partner-Street-Address-line-2").attr(
      "data-name",
      "Address Line 2 Partner_#" + dependentNumber
    );
    $("#Partner-city").attr("data-name", "City Partner_#" + dependentNumber);
    $("#Partner-State-Province-or-Region").attr(
      "data-name",
      "State/Province/Region Partner_#" + dependentNumber
    );
    $("#Partner-Zip-or-Postal-Code").attr(
      "data-name",
      "Zip/Postal Code Partner_#" + dependentNumber
    );
    $("#guaranteed-payments").attr(
      "data-name",
      "Guaranteed Payments Partner_#" + dependentNumber
    );
    $("#Partner-Country").attr(
      "data-name",
      "Country Partner_#" + dependentNumber
    );
  });
  
  //Remove the last clone
  $(".remove-dependent").on("click", function () {
    let dependentNumber = $(".dependent-wrapper .dependent").length;
  
    $(".dependent").last().remove(".dependent");
  
    dependentCount();
    $("#partner-first-name").attr(
      "data-name",
      "First Name Officer_#" + dependentNumber
    );
    $("#partner-last-name").attr(
      "data-name",
      "Last Name Officer_#" + dependentNumber
    );
    $("#partner-ssn").attr("data-name", "SSN Partner_#" + dependentNumber);
    $("#partner-telephone").attr(
      "data-name",
      "Telephone Partner_#" + dependentNumber
    );
    $("#partner-is-foreign").attr(
      "data-name",
      "Foreign Partner_#" + dependentNumber
    );
    $("#partner-email").attr("data-name", "Email Partner_#" + dependentNumber);
    $("#partner-percentage").attr(
      "data-name",
      "Percentage Partner_#" + dependentNumber
    );
    $("#Partner-Street-Address").attr(
      "data-name",
      "Address Line 1 Partner_#" + dependentNumber
    );
    $("#Partner-Street-Address-line-2").attr(
      "data-name",
      "Address Line 2 Partner_#" + dependentNumber
    );
    $("#Partner-city").attr("data-name", "City Partner_#" + dependentNumber);
    $("#Partner-State-Province-or-Region").attr(
      "data-name",
      "State/Province/Region Partner_#" + dependentNumber
    );
    $("#Partner-Zip-or-Postal-Code").attr(
      "data-name",
      "Zip/Postal Code Partner_#" + dependentNumber
    );
    $("#guaranteed-payments").attr(
      "data-name",
      "Guaranteed Payments Partner_#" + dependentNumber
    );
    $("#Partner-Country").attr(
      "data-name",
      "Country Partner_#" + dependentNumber
    );
  });
  
  // Turn number into US Currency
  
  $("input[data-type='currency']").on({
    keyup: function () {
      formatCurrency($(this));
    },
    blur: function () {
      formatCurrency($(this), "blur");
    }
  });
  
  function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.
  
    // get input value
    var input_val = input.val();
  
    // don't validate empty input
    if (input_val === "") {
      return;
    }
  
    // original length
    var original_len = input_val.length;
  
    // initial caret position
    var caret_pos = input.prop("selectionStart");
  
    // check for decimal
    if (input_val.indexOf(".") >= 0) {
      // get position of first decimal
      // this prevents multiple decimals from
      // being entered
      var decimal_pos = input_val.indexOf(".");
  
      // split number by decimal point
      var left_side = input_val.substring(0, decimal_pos);
      var right_side = input_val.substring(decimal_pos);
  
      // add commas to left side of number
      left_side = formatNumber(left_side);
  
      // validate right side
      right_side = formatNumber(right_side);
  
      // On blur make sure 2 numbers after decimal
      if (blur === "blur") {
        right_side += "00";
      }
  
      // Limit decimal to only 2 digits
      right_side = right_side.substring(0, 2);
  
      // join number by .
      input_val = "$" + left_side + "." + right_side;
    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      input_val = formatNumber(input_val);
      input_val = "$" + input_val;
  
      // final formatting
      if (blur === "blur") {
        input_val += ".00";
      }
    }
  
    // send updated string to input
    input.val(input_val);
  
    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
  }
  
  // CLONE A ROW For Shareholder
  function shareholderCount() {
    let myShareholderCount = $(".shareholder-wrapper .shareholder").length;
    if (myShareholderCount > 0) {
      $(".remove-shareholder").addClass("show");
    } else {
      $(".remove-shareholder").removeClass("show");
    }
  }
  //assign shareholder form to a variable
  let myShareholder = $(".hidden .shareholder");
  
  $(".add-shareholder").on("click", function () {
    let cloneDependent = myShareholder.clone(true);
    let shareholderNumber = $(".shareholder-wrapper .shareholder").length + 1;
  
    $(cloneDependent).appendTo(".shareholder-wrapper");
    shareholderNumber += 1;
    shareholderCount();
    $("#shareholder-name").attr(
      "data-name",
      "Name Shareholder_#" + shareholderNumber
    );
    $("#shareholder-distribution").attr(
      "data-name",
      "Distribution Shareholder_#" + shareholderNumber
    );
    $("#shareholder-ssn").attr(
      "data-name",
      "SSN Shareholder_#" + shareholderNumber
    );
    $("#shareholder-email").attr(
      "data-name",
      "Email Shareholder_#" + shareholderNumber
    );
    $("#shareholder-telephone").attr(
      "data-name",
      "Telephone Shareholder_#" + shareholderNumber
    );
    $("#shareholder-stock-ownership").attr(
      "data-name",
      "Stock Ownership Shareholder_#" + shareholderNumber
    );
    $("#shareholder-street").attr(
      "data-name",
      "Address Street Shareholder_#" + shareholderNumber
    );
    $("#shareholder-city").attr(
      "data-name",
      "City Shareholder_#" + shareholderNumber
    );
    $("#shareholder-state").attr(
      "data-name",
      "State Shareholder_#" + shareholderNumber
    );
    $("#shareholder-zip-postal").attr(
      "data-name",
      "Zip or Postal Shareholder_#" + shareholderNumber
    );
    $("#currency-field").attr(
      "data-name",
      "Compensation Officer_#" + shareholderNumber
    );
    $("#shareholder-country").attr(
      "data-name",
      "Country Shareholder_#" + shareholderNumber
    );
  });
  
  //Remove the last clone
  $(".remove-shareholder").on("click", function () {
    let shareholderNumber = $(".shareholder-wrapper .shareholder").length;
  
    $(".shareholder").last().remove(".shareholder");
  
    shareholderCount();
    $("#officer-name").attr("data-name", "Name Officer_#" + shareholderNumber);
    $("#officer-last-name").attr(
      "data-name",
      "Last Name Officer_#" + shareholderNumber
    );
    $("#officer-ssn").attr("data-name", "SSN Officer_#" + shareholderNumber);
    $("#officer-title").attr("data-name", "Title Officer_#" + shareholderNumber);
    $("#officer-street").attr(
      "data-name",
      "Address Street Officer_#" + shareholderNumber
    );
    $("#officer-city").attr("data-name", "City Officer_#" + shareholderNumber);
    $("#officer-state").attr("data-name", "State Officer_#" + shareholderNumber);
    $("#officer-zip").attr("data-name", "Zip Code Officer_#" + shareholderNumber);
    $("#currency-field").attr(
      "data-name",
      "Compensation Officer_#" + shareholderNumber
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
  
  $("#dependent-dob, #taxpayer-dob, #spouse-dob").keyup(function () {
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
  
  //Clear Checkboxes
  function clearCheckboxes() {
    $("input[type=checkbox]").each(function () {
      $(this).prop("checked", false);
    });
  }
  
  //make checkboxes Required
  function validateChoice() {
    var no = $("input[id='No-selection']:checked").val();
    var value1 = $(
      "input[id='Obtained-a-driver-s-license-in-your-new-state-of-residence']:checked"
    ).val();
    var value2 = $(
      "input[id='Registered-your-car-in-your-new-state-of-residence']:checked"
    ).val();
    var value3 = $(
      "input[id='Updated-your-bank-account-information-and-credit-card-billing-addresses']:checked"
    ).val();
    var value4 = $(
      "input[id='Registered-to-vote-in-your-new-state-of-residence']:checked"
    ).val();
    var value5 = $(
      "input[id='Changed-your-mailing-address-with-USPS']:checked"
    ).val();
    var value6 = $(
      "input[id='Bought-or-rented-a-place-to-live-in-your-new-state-of-residence']:checked"
    ).val();
  
    if (
      no === "No" &&
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
  
  //If Other is checked, then make the textarea required
  
  $("#other-action-trigger").on("click", function () {
    var other = $("input[name='Other']:checked").val();
    if (other === "on") {
      $('textarea[name="Other-actions-to-change-your-state-of-residency"]').attr(
        "required",
        true
      );
    } else {
      $('textarea[name="Other-actions-to-change-your-state-of-residency"]').attr(
        "required",
        false
      );
      $('textarea[name="Other-actions-to-change-your-state-of-residency"]').val(
        ""
      );
      $("#other-actions").find(".complete-text-error").removeClass("show");
    }
  });
  
  $(".rb-resident-of-this-state").on("click", function () {
    let residentState = $(
      'input[name="Were-you-a-resident-of-this-state-all-year"]:checked'
    ).val();
  
    let multiSelect = $(".input-contain.is--grid").find(
      ".w-checkbox-input.w-checkbox-input--inputType-custom.check-box.w--redirected-checked"
    );
  
    if (residentState == "No") {
      $(".other-states-condition.resident").addClass("show");
      //$(".other-states-condition.resident-yes").removeClass("show");
      $("#Other-states-residence-in").attr("required", true);
      $("#month-year").attr("required", true);
      $(multiSelect).removeClass("w--redirected-checked");
      clearCheckboxes(multiSelect);
      $("#Other-actions-to-change-your-state-of-residency").val("");
    } else {
      //$(".other-states-condition.resident-yes").addClass("show");
      $(".other-states-condition.resident").removeClass("show");
      $("#Other-states-residence-in").attr("required", false);
      $("#Other-states-residence-in").val("");
      $("#month-year").attr("required", false);
      $("#month-year").val("");
    }
  });
  
  $(".rb-spend-time-in-other-states").on("click", function () {
    let spendState = $(
      'input[name="Spend-time-working-in-other-states"]:checked'
    ).val();
    if (spendState == "Yes") {
      $(".other-states-condition.spend-time").addClass("show");
      $("#Other-states-spend-time-in").attr("required", true);
    } else {
      $(".other-states-condition.spend-time").removeClass("show");
      $("#Other-states-spend-time-in").attr("required", false);
      $("#Other-states-spend-time-in").val("");
    }
  });
  
  $(".radio-button-field.is--banking-info").on("click", function () {
    let bankingInfo = $(
      'input[name="Do-you-want-to-have-your-refund-direct-deposited-or-your-balance-due-directly-withdrawn-from-your-account"]:checked'
    ).val();
    if (bankingInfo == "Yes") {
      $(".other-states-condition.is--banking-info").addClass("show");
      $("#Bank-Name").attr("required", true);
      $("#Routing-Number").attr("required", true);
      $("#Account-Number").attr("required", true);
      $('input[name="Bank-Account-Type"]').attr("required", true);
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
  
  //Clear Errors if unchecking boxes
  function clearErrorMessages() {
    let slideErrors = $(".slider-slide.w-slide.is--current").find(
      ".complete-text-error"
    );
    $(slideErrors).each(function () {
      $(this).removeClass("show");
    });
  }
  
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
      $("#Spouse-SSN").attr("required", true);
      $("#Spouse-Authentication-Number").attr("required", true);
      $("#Spouse-Email").attr("required", true);
      $("#Spouse-Phone-Number").attr("required", true);
      $("#spouse-dob").attr("required", true);
      $("#Spouse-Occupation").attr("required", true);
      $("#Spouse-Street-Address").attr("required", true);
      $("#Spouse-City").attr("required", true);
      $("#Spouse-State").attr("required", true);
      $("#Spouse-Zip-Code").attr("required", true);
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
    }
  });
  
  $(".spouse-numbers").on("click", function () {
    let spouseSsnItin = $(
      'input[name="Spouse-SSN-or-ITIN-or-Neither"]:checked'
    ).val();
  
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
  //check if foreign address is checked
  $("#foreign-fields").css("display", "none");
  $(".foreign-address-check, .foreign-address-checkbox").on("click", function () {
    if ($("input.foreign-address-checkbox").is(":checked")) {
      //console.log("is checked");
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
      $("#Taxpayer-Region").attr("required", true);
      $("#Taxpayer-Postal-Code").attr("required", true);
      $("#Taxpayer-Zip-Code").attr("required", false);
    } else {
      //console.log("is not checked");
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
  //Create a function for foreign address fields
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
  //spouse address w/ foreign condition
  //check if foreign address is checked
  $("#spouse-foreign-fields").css("display", "none");
  $(".spouse-foreign-address-check, .spouse-foreign-address-checkbox").on(
    "click",
    function () {
      if ($("input.spouse-foreign-address-checkbox").is(":checked")) {
        //console.log("is checked");
        $(".complete-text-error").removeClass("show");
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
        $("#Spouse-Region").attr("required", true);
        $("#Spouse-Postal-Code").attr("required", true);
        $("#Spouse-Zip-Code").attr("required", false);
      } else {
        //console.log("is not checked");
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
  
  //append Taxpayer address into Spouse address if the same
  // Grab the keyup functions from Taxpayer Address
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
  
  // $("#Taxpayer-Country").on("keyup change", function () {
  //   let taxpayerCont = $(this).val();
  //   if ($("input.spouse-address-checkbox").is(":checked")) {
  //     $("#Spouse-Country").val(taxpayerCont);
  //   } else {
  //     $("#Spouse-Country").val("");
  //   }
  // });
  
  // $("#Taxpayer-Region").on("keyup change", function () {
  //   let taxpayerReg = $(this).val();
  //   if ($("input.spouse-address-checkbox").is(":checked")) {
  //     $("#Spouse-Region").val(taxpayerReg);
  //   } else {
  //     $("#Spouse-Region").val("");
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
    } else {
      // $("#Spouse-Street-Address").val("");
      // $("#Spouse-City").val("");
      // $("#Spouse-State").val("");
      // $("#Spouse-Zip-Code").val("");
      // $("#Spouse-Apartment-Number").val("");
      // $("#Spouse-Country").val("");
      // $("#Spouse-Region").val("");
      $(".address-wrapper.is--spouse").removeClass("disabled");
      $("#Spouse-Street-Address").css("pointer-events", "auto");
      $("#Spouse-State").css("pointer-events", "auto");
      $("#Spouse-Zip-Code").css("pointer-events", "auto");
      $(".spouse-foreign-address-check").removeClass("disabled");
      $(".spouse-foreign-address-check").css("pointer-events", "auto");
    }
  });
  
  $(".irs-pin").on("click", function () {
    let irsPIN = $('input[name="IRS-Theft-Protection"]:checked').val();
    if (irsPIN === "Yes") {
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
    if (taxPay === "Yes") {
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
    } else {
      $(".other-states-condition.is--foreign-tax-payments").removeClass("show");
      $(".flatpickr-input").val("");
      $(
        ".other-states-condition.is--foreign-tax-payments input[type='text']"
      ).val("");
    }
  });
  //change price number
  function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  
  $('input[data-filter="price"]').keyup(function () {
    $(this).each(function () {
      var num = $(this).val();
      var commaNum = numberWithCommas(num);
      $(this).val("$" + commaNum);
    });
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
  
  // One or more foreign banks
  
  $(".radio-button-field.is--foreign-bank-account").on("click", function () {
    let foreignAccount = $(
      'input[name="Foreign-bank-accounts-with-more-than-10-000"]:checked'
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
  
  $(".dependents-checkbox").on("click", function () {
    if ($("input.dependent-check").is(":checked")) {
      $(".dependent-wrapper").addClass("remove");
    } else {
      $(".dependent-wrapper").removeClass("remove");
    }
  });
  
  $(".ira-trigger").on("click", function () {
    let iraContribute = $(
      'input[name="Did-you-contribute-to-an-IRA"]:checked'
    ).val();
    if (iraContribute == "Yes") {
      $(".ira-contribution.is--ira").addClass("show");
    } else {
      let clearInputs = $(".ira-contribution.is--ira");
      $(clearInputs).find("input:radio").prop("checked", false);
      $(clearInputs).find("input:checkbox").prop("checked", false);
      $(clearInputs).find('input[type="text"]').val("");
      $(clearInputs)
        .find(".w--redirected-checked")
        .removeClass("w--redirected-checked");
  
      $(".ira-contribution.is--ira").removeClass("show");
    }
  });
  //Do you have employees
  $(".employees").on("click", function () {
    let ownAhome = $('input[name="Do-you-have-employees"]:checked').val();
    if (ownAhome == "Yes") {
      $(".other-states-condition.is--own-a-home").addClass("show");
      let clearInputs = $(".other-states-condition.is--own-a-home");
      $(clearInputs).find("input:radio").attr("required", true);
    } else {
      let clearInputs = $(".other-states-condition.is--own-a-home");
      $(clearInputs).find("input:radio").prop("checked", false);
      $(clearInputs).find("input:radio").attr("required", false);
      $(clearInputs)
        .find(".w--redirected-checked")
        .removeClass("w--redirected-checked");
  
      $(".other-states-condition.is--own-a-home").removeClass("show");
    }
  });
  
  //Reminder Text if keep track of expenses
  
  $(".expense-track").on("click", function () {
    let yesAnswer = $(
      'input[name="Do-you-keep-track-of-your-income-and-expenses"]:checked'
    ).val();
    let reminderTextYes = $(this).closest(".input-contain").find("#income-yes");
    let reminderTextNo = $(this).closest(".input-contain").find("#income-no");
  
    $("#reminders").find("#track-of-income-no-clone").remove();
    $("#reminders").find("#track-of-income-yes-clone").remove();
    if (yesAnswer === "Yes") {
      $(reminderTextYes).addClass("show");
      $(reminderTextYes)
        .clone()
        .attr("id", "track-of-income-yes-clone")
        .appendTo("#reminders");
  
      $(reminderTextNo).removeClass("show");
    } else {
      $(reminderTextYes).removeClass("show");
      $(reminderTextNo).addClass("show");
      $(reminderTextNo)
        .clone()
        .attr("id", "track-of-income-no-clone")
        .appendTo("#reminders");
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
  
  $(".radio-button-field.is--partnership-changes").on("click", function () {
    let yesAnswer = $(
      'input[name="Changes-in-partner-percentages"]:checked'
    ).val();
  
    if (yesAnswer === "Yes") {
      $(".is--partnership-changes").addClass("show");
      $("#Describe-the-changes-in-partnership").attr("required", true);
      $(".other-states-condition.is--partnership-changes :input").removeAttr(
        "disabled"
      );
    } else {
      $(".is--partnership-changes").removeClass("show");
      $("#Describe-the-changes-in-partnership").val("");
      $("#Describe-the-changes-in-partnership").attr("required", false);
      $(".other-states-condition.is--partnership-changes :input").attr(
        "disabled",
        "disabled"
      );
      $(".is--partnership-changes .complete-text-error").removeClass("show");
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
    }
  });
  
  //Charitable Contribution
  $(".is--charitable-contributions").on("click", function () {
    let yesAnswer = $(
      'input[name="Did-you-make-any-charitible-contributions"]:checked'
    ).val();
  
    if (yesAnswer === "Yes") {
      $(".is--charitable-contributions").addClass("show");
    } else {
      $(".is--charitable-contributions").removeClass("show");
      $("#charitable-contributions").val("");
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
  $(".next-button-trigger").on("click", function () {
    let valid = true;
    validateChoice();
  
    $(".is--current :input[required]").each(function () {
      if ($(this).is(":invalid")) {
        $(this)
          .closest(".input-contain")
          .find(".complete-text-error")
          .addClass("show");
        //$(this).closest(".input-contain").css("background", "red");
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
        //$(this).closest(".input-contain").css("background", "white");
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
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
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
  
  $(".tooltip-wrapper-dependent").on("click", function () {
    $(this).find(".tooltip-content-dependent.is--dependent").toggleClass("show");
  });
  
  $(".close-icon.is--tool-tip").on("click", function () {
    $(this).toggleClass("show");
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
  
  //Make sure the tab key ignores all inputs inside of hidden fields
  // $(".next-button-trigger").on("click", function () {
  //   //set all hidden fields tabindex -1
  //   $(".other-states-condition")
  //     .find("input")
  //     .each(function () {
  //       $(this).attr("tabindex", -1);
  //     });
  // });
  
  //set all conditional elements as disabled
  $(".other-states-condition :input").attr("disabled", "disabled");
  