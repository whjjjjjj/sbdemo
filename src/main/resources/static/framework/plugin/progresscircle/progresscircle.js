function makesvg(options){
  var inner_text = "";
  var abs_percentage = Math.abs(options.percentage).toString();
  var percentage_str = options.percentage.toString();
  var classes = "";

  // if(options.percentage < 0){
  //   classes = "danger-stroke circle-chart__circle--negative";
  // } else if(options.percentage > 0 && options.percentage <= 30){
  //   classes = "warning-stroke";
  // } else{
  //   classes = "success-stroke";
  // }

 var svg = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">'
     + '<circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" />'
     + '<circle class="circle-chart__circle" style="stroke: ' + options.fillColor + '"'
     + 'stroke-dasharray="'+ abs_percentage+',100"    cx="16.9" cy="16.9" r="15.9" />'
     + '<g class="circle-chart__info">'
     + '   <text class="circle-chart__percent" x="17.9" y="15.5">'+percentage_str+'%</text>';

  if(inner_text){
    svg += '<text class="circle-chart__subline" x="16.91549431" y="22">'+inner_text+'</text>'
  }
  
  svg += ' </g></svg>';
  
  return svg
}

(function( $ ) {

    $.fn.circlechart = function() {
        this.each(function() {
            var options = {
                percentage: $(this).data("percentage"),
                fillColor: $(this).data("fill"),
                innerText: $(this).text()
            };
            $(this).html(makesvg(options));
        });
        return this;
    };

}( jQuery ));