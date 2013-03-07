(function(scope) {
  scope.TestView = Backbone.View.extend({
    initialize: function() {
      this.$el.append("<span id='constructed1'>constructed1</span>");
    },

    addDynamic: function() {
      this.$el.append("<span id='dynamic'>dynamic</span>");
      this.onFunctionCalled("addDynamic");
    },

    onFunctionCalled: function(name) {
    }
  });
})(window);
