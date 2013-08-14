"use strict";

if(!Handlebars) {
  throw new Error("HandlebarsSpecs::I need Handlebars to run!");
}


describe("Handlebars templating", function() {

  var template = document.getElementById("handlebars_tmpl").innerHTML;

  it("to work accordingly", function(){
    var uid = 77;
    var output = Handlebars.compile(template)({container_id:"container_"+uid, unique_id: "unique_"+uid});

    var el = document.createElement("div");
    el.innerHTML = output;
    el = el.children[0];

    expect(el.id).toBe("container_"+uid);
    expect(el.children[0].textContent).toBe("unique_"+uid);
  });

});