$(".add-dependent").on("click", function () {
    let itemParent = $(this).closest(".dependent").last();
    let cloneDependent = itemParent.clone(true);
    $(cloneDependent).insertAfter(itemParent);
  });
  