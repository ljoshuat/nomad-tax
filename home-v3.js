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
  let dependentNumber = 1;
  $(".add-dependent").on("click", function () {
    let cloneDependent = myDependent.clone(true);
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
  });
  
  //Remove the last clone
  $(".remove-dependent").on("click", function () {
    $(".dependent").last().remove(".dependent");
  
    dependentCount();
  });
  
  //Form Logic
  
  $("#dependent-months-living-with-client").keyup(function () {
    if ($(this).val() > 12) {
      alert("No numbers above 12");
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
      $("#Other-states-residence-in").attr("required", true);
    } else {
      $(".other-states-condition.resident").removeClass("show");
      $("#Other-states-residence-in").attr("required", false);
      $("#Other-states-residence-in").val("");
    }
  });
  
  $(".rb-spend-time-in-other-states").on("click", function () {
    let spendState = $('input[name="Spend-time-in-other-states"]:checked').val();
    if (spendState == "Yes") {
      $(".other-states-condition.spend-time").addClass("show");
      $("#Other-States-spend-time-In").attr("required", true);
    } else {
      $(".other-states-condition.spend-time").removeClass("show");
      $("#Other-States-spend-time-In").attr("required", false);
      $("#Other-States-spend-time-In").val("");
    }
  });
  
  $(".radio-button-field.is--banking-info").on("click", function () {
    let bankingInfo = $(
      'input[name="Do-you-want-to-have-your-refund-direct-deposited-or-your-balance-due-directly-withdrawn-from-your-account"]:checked'
    ).val();
    if (bankingInfo == "Yes") {
      $("#Bank-Name").attr("required", true);
      $("#Routing-Number").attr("required", true);
      $("#Account-Number").attr("required", true);
      $('input[name="Bank-Account-Type"]').attr("required", true);
    } else {
      $("#Bank-Name").attr("required", false);
      $("#Routing-Number").attr("required", false);
      $("#Account-Number").attr("required", false);
      $('input[name="Bank-Account-Type"]').attr("required", false);
    }
  });
  
  $(".spouse-checkbox, .spouse-check").on("click", function () {
    if ($("input.spouse-check").is(":checked")) {
      $(".no-spouse-wrapper").addClass("show");
      $("#Spouse-First-Name").attr("required", true);
      $("#Spouse-Last-Name").attr("required", true);
      $("#Claimed-as-a-dependent").attr("required", true);
      $("#Spouse-SSN").attr("required", true);
    } else {
      $(".no-spouse-wrapper").removeClass("show");
      $("#Spouse-First-Name").attr("required", false);
      $("#Spouse-Last-Name").attr("required", false);
      $("#Claimed-as-a-dependent").attr("required", false);
      $("#Spouse-SSN").attr("required", false);
    }
  });
  
  $(".irs-pin").on("click", function () {
    let irsPIN = $('input[name="IRS-Theft-Protection"]:checked').val();
    if (irsPIN == "Yes") {
      $(".other-states-condition").addClass("show");
    } else {
      $(".other-states-condition").removeClass("show");
    }
  });
  
  $(".radio-button-field.is--tax-payments").on("click", function () {
    let taxPay = $('input[name="Estimated-Tax-payments-in-2021"]:checked').val();
    if (taxPay == "Yes") {
      $(".taxpayments-wrapper").addClass("show");
    } else {
      $(".taxpayments-wrapper").removeClass("show");
    }
  });
  
  $(".radio-button-field.is--stimulus-payments").on("click", function () {
    let stimulusPay = $(
      'input[name="Did-you-receive-a-stimulus-payment-in-2021"]:checked'
    ).val();
    if (stimulusPay == "Yes") {
      $(".other-states-condition.is--stimulus").addClass("show");
      $("#How-much-was-your-stimulus-payment").attr("required", true);
    } else {
      $(".other-states-condition.is--stimulus").removeClass("show");
      $("#How-much-was-your-stimulus-payment").attr("required", false);
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
      $(".other-states-condition.is--ira").addClass("show");
    } else {
      $(".other-states-condition.is--ira").removeClass("show");
    }
  });
  
  $(".next-button-trigger").click(function () {
    $("#top").scrollTop(0);
  });
  
  let slideNumber = $(".slider-slide").length - 1;
  $(".total-number").text(slideNumber);
  
  function sliderAnimation() {
    var currentSlide = $(".w-slider-dot.w-active").index();
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
  }
  
  $(".next-button-trigger, .prev-button-trigger").click(function () {
    setTimeout(() => {
      sliderAnimation();
    }, 200);
  });
  
  function mySSNumber() {
    var patt = new RegExp("d{3}[-]d{2}[-]d{4}");
    var x = document.getElementsByClassName("ssn");
    var res = patt.test(x.value);
    if (!res) {
      x.value = x.value
        .match(/\d*/g)
        .join("")
        .match(/(\d{0,3})(\d{0,2})(\d{0,4})/)
        .slice(1)
        .join("-")
        .replace(/-*$/g, "");
    }
  }
  