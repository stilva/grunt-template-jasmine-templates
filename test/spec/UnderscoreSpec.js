"use strict";

if(!(_ && typeof _.template == "function")) {
  throw new Error("UnderscoreSpecs::I need underscore to run!");
}


describe("Underscore templating", function() {

  var template = document.getElementById("underscore_tmpl").innerHTML;

  it("to work accordingly", function(){
    var uid = _.uniqueId();
    var output = _.template(template)({container_id:"container_"+uid, unique_id: "unique_"+uid});

    var el = document.createElement("div");
    el.innerHTML = output;
    el = el.children[0];

    expect(el.id).toBe("container_"+uid);
    expect(el.children[0].textContent).toBe("unique_"+uid);
  });

});