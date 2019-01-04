(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{143:function(e,a,t){"use strict";t(28),t(173);var n=t(4),r=t.n(n),i=t(0),o=t.n(i),l=function(e){var a=e.Tag,t=e.children,n=e.className,r=e.flex,i=e.dirColumn,l=e.spaceAround,s=e.spaceBetween,c=e.centered,u=e.autoBottomMargin,m=e.horizontalHalf,d=e.flexStart,p=e.props,g=[];return r&&g.push("element--flex"),u&&g.push("element--auto-bottom-margin"),i&&g.push("element--column"),l&&g.push("element--space-around"),s&&g.push("element--space-between"),c&&g.push("element--centered"),m&&g.push("element--horizontal-half"),d&&g.push("element--flex-start"),o.a.createElement(a,Object.assign({className:n+" "+g.join(" ")},p),t)};l.defaultProps={className:"",Tag:"div"},l.propTypes={Tag:r.a.string,children:r.a.node,className:r.a.string,flex:r.a.bool,spaceAround:r.a.bool,spaceBetween:r.a.bool,dirColumn:r.a.bool,centered:r.a.bool,horizontalHalf:r.a.bool,autoBottomMargin:r.a.bool,flexStart:r.a.bool},a.a=l},144:function(e,a,t){"use strict";t.r(a),t.d(a,"graphql",function(){return g}),t.d(a,"StaticQueryContext",function(){return d}),t.d(a,"StaticQuery",function(){return p});var n=t(0),r=t.n(n),i=t(4),o=t.n(i),l=t(156),s=t.n(l);t.d(a,"Link",function(){return s.a}),t.d(a,"withPrefix",function(){return l.withPrefix}),t.d(a,"navigate",function(){return l.navigate}),t.d(a,"push",function(){return l.push}),t.d(a,"replace",function(){return l.replace}),t.d(a,"navigateTo",function(){return l.navigateTo});var c=t(164),u=t.n(c);t.d(a,"PageRenderer",function(){return u.a});var m=t(29);t.d(a,"parsePath",function(){return m.a});var d=r.a.createContext({}),p=function(e){return r.a.createElement(d.Consumer,null,function(a){return e.data||a[e.query]&&a[e.query].data?(e.render||e.children)(e.data?e.data.data:a[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function g(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}p.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},157:function(e,a,t){"use strict";t(174),t(175);var n=t(4),r=t.n(n),i=t(0),o=t.n(i),l=t(144),s=t(167),c=t.n(s),u=t(168),m=t.n(u),d=t(162),p=function(){return o.a.createElement("div",{className:"container spacing--after",style:{justifyContent:"space-between"}},o.a.createElement("div",{className:"col-4",style:{display:"flex",justifyContent:"space-between"}},o.a.createElement(d.a,{className:"image--large image--contain",src:c.a}),o.a.createElement(d.a,{className:"image--large push-right-2 image--contain",src:m.a})),o.a.createElement("div",{className:"col-2",style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},o.a.createElement("div",null,o.a.createElement(l.Link,{to:"/about",className:"nav-item-hover",style:{textDecoration:"none"}},"KURSSISTA")),o.a.createElement("div",null,o.a.createElement(l.Link,{to:"/faq",className:"nav-item-hover",style:{textDecoration:"none"}},"FAQs"))))},g=t(163),f=function(){return o.a.createElement("div",{className:"container",style:{alignItems:"center"}},o.a.createElement(l.Link,{to:"/",style:{textDecoration:"none"}},o.a.createElement(g.a,{className:"nav-item-hover",childrenClassName:"triple-border__logo"},"{() => fs}")),o.a.createElement("div",{className:"col-4 push-left-4",style:{display:"flex",justifyContent:"space-between",fontWeight:"bold"}},o.a.createElement(l.Link,{to:"/about",className:"nav-item-hover"},"KURSSISTA"),o.a.createElement(l.Link,{to:"/faq",className:"nav-item-hover"},"FAQs"),o.a.createElement(l.Link,{to:"/companies",className:"nav-item-hover"},"YRITYSESITTELYT")))},h=function(e){var a=e.children;return o.a.createElement("div",null,o.a.createElement(f,null),o.a.createElement("div",null,a),"/"!==window.location.pathname?o.a.createElement(p,null):null)};h.propTypes={children:r.a.node.isRequired};a.a=h},158:function(e,a,t){"use strict";var n=t(204),r=t(144),i=t(4),o=t.n(i),l=t(0),s=t.n(l),c=t(205),u=t.n(c);function m(e){var a=e.description,t=e.lang,i=e.meta,o=e.keywords,l=e.title;return s.a.createElement(r.StaticQuery,{query:d,render:function(e){var n=a||e.site.siteMetadata.description;return s.a.createElement(u.a,{htmlAttributes:{lang:t},title:l,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:n},{property:"og:title",content:l},{property:"og:description",content:n},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:l},{name:"twitter:description",content:n}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(i)})},data:n})}m.defaultProps={lang:"en",meta:[],keywords:[]},m.propTypes={description:o.a.string,lang:o.a.string,meta:o.a.array,keywords:o.a.arrayOf(o.a.string),title:o.a.string.isRequired},a.a=m;var d="1025518380"},162:function(e,a,t){"use strict";t.d(a,"a",function(){return c});t(28),t(169);var n=t(145),r=t.n(n),i=(t(176),t(4)),o=t.n(i),l=t(0),s=t.n(l),c=function(e){var a=e.src,t=e.alt,n=(e.hover,e.className),i=e.overlay,o=e.contain,l=e.circle,c=e.extraSmall,u=e.small,m=e.medium,d=e.large,p=e.fullWidth,g=e.actualSize,f=e.squareBig,h=r()(e,["src","alt","hover","className","overlay","contain","circle","extraSmall","small","medium","large","fullWidth","actualSize","squareBig"]),y=[];return o&&y.push("image--contain"),p&&y.push("image--full-width"),l&&y.push("image--circle"),c&&y.push("image--extra-small"),u&&y.push("image--small"),m&&y.push("image--medium"),d&&y.push("image--large"),f&&y.push("image--square-big"),g&&y.push("image--acctual-size"),s.a.createElement("div",Object.assign({className:"image "+n+" "+y.join(" ")},h),s.a.createElement("div",{className:"image__container"},s.a.createElement("img",{style:{backgroundColor:i,backgroundOpacity:"0.5"},className:"image__content",src:a,alt:t})))};c.defaultProps={src:"",alt:"",overlay:"",className:""},c.propTypes={overlay:o.a.string,src:o.a.oneOfType([o.a.string,o.a.object]),alt:o.a.oneOfType([o.a.string,o.a.array]),hover:o.a.string,className:o.a.string,contain:o.a.bool,circle:o.a.bool,extraSmall:o.a.bool,small:o.a.bool,medium:o.a.bool,large:o.a.bool,squareBig:o.a.bool,fullWidth:o.a.bool,actualSize:o.a.bool}},163:function(e,a,t){"use strict";t.d(a,"a",function(){return l});t(28),t(177);var n=t(4),r=t.n(n),i=t(0),o=t.n(i),l=function(e){var a=e.children,t=e.largeMargin,n=e.className,r=e.childrenClassName,i=e.backgroundColor,l=e.props;return o.a.createElement("div",Object.assign({className:"triple-border "+n+" "+(t?"triple-border--large-margin":""),style:{padding:t?"":"0.2em"}},l),o.a.createElement("div",{className:"triple-border__container "+r,style:{backgroundColor:i}},a))};l.defaultProps={className:"",childrenClassName:"",largeMargin:!1,backgroundColor:"transparent"},l.propTypes={children:r.a.node.isRequired,className:r.a.string,childrenClassName:r.a.string,largeMargin:r.a.bool,backgroundColor:r.a.string}},164:function(e,a,t){var n;e.exports=(n=t(172))&&n.default||n},167:function(e,a,t){e.exports=t.p+"static/hgin_yliopisto-30c68104749d830b6cef6ea8c6339b16.png"},168:function(e,a,t){e.exports=t.p+"static/houston_logo-356bd2a9a75b44bdf7897b2cdd387600.png"},172:function(e,a,t){"use strict";t.r(a);t(28);var n=t(0),r=t.n(n),i=t(4),o=t.n(i),l=t(50),s=t(2),c=function(e){var a=e.location,t=s.default.getResourcesForPathnameSync(a.pathname);return r.a.createElement(l.a,Object.assign({location:a,pageResources:t},t.json))};c.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},a.default=c},173:function(e,a,t){},174:function(e,a,t){},175:function(e,a,t){},176:function(e,a,t){},177:function(e,a,t){},204:function(e){e.exports={data:{site:{siteMetadata:{title:"Fullstack 2019",description:"",author:"Houston Inc. Consulting oy"}}}}}}]);
//# sourceMappingURL=0-1e5ba5692c4f26881497.js.map