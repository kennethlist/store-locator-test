Vue.transition('stagger', {
    stagger: function(index) {
        return Math.min(100, index * 50)
    }
})
