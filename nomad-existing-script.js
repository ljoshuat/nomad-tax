//page load turn off conditional visibility in Webflow

$(".other-states-condition").removeClass("show");

$(".conditional-wrapper").removeClass("show");
$(".ira-contribution.is--ira").removeClass("show");

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
    "Did you receive Advance Child Tax Credit payments for this dependent_#" +
      dependentNumber
  );

  $("#bullet-no").attr(
    "name",
    "Did you receive Advance Child Tax Credit payments for this dependent_#" +
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
    "Did you receive Advance Child Tax Credit payments for this dependent_#" +
      dependentNumber
  );

  $("#bullet-no").attr(
    "name",
    "Did you receive Advance Child Tax Credit payments for this dependent_#" +
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

$(".spouse-checkbox, .spouse-check").on("click", function () {
  let clearInputs = $(this).closest(".question-wrapper");
  $(clearInputs).find("input:radio").prop("checked", false);
  $(clearInputs).find('input[type="text"]').val("");
  $("#Spouse-Phone-Number").val("");
  $("#Spouse-Email").val("");
  $("#spouse-dob").val("");
  $("#Spouse-Occupation").val("");
  $("#Spouse-State").val("");

  $(clearInputs)
    .find(".w--redirected-checked")
    .removeClass("w--redirected-checked");
  $("input.spouse-address-checkbox").prop("checked", false);

  if ($("input.spouse-check").is(":checked")) {
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
  }
});

//append Taxpayer address into Spouse address if the same
$("#Taxpayer-Street-Address").on("keyup change", function () {
  let taxpayerStreet = $(this).val();
  if ($("input.spouse-address-checkbox").is(":checked")) {
    $("#Spouse-Street-Address").val(taxpayerStreet);
  } else {
    $("#Spouse-Street-Address").val("");
  }
});

$("#Taxpayer-City").on("keyup change", function () {
  let taxpayerCity = $(this).val();
  if ($("input.spouse-address-checkbox").is(":checked")) {
    $("#Spouse-City").val(taxpayerCity);
  } else {
    $("#Spouse-City").val("");
  }
});

$("#Taxpayer-State").on("keyup change", function () {
  let taxpayerState = $(this).val();
  if ($("input.spouse-address-checkbox").is(":checked")) {
    $("#Spouse-State").val(taxpayerState);
  } else {
    $("#Spouse-State").val("");
  }
});

$("#Taxpayer-Zip-Code").on("keyup change", function () {
  let taxpayerZip = $(this).val();
  if ($("input.spouse-address-checkbox").is(":checked")) {
    $("#Spouse-Zip-Code").val(taxpayerZip);
  } else {
    $("#Spouse-Zip-Code").val("");
  }
});

$("#Taxpayer-Apartment-Number").on("keyup change", function () {
  let taxpayerApt = $(this).val();
  if ($("input.spouse-address-checkbox").is(":checked")) {
    $("#Spouse-Apartment-Number").val(taxpayerApt);
  } else {
    $("#Spouse-Apartment-Number").val("");
  }
});

$(".spouse-address-checkbox, .spouse-same-address").on("click", function () {
  if ($("input.spouse-address-checkbox").is(":checked")) {
    let taxpayerStreet = $("#Taxpayer-Street-Address").val();
    let taxpayerCity = $("#Taxpayer-City").val();
    let taxpayerState = $("#Taxpayer-State").val();
    let taxpayerZip = $("#Taxpayer-Zip-Code").val();
    let taxpayerApt = $("#Taxpayer-Apartment-Number").val();
    $("#Spouse-Street-Address").val(taxpayerStreet);
    $("#Spouse-City").val(taxpayerCity);
    $("#Spouse-State").val(taxpayerState);
    $("#Spouse-Zip-Code").val(taxpayerZip);
    $("#Spouse-Apartment-Number").val(taxpayerApt);
    $(".address-wrapper.is--spouse").addClass("disabled");
  } else {
    $("#Spouse-Street-Address").val("");
    $("#Spouse-City").val("");
    $("#Spouse-State").val("");
    $("#Spouse-Zip-Code").val("");
    $("#Spouse-Apartment-Number").val("");
    $(".address-wrapper.is--spouse").removeClass("disabled");
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

$(".radio-button-field.is--tax-payments").on("click", function () {
  let taxPay = $('input[name="Estimated-Tax-payments-in-2021"]:checked').val();
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

///////////////////Conditions/////////////////////////
//residence change
$(".radio-button-field.is--residence-changed").on("click", function () {
  let answerCondition = $(
    'input[name="Has-your-state-residence-changed"]:checked'
  ).val();
  let myCondition = $(this)
    .closest(".question-wrapper")
    .find(".conditional-wrapper")
    .eq(0);
  if (answerCondition == "Yes") {
    $(myCondition).addClass("show");
    $("#Taxpayer-state-of-residence").attr("required", true);
    $('input[name="Were-you-a-resident-of-this-state-all-year"]').attr(
      "required",
      true
    );
  } else {
    let clearInputs = $(".conditional-wrapper").eq(0);
    $(clearInputs).find("input:radio").prop("checked", false);
    $(clearInputs).find('input[type="text"]').val("");
    $(clearInputs).find("input").attr("required", false);

    $(clearInputs)
      .find(".w--redirected-checked")
      .removeClass("w--redirected-checked");
    $(clearInputs)
      .find(
        ".conditional-wrapper.filing-changed, .other-states-condition.spend-time, .other-states-condition.resident"
      )
      .removeClass("show");

    $(myCondition).removeClass("show");
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

  if (answerCondition == "Yes") {
    $(myCondition).addClass("show");
    $(myCondition).find("input").attr("required", true);
    $("#Taxpayer-Apartment-Number").attr("required", false);
  } else {
    let clearInputs = $(".conditional-wrapper.address-change");
    $(clearInputs).find('input[type="text"]').val("");
    $("#Taxpayer-State").val("");
    $("#Taxpayer-Email").val("");
    $("#Taxpayer-Mobile-Phone").val("");

    $(clearInputs).find("input").attr("required", false);

    $(myCondition).removeClass("show");
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

$(".ira-trigger").on("click", function () {
  let iraContribute = $(
    'input[name="Did-you-contribute-to-an-IRA"]:checked'
  ).val();
  if (iraContribute == "Yes") {
    $(".ira-contribution.is--ira").addClass("show");
  } else {
    let clearInputs = $(".ira-contribution.is--ira");
    $(clearInputs).find("input:radio").prop("checked", false);
    $(clearInputs).find('input[type="text"]').val("");
    $(clearInputs)
      .find(".w--redirected-checked")
      .removeClass("w--redirected-checked");

    $(".ira-contribution.is--ira").removeClass("show");
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

$(".radio-button-field.is--misc-income").on("click", function () {
  let yesAnswer = $('input[name="Misc-Income"]:checked').val();
  let reminderText = $(this).closest(".input-contain").find(".reminder-text");
  $("#reminders").find("#misc-clone").remove();
  if (yesAnswer == "Yes") {
    $(reminderText).addClass("show");
    $(reminderText).clone().attr("id", "misc-clone").appendTo("#reminders");
  } else {
    $(reminderText).removeClass("show");
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
$(".next-button-trigger").on("click", function () {
  let valid = true;
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
