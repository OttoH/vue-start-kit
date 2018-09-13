exports.install = function (Vue, duration = 1200) {
  Vue.directive('long-press', {
    bind: function (el, binding, vNode) {
        // Make sure expression provided is a function
        if (typeof binding.value !== 'function') {
            // Fetch name of component
            const compName = vNode.context.name
            // pass warning to console
            let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be`
            if (compName) { warn += `Found in component '${compName}' ` }

            console.warn(warn)
        }

        // Define variable
        let self = this
        this.pressTimer = null

        // Define funtion handlers
        // Create timeout ( run function after 1s )
        this.start = (e) => {

            if (e.type === 'click' && e.button !== 0) {
                return;
            }

            clearTimeout(self._timeout)

            if (pressTimer === null) {
                self.pressTimer = setTimeout(() => {
                    binding.value.call(this, e)
                }, duration)
            }
        }

        // Cancel Timeout
        this.cancel = (e) => {
            // Check if timer has a value or not
            if (self.pressTimer !== null) {
                clearTimeout(self.pressTimer)
                self.pressTimer = null
            }
        }

        // Add Event listeners
        el.addEventListener("mousedown", this.start);
        el.addEventListener("touchstart", this.start);
        // Cancel timeouts if this events happen
        el.addEventListener("click", this.cancel);
        el.addEventListener("mouseout", this.cancel);
        el.addEventListener("touchend", this.cancel);
        el.addEventListener("touchcancel", this.cancel);
    },
    unbind: function (el) {
      // Add Event listeners
      el.removeEventListener("mousedown", this.start);
      el.removeEventListener("touchstart", this.start);
      // Cancel timeouts if this events happen
      el.removeEventListener("click", this.cancel);
      el.removeEventListener("mouseout", this.cancel);
      el.removeEventListener("touchend", this.cancel);
      el.removeEventListener("touchcancel", this.cancel);
    }
  })
}
