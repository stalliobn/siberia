(function($) {
  'use strict';

  $.fn.productsTable = function() {
    return this.each(function() {
      if ('TABLE' !== this.nodeName) {
        return console.warn('jQuery.productsTable() expect TABLE element, got: ' + this.nodeName);
      }

      var $table = $(this);
      var groups = [];
      var tables = {};
      var string = '';

      // Obtain rows from table body and head.
      $.each(['thead', 'tbody'], function() {
        groups[this] = $table.children(this).children();
      });

      // Walk through the columns of table head.
      groups.thead.children().each(function(index) {
        tables[index] = {
          item: this.outerHTML,
          content: []
        };
      });

      // Remove first column because it contains not data about models.
      delete tables[0];

      groups.tbody.each(function() {
        var row = this;

        $.each(tables, function(index) {
          var rowString = row.children[0].outerHTML + row.children[index].outerHTML;

          tables[index].content.push(rowString);
          tables[index].item = $(tables[index].item).attr('colspan', $(rowString).length)[0].outerHTML;
        });
      });

      $.each(tables, function() {
        string += '<table class="adaptive">';
        string +=   '<thead>';
        string +=     '<tr>' + this.item + '</tr>';
        string +=   '</thead>';

        string +=   '<tbody>';
        string +=     '<tr>' + this.content.join('</tr><tr>') + '</tr>';
        string +=   '</tbody>';
        string += '</table>';
      });

      $table.after(string);
    });
  };
})(jQuery);
