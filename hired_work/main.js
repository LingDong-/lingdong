/* global describe loadJSON DATA CURR_DATA calcdate */
function loadprojs_hired(data){

  if (data.length == 0){
    return "<div style='color:grey'>No results.</div>"
  }
  var months = ["?","Jan","Feb","Mar","Apr","May","Jun",
                    "Jul","Aug","Sep","Oct","Nov","Dec"]
  var out = ""
  for (var i = 0; i < data.length; i++){
    var work = data[i]
    out += "<div class='cell-w'><div class='cell' style='width:auto'>"
    out += `<div style="height:100%; padding: 30px; padding-bottom:15px; border-left: 6px solid #787b8b;">`
    out += `<span style="font-size: 18px; font-weight:bold;">${work.title}</span>`;
    out += `<span style="font-size: 16px; font-style:italic; padding-left: 30px">(${months[work.date.month]}-${months[work.date.month+work.date.duration]} ${work.date.year})</span>`
    out += `<div style="font-size:13px;line-height:18px;padding-top:10px">${work.description}</div>`

    out += `<div style="font-weight:bold; margin-top:15px; margin-bottom: 10px;">Projects I worked on with the team:</div>`
    out += `<table style="width:100%; height:128px; overflow:hidden; margin:0px; padding:0px"><tr style="width:100%; padding:0px">`
    
      
    for (var j = 0; j < work.projects.length; j++){

      var proj = work.projects[j];
      var im = proj.images[0]
      
      out += `<td valign="top" style="width:50%; padding:0px; margin:0px;">`
      // out += `<div style="border-right:1px solid rgba(0,0,0,0.05); border-bottom:1px solid rgba(0,0,0,0.05); border-radius:4px; margin-right:${10*(1-j%2)}px">`
      out += `<table style="padding:0px; margin:0px"><tr style="padding:0px; margin:0px">`
      out += `<td valign="top" style="padding:0px; margin:0px;">`
      out +="<div class='imbg'"
        + "style=\""
        + "background-image:url("+im.url+");"
        + "background-position: "+im.position+";"
        + "background-size : auto "+im.size+";"
        + "opacity: 0.9;"
        + "border-radius: 4px 0px 0px 4px;"
        + "width:128px;height:128px;"
        // + "transform: translate(0px,1px) scale(1,1.01);"
        + "\"></div>"
      out += `</td>`
      out += `<td valign="top" style="padding-5px; padding-left:10px; padding-right:10px"><div style="height:128px; overflow:scroll; position:relative">`
      out += `<div style="font-size:14px; font-weight:bold; padding-bottom:5px;">${proj.title}</div>`;
      out += `<div style="font-style:italic; height:60px; overflow:scroll; hyphens: auto;">${proj.description}</div>`
      out += `<div style="position:absolute; bottom:3px;">`
      out += `<div style="margin-top:-2px; white-space:nowrap; overflow-x:scroll; overflow-y:hidden;" ><i class='material-icons' style='font-size:16px;color:grey;transform:translate(0px,5px)'>layers&nbsp;</i>${proj.roles.join("&nbsp;•&nbsp;")}</div>`
      out += `<div style="margin-top:-2px; white-space:nowrap; overflow-x:scroll; overflow-y:hidden;" ><i class='material-icons' style='font-size:16px;color:grey;transform:translate(0px,5px)'>code&nbsp;</i>${proj.medium.join("&nbsp;•&nbsp;")}</div>`
      out += `<div style="margin-top:-2px; white-space:nowrap; overflow-x:scroll; overflow-y:hidden;" ><i class='material-icons' style='font-size:16px;color:grey;transform:translate(0px,5px)'>link&nbsp;</i>${proj.links.map((x,i)=>`<a href="${x}" style="font-size:13px;">[Link `+(i+1)+"]<a>").join("&nbsp;&nbsp;")}</div>`
      out += `<div>`
      out += `</div></td>`
      out += `</tr></table>`
      // out += `</div>`
      out += `</td>`
      
      
      if (j % 2 == 1){
        out += `</tr><tr style="width:100%;">`
      }
    }
    if (j % 2 == 1){
      out += `<td style="width:50%"></td>`
    }
    out += "</table>"
    
    out += "</div></div></div>"
  }
  return out
}

function updatecontent_hired(){
  document.getElementById("content").innerHTML = loadprojs_hired(CURR_DATA)
}


function init_hired(){

  loadJSON("/hired_work/data.json",function(response) {
    DATA = JSON.parse(response);
    DATA.sort((x,y)=>(-calcdate(x.date)+calcdate(y.date)))
    CURR_DATA = DATA;
    console.log(DATA);
    updatecontent_hired(DATA);

  });


}
init_hired();