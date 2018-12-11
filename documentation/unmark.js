var unmark = (t)=>(t
    //escape tags
    .replace(/\\</g,"&lt")
    //tables
    .replace(/[\n\r^]((((.*\|)+.+)[\n\r$])((\||)((:|)\-+(:|)\|(:|))+\-+(:|)(\||)[\n\r])(((.*\|)+.+)[\n\r$])+)/g,'<p><table>\n$1</table></p>\n')
    .replace(/(\||)((:|)\-+(:|)\|(:|))+\-+(:|)(\||)[\n\r](?=((.*[\n\r])*<\/table>))/g,'')
    .replace(/(((.*\|)+.+))[\n\r$](?=((.*[\n\r])*<\/table>))/g,'  <tr>|$1|</tr>\n')
    .replace(/<tr>\|+(.*)\|+<\/tr>/g,'<tr> <td>$1</td> </tr>')
    .replace(/\|(?=((.+)<\/tr>))/g,'</td> <td>')
    //paragraph
    .replace(/([\n\r^](([^ !\+\*\-\=\#(\n)(\r)>(0-9)`(<.*>)]+.*[\n\r^])+))(?=[\n\r$])/g,'\n<p>$2</p>\n')
    //block quote
    .replace(/[\n\r^]> {0,1}> *(.*)/g,'\n> <blockquote>$1</blockquote>')
    .replace(/<\/blockquote>\n*> *<blockquote> *<\/blockquote>\n*> *<blockquote>/g,'<br>')
    .replace(/<\/blockquote>\n*> *<blockquote>/g,' ')
    .replace(/[\n\r^]> *(.*)/g,'\n<blockquote>$1</blockquote>')
    .replace(/<\/blockquote>\n*<blockquote> *<\/blockquote>\n*<blockquote>/g,'<br>')
    .replace(/<\/blockquote>\n*<blockquote>/g,' ')
    //fence code
    .replace(/[\n\r^]```(.*)[\n\r]((.*[\n\r])*?)```/g,'\n<pre lang="$1">$2</pre>')
    //setext header
    .replace(/(.+)[\n\r]=+[\n\r$]/g,'<h1>$1</h1>\n')
    .replace(/(.+)[\n\r]-+[\n\r$]/g,'<h2>$1</h2>\n')
    //atx header
    .replace(/^ *###### *(.+)[\n\r$]/gm,'<h6>$1</h6>\n')
    .replace(/^ *##### *(.+)[\n\r$]/gm,'<h5>$1</h5>\n')
    .replace(/^ *#### *(.+)[\n\r$]/gm,'<h4>$1</h4>\n')
    .replace(/^ *### *(.+)[\n\r$]/gm,'<h3>$1</h3>\n')
    .replace(/^ *## *(.+)[\n\r$]/gm,'<h2>$1</h2>\n')
    .replace(/^ *# *(.+)[\n\r$]/gm,'<h1>$1</h1>\n')
    //horizontal rule
    .replace(/[\n\r^]([\*\-\_] *){3,}[\n\r$]/g,'\n<hr></hr>\n')
    //unordered list
    .replace(/[\n\r^](((( ){4,}[\*\+\-] .+[\n\r$])((( ){4,}[\*\+\-] .+[\n\r$])|(( ){6,}.*[\n\r$])|[\n\r$])*))/g,'\n    <ul>\n$1    </ul>\n')
    .replace(/[\n\r^]( ){4,}([\*\+\-]) (.+)/g,'\n      <li>$3</li>')
    .replace(/[\n\r^](((( ){2,}[\*\+\-] .+[\n\r$])((( ){2,}[\*\+\-] .+[\n\r$])|(( ){4,}.*[\n\r$])|[\n\r$])*))/g,'\n  <ul>\n$1  </ul>\n')
    .replace(/[\n\r^]( ){2,}([\*\+\-]) (.+)/g,'\n    <li>$3</li>')
    .replace(/[\n\r^](((( ){0,}[\*\+\-] .+[\n\r$])((( ){0,}[\*\+\-] .+[\n\r$])|(( ){2,}.*[\n\r$])|[\n\r$])*))/g,'\n<ul>\n$1</ul>\n')
    .replace(/[\n\r^]( ){0,}([\*\+\-]) (.+)/g,'\n  <li>$3</li>')
    //ordered list
    .replace(/[\n\r^](((( ){4,}[0-9]+\. .+[\n\r$])((( ){4,}[0-9]+\. .+[\n\r$])|(( ){6,}.*[\n\r$])|[\n\r$])*))/g,'\n    <ol>\n$1    </ol>\n')
    .replace(/[\n\r^]( ){4,}([0-9]+\.) (.+)/g,'\n      <li>$3</li>')
    .replace(/[\n\r^](((( ){2,}[0-9]+\. .+[\n\r$])((( ){2,}[0-9]+\. .+[\n\r$])|(( ){4,}.*[\n\r$])|[\n\r$])*))/g,'\n  <ol>\n$1  </ol>\n')
    .replace(/[\n\r^]( ){3,}([0-9]+\.) (.+)/g,'\n    <li>$3</li>')
    .replace(/[\n\r^](((( ){0,}[0-9]+\. .+[\n\r$])((( ){0,}[0-9]+\. .+[\n\r$])|(( ){2,}.*[\n\r$])|[\n\r$])*))/g,'\n<ol>\n$1</ol>\n')
    .replace(/[\n\r^]( ){0,}([0-9]+\.) (.+)/g,'\n  <li>$3</li>')
    //em & strong & code
    .replace(/([^\\])__(.*?[^\n\r\\])__/g,'$1<strong>$2</strong>')
    .replace(/([^\\])\*\*(.*?[^\n\r\\])\*\*/g,'$1<strong>$2</strong>')
    .replace(/([^\\])\*(.*?[^\n\r\\])\*/g,'$1<em>$2</em>')
    .replace(/([^\\])`(.*?[^\n\r\\])`/g,'$1<code>$2</code>')
    //image & link
    .replace(/!\[\]\((.*?)\)/g,'<img src="$1" alt=""/>')
    .replace(/!\[(.*?)\]\((.*?)\)/g,'<figure><img src="$2" alt="$1"/><figcaption>$1</figcaption></figure>')
    .replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2">$1</a>')
    //escape
    .replace(/\\(\*|_|`)/g,'$1')
)