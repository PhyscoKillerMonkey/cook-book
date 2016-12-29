function byID(id) {
  return document.getElementById(id);
}

function autoExpand(el) {
  el.oninput = function() {
    el.style.height = "auto";
    el.style.height = (el.scrollHeight+1) + "px";
  }
}

function removeItem(el) {
  el.parentElement.remove();
}

function makeListItem() {
  var child = document.createElement("div");
  
  var dragHandle = document.createElement("i");
  dragHandle.className = "material-icons md-dark cursor-all-scroll";
  dragHandle.appendChild(document.createTextNode("drag_handle"));
  child.appendChild(dragHandle);
  
  var removeButton = document.createElement("i");
  removeButton.className = "material-icons md-dark cursor-pointer";
  removeButton.onclick = function() { removeItem(removeButton); }
  removeButton.appendChild(document.createTextNode("cancel"));
  child.appendChild(removeButton);

  return child;
}

function addIngredient() {
  var child = makeListItem();
  child.className = "ingredient flex-horoz list";
  
  var ingredient = document.createElement("input");
  ingredient.type = "text";
  ingredient.placeholder = "Ingredient";
  ingredient.required = "true";
  child.insertBefore(ingredient, child.lastElementChild);
  
  var amount =  document.createElement("input");
  amount.type = "text";
  amount.placeholder = "Amount";
  amount.required = "true";
  child.insertBefore(amount, child.lastElementChild);
  
  var i = byID("ingredients");
  i.insertBefore(child, i.lastElementChild);
}

function addStep() {
  var child = makeListItem();
  child.className = "step flex-horoz list";

  var step = document.createElement("textarea");
  step.rows = "1";
  step.placeholder = "Step";
  step.oninput = "autoExpand(this)";
  step.className = "auto-expand";
  step.required = "true";
  child.insertBefore(step, child.lastElementChild);

  var m = byID("method");
  m.insertBefore(child, m.lastElementChild);
}

// Flag to ensure only one request can be sent at once
var requestSent = false;

function submit() {
  var data = {}
  data.title = byID("title").value;
  data.author = byID("author").value;
  data.description = byID("description").value;

  // Convert the time into minutes
  var times = byID("time").getElementsByTagName("input");
  data.time = times[0].valueAsNumber * 60 + times[1].valueAsNumber;

  data.ingredients = []
  var ingredients = document.getElementsByClassName("ingredient");
  for (var i = 0; i < ingredients.length; i++) {
    var inputs = ingredients[i].getElementsByTagName("input");
    var ingredient = {}
    ingredient.name = inputs[0].value;
    ingredient.amount = inputs[1].value;
    data.ingredients.push(ingredient);
  }

  data.method = []
  var steps = document.getElementsByClassName("step");
  for (var i = 0; i < steps.length; i++) {
    var inputs = steps[i].getElementsByTagName("textarea");
    data.method.push(inputs[0].value);
  }

  console.log("Sending post with data:", data);

  // Construct and send the POST request ONLY ONCE
  if (!requestSent) {
    requestSent = true;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./add", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));

     // Redirect to the homepage (Maybe also show some confirmation that the
    // recipe was submitted succesfully)
    window.location.replace("..");
  }
}