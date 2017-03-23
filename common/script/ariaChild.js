// ariaChild.js - script for aria child specifications to use
// when integrating content.  Requires a roleInfo.js file in the
// same directory that contains the roleInfo data structure.
//

/* jshint laxbreak:true, laxcomma:true, asi: true, eqeqeq: false, strict: implied, jquery: true */
/* global $, require, roleInfo, updateReferences */
var localRoleInfo = {} ;

require(["core/pubsubhub"], function( respecEvents ) {
    respecEvents.sub("end", function( msg ) {
        if (msg == "w3c/conformance") {
                var propList = {};
                var globalSP = [];

                var skipIndex = 0;
                var myURL = document.URL;
                if (myURL.match(/\?fast/)) {
                    skipIndex = 1;
                }


                // process the document before anything else is done
                // first get the properties
                $.each(document.querySelectorAll("pdef, sdef"), function(i, item) {
                    var type = (item.localName === "pdef" ? "property" : "state");
                    var container = item.parentNode;
                    var content = item.innerHTML;
                    var sp = document.createElement("span");
                    var title = item.getAttribute("title");
                    if (!title) {
                        title = content;
                    }
                    sp.className = type + "-name";
                    sp.title = title;
                    sp.innerHTML = "<code>" + content + "</code> <span class=\"type-indicator\">(" + type + ")</span>";
                    sp.setAttribute("aria-describedby", "desc-" + title);
                    var dRef = item.nextElementSibling;
                    var desc = dRef.firstElementChild.innerHTML;
                    dRef.id = "desc-" + title;
                    dRef.setAttribute("role", "definition");
                    var heading = document.createElement("h3");
                    heading.appendChild(sp);
                    container.replaceChild(heading, item);
                    // add this item to the index
                    propList[title] = { is: type, title: title, name: content, desc: desc, roles: [] };
                    var abstract = container.querySelector("." + type + "-applicability");
                    if ((abstract.textContent || abstract.innerText) === "All elements of the base markup") {
                        globalSP.push({ is: type, title: title, name: content, desc: desc });
                    }
                    // the pdef/sdef is gone.  if we are in a div, convert that div to a section

                    if (container.nodeName.toLowerCase() == "div") {
                        // change the enclosing DIV to a section with notoc
                        var sec = document.createElement("section") ;
                        $.each(container.attributes, function(i, attr) {
                            sec.setAttribute(attr.name, attr.value);
                        });
                        $(sec).addClass("notoc");
                        var theContents = container.innerHTML;
                        sec.innerHTML = theContents;
                        container.parentNode.replaceChild(sec, container) ;
                    }

                });
                
                // what about roles?
                //
                // we need to do a few things here:
                //   1. expand the rdef elements.
                //   2. accumulate the roles into a table for the indices
                //   3. grab the parent role reference so we can build up the tree
                //   4. grab any local states and properties so we can hand those down to the children
                //

                var subRoles = [];
                var roleIndex = "";

                if (!skipIndex) {
                    
                    // spit out the index
                    var node = document.getElementById("index_role");
                    var parentNode = node.parentNode;
                    var list = document.createElement("dl");
                    list.id = "index_role";
                    list.className = "compact";
                    list.innerHTML = roleIndex;
                    parentNode.replaceChild(list, node);

                    // assuming we found some parent roles, update those parents with their children
                    for (var i=0; i < subRoles.length; i++) {
                        var item = subRoles[subRoles[i]];
                        var sortedList = item.sort(function(a,b) { return a < b ? -1 : a > b ? 1 : 0 });
                        var output = "<ul>\n";
                        for (var j=0; j < sortedList.length; j++) {
                            output += "<li><rref>" + sortedList[j] + "</rref></li>\n";
                        }
                        output += "</ul>\n";
                        // put it somewhere
                        var subRolesContainer = document.querySelector("#" + subRoles[i]);
                        if (subRolesContainer) {
                            var subRolesListContainer = subRolesContainer.querySelector(".role-children");
                            if (subRolesListContainer) {
                                subRolesListContainer.innerHTML = output;
                            }
                        }
                    }

                    // we have all the properties and states - spit out the
                    // index
                    var propIndex = "";
                    var sortedList = [];
                    $.each(propList, function(i) {
                        sortedList.push(i);
                    });
                    sortedList = sortedList.sort();

                    for (var i = 0; i < sortedList.length; i++) {
                        var item = propList[sortedList[i]];
                        propIndex += "<dt><a href=\"#" + item.title + "\" class=\"" + item.is + "-reference\">" + item.name + "</a></dt>\n";
                        propIndex += "<dd>" + item.desc + "</dd>\n";
                    }
                    var node = document.getElementById("index_state_prop");
                    var parentNode = node.parentNode;
                    var l = document.createElement("dl");
                    l.id = "index_state_prop";
                    l.className = "compact";
                    l.innerHTML = propIndex;
                    parentNode.replaceChild(l, node);

                }

                updateReferences(document);

                // prune out unused rows throughout the document
                
                $.each(document.querySelectorAll(".role-abstract, .role-parent, .role-base, .role-related, .role-scope, .role-mustcontain, .role-required-properties, .role-properties, .role-namefrom, .role-namerequired, .role-namerequired-inherited, .role-childpresentational, .role-presentational-inherited, .state-related, .property-related,.role-inherited, .role-children, .property-descendants, .state-descendants, .implicit-values"), function(i, item) {
                    var content = $(item).text();
                    if (content.length === 1 || content.length === 0) {
                        // there is no item - remove the row
                        item.parentNode.remove();
                    } else if (content === "Placeholder" 
                               && !skipIndex 
                               && (item.className === "role-inherited" 
                                   || item.className === "role-children"
                                   || item.className === "property-descendants"
                                   || item.className === "state-descendants" )) {
                        item.parentNode.remove();
                    }
                });
            }
    });
});

