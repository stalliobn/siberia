(function($) {
  'use strict';

  $.fn.productsTable = function(settings) {
    settings = $.extend({
      isFirstColHasMetaInfo: true,
      attributes: {}
    }, settings);

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

      if (settings.isFirstColHasMetaInfo) {
        // Remove first column because it contains not data about models.
        delete tables[0];
      }

      groups.tbody.each(function() {
        var row = this;

        $.each(tables, function(index) {
          var rowString = '';

          if (settings.isFirstColHasMetaInfo) {
            rowString += row.children[0].outerHTML;
          }

          rowString += row.children[index].outerHTML;

          tables[index].content.push(rowString);
          tables[index].item = $(tables[index].item).attr('colspan', $(rowString).length)[0].outerHTML;
        });
      });

      $.each(tables, function() {
        var table = '';

        table += '<table>';
        table +=   '<thead>';
        table +=     '<tr>' + this.item + '</tr>';
        table +=   '</thead>';
        table +=   '<tbody>';
        table +=     '<tr>' + this.content.join('</tr><tr>') + '</tr>';
        table +=   '</tbody>';
        table += '</table>';

        string += $(table).attr(settings.attributes)[0].outerHTML;
      });

      $table.after(string);
    });
  };
})(jQuery);
