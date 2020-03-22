/**
 * scroller - handles the details
 * of figuring out which section
 * the user is currently scrolled
 * to.
 * SOURCE: https://github.com/vlandham/scroll_demo
 */export default function scroller(){/**
   * scroll - constructor function.
   * Sets up scroller to monitor
   * scrolling of els selection.
   *
   * @param els - d3 selection of
   *  elements that will be scrolled
   *  through by user.
   */function a(a){f=a,d3.select(window).on("scroll.scroller",c).on("resize.scroller",b),b();// hack to get position
// to be called once for
// the scroll position on
// load.
// @v4 timer no longer stops if you
// return true at the end of the callback
// function - so here we stop it explicitly.
var d=d3.timer(function(){c(),d.stop()})}/**
   * resize - called initially and
   * also when page is resized.
   * Resets the sectionPositions
   *
   */function b(){g=[];var a;f.each(function(b,c){var d=this.getBoundingClientRect().top;0===c&&(a=d),g.push(d-a)}),i=d.node().getBoundingClientRect().top+window.pageYOffset}/**
   * position - get current users position.
   * if user has scrolled to new section,
   * dispatch active event with new section
   * index.
   *
   */function c(){var a=window.pageYOffset-100-i,b=d3.bisect(g,a);b=Math.min(f.size()-1,b),h!==b&&(e.call("active",this,b),h=b);var c=Math.max(b-1,0),d=g[c],j=(a-d)/(g[b]-d);e.call("progress",this,h,j)}/**
   * container - get/set the parent element
   * of the sections. Useful for if the
   * scrolling doesn't start at the very top
   * of the page.
   *
   * @param value - the new container value
   */var d=d3.select("body"),e=d3.dispatch("active","progress"),f=null,g=[],h=-1,i=0;// event dispatcher
return a.container=function(b){return 0===arguments.length?d:(d=b,a)},a.on=function(a,b){e.on(a,b)},a}