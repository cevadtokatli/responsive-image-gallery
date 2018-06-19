describe 'accessors', ->
    before ->
        el = document.createElement 'div'
        el.innerHTML += "<div category='#{if i % 2 == 0 then 'category-a' else 'category-b'}'></div>" for i in [0...10]
        document.body.appendChild el

        @timing = 'ease-in-out'
        @duration = 650
        @gallery = new ResponsiveImageGallery {
            el
            timing: @timing
            duration: @duration
        }

    describe 'category', ->
        it 'getter', ->
            category = @gallery.get()
            expectedCategory = '*'
            expect(category).to.eql expectedCategory

        it 'setter', ->
            val = 'category-a'
            @gallery.set val
            category = @gallery.get()
            expect(category).to.eql val

    describe 'timing', ->
        it 'getter', ->
            timing = @gallery.getTiming()
            expect(timing).to.eql @timing

        it 'setter', ->
            val = 'linear'
            @gallery.setTiming val
            timing = @gallery.getTiming()
            expect(timing).to.eql val

    describe 'duration', ->
        it 'getter', ->
            duration = @gallery.getDuration()
            expect(duration).to.eql @duration

        it 'setter', ->
            val = 1200
            @gallery.setDuration val
            duration = @gallery.getDuration()
            expect(duration).to.eql val